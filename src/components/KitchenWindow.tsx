import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, MenuItem } from '../types/trailer';
import { isKitchenItem } from '../utils/orderHelpers';
import { playKitchenBell, playCallChime, speakOrder } from '../utils/audio';
import { notifyOrderCalled } from '../utils/storage';
import {
  Flame,
  CheckCircle,
  Clock,
  Volume2,
  VolumeX,
  Bell,
  UtensilsCrossed,
  Check,
  Scissors,
  Sandwich,
} from 'lucide-react';

interface KitchenWindowProps {
  orders: Order[];
  menu?: MenuItem[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onSwitchStation?: () => void;
}

export const KitchenWindow: React.FC<KitchenWindowProps> = ({
  orders,
  menu,
  onUpdateOrderStatus,
  onSwitchStation,
}) => {
  const [filterStatus, setFilterStatus] = useState<'ativos' | 'aguardando' | 'na_chapa' | 'pronto' | 'entregue'>('ativos');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update timer every second for live elapsed clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getElapsedTime = (timestamp: number) => {
    const elapsedSeconds = Math.max(0, Math.floor((currentTime - timestamp) / 1000));
    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getElapsedColor = (timestamp: number) => {
    const elapsedMinutes = (currentTime - timestamp) / 60000;
    if (elapsedMinutes > 20) return 'text-red-400 bg-red-950/90 border-red-500 font-black animate-pulse';
    if (elapsedMinutes > 10) return 'text-amber-400 bg-amber-950/80 border-amber-500/70 font-bold';
    return 'text-emerald-400 bg-emerald-950/80 border-emerald-500/60 font-semibold';
  };

  // Kitchen only receives orders that have been AUTHORIZED by Cashier AND contain kitchen items!
  // Orders with only drinks are served at the counter by the Cashier and do NOT show on the chapa.
  const authorizedOrders = orders.filter(
    (o) => o.authorizationStatus === 'autorizado' && o.items.some((it) => isKitchenItem(it, menu))
  );

  const activeOrders = authorizedOrders.filter((o) => o.status !== 'entregue' && o.status !== 'cancelado');
  const waitingOrders = authorizedOrders.filter((o) => o.status === 'aguardando');
  const cookingOrders = authorizedOrders.filter((o) => o.status === 'na_chapa');
  const readyOrders = authorizedOrders.filter((o) => o.status === 'pronto');
  const deliveredOrders = authorizedOrders.filter((o) => o.status === 'entregue');

  const displayedOrders = (() => {
    if (filterStatus === 'ativos') return activeOrders;
    if (filterStatus === 'aguardando') return waitingOrders;
    if (filterStatus === 'na_chapa') return cookingOrders;
    if (filterStatus === 'pronto') return readyOrders;
    return deliveredOrders;
  })();

  const totalSandwichesOnGrill = cookingOrders.reduce(
    (total, ord) =>
      total +
      ord.items
        .filter((it) => isKitchenItem(it, menu))
        .reduce((sum, item) => sum + item.quantity, 0),
    0
  );

  const handleStartCooking = (order: Order) => {
    onUpdateOrderStatus(order.id, 'na_chapa');
  };

  const handleMarkReady = (order: Order) => {
    onUpdateOrderStatus(order.id, 'pronto');
    if (soundEnabled) {
      playCallChime();
      speakOrder(order.orderNumber, order.customerName);
    }
    notifyOrderCalled(order);
  };

  const handleMarkDelivered = (order: Order) => {
    onUpdateOrderStatus(order.id, 'entregue');
  };

  const handleRepeatCall = (order: Order) => {
    if (soundEnabled) {
      playCallChime();
      speakOrder(order.orderNumber, order.customerName);
    }
    notifyOrderCalled(order);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 text-neutral-100 overflow-hidden select-none">
      {/* Tablet Kitchen Header */}
      <div className="p-3 sm:p-4 border-b border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500 text-neutral-950 rounded-xl shadow-md">
            <Flame className="w-5 h-5 fill-neutral-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-lg text-white">COZINHA & CHAPA</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-amber-300 font-bold border border-neutral-700">
                TABLET CHAPEIRO
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Visualização de preparo: apenas o nome do lanche, pão, corte e ponto
            </p>
          </div>
        </div>

        {/* Chapeiro Stats bar */}
        <div className="flex items-center gap-3 sm:gap-5 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400">Na Chapa Agora:</span>
            <span className="font-mono font-black text-amber-400 text-sm">
              {totalSandwichesOnGrill} lanches
            </span>
          </div>
          <span className="text-neutral-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400">Fila:</span>
            <span className="font-mono font-bold text-white">{waitingOrders.length}</span>
          </div>
          <span className="text-neutral-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-neutral-400">Prontos:</span>
            <span className="font-mono font-bold text-emerald-400">{readyOrders.length}</span>
          </div>
        </div>

        {/* Audio & Station switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
              soundEnabled
                ? 'bg-neutral-800 border-neutral-700 text-amber-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-500'
            }`}
            title="Sons de Alerta e Campainha"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Áudio Ativo' : 'Mudo'}</span>
          </button>

          <button
            onClick={() => playKitchenBell()}
            className="p-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 hover:text-white transition-colors"
            title="Testar Sino de Pedido"
          >
            <Bell className="w-4 h-4" />
          </button>

          {onSwitchStation && (
            <button
              onClick={onSwitchStation}
              className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Trocar Estação
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-3 sm:px-4 py-2 border-b border-neutral-800/80 bg-neutral-900/40 flex items-center justify-between overflow-x-auto shrink-0 gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterStatus('ativos')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              filterStatus === 'ativos'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>Todos Ativos</span>
            <span className="font-mono text-[10px] px-1 rounded bg-black/25 font-bold">{activeOrders.length}</span>
          </button>

          <button
            onClick={() => setFilterStatus('aguardando')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              filterStatus === 'aguardando'
                ? 'bg-neutral-200 text-neutral-950 font-black'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>Fila de Espera</span>
            <span className="font-mono text-[10px] px-1 rounded bg-black/25 font-bold">{waitingOrders.length}</span>
          </button>

          <button
            onClick={() => setFilterStatus('na_chapa')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              filterStatus === 'na_chapa'
                ? 'bg-orange-500 text-neutral-950 font-black'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>Na Chapa 🔥</span>
            <span className="font-mono text-[10px] px-1 rounded bg-black/25 font-bold">{cookingOrders.length}</span>
          </button>

          <button
            onClick={() => setFilterStatus('pronto')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              filterStatus === 'pronto'
                ? 'bg-emerald-500 text-neutral-950 font-black'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>Prontos p/ Retirada</span>
            <span className="font-mono text-[10px] px-1 rounded bg-black/25 font-bold">{readyOrders.length}</span>
          </button>

          <button
            onClick={() => setFilterStatus('entregue')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              filterStatus === 'entregue'
                ? 'bg-neutral-700 text-white font-bold'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            <span>Entregues ({deliveredOrders.length})</span>
          </button>
        </div>
      </div>

      {/* Orders Grid - Chapa Display Optimized */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4">
        {displayedOrders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 text-neutral-500">
            <UtensilsCrossed className="w-16 h-16 stroke-[1.2] mb-3 text-neutral-600" />
            <h4 className="font-extrabold text-base text-neutral-300">Nenhum pedido na chapa nesta etapa</h4>
            <p className="text-xs text-neutral-500 max-w-md mt-1">
              Assim que novos pedidos forem autorizados no Caixa, eles surgirão automaticamente aqui na tela!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayedOrders.map((order) => {
              const elapsed = getElapsedTime(order.authorizedAt || order.createdAt);
              const timerColorClass = getElapsedColor(order.authorizedAt || order.createdAt);

              return (
                <div
                  key={order.id}
                  className={`flex flex-col justify-between bg-neutral-900 border-2 rounded-2xl overflow-hidden shadow-xl transition-all ${
                    order.status === 'na_chapa'
                      ? 'border-orange-500 shadow-orange-950/30 ring-2 ring-orange-500/40'
                      : order.status === 'pronto'
                      ? 'border-emerald-500 shadow-emerald-950/30'
                      : 'border-neutral-800'
                  }`}
                >
                  {/* Comanda Header: Senha, Mesa e Timer */}
                  <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xl text-amber-400">
                          #{String(order.orderNumber).padStart(3, '0')}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-neutral-800 text-neutral-200 border border-neutral-700">
                          {order.tableOrComanda || (order.orderType === 'mesa' ? 'Mesa' : 'Balcão')}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-neutral-300 block truncate max-w-[150px] mt-0.5">
                        {order.customerName}
                      </span>
                    </div>

                    {/* Clock timer */}
                    <div className={`px-2.5 py-1 rounded-xl border font-mono text-xs flex items-center gap-1 ${timerColorClass}`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{elapsed}</span>
                    </div>
                  </div>

                  {/* Production Items List - Showing ONLY KITCHEN ITEMS (NO DRINKS), PURE LANCHE NAME (NO CAR NAME), BREAD & CUT IN HALF */}
                  <div className="p-3.5 space-y-3.5 flex-1 overflow-y-auto max-h-[340px]">
                    {order.items
                      .filter((item) => isKitchenItem(item, menu))
                      .map((item, idx) => (
                      <div key={idx} className="border-b border-neutral-800 pb-3 last:border-0 last:pb-0 space-y-2">
                        {/* 1. LANCHE NAME (PURE NAME WITHOUT CAR, e.g. "2x X-Bacon Egg") */}
                        <div className="flex items-baseline justify-between">
                          <span className="font-black text-base text-white leading-tight">
                            <span className="text-amber-400 font-mono text-lg mr-1.5 font-black">
                              {item.quantity}x
                            </span>
                            {item.kitchenName || item.name}
                          </span>
                        </div>

                        {/* 2. BREAD & CUT SPECIFICATIONS (QUAL PÃO E SE É CORTADO) */}
                        <div className="flex flex-wrap gap-1.5">
                          {/* Bread Type */}
                          {item.breadType && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-md">
                              <Sandwich className="w-3 h-3 text-amber-400" />
                              PÃO: {item.breadType.replace(/\s*\[Padrão\]|\s*\(Padrão\)/gi, '')}
                            </span>
                          )}

                          {/* Cut in half */}
                          {item.isCutInHalf !== undefined && (
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-black uppercase px-2 py-0.5 rounded-md border ${
                                item.isCutInHalf
                                  ? 'bg-blue-950/80 text-blue-300 border-blue-600'
                                  : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                              }`}
                            >
                              <Scissors className="w-3 h-3" />
                              {item.isCutInHalf ? 'CORTAR AO MEIO' : 'INTEIRO (NÃO CORTAR)'}
                            </span>
                          )}

                          {/* Meat Doneness */}
                          {item.meatDoneness && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase bg-amber-950/80 text-amber-300 border border-amber-600 px-2 py-0.5 rounded-md">
                              <Flame className="w-3 h-3 text-amber-400" />
                              PONTO: {item.meatDoneness === 'ao_ponto' ? 'AO PONTO' : 'BEM PASSADO'}
                            </span>
                          )}
                        </div>

                        {/* 3. CRITICAL: Ingredientes a RETIRAR (Em Vermelho de Perigo) */}
                        {item.removedIngredients.length > 0 && (
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-red-400 block">
                              ATENÇÃO CHAPEIRO: NÃO COLOCAR:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {item.removedIngredients.map((rem, rIdx) => (
                                <span
                                  key={rIdx}
                                  className="text-xs font-black tracking-wide text-white bg-red-600 px-2 py-0.5 rounded border border-red-400 shadow-sm"
                                >
                                  ⛔ SEM {rem.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 4. ADICIONAIS TURBINADOS (Em Verde) */}
                        {item.selectedExtras.length > 0 && (
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                              ADICIONAR:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {item.selectedExtras.map((ext, eIdx) => (
                                <span
                                  key={eIdx}
                                  className="text-xs font-bold text-emerald-200 bg-emerald-950/90 border border-emerald-500 px-2 py-0.5 rounded"
                                >
                                  ➕ {ext.name.toUpperCase()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Drink / Juice options */}
                        {item.drinkOptions && item.drinkOptions.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.drinkOptions.map((opt, oIdx) => (
                              <span
                                key={oIdx}
                                className="text-[11px] font-bold text-sky-200 bg-sky-950/90 border border-sky-600/70 px-2 py-0.5 rounded"
                              >
                                🥤 {opt}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* 5. Specific Chapeiro Notes */}
                        {item.notes && (
                          <div className="text-xs font-semibold italic text-amber-200 bg-neutral-950 p-2 rounded-lg border border-neutral-800">
                            Obs: "{item.notes}"
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Order Global Notes */}
                    {order.notes && (
                      <div className="text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-800/80 p-2 rounded-xl">
                        Nota geral: {order.notes}
                      </div>
                    )}
                  </div>

                  {/* Chapeiro Status Action Button */}
                  <div className="p-3 bg-neutral-950 border-t border-neutral-800">
                    {order.status === 'aguardando' && (
                      <button
                        onClick={() => handleStartCooking(order)}
                        className="w-full py-3 px-3 bg-orange-500 hover:bg-orange-400 text-neutral-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-transform shadow-lg active:scale-98"
                      >
                        <Flame className="w-5 h-5 fill-neutral-950" />
                        <span>COLOCAR NA CHAPA 🔥</span>
                      </button>
                    )}

                    {order.status === 'na_chapa' && (
                      <button
                        onClick={() => handleMarkReady(order)}
                        className="w-full py-3 px-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-transform shadow-lg active:scale-98"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>MARCAR PRONTO / CHAMAR ✅</span>
                      </button>
                    )}

                    {order.status === 'pronto' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleRepeatCall(order)}
                          className="flex-1 py-2 px-2 bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
                          title="Tocar sino e avisar novamente"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>Rechamar</span>
                        </button>
                        <button
                          onClick={() => handleMarkDelivered(order)}
                          className="flex-1 py-2.5 px-3 bg-neutral-200 hover:bg-white text-neutral-950 font-black text-xs rounded-xl flex items-center justify-center gap-1 transition-transform active:scale-98"
                        >
                          <Check className="w-4 h-4" />
                          <span>Entregue</span>
                        </button>
                      </div>
                    )}

                    {order.status === 'entregue' && (
                      <div className="text-center text-xs text-neutral-500 font-bold py-1">
                        Pedido Entregue ✓
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
