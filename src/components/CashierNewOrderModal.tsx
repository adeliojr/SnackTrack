import React, { useState } from 'react';
import { MenuItem, Order, OrderItem, OrderType, CategoryId } from '../types/trailer';
import { CustomizationModal } from './CustomizationModal';
import { playCashierBeep, playKitchenBell } from '../utils/audio';
import {
  X,
  Search,
  Plus,
  Minus,
  Trash2,
  SlidersHorizontal,
  ShoppingBag,
  CreditCard,
  Send,
  UtensilsCrossed,
  User,
  MapPin,
  Check,
} from 'lucide-react';

interface CashierNewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuItem[];
  orders: Order[];
  onAddOrder: (newOrder: Order, andPayImmediately?: boolean) => void;
}

export const CashierNewOrderModal: React.FC<CashierNewOrderModalProps> = ({
  isOpen,
  onClose,
  menu,
  orders,
  onAddOrder,
}) => {
  if (!isOpen) return null;

  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState<OrderType>('balcao');
  const [tableOrComanda, setTableOrComanda] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  const categories: { id: CategoryId | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Cardápio Completo' },
    { id: 'lanches', label: '🍔 Lanches (Carros)' },
    { id: 'dogs', label: '🌭 Dogs Prensados' },
    { id: 'porcoes', label: '🍟 Porções (Motos)' },
    { id: 'sucos', label: '🍊 Sucos Naturais' },
    { id: 'bebidas', label: '🥤 Refrigerantes' },
    { id: 'cervejas', label: '🍺 Cervejas' },
  ];

  const filteredMenu = menu.filter((item) => {
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    return (
      item.name.toLowerCase().includes(query) ||
      (item.kitchenName && item.kitchenName.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.carModel && item.carModel.toLowerCase().includes(query))
    );
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleAddToCart = (orderItem: OrderItem) => {
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

  const nextOrderNumber = orders.length > 0 ? Math.max(...orders.map((o) => o.orderNumber)) + 1 : 101;

  const buildOrder = (): Order => {
    const trimmedName = customerName.trim() || `Cliente Balcão #${nextOrderNumber}`;
    const orderLocal =
      tableOrComanda.trim() ||
      (orderType === 'mesa' ? 'Mesa' : orderType === 'balcao' ? 'Balcão' : orderType === 'viagem' ? 'Viagem' : 'Delivery');

    return {
      id: `ord-${Date.now()}`,
      orderNumber: nextOrderNumber,
      customerName: trimmedName,
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
      authorizationStatus: 'autorizado', // Lançado diretamente no Caixa -> já nasce autorizado!
      authorizedAt: Date.now(),
      createdAt: Date.now(),
      notes: orderNotes.trim() || undefined,
      attendantName: 'Caixa / Balcão',
    };
  };

  const handleSaveOnly = () => {
    if (cartItems.length === 0) return;
    const order = buildOrder();
    onAddOrder(order, false);
    playKitchenBell();
    onClose();
  };

  const handlePayNow = () => {
    if (cartItems.length === 0) return;
    const order = buildOrder();
    onAddOrder(order, true);
    playCashierBeep();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-neutral-800 bg-neutral-900/95 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-neutral-950 rounded-xl font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">LANÇAR PEDIDO NO CAIXA (BALCÃO)</h3>
              <p className="text-[11px] text-neutral-400">
                Lançamento rápido com cardápio oficial, opções de pão, bebidas e pagamento imediato
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* IDENTIFICAÇÃO DO CLIENTE & MESA NO CAIXA (ANTES DE MARCAR OS LANCHES) */}
        <div className="p-3 sm:p-3.5 bg-neutral-950 border-b border-neutral-800 shrink-0 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-amber-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Identificação do Pedido (Cliente & Mesa):</span>
            </div>

            {customerName || tableOrComanda ? (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" />
                <span>
                  {customerName ? customerName : 'Cliente Balcão'} · {tableOrComanda ? tableOrComanda : 'Balcão'}
                </span>
              </span>
            ) : (
              <span className="text-[10px] text-amber-300/80 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/60">
                ⚠️ Preencha o cliente e a mesa/balcão antes de marcar os lanches:
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            {/* Tipo de Atendimento */}
            <div className="sm:col-span-4 grid grid-cols-4 gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              {(['balcao', 'mesa', 'viagem', 'delivery'] as OrderType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setOrderType(t);
                    if (t === 'balcao' && !tableOrComanda) setTableOrComanda('Balcão');
                    if (t === 'viagem' && !tableOrComanda) setTableOrComanda('Viagem');
                  }}
                  className={`py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                    orderType === t
                      ? 'bg-amber-400 text-neutral-950 font-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Nome do Cliente */}
            <div className="sm:col-span-4 relative">
              <User className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nome do Cliente (ex: Carlos) *"
                className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl text-xs font-bold text-white placeholder:text-neutral-500 focus:outline-none"
              />
            </div>

            {/* Mesa / Comanda */}
            <div className="sm:col-span-4 relative">
              <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tableOrComanda}
                onChange={(e) => setTableOrComanda(e.target.value)}
                placeholder={orderType === 'mesa' ? 'Mesa (ex: Mesa 02) *' : 'Balcão / Comanda (ex: 05)'}
                className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 focus:border-amber-400 rounded-xl text-xs font-bold text-white placeholder:text-neutral-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Atalhos Rápidos */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-thin">
            <span className="text-[10px] font-bold text-neutral-500 uppercase shrink-0 mr-0.5">
              Atalhos:
            </span>
            {['Balcão', 'Mesa 01', 'Mesa 02', 'Mesa 03', 'Mesa 04', 'Mesa 05', 'Mesa 06', 'Viagem'].map((shortcut) => {
              const isSelected = tableOrComanda.toLowerCase() === shortcut.toLowerCase();
              return (
                <button
                  key={shortcut}
                  type="button"
                  onClick={() => {
                    setTableOrComanda(shortcut);
                    if (shortcut.startsWith('Mesa')) setOrderType('mesa');
                    else if (shortcut === 'Balcão') setOrderType('balcao');
                    else if (shortcut === 'Viagem') setOrderType('viagem');
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-neutral-950 font-black shadow-sm'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {shortcut}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content: Left Menu + Right Comanda */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Menu Column */}
          <div className="flex-1 flex flex-col h-full border-r border-neutral-800 overflow-hidden">
            {/* Search & Categories */}
            <div className="p-3 border-b border-neutral-800 bg-neutral-950/60 space-y-2 shrink-0">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar pelo nome, carro, suco, refrigerante..."
                  className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-amber-400 text-neutral-950 font-black'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1 overflow-y-auto p-3 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setCustomizingItem(item)}
                  className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 flex flex-col justify-between hover:border-amber-400 hover:bg-neutral-900 transition-all cursor-pointer select-none group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1 mb-1">
                      <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors leading-tight">
                        {item.name}
                      </h4>
                      <SlidersHorizontal className="w-3 h-3 text-neutral-500 group-hover:text-amber-400 shrink-0" />
                    </div>
                    {item.carModel && (
                      <span className="text-[10px] text-amber-400 font-bold uppercase block mb-1">
                        🏎️ {item.carModel}
                      </span>
                    )}
                    {item.description && (
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed mb-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1.5 border-t border-neutral-800/60">
                    <span className="font-mono font-black text-xs text-amber-400">
                      R$ {item.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] font-bold text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors">
                      + Opções
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Comanda */}
          <div className="w-full lg:w-[380px] flex flex-col h-full bg-neutral-900 border-t lg:border-t-0 shrink-0 overflow-hidden">
            <div className="p-3 border-b border-neutral-800 bg-neutral-950/60 space-y-2 shrink-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  Comanda #{nextOrderNumber}
                </span>
                {cartItems.length > 0 && (
                  <button
                    onClick={() => setCartItems([])}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Limpar
                  </button>
                )}
              </div>

              {/* Order Type */}
              <div className="grid grid-cols-4 gap-1 bg-neutral-900 p-1 rounded-lg border border-neutral-800">
                {(['balcao', 'mesa', 'viagem', 'delivery'] as OrderType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setOrderType(t)}
                    className={`py-1 text-[11px] font-bold rounded capitalize ${
                      orderType === t ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nome do Cliente"
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-semibold"
                />
                <input
                  type="text"
                  value={tableOrComanda}
                  onChange={(e) => setTableOrComanda(e.target.value)}
                  placeholder={orderType === 'mesa' ? 'Mesa 01' : 'Balcão #01'}
                  className="w-full px-2 py-1 bg-neutral-950 border border-neutral-800 rounded text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-semibold"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-500">
                  <UtensilsCrossed className="w-10 h-10 mb-2 opacity-30" />
                  <p className="text-xs font-bold text-neutral-400">Nenhum item na comanda</p>
                  <p className="text-[11px] text-neutral-600">Clique nos itens à esquerda para adicionar</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 space-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-1">
                        <span className="font-bold text-xs text-white block">{item.name}</span>
                        <span className="font-mono text-xs text-amber-400 font-bold">
                          R$ {item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-neutral-800 text-neutral-400 rounded"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="font-mono text-xs font-bold px-1 text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-neutral-800 text-neutral-400 rounded"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {item.breadType && (
                        <span className="bg-amber-500/10 text-amber-300 px-1 py-0.5 rounded font-bold">
                          🥪 {item.breadType.replace(/\s*\(Padrão\)/gi, '')}
                        </span>
                      )}
                      {item.isCutInHalf !== undefined && (
                        <span className="bg-blue-950 text-blue-300 px-1 py-0.5 rounded font-bold">
                          {item.isCutInHalf ? '✂️ Cortar ao meio' : 'Inteiro'}
                        </span>
                      )}
                      {item.drinkOptions &&
                        item.drinkOptions.map((opt, i) => (
                          <span key={i} className="bg-sky-950 text-sky-200 px-1 py-0.5 rounded font-bold">
                            🥤 {opt}
                          </span>
                        ))}
                    </div>

                    {item.removedIngredients.length > 0 && (
                      <div className="text-[10px] text-red-400 font-bold">
                        SEM: {item.removedIngredients.join(', ')}
                      </div>
                    )}
                    {item.selectedExtras.length > 0 && (
                      <div className="text-[10px] text-emerald-400 font-bold">
                        +{item.selectedExtras.map((e) => e.name).join(', ')}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Subtotal & Action Buttons */}
            <div className="p-3 border-t border-neutral-800 bg-neutral-950 space-y-2 shrink-0">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-neutral-400 uppercase">SUBTOTAL:</span>
                <span className="font-mono font-black text-lg text-amber-400">
                  R$ {subtotal.toFixed(2)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={handleSaveOnly}
                  className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-neutral-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-neutral-700"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enviar p/ Chapa</span>
                </button>

                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={handlePayNow}
                  className="py-2.5 px-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-neutral-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-lg"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Cobrar Agora</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomizationModal
        item={customizingItem}
        orderTargetText={
          customerName || tableOrComanda
            ? `${customerName ? customerName : 'Cliente'} (${tableOrComanda ? tableOrComanda : 'Balcão'})`
            : undefined
        }
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};
