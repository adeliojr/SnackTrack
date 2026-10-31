import React, { useState, useEffect, useCallback } from 'react';
import { MenuItem, Order, OrderStatus, StationRole, CashRegister } from './types/trailer';
import {
  loadOrders,
  saveOrders,
  loadMenu,
  saveMenu,
  loadCashRegister,
  saveCashRegister,
  subscribeToSync,
} from './utils/storage';
import { StationSelectWindow } from './components/StationSelectWindow';
import { OrdersWindow } from './components/OrdersWindow';
import { KitchenWindow } from './components/KitchenWindow';
import { CashierWindow } from './components/CashierWindow';
import { SplitView } from './components/SplitView';
import { CustomerTvWindow } from './components/CustomerTvWindow';
import { ShareLinksModal } from './components/ShareLinksModal';
import { MenuManagerModal } from './components/MenuManagerModal';
import { playCallChime, speakOrder, playKitchenBell } from './utils/audio';
import { isKitchenItem } from './utils/orderHelpers';
import {
  Smartphone,
  Monitor,
  Tablet,
  Columns3,
  RotateCcw,
  ShieldCheck,
  Flame,
  DollarSign,
  ExternalLink,
  Share2,
  Tv,
  UtensilsCrossed,
} from 'lucide-react';

export default function App() {
  // Check URL params or local device storage
  const getInitialStation = (): StationRole => {
    const params = new URLSearchParams(window.location.search);
    const stationParam = params.get('station') || params.get('window');
    if (stationParam === 'atendimento' || stationParam === 'pedidos') return 'atendimento';
    if (stationParam === 'caixa') return 'caixa';
    if (stationParam === 'cozinha' || stationParam === 'kds') return 'cozinha';
    if (stationParam === 'tv' || stationParam === 'painel') return 'tv';

    // Local device memory
    const saved = localStorage.getItem('trailer_station_role');
    if (saved === 'atendimento' || saved === 'caixa' || saved === 'cozinha' || saved === 'tv') {
      return saved as StationRole;
    }

    return 'entrada'; // Tela de entrada para selecionar a estação
  };

  const [currentStation, setCurrentStation] = useState<StationRole>(getInitialStation);
  const [isSplitView, setIsSplitView] = useState(false);
  const [isShareLinksOpen, setIsShareLinksOpen] = useState(false);
  const [isMenuManagerOpen, setIsMenuManagerOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cashRegister, setCashRegister] = useState<CashRegister>(loadCashRegister);

  // Initial load
  useEffect(() => {
    setOrders(loadOrders());
    setMenu(loadMenu());
    setCashRegister(loadCashRegister());
  }, []);

  // Listen for sync events across tabs / windows
  useEffect(() => {
    const unsubscribe = subscribeToSync((msg) => {
      if (msg.type === 'ORDERS_UPDATED') {
        const updated = loadOrders();
        setOrders(updated);
      } else if (msg.type === 'MENU_UPDATED') {
        setMenu(loadMenu());
      } else if (msg.type === 'CASH_UPDATED') {
        setCashRegister(loadCashRegister());
      } else if (msg.type === 'ORDER_CALLED' && msg.payload) {
        const called = msg.payload as Order;
        playCallChime();
        speakOrder(called.orderNumber, called.customerName);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Station Selection from Entry Screen
  const handleSelectStation = (station: StationRole, rememberDevice: boolean) => {
    setCurrentStation(station);
    setIsSplitView(false);
    if (rememberDevice) {
      localStorage.setItem('trailer_station_role', station);
    } else {
      localStorage.removeItem('trailer_station_role');
    }
  };

  const handleSwitchStation = () => {
    setCurrentStation('entrada');
    setIsSplitView(false);
    localStorage.removeItem('trailer_station_role');
  };

  // Add order from Janela 1: Atendimento
  const handleAddOrder = useCallback((newOrder: Order) => {
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      saveOrders(updated);
      return updated;
    });
  }, []);

  // Update full order (authorized, paid, items added)
  const handleUpdateOrder = useCallback((updatedOrder: Order) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => (ord.id === updatedOrder.id ? updatedOrder : ord));
      saveOrders(updated);
      return updated;
    });
  }, []);

  // Update order status from Cozinha
  const handleUpdateOrderStatus = useCallback((orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => {
      const now = Date.now();
      const updated = prev.map((ord) => {
        if (ord.id === orderId) {
          const mod: Order = { ...ord, status: newStatus };
          if (newStatus === 'na_chapa' && !ord.startedAt) {
            mod.startedAt = now;
          } else if (newStatus === 'pronto') {
            mod.readyAt = now;
          } else if (newStatus === 'entregue') {
            mod.deliveredAt = now;
          }
          return mod;
        }
        return ord;
      });

      saveOrders(updated);
      return updated;
    });
  }, []);

  // Update cash register
  const handleUpdateCashRegister = useCallback((updatedCash: CashRegister) => {
    setCashRegister(updatedCash);
    saveCashRegister(updatedCash);
  }, []);

  // Update menu
  const handleUpdateMenu = useCallback((updatedMenu: MenuItem[]) => {
    setMenu(updatedMenu);
    saveMenu(updatedMenu);
  }, []);

  // Counts
  const pendingAuthorizationsCount = orders.filter((o) => o.authorizationStatus === 'aguardando_autorizacao').length;
  const cookingOrdersCount = orders.filter(
    (o) =>
      o.authorizationStatus === 'autorizado' &&
      (o.status === 'na_chapa' || o.status === 'aguardando') &&
      o.items.some((it) => isKitchenItem(it, menu))
  ).length;
  const openOrdersCount = orders.filter(
    (o) => o.authorizationStatus === 'autorizado' && o.paymentStatus === 'pendente'
  ).length;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-neutral-950 text-neutral-100 antialiased font-sans">
      {/* Station Navigation Header (shown when an operational station is active) */}
      {currentStation !== 'entrada' && (
        <header className="h-14 px-3 sm:px-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between gap-3 shrink-0 z-30 select-none">
          <div className="flex items-center gap-3">
            <button
              onClick={handleSwitchStation}
              className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors font-black text-sm uppercase tracking-tight"
            >
              <span className="w-7 h-7 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-black text-sm">
                🍔
              </span>
              <span>
                TRAILER <span className="text-amber-400">PRO</span>
              </span>
            </button>

            {/* Current Active Station Indicator */}
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-neutral-800 text-xs font-bold">
              {currentStation === 'atendimento' && (
                <span className="flex items-center gap-1.5 text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  Estação: Atendimento (Celular)
                </span>
              )}
              {currentStation === 'caixa' && (
                <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                  Estação: Caixa Central (Computador)
                </span>
              )}
              {currentStation === 'cozinha' && (
                <span className="flex items-center gap-1.5 text-orange-300 bg-orange-950/80 px-2.5 py-1 rounded-lg border border-orange-800">
                  <Tablet className="w-3.5 h-3.5 text-orange-400" />
                  Estação: Cozinha Chapa (Tablet)
                </span>
              )}
            </div>
          </div>

          {/* Station Switcher Tabs (Desktop / Operator view) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setCurrentStation('atendimento');
                setIsSplitView(false);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                currentStation === 'atendimento' && !isSplitView
                  ? 'bg-amber-400 text-neutral-950 font-black'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline">1. Atendimento</span>
            </button>

            <button
              onClick={() => {
                setCurrentStation('caixa');
                setIsSplitView(false);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 relative ${
                currentStation === 'caixa' && !isSplitView
                  ? 'bg-emerald-500 text-neutral-950 font-black'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span className="hidden md:inline">2. Caixa</span>
              {pendingAuthorizationsCount > 0 && (
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-red-600 text-white font-black animate-pulse">
                  {pendingAuthorizationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setCurrentStation('cozinha');
                setIsSplitView(false);
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                currentStation === 'cozinha' && !isSplitView
                  ? 'bg-orange-500 text-neutral-950 font-black'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="hidden md:inline">3. Cozinha</span>
              {cookingOrdersCount > 0 && (
                <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-neutral-950 font-bold">
                  {cookingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMenuManagerOpen(true)}
              className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 rounded-lg text-xs text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors font-bold shadow-sm cursor-pointer"
              title="Adicionar ou retirar produtos (lanches, bebidas) e alterar preços"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Cardápio & Preços</span>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded-full font-mono">
                {menu.length}
              </span>
            </button>

            <button
              onClick={() => setIsShareLinksOpen(true)}
              className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-lg text-xs text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors font-bold shadow-sm"
              title="Copiar ou enviar links das estações no WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Links do Trailer</span>
            </button>

            <button
              onClick={() => setIsSplitView(!isSplitView)}
              className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                isSplitView
                  ? 'bg-amber-400 text-neutral-950 font-black'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
              title="Ver as 3 telas simultaneamente em um monitor grande"
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>3 Telas Divididas</span>
            </button>

            <button
              onClick={handleSwitchStation}
              className="px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Trocar estação deste aparelho"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Trocar Estação</span>
            </button>
          </div>
        </header>
      )}

      {/* Main View Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden">
        {/* TELA DE ENTRADA: SELEÇÃO DE ESTAÇÃO */}
        {currentStation === 'entrada' && (
          <StationSelectWindow
            onSelectStation={handleSelectStation}
            onOpenSplitView={() => {
              setCurrentStation('caixa');
              setIsSplitView(true);
            }}
            onOpenShareLinks={() => setIsShareLinksOpen(true)}
            onOpenMenuManager={() => setIsMenuManagerOpen(true)}
            menuCount={menu.length}
            pendingAuthorizationsCount={pendingAuthorizationsCount}
            cookingOrdersCount={cookingOrdersCount}
          />
        )}

        {/* 3 TELAS DIVIDIDAS (SPLIT VIEW) */}
        {currentStation !== 'entrada' && isSplitView && (
          <SplitView
            menu={menu}
            orders={orders}
            cashRegister={cashRegister}
            onAddOrder={handleAddOrder}
            onUpdateOrder={handleUpdateOrder}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateCashRegister={handleUpdateCashRegister}
            onUpdateMenu={handleUpdateMenu}
            onOpenMenuManager={() => setIsMenuManagerOpen(true)}
          />
        )}

        {/* ESTAÇÃO 1: ATENDIMENTO (CELULAR) */}
        {currentStation === 'atendimento' && !isSplitView && (
          <OrdersWindow
            menu={menu}
            orders={orders}
            onAddOrder={handleAddOrder}
            onUpdateOrder={handleUpdateOrder}
            rates={cashRegister.rates}
            onSwitchStation={handleSwitchStation}
            onOpenMenuManager={() => setIsMenuManagerOpen(true)}
          />
        )}

        {/* ESTAÇÃO 2: CAIXA (COMPUTADOR CENTRAL) */}
        {currentStation === 'caixa' && !isSplitView && (
          <CashierWindow
            orders={orders}
            cashRegister={cashRegister}
            menu={menu}
            onAddOrder={handleAddOrder}
            onUpdateOrder={handleUpdateOrder}
            onUpdateCashRegister={handleUpdateCashRegister}
            onUpdateMenu={handleUpdateMenu}
            onSwitchStation={handleSwitchStation}
          />
        )}

        {/* ESTAÇÃO 3: COZINHA (TABLET DO CHAPEIRO) */}
        {currentStation === 'cozinha' && !isSplitView && (
          <KitchenWindow
            orders={orders}
            menu={menu}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onSwitchStation={handleSwitchStation}
          />
        )}

        {/* ESTAÇÃO 4: PAINEL TV DE SENHAS (CLIENTES) */}
        {currentStation === 'tv' && !isSplitView && (
          <div className="relative flex-1 flex flex-col h-full bg-neutral-950">
            <div className="absolute top-3 right-3 z-30">
              <button
                onClick={handleSwitchStation}
                className="px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-bold rounded-xl border border-neutral-700 shadow-lg backdrop-blur-sm transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Trocar Estação</span>
              </button>
            </div>
            <CustomerTvWindow orders={orders} />
          </div>
        )}
      </main>

      {/* Share Links Modal */}
      <ShareLinksModal
        isOpen={isShareLinksOpen}
        onClose={() => setIsShareLinksOpen(false)}
      />

      {/* Menu & Prices Manager Modal */}
      <MenuManagerModal
        isOpen={isMenuManagerOpen}
        onClose={() => setIsMenuManagerOpen(false)}
        menu={menu}
        onUpdateMenu={handleUpdateMenu}
      />
    </div>
  );
}
