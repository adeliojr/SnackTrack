import React, { useState, useEffect } from 'react';
import { Order, OrderItem, MenuItem, OrderType, CategoryId } from '../types/trailer';
import { CustomizationModal } from './CustomizationModal';
import { isDrinkItem, isKitchenItem, recalculateTotals } from '../utils/orderHelpers';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Edit2,
  Check,
  Flame,
  Wine,
  Sandwich,
  Scissors,
  Save,
  Search,
  AlertCircle,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react';

interface EditOrderModalProps {
  order: Order | null;
  menu: MenuItem[];
  isOpen: boolean;
  onClose: () => void;
  onSaveOrder: (updatedOrder: Order, andAuthorize?: boolean) => void;
}

export const EditOrderModal: React.FC<EditOrderModalProps> = ({
  order,
  menu,
  isOpen,
  onClose,
  onSaveOrder,
}) => {
  if (!isOpen || !order) return null;

  const [customerName, setCustomerName] = useState(order.customerName);
  const [tableOrComanda, setTableOrComanda] = useState(order.tableOrComanda || '');
  const [orderType, setOrderType] = useState<OrderType>(order.orderType);
  const [items, setItems] = useState<OrderItem[]>([...order.items]);
  const [discount, setDiscount] = useState<number>(order.discount || 0);
  const [deliveryFee, setDeliveryFee] = useState<number>(order.deliveryFee || 0);
  const [notes, setNotes] = useState<string>(order.notes || '');

  // Sub-modal for editing an existing item or adding a new one
  const [customizingItem, setCustomizingItem] = useState<{
    menuItem: MenuItem;
    orderItem?: OrderItem | null;
  } | null>(null);

  // Menu selector for adding new items
  const [showAddMenuSelector, setShowAddMenuSelector] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'todos'>('todos');

  // Synchronize when order prop changes
  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName);
      setTableOrComanda(order.tableOrComanda || '');
      setOrderType(order.orderType);
      setItems([...order.items]);
      setDiscount(order.discount || 0);
      setDeliveryFee(order.deliveryFee || 0);
      setNotes(order.notes || '');
      setShowAddMenuSelector(false);
      setCustomizingItem(null);
    }
  }, [order]);

  // Recalculate totals
  const { subtotal, total } = recalculateTotals(items, discount, deliveryFee, order.serviceFee || 0);

  // Handlers for modifying items list
  const handleIncreaseQty = (index: number) => {
    setItems((prev) =>
      prev.map((it, idx) => {
        if (idx === index) {
          const newQty = it.quantity + 1;
          const unit = it.unitPrice || (it.totalPrice / it.quantity);
          return {
            ...it,
            quantity: newQty,
            totalPrice: unit * newQty,
          };
        }
        return it;
      })
    );
  };

  const handleDecreaseQty = (index: number) => {
    setItems((prev) =>
      prev.map((it, idx) => {
        if (idx === index && it.quantity > 1) {
          const newQty = it.quantity - 1;
          const unit = it.unitPrice || (it.totalPrice / it.quantity);
          return {
            ...it,
            quantity: newQty,
            totalPrice: unit * newQty,
          };
        }
        return it;
      })
    );
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleStartEditItem = (item: OrderItem) => {
    // Find matching menu item to get allowed breads, extras, etc.
    let menuItem = menu.find((m) => m.id === item.menuItemId);
    if (!menuItem) {
      // Fallback synthetic menuItem if not found
      menuItem = {
        id: item.menuItemId,
        name: item.name,
        kitchenName: item.kitchenName,
        category: (item.category as CategoryId) || 'lanches',
        price: item.unitPrice,
        description: '',
        isAvailable: true,
        defaultIngredients: [],
        allowedExtras: [],
      };
    }
    setCustomizingItem({ menuItem, orderItem: item });
  };

  const handleSaveCustomizedItem = (savedItem: OrderItem) => {
    if (customizingItem?.orderItem) {
      // Editing existing item
      setItems((prev) =>
        prev.map((it) => (it.id === customizingItem.orderItem?.id ? savedItem : it))
      );
    } else {
      // Adding new item
      setItems((prev) => [...prev, savedItem]);
    }
    setCustomizingItem(null);
    setShowAddMenuSelector(false);
  };

  const handleSelectMenuProductToAdd = (product: MenuItem) => {
    setCustomizingItem({ menuItem: product, orderItem: null });
  };

  const handleSaveAll = (andAuthorize: boolean = false) => {
    if (items.length === 0) {
      alert('O pedido não pode ficar vazio. Adicione pelo menos 1 item ou cancele.');
      return;
    }

    const updatedOrder: Order = {
      ...order,
      customerName: customerName.trim() || 'Cliente Balcão',
      tableOrComanda: tableOrComanda.trim() || undefined,
      orderType,
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      notes: notes.trim() || undefined,
    };

    onSaveOrder(updatedOrder, andAuthorize);
    onClose();
  };

  // Filter products for the add menu selector
  const filteredMenuProducts = menu.filter((prod) => {
    if (!prod.isAvailable) return false;
    if (selectedCategory !== 'todos' && prod.category !== selectedCategory) return false;
    if (menuSearch.trim()) {
      const q = menuSearch.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.kitchenName.toLowerCase().includes(q) ||
        (prod.carModel && prod.carModel.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const categories: { id: CategoryId | 'todos'; label: string }[] = [
    { id: 'todos', label: 'Todos' },
    { id: 'lanches', label: 'Lanches' },
    { id: 'dogs', label: 'Dogs' },
    { id: 'porcoes', label: 'Porções' },
    { id: 'sucos', label: 'Sucos' },
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'cervejas', label: 'Cervejas' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm select-none">
        <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/95 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-400 text-neutral-950 rounded-xl shadow-md font-black font-mono text-base">
                #{String(order.orderNumber).padStart(3, '0')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg text-white">Editar Pedido no Caixa</h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-amber-300 border border-neutral-700 uppercase">
                    {order.authorizationStatus === 'aguardando_autorizacao'
                      ? 'Pendente Autorização'
                      : 'Autorizado'}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Modifique itens, pão, corte, bebidas ou adicione novos produtos antes de liberar
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Customer & Destination Header */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Mesa / Comanda / Senha
                </label>
                <input
                  type="text"
                  value={tableOrComanda}
                  onChange={(e) => setTableOrComanda(e.target.value)}
                  placeholder="Ex: Mesa 04 ou Balcão"
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Destino do Atendimento
                </label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as OrderType)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="balcao">Balcão / Retirada</option>
                  <option value="mesa">Mesa</option>
                  <option value="viagem">Para Viagem</option>
                  <option value="delivery">Delivery</option>
                </select>
              </div>
            </div>

            {/* Items Section Header */}
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-neutral-200 flex items-center gap-2">
                <span>Itens do Pedido</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-neutral-800 text-amber-300 font-bold">
                  {items.length} {items.length === 1 ? 'item' : 'itens'}
                </span>
              </h4>

              <button
                type="button"
                onClick={() => setShowAddMenuSelector(!showAddMenuSelector)}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Adicionar Produto / Bebida</span>
              </button>
            </div>

            {/* Quick Menu Product Picker Drawer (when adding a product) */}
            {showAddMenuSelector && (
              <div className="bg-neutral-950 border border-amber-500/70 p-3.5 rounded-2xl space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>Selecione um item do cardápio para adicionar:</span>
                  </div>
                  <button
                    onClick={() => setShowAddMenuSelector(false)}
                    className="text-neutral-500 hover:text-white text-xs"
                  >
                    Fechar
                  </button>
                </div>

                {/* Search & Category filter */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      placeholder="Buscar por lanche, carro, bebida..."
                      className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCategory(c.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                          selectedCategory === c.id
                            ? 'bg-amber-400 text-neutral-950'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtered Products List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                  {filteredMenuProducts.map((prod) => (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => handleSelectMenuProductToAdd(prod)}
                      className="p-2.5 bg-neutral-900 hover:bg-neutral-850 hover:border-amber-400 border border-neutral-800 rounded-xl text-left flex flex-col justify-between transition-all group cursor-pointer"
                    >
                      <div className="flex justify-between items-start gap-1">
                        <span className="font-bold text-xs text-white group-hover:text-amber-300 line-clamp-1">
                          {prod.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-1.5 border-t border-neutral-800/60">
                        <span className="text-[10px] uppercase font-bold text-neutral-400">
                          {prod.category}
                        </span>
                        <span className="font-mono font-bold text-xs text-amber-400">
                          R$ {prod.price.toFixed(2)}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Items List */}
            {items.length === 0 ? (
              <div className="text-center py-10 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 text-neutral-500">
                <AlertCircle className="w-10 h-10 mx-auto mb-2 text-neutral-600" />
                <p className="font-bold text-sm text-neutral-300">Nenhum item no pedido</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Use o botão acima para adicionar lanches ou bebidas ao pedido.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {items.map((it, idx) => {
                  const isDrink = isDrinkItem(it, menu);
                  const isKitchen = isKitchenItem(it, menu);

                  return (
                    <div
                      key={it.id || idx}
                      className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-3.5 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Left: Name and Badges */}
                        <div className="flex-1 space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-black text-sm text-white">{it.name}</span>

                            {/* Destination Badge: Kitchen vs Cashier counter */}
                            {isKitchen ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-orange-950/80 text-orange-300 border border-orange-500/50">
                                <Flame className="w-3 h-3 text-orange-400" />
                                Vai p/ Chapa (Cozinha)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-500/50">
                                <Wine className="w-3 h-3 text-sky-400" />
                                Balcão do Caixa (Não vai p/ Chapa)
                              </span>
                            )}
                          </div>

                          {/* Specifications (Pão, Corte, Ponto) */}
                          <div className="flex flex-wrap gap-1.5 text-xs">
                            {it.breadType && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-md">
                                <Sandwich className="w-3 h-3 text-amber-400" />
                                {it.breadType}
                              </span>
                            )}

                            {it.isCutInHalf !== undefined && (
                              <span
                                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                                  it.isCutInHalf
                                    ? 'bg-blue-950/70 text-blue-300 border-blue-600/60'
                                    : 'bg-neutral-900 text-neutral-300 border-neutral-800'
                                }`}
                              >
                                <Scissors className="w-3 h-3" />
                                {it.isCutInHalf ? 'Cortar ao Meio' : 'Inteiro'}
                              </span>
                            )}

                            {it.meatDoneness && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-950/70 text-amber-300 border border-amber-600/60 px-2 py-0.5 rounded-md">
                                <Flame className="w-3 h-3 text-amber-400" />
                                {it.meatDoneness === 'ao_ponto' ? 'Ao Ponto' : 'Bem Passado'}
                              </span>
                            )}

                            {it.drinkOptions && it.drinkOptions.length > 0 && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-sky-950/70 text-sky-300 border border-sky-600/60 px-2 py-0.5 rounded-md">
                                <Wine className="w-3 h-3" />
                                {it.drinkOptions.join(', ')}
                              </span>
                            )}
                          </div>

                          {/* Removals */}
                          {it.removedIngredients && it.removedIngredients.length > 0 && (
                            <div className="text-[11px] font-bold text-red-400">
                              ⛔ SEM: {it.removedIngredients.join(', ').toUpperCase()}
                            </div>
                          )}

                          {/* Extras */}
                          {it.selectedExtras && it.selectedExtras.length > 0 && (
                            <div className="text-[11px] font-bold text-emerald-400">
                              ➕ ADICIONAIS: {it.selectedExtras.map((e) => e.name).join(', ')}
                            </div>
                          )}

                          {/* Notes */}
                          {it.notes && (
                            <div className="text-[11px] text-neutral-400 italic">
                              Obs: "{it.notes}"
                            </div>
                          )}
                        </div>

                        {/* Right: Price & Stepper & Actions */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="font-mono font-black text-sm text-amber-400 tabular-nums">
                            R$ {it.totalPrice.toFixed(2)}
                          </span>

                          <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-0.5">
                            <button
                              type="button"
                              onClick={() => handleDecreaseQty(idx)}
                              disabled={it.quantity <= 1}
                              className="p-1 rounded-lg text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-bold text-xs font-mono text-white">
                              {it.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleIncreaseQty(idx)}
                              className="p-1 rounded-lg text-neutral-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5 pt-1">
                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => handleStartEditItem(it)}
                              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white rounded-lg border border-neutral-800 text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                              title="Editar pão, adicionais, corte e ponto"
                            >
                              <Edit2 className="w-3 h-3 text-amber-400" />
                              <span>Personalizar</span>
                            </button>

                            {/* Trash Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(idx)}
                              className="p-1 text-neutral-500 hover:text-red-400 hover:bg-red-950/60 rounded-lg transition-colors cursor-pointer"
                              title="Remover este item do pedido"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Financial adjustments: Discount & Delivery */}
            <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Desconto no Pedido (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-neutral-500 font-mono font-bold">R$</span>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    value={discount || ''}
                    onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0,00"
                    className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Taxa de Entrega / Acréscimo (R$)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-neutral-500 font-mono font-bold">R$</span>
                  <input
                    type="number"
                    step="0.50"
                    min="0"
                    value={deliveryFee || ''}
                    onChange={(e) => setDeliveryFee(Math.max(0, parseFloat(e.target.value) || 0))}
                    placeholder="0,00"
                    className="w-full pl-9 pr-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white font-mono font-bold focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                  Observações Gerais do Pedido
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Cliente tem pressa, embalar separado, etc."
                  className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Sticky Footer: Financial Summary & Actions */}
          <div className="p-4 border-t border-neutral-800 bg-neutral-900/95 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-baseline gap-3 w-full sm:w-auto justify-between sm:justify-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-400 block">Subtotal</span>
                <span className="font-mono text-sm text-neutral-300">R$ {subtotal.toFixed(2)}</span>
              </div>
              <span className="text-neutral-700">|</span>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 block">Total Final</span>
                <span className="font-mono font-black text-xl text-amber-400 tabular-nums">
                  R$ {total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={() => handleSaveAll(false)}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-700 shadow-sm"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>Salvar Alterações</span>
              </button>

              {order.authorizationStatus === 'aguardando_autorizacao' && (
                <button
                  type="button"
                  onClick={() => handleSaveAll(true)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl text-xs font-black flex items-center gap-1.5 transition-transform active:scale-98 cursor-pointer shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Salvar & Liberar Cozinha</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Modal: Customization of single item */}
      {customizingItem && (
        <CustomizationModal
          item={customizingItem.menuItem}
          initialOrderItem={customizingItem.orderItem}
          confirmButtonText={customizingItem.orderItem ? 'Salvar Alterações do Item' : 'Adicionar ao Pedido'}
          onClose={() => setCustomizingItem(null)}
          onAddToCart={handleSaveCustomizedItem}
        />
      )}
    </>
  );
};
