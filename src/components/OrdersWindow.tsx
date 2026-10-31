import React, { useState } from 'react';
import { MenuItem, Order, OrderItem, OrderType, CategoryId } from '../types/trailer';
import { CustomizationModal } from './CustomizationModal';
import { ReceiptModal } from './ReceiptModal';
import { playCashierBeep, playKitchenBell } from '../utils/audio';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  Send,
  Printer,
  SlidersHorizontal,
  ShoppingBag,
  CheckCircle2,
  Smartphone,
  UtensilsCrossed,
  X,
  ArrowRight,
  Flame,
  Scissors,
  Sandwich,
  CupSoda,
  Wine,
  User,
  MapPin,
  Check,
} from 'lucide-react';

interface OrdersWindowProps {
  menu: MenuItem[];
  orders: Order[];
  onAddOrder: (newOrder: Order) => void;
  onUpdateOrder: (updatedOrder: Order) => void;
  rates: { debitoRate: number; creditoRate: number; pixRate: number };
  onSwitchStation?: () => void;
  onOpenMenuManager?: () => void;
}

export const OrdersWindow: React.FC<OrdersWindowProps> = ({
  menu,
  orders,
  onAddOrder,
  onUpdateOrder,
  rates,
  onSwitchStation,
  onOpenMenuManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

  // Customer & Comanda Details
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('mesa');
  const [tableOrComanda, setTableOrComanda] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Modals & Notifications
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [sentSuccessOrder, setSentSuccessOrder] = useState<Order | null>(null);

  const categories: { id: CategoryId | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Cardápio Completo' },
    { id: 'lanches', label: '🍔 Lanches (Carros)' },
    { id: 'dogs', label: '🌭 Dogs Prensados' },
    { id: 'porcoes', label: '🍟 Porções (Motos)' },
    { id: 'sucos', label: '🍊 Sucos Naturais' },
    { id: 'bebidas', label: '🥤 Refrigerantes' },
    { id: 'cervejas', label: '🍺 Cervejas' },
  ];

  // Filtered menu
  const filteredMenu = menu.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      (item.kitchenName && item.kitchenName.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.carModel && item.carModel.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  // Clicking ANY item opens its dedicated options modal (lanches, dogs, sucos, refrigerantes, porções, etc.)
  const handleItemClick = (item: MenuItem) => {
    setCustomizingItem(item);
  };

  const handleAddToCartFromModal = (orderItem: OrderItem) => {
    setCartItems((prev) => [...prev, orderItem]);
    playCashierBeep();
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: newQty * item.unitPrice,
            };
          }
          return item;
        })
        .filter(Boolean) as OrderItem[]
    );
  };

  const clearForm = () => {
    setCartItems([]);
    setCustomerName('');
    setCustomerPhone('');
    setTableOrComanda('');
    setOrderNotes('');
    setIsMobileCartOpen(false);
  };

  const nextOrderNumber = orders.length > 0 ? Math.max(...orders.map((o) => o.orderNumber)) + 1 : 101;

  // Send to Cashier for authorization
  const handleSendOrder = () => {
    if (cartItems.length === 0) return;

    const trimmedName = customerName.trim() || `Cliente #${nextOrderNumber}`;
    const orderLocal =
      tableOrComanda.trim() ||
      (orderType === 'mesa' ? 'Mesa' : orderType === 'balcao' ? 'Balcão' : orderType === 'viagem' ? 'Viagem' : 'Delivery');

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: nextOrderNumber,
      customerName: trimmedName,
      customerPhone: customerPhone.trim() || undefined,
      orderType,
      tableOrComanda: orderLocal,
      items: cartItems,
      subtotal,
      discount: 0,
      serviceFee: 0,
      deliveryFee: 0,
      total: subtotal,
      payments: [],
      paymentStatus: 'pendente',
      status: 'aguardando',
      authorizationStatus: 'aguardando_autorizacao', // Exige autorização no Caixa!
      createdAt: Date.now(),
      notes: orderNotes.trim() || undefined,
      attendantName: 'Garçom / Atendimento (Celular)',
    };

    onAddOrder(newOrder);
    playKitchenBell();
    setSentSuccessOrder(newOrder);
    clearForm();

    setTimeout(() => {
      setSentSuccessOrder(null);
    }, 5000);
  };

  // Render Cart Content
  const renderCartContent = (isMobileSheet = false) => (
    <div className="flex flex-col h-full bg-neutral-900 overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900 shrink-0">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm text-white">Comanda do Pedido</h3>
          <span className="text-xs bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-mono font-bold">
            #{nextOrderNumber}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {cartItems.length > 0 && (
            <button
              onClick={clearForm}
              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-neutral-800"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Limpar
            </button>
          )}
          {isMobileSheet && (
            <button
              onClick={() => setIsMobileCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Order Details: Tipo e Mesa */}
      <div className="p-3 border-b border-neutral-800 bg-neutral-950/60 space-y-2 shrink-0">
        <div className="grid grid-cols-4 gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
          <button
            type="button"
            onClick={() => setOrderType('mesa')}
            className={`py-1 text-xs font-bold rounded-md transition-colors ${
              orderType === 'mesa' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Mesa
          </button>
          <button
            type="button"
            onClick={() => setOrderType('balcao')}
            className={`py-1 text-xs font-bold rounded-md transition-colors ${
              orderType === 'balcao' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Balcão
          </button>
          <button
            type="button"
            onClick={() => setOrderType('viagem')}
            className={`py-1 text-xs font-bold rounded-md transition-colors ${
              orderType === 'viagem' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Viagem
          </button>
          <button
            type="button"
            onClick={() => setOrderType('delivery')}
            className={`py-1 text-xs font-bold rounded-md transition-colors ${
              orderType === 'delivery' ? 'bg-amber-400 text-neutral-950 shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Delivery
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nome do Cliente *"
            className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-semibold"
          />
          <input
            type="text"
            value={tableOrComanda}
            onChange={(e) => setTableOrComanda(e.target.value)}
            placeholder={orderType === 'mesa' ? 'Nº Mesa (Mesa 02)' : 'Nº Comanda / Pager'}
            className="w-full px-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-semibold"
          />
        </div>
      </div>

      {/* Cart items list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {cartItems.length === 0 ? (
          <div className="h-full min-h-[180px] flex flex-col items-center justify-center text-center p-6 text-neutral-500">
            <UtensilsCrossed className="w-12 h-12 stroke-[1.2] mb-2 text-neutral-600" />
            <p className="font-bold text-xs text-neutral-300">Nenhum item selecionado</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Toque em qualquer lanche, refrigerante ou suco para ver as opções
            </p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-1">
                  <h5 className="font-black text-xs text-white leading-tight">{item.name}</h5>
                  <div className="text-xs text-amber-400 font-mono font-bold">
                    R$ {item.totalPrice.toFixed(2)}
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 shrink-0">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-mono font-bold text-xs w-4 text-center text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Bread & Cut preview */}
              <div className="flex flex-wrap gap-1 text-[10px]">
                {item.breadType && (
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-bold">
                    🥪 {item.breadType.replace(/\s*\(Padrão\)/gi, '')}
                  </span>
                )}
                {item.isCutInHalf !== undefined && (
                  <span
                    className={`px-1.5 py-0.5 rounded font-bold border ${
                      item.isCutInHalf
                        ? 'bg-blue-950 text-blue-300 border-blue-600'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    {item.isCutInHalf ? '✂️ Cortar ao meio' : 'Inteiro'}
                  </span>
                )}
                {item.meatDoneness && (
                  <span className="bg-amber-950 text-amber-300 border border-amber-700 px-1.5 py-0.5 rounded font-bold">
                    🔥 {item.meatDoneness === 'ao_ponto' ? 'Ao ponto' : 'Bem passado'}
                  </span>
                )}
              </div>

              {/* Drink options */}
              {item.drinkOptions && item.drinkOptions.length > 0 && (
                <div className="flex flex-wrap gap-1 text-[10px]">
                  {item.drinkOptions.map((opt, oIdx) => (
                    <span
                      key={oIdx}
                      className="bg-sky-950/80 text-sky-200 border border-sky-600/60 px-1.5 py-0.5 rounded font-bold"
                    >
                      🥤 {opt}
                    </span>
                  ))}
                </div>
              )}

              {/* Removals */}
              {item.removedIngredients.length > 0 && (
                <div className="text-[10px] text-red-400 font-bold">
                  SEM: {item.removedIngredients.join(', ')}
                </div>
              )}

              {/* Extras */}
              {item.selectedExtras.length > 0 && (
                <div className="text-[10px] text-emerald-400 font-bold">
                  +{item.selectedExtras.map((e) => e.name).join(', ')}
                </div>
              )}

              {item.notes && (
                <p className="text-[10px] italic text-neutral-400">Obs: "{item.notes}"</p>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer with Subtotal and Send for Authorization Button */}
      <div className="p-3.5 border-t border-neutral-800 bg-neutral-950 space-y-2.5 shrink-0">
        <div className="flex justify-between items-baseline">
          <span className="font-bold text-xs text-neutral-400 uppercase">SUBTOTAL:</span>
          <span className="font-mono font-black text-xl text-amber-400 tabular-nums">
            R$ {subtotal.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={() => {
            handleSendOrder();
            if (isMobileSheet) setIsMobileCartOpen(false);
          }}
          className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-neutral-950 font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Enviar Pedido para Autorização no Caixa</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden bg-neutral-950 text-neutral-100 relative">
      {/* LEFT COLUMN: Menu Products */}
      <div className="flex-1 flex flex-col h-full border-r border-neutral-800 overflow-hidden min-w-0">
        {/* Top Header */}
        <div className="p-3 sm:p-4 border-b border-neutral-800 bg-neutral-900/95 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-neutral-950 rounded-xl shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-black text-base text-white">GARAGEM 77 · ATENDIMENTO</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-800 text-amber-400 font-bold border border-neutral-700">
                  {menu.length} PRODUTOS
                </span>
                {onOpenMenuManager && (
                  <button
                    type="button"
                    onClick={onOpenMenuManager}
                    className="text-[11px] font-bold px-2 py-0.5 bg-amber-400/10 hover:bg-amber-400/25 text-amber-300 border border-amber-500/30 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                    title="Adicionar ou retirar produtos (lanches, bebidas) e alterar preços"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                    <span>Cardápio & Preços</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] text-neutral-400">Cardápio Oficial com Nomes de Carros e Opções</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-xs text-neutral-400 font-semibold px-2.5 py-1 bg-neutral-950 rounded-lg border border-neutral-800">
              Próxima: <span className="font-mono text-amber-400 font-bold">#{nextOrderNumber}</span>
            </div>

            {/* Mobile / Narrow view Cart Button */}
            <button
              onClick={() => setIsMobileCartOpen(true)}
              className="lg:hidden relative px-3 py-1 bg-amber-400 text-neutral-950 font-black rounded-lg text-xs flex items-center gap-1.5 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Comanda ({cartItems.length})</span>
            </button>

            {onSwitchStation && (
              <button
                onClick={onSwitchStation}
                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs text-neutral-300 transition-colors"
              >
                Trocar Estação
              </button>
            )}
          </div>
        </div>

        {/* IDENTIFICAÇÃO DO ATENDIMENTO (MESA E NOME DO CLIENTE ANTES DE MARCAR OS LANCHES) */}
        <div className="p-3 sm:p-3.5 bg-neutral-900 border-b border-neutral-800 shrink-0 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>1. Identifique o Atendimento (Mesa & Cliente):</span>
            </div>

            {/* Status preview */}
            {customerName || tableOrComanda ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>
                  {customerName ? customerName : 'Cliente s/ nome'} · {tableOrComanda ? tableOrComanda : 'Mesa não def.'}
                </span>
              </span>
            ) : (
              <span className="text-[10px] text-amber-300/80 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60">
                ⚠️ Defina a mesa ou cliente abaixo:
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            {/* Tipo de Atendimento */}
            <div className="sm:col-span-4 grid grid-cols-4 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setOrderType('mesa')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  orderType === 'mesa'
                    ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Mesa
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderType('balcao');
                  if (!tableOrComanda) setTableOrComanda('Balcão');
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  orderType === 'balcao'
                    ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Balcão
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderType('viagem');
                  if (!tableOrComanda) setTableOrComanda('Viagem');
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  orderType === 'viagem'
                    ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Viagem
              </button>
              <button
                type="button"
                onClick={() => {
                  setOrderType('delivery');
                  if (!tableOrComanda) setTableOrComanda('Delivery');
                }}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Entrega
              </button>
            </div>

            {/* Nome do Cliente */}
            <div className="sm:col-span-4 relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nome do Cliente (ex: Carlos) *"
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-xs font-bold text-white placeholder:text-neutral-500 focus:outline-none"
              />
            </div>

            {/* Mesa / Comanda */}
            <div className="sm:col-span-4 relative">
              <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tableOrComanda}
                onChange={(e) => setTableOrComanda(e.target.value)}
                placeholder={orderType === 'mesa' ? 'Nº Mesa (ex: Mesa 04) *' : 'Comanda / Pager (ex: 12)'}
                className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 focus:border-amber-400 rounded-xl text-xs font-bold text-white placeholder:text-neutral-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Table Selection Shortcuts */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 pt-0.5 scrollbar-thin">
            <span className="text-[10px] font-bold text-neutral-500 uppercase shrink-0 mr-0.5">
              Atalhos de Mesa:
            </span>
            {['Mesa 01', 'Mesa 02', 'Mesa 03', 'Mesa 04', 'Mesa 05', 'Mesa 06', 'Mesa 07', 'Mesa 08', 'Balcão', 'Viagem'].map(
              (shortcut) => {
                const isSelected = tableOrComanda.toLowerCase() === shortcut.toLowerCase();
                return (
                  <button
                    key={shortcut}
                    type="button"
                    onClick={() => {
                      setTableOrComanda(shortcut);
                      if (shortcut.startsWith('Mesa')) {
                        setOrderType('mesa');
                      } else if (shortcut === 'Balcão') {
                        setOrderType('balcao');
                      } else if (shortcut === 'Viagem') {
                        setOrderType('viagem');
                      }
                    }}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-neutral-950 shadow-sm font-black ring-1 ring-amber-300'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    {shortcut}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Search */}
        <div className="px-3 sm:px-4 py-2 border-b border-neutral-800 bg-neutral-900/40 shrink-0">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar lanche pelo nome, carro, suco, refrigerante (Opala, Golf, Coca, Suco, Batata...)"
              className="w-full pl-9 pr-8 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="px-3 sm:px-4 py-2 border-b border-neutral-800/80 bg-neutral-900/30 overflow-x-auto flex gap-1.5 scrollbar-thin shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-neutral-950 shadow-sm font-black'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Success Alert Banner when Order sent to Cashier */}
        {sentSuccessOrder && (
          <div className="p-3 bg-emerald-950 border-b border-emerald-600 text-emerald-200 text-xs font-bold flex items-center justify-between shrink-0 animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                Pedido #{sentSuccessOrder.orderNumber} enviado com sucesso! Aguardando autorização no Caixa para entrar na chapa.
              </span>
            </div>
            <button
              onClick={() => setReceiptOrder(sentSuccessOrder)}
              className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 rounded text-white flex items-center gap-1 text-[11px] shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              Ver Comanda
            </button>
          </div>
        )}

        {/* Menu Cards Grid */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 pb-24 lg:pb-4">
          {filteredMenu.length === 0 ? (
            <div className="col-span-full py-16 text-center text-neutral-500">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="font-bold text-sm text-neutral-400">Nenhum item encontrado</p>
              <p className="text-xs text-neutral-600 mt-1">Tente buscar por outro nome ou selecione outra categoria.</p>
            </div>
          ) : (
            filteredMenu.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`group relative bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3.5 flex flex-col justify-between hover:border-amber-400 hover:bg-neutral-900 transition-all cursor-pointer select-none active:scale-[0.99] ${
                  !item.isAvailable ? 'opacity-50 grayscale pointer-events-none' : ''
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <div>
                      <h4 className="font-black text-sm text-white group-hover:text-amber-300 transition-colors leading-snug">
                        {item.name}
                      </h4>
                      {item.carModel && (
                        <span className="text-[10px] text-amber-400 font-bold uppercase mt-0.5 block">
                          🏎️ {item.carModel}
                        </span>
                      )}
                    </div>
                    <span
                      className="shrink-0 p-1.5 bg-neutral-800 text-neutral-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 rounded-lg transition-colors"
                      title="Clique para abrir opções"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {item.description ? (
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                      {item.description}
                    </p>
                  ) : (
                    <p className="text-[11px] text-neutral-500 italic mb-3">Toque para ver opções</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                  <span className="font-mono font-black text-base text-amber-400 tabular-nums">
                    R$ {item.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded-xl group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Opções
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FLOATING CART BAR (Always visible when there are items, on mobile/tablet or narrow view) */}
        {cartItems.length > 0 && (
          <div className="lg:hidden absolute bottom-3 left-3 right-3 z-30 animate-slideUp">
            <button
              onClick={() => setIsMobileCartOpen(true)}
              className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-amber-300 transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-neutral-950 text-amber-400 flex items-center justify-center font-bold text-xs">
                  {cartItems.length}
                </div>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider font-extrabold text-neutral-900">
                    Comanda em Andamento
                  </div>
                  <div className="text-sm font-mono font-black text-neutral-950">
                    Total: R$ {subtotal.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs bg-neutral-950 text-amber-300 px-3 py-2 rounded-xl">
                <span>Ver & Enviar</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Desktop Comanda Panel */}
      <div className="hidden lg:flex w-[420px] h-full flex-col bg-neutral-900 border-l border-neutral-800 shrink-0 overflow-hidden">
        {renderCartContent(false)}
      </div>

      {/* MOBILE SHEET MODAL: Comanda on mobile/tablet */}
      {isMobileCartOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-sm">
          <div className="w-full max-h-[88vh] bg-neutral-900 border-t border-neutral-800 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
            {renderCartContent(true)}
          </div>
        </div>
      )}

      {/* Modals */}
      <CustomizationModal
        item={customizingItem}
        orderTargetText={
          customerName || tableOrComanda
            ? `${customerName ? customerName : 'Cliente'} (${tableOrComanda ? tableOrComanda : 'Mesa/Balcão'})`
            : undefined
        }
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCartFromModal}
      />

      <ReceiptModal order={receiptOrder} onClose={() => setReceiptOrder(null)} />
    </div>
  );
};
