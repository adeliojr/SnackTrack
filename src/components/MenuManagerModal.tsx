import React, { useState } from 'react';
import { MenuItem, CategoryId, ExtraOption } from '../types/trailer';
import { COMMON_EXTRAS, INITIAL_MENU } from '../data/initialMenu';
import {
  X,
  Plus,
  Trash2,
  Edit2,
  Check,
  Search,
  DollarSign,
  UtensilsCrossed,
  Flame,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Sandwich,
  CupSoda,
  Wine,
  SlidersHorizontal,
  ChevronDown,
  Eye,
  EyeOff,
  Tag,
} from 'lucide-react';

interface MenuManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  menu: MenuItem[];
  onUpdateMenu: (updatedMenu: MenuItem[]) => void;
}

export const MenuManagerModal: React.FC<MenuManagerModalProps> = ({
  isOpen,
  onClose,
  menu,
  onUpdateMenu,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'todos'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<MenuItem | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Quick Inline Price Editing State { [itemId]: priceString }
  const [inlinePrices, setInlinePrices] = useState<Record<string, string>>({});
  const [savedInlineId, setSavedInlineId] = useState<string | null>(null);

  // Form State for Adding / Editing a product
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [formKitchenName, setFormKitchenName] = useState('');
  const [formCarModel, setFormCarModel] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryId>('lanches');
  const [formPrice, setFormPrice] = useState<string>('30.00');
  const [formCostPrice, setFormCostPrice] = useState<string>('12.00');
  const [formDescription, setFormDescription] = useState('');
  const [formIngredients, setFormIngredients] = useState('');
  const [formAllowedBreads, setFormAllowedBreads] = useState<string[]>([]);
  const [formIsAvailable, setFormIsAvailable] = useState<boolean>(true);

  if (!isOpen) return null;

  const showToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => {
      setSuccessToast(null);
    }, 3000);
  };

  const categories: { id: CategoryId | 'todos'; label: string; icon: string }[] = [
    { id: 'todos', label: 'Todos os Produtos', icon: '📋' },
    { id: 'lanches', label: 'Lanches (Carros)', icon: '🍔' },
    { id: 'dogs', label: 'Dogs Prensados', icon: '🌭' },
    { id: 'porcoes', label: 'Porções & Batatas', icon: '🍟' },
    { id: 'sucos', label: 'Sucos Naturais', icon: '🍊' },
    { id: 'bebidas', label: 'Refrigerantes & Águas', icon: '🥤' },
    { id: 'cervejas', label: 'Cervejas', icon: '🍺' },
  ];

  const standardBreads = [
    'Pão de Hambúrguer (Bola)',
    'Pão Francês',
    'Pão Brioche',
    'Pão de Hot Dog',
    'Pão Mônaco',
  ];

  // Open Edit Form
  const handleStartEdit = (item: MenuItem) => {
    setEditingItem(item);
    setIsCreatingNew(false);
    setFormId(item.id);
    setFormName(item.name);
    setFormKitchenName(item.kitchenName || '');
    setFormCarModel(item.carModel || '');
    setFormCategory(item.category);
    setFormPrice(item.price.toFixed(2));
    setFormCostPrice(item.costPrice ? item.costPrice.toFixed(2) : '');
    setFormDescription(item.description || '');
    setFormIngredients(item.defaultIngredients ? item.defaultIngredients.join(', ') : '');
    setFormAllowedBreads(item.allowedBreads || []);
    setFormIsAvailable(item.isAvailable !== false);
  };

  // Open Create Form
  const handleStartCreate = () => {
    setEditingItem(null);
    setIsCreatingNew(true);
    const newId = `item-${Date.now()}`;
    setFormId(newId);
    setFormName('');
    setFormKitchenName('');
    setFormCarModel('');
    setFormCategory(activeCategory === 'todos' ? 'lanches' : activeCategory);
    setFormPrice('25.00');
    setFormCostPrice('10.00');
    setFormDescription('');
    setFormIngredients('Pão, Hambúrguer, Queijo, Maionese');
    setFormAllowedBreads(
      activeCategory === 'dogs'
        ? ['Pão de Hot Dog']
        : ['Pão de Hambúrguer (Bola)', 'Pão Francês']
    );
    setFormIsAvailable(true);
  };

  // Close Form
  const handleCancelForm = () => {
    setEditingItem(null);
    setIsCreatingNew(false);
  };

  // Toggle bread in form
  const toggleBread = (bread: string) => {
    setFormAllowedBreads((prev) =>
      prev.includes(bread) ? prev.filter((b) => b !== bread) : [...prev, bread]
    );
  };

  // Save Product (Create or Update)
  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Por favor, informe o nome do produto.');
      return;
    }

    const priceNum = parseFloat(formPrice.replace(',', '.'));
    if (isNaN(priceNum) || priceNum < 0) {
      alert('Por favor, informe um preço válido.');
      return;
    }

    const costNum = formCostPrice ? parseFloat(formCostPrice.replace(',', '.')) : undefined;

    const parsedIngredients = formIngredients
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    // Kitchen name fallback
    const finalKitchenName = formKitchenName.trim()
      ? formKitchenName.trim()
      : formName.trim().replace(/\s*-\s*[A-Z0-9\s]+$/, '');

    if (isCreatingNew) {
      const newItem: MenuItem = {
        id: formId || `item-${Date.now()}`,
        name: formName.trim(),
        kitchenName: finalKitchenName,
        carModel: formCarModel.trim() || undefined,
        category: formCategory,
        price: priceNum,
        costPrice: isNaN(costNum || NaN) ? undefined : costNum,
        description: formDescription.trim(),
        isAvailable: formIsAvailable,
        defaultIngredients: parsedIngredients,
        allowedExtras: COMMON_EXTRAS,
        allowedBreads:
          formCategory === 'lanches' || formCategory === 'dogs'
            ? formAllowedBreads.length > 0
              ? formAllowedBreads
              : ['Pão de Hambúrguer (Bola)', 'Pão Francês']
            : undefined,
      };

      const updated = [newItem, ...menu];
      onUpdateMenu(updated);
      showToast(`Produto "${newItem.name}" adicionado com sucesso!`);
    } else if (editingItem) {
      const updatedItem: MenuItem = {
        ...editingItem,
        name: formName.trim(),
        kitchenName: finalKitchenName,
        carModel: formCarModel.trim() || undefined,
        category: formCategory,
        price: priceNum,
        costPrice: isNaN(costNum || NaN) ? undefined : costNum,
        description: formDescription.trim(),
        isAvailable: formIsAvailable,
        defaultIngredients: parsedIngredients,
        allowedBreads:
          formCategory === 'lanches' || formCategory === 'dogs'
            ? formAllowedBreads
            : undefined,
      };

      const updated = menu.map((m) => (m.id === updatedItem.id ? updatedItem : m));
      onUpdateMenu(updated);
      showToast(`Produto "${updatedItem.name}" atualizado!`);
    }

    handleCancelForm();
  };

  // Delete product permanently
  const handleConfirmDelete = () => {
    if (!deleteConfirmItem) return;
    const updated = menu.filter((m) => m.id !== deleteConfirmItem.id);
    onUpdateMenu(updated);
    showToast(`Produto "${deleteConfirmItem.name}" excluído do cardápio!`);
    setDeleteConfirmItem(null);
  };

  // Toggle availability (Disponível vs Esgotado) with 1 click
  const handleToggleAvailability = (item: MenuItem) => {
    const updated = menu.map((m) => {
      if (m.id === item.id) {
        return { ...m, isAvailable: !m.isAvailable };
      }
      return m;
    });
    onUpdateMenu(updated);
    showToast(
      item.isAvailable
        ? `"${item.name}" marcado como ESGOTADO/PAUSADO`
        : `"${item.name}" reativado no cardápio!`
    );
  };

  // Inline Price Change
  const handleInlinePriceSave = (item: MenuItem) => {
    const rawVal = inlinePrices[item.id];
    if (rawVal === undefined) return;
    const newPrice = parseFloat(rawVal.replace(',', '.'));
    if (isNaN(newPrice) || newPrice < 0) {
      alert('Informe um valor de preço válido.');
      return;
    }

    const updated = menu.map((m) => {
      if (m.id === item.id) {
        return { ...m, price: newPrice };
      }
      return m;
    });
    onUpdateMenu(updated);
    setSavedInlineId(item.id);
    setTimeout(() => setSavedInlineId(null), 2000);
    showToast(`Preço de "${item.name}" atualizado para R$ ${newPrice.toFixed(2)}`);
  };

  // Reset to default Garagem 77 Menu
  const handleRestoreDefaultMenu = () => {
    if (
      window.confirm(
        'Tem certeza que deseja restaurar o cardápio original da Garagem 77? Todos os itens originais serão recarregados.'
      )
    ) {
      onUpdateMenu(INITIAL_MENU);
      showToast('Cardápio original restaurado com sucesso!');
    }
  };

  // Filter items
  const filteredItems = menu.filter((item) => {
    const matchesCategory = activeCategory === 'todos' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      (item.kitchenName && item.kitchenName.toLowerCase().includes(query)) ||
      (item.carModel && item.carModel.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const availableCount = menu.filter((m) => m.isAvailable !== false).length;
  const unavailableCount = menu.length - availableCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 bg-neutral-950/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black shadow-lg">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  CARDÁPIO, PRODUTOS & PREÇOS
                </h2>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30 font-bold">
                  {menu.length} produtos
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Acrescente novos lanches e bebidas, retire itens esgotados e altere os preços em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Botão Principal: Adicionar Produto */}
            <button
              onClick={handleStartCreate}
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs sm:text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Adicionar Produto</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Toast */}
        {successToast && (
          <div className="bg-emerald-950 border-b border-emerald-600 px-4 py-2.5 text-xs text-emerald-200 font-bold flex items-center gap-2 animate-fadeIn shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* If Form is open (Add or Edit) */}
        {(isCreatingNew || editingItem) ? (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950">
            <form onSubmit={handleSaveProductForm} className="max-w-2xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div>
                  <h3 className="font-black text-base sm:text-lg text-white flex items-center gap-2">
                    {isCreatingNew ? (
                      <>
                        <Plus className="w-5 h-5 text-amber-400" />
                        Cadastrar Novo Produto no Cardápio
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-5 h-5 text-amber-400" />
                        Editar Produto: {editingItem?.name}
                      </>
                    )}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Preencha os dados do item. Atualizações são sincronizadas instantaneamente em todas as telas.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>

              {/* Categoria */}
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                  Categoria do Produto *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'lanches', label: '🍔 Lanches (Carros)' },
                    { id: 'dogs', label: '🌭 Dogs Prensados' },
                    { id: 'porcoes', label: '🍟 Porções & Batatas' },
                    { id: 'sucos', label: '🍊 Sucos Naturais' },
                    { id: 'bebidas', label: '🥤 Refrigerantes & Águas' },
                    { id: 'cervejas', label: '🍺 Cervejas & Alcoólicos' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFormCategory(cat.id as CategoryId)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border text-left transition-all cursor-pointer ${
                        formCategory === cat.id
                          ? 'bg-amber-400/20 border-amber-400 text-amber-300 ring-1 ring-amber-400'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nome do Produto & Nome da Cozinha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Nome Completo do Produto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Ex: X-Bacon Supremo - OPALA"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs sm:text-sm font-bold text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    Nome que aparece no cardápio e no cupom
                  </span>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Nome para Cozinha / Chapeiro (opcional)
                  </label>
                  <input
                    type="text"
                    value={formKitchenName}
                    onChange={(e) => setFormKitchenName(e.target.value)}
                    placeholder="Ex: X-Bacon Supremo (sem o carro)"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs sm:text-sm font-bold text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    Nome simplificado que aparece no KDS da chapa
                  </span>
                </div>
              </div>

              {/* Carro e Preços */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Modelo de Carro (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formCarModel}
                    onChange={(e) => setFormCarModel(e.target.value)}
                    placeholder="Ex: OPALA, FUSCA, GOLF"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-bold text-amber-400 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Preço de Venda (R$) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                      R$
                    </span>
                    <input
                      type="text"
                      required
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      placeholder="32.00"
                      className="w-full pl-8 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs sm:text-sm font-mono font-black text-emerald-400 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Custo Unitário (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                      R$
                    </span>
                    <input
                      type="text"
                      value={formCostPrice}
                      onChange={(e) => setFormCostPrice(e.target.value)}
                      placeholder="12.00"
                      className="w-full pl-8 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs sm:text-sm font-mono text-neutral-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Descrição */}
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  Descrição do Produto / Apresentação
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Ex: Pão brioche tostado na manteiga, 2 hambúrgueres artesanais 160g, queijo cheddar cremoso..."
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Ingredientes padrão (para permitir remover no pedido) */}
              {(formCategory === 'lanches' || formCategory === 'dogs' || formCategory === 'porcoes') && (
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    Ingredientes Padrão (separados por vírgula)
                  </label>
                  <input
                    type="text"
                    value={formIngredients}
                    onChange={(e) => setFormIngredients(e.target.value)}
                    placeholder="Ex: Hambúrguer, Queijo Prato, Alface, Tomate, Maionese da Casa, Bacon"
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
                  />
                  <span className="text-[10px] text-neutral-500 mt-0.5 block">
                    Estes ingredientes poderão ser marcados como "SEM" pelo garçom/atendente ao anotar o pedido.
                  </span>
                </div>
              )}

              {/* Opções de Pão (para lanches e dogs) */}
              {(formCategory === 'lanches' || formCategory === 'dogs') && (
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                    Opções de Pão permitidas para este item:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {standardBreads.map((bread) => {
                      const isSelected = formAllowedBreads.includes(bread);
                      return (
                        <button
                          key={bread}
                          type="button"
                          onClick={() => toggleBread(bread)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                              : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${isSelected ? 'bg-amber-400 text-neutral-950 font-bold' : 'border border-neutral-700'}`}>
                            {isSelected ? '✓' : ''}
                          </span>
                          {bread}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Disponibilidade */}
              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Status de Disponibilidade</span>
                  <span className="text-[11px] text-neutral-400">
                    Se desmarcado, o item aparecerá como esgotado no atendimento.
                  </span>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsAvailable}
                    onChange={(e) => setFormIsAvailable(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0"
                  />
                  <span className={`text-xs font-bold ${formIsAvailable ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formIsAvailable ? 'Disponível para venda' : 'Esgotado / Pausado'}
                  </span>
                </label>
              </div>

              {/* Botões do Formulário */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs rounded-xl transition-colors"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  {isCreatingNew ? 'Cadastrar Produto no Cardápio' : 'Salvar Alterações do Produto'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Product List View */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search and Filters Bar */}
            <div className="p-3 sm:p-4 border-b border-neutral-800 bg-neutral-950/60 space-y-3 shrink-0">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                {/* Search Box */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar lanche, bebida ou porção..."
                    className="w-full pl-9 pr-8 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
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

                {/* Quick Stats & Restore */}
                <div className="flex items-center gap-2 text-xs flex-wrap">
                  <span className="px-2.5 py-1 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold rounded-lg flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    {availableCount} Ativos
                  </span>

                  {unavailableCount > 0 && (
                    <span className="px-2.5 py-1 bg-red-950/80 border border-red-500/40 text-red-300 font-bold rounded-lg flex items-center gap-1">
                      <EyeOff className="w-3.5 h-3.5" />
                      {unavailableCount} Esgotados
                    </span>
                  )}

                  <button
                    onClick={handleRestoreDefaultMenu}
                    className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white flex items-center gap-1 transition-colors"
                    title="Restaurar lista original com todos os carros da Garagem 77"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Restaurar Padrão</span>
                  </button>
                </div>
              </div>

              {/* Categories Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                      activeCategory === cat.id
                        ? 'bg-amber-400 text-neutral-950 shadow-md font-black ring-1 ring-amber-300'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* List of Products */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5">
              {filteredItems.length === 0 ? (
                <div className="py-16 text-center text-neutral-500">
                  <UtensilsCrossed className="w-12 h-12 stroke-[1.2] mx-auto mb-2 text-neutral-600" />
                  <p className="font-bold text-sm text-neutral-300">Nenhum produto encontrado</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    Altere o filtro de categoria ou clique no botão acima "+ Adicionar Produto" para cadastrar um novo item!
                  </p>
                </div>
              ) : (
                filteredItems.map((item) => {
                  const isSaved = savedInlineId === item.id;
                  const currentInlinePrice =
                    inlinePrices[item.id] !== undefined
                      ? inlinePrices[item.id]
                      : item.price.toFixed(2);

                  return (
                    <div
                      key={item.id}
                      className={`bg-neutral-950/70 border rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                        item.isAvailable === false
                          ? 'border-neutral-800 opacity-60 bg-neutral-950/40'
                          : 'border-neutral-800/90 hover:border-neutral-700 bg-neutral-950/90'
                      }`}
                    >
                      {/* Left: Product Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm sm:text-base text-white truncate">
                            {item.name}
                          </h4>

                          {item.carModel && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                              🏎️ {item.carModel}
                            </span>
                          )}

                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400">
                            {item.category}
                          </span>

                          {item.isAvailable === false && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-950 border border-red-500/50 text-red-400">
                              Esgotado / Pausado
                            </span>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-xs text-neutral-400 line-clamp-1">
                            {item.description}
                          </p>
                        )}

                        {item.defaultIngredients && item.defaultIngredients.length > 0 && (
                          <p className="text-[11px] text-neutral-500 truncate">
                            <strong className="text-neutral-400">Ingredientes:</strong>{' '}
                            {item.defaultIngredients.join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Right: Quick Price Input & Actions */}
                      <div className="flex items-center gap-3 self-end md:self-auto shrink-0 flex-wrap">
                        {/* Quick Inline Price Box */}
                        <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-xl p-1 pl-2">
                          <span className="text-xs font-bold text-neutral-500">R$</span>
                          <input
                            type="text"
                            value={currentInlinePrice}
                            onChange={(e) =>
                              setInlinePrices({ ...inlinePrices, [item.id]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleInlinePriceSave(item);
                              }
                            }}
                            className="w-20 bg-transparent text-xs sm:text-sm font-mono font-black text-emerald-400 focus:outline-none"
                            title="Pressione Enter ou clique no botão ao lado para salvar o novo preço"
                          />

                          <button
                            type="button"
                            onClick={() => handleInlinePriceSave(item)}
                            className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                              isSaved
                                ? 'bg-emerald-500 text-neutral-950'
                                : 'bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-neutral-300'
                            }`}
                            title="Salvar novo preço deste item"
                          >
                            {isSaved ? <Check className="w-3.5 h-3.5" /> : 'Salvar'}
                          </button>
                        </div>

                        {/* Botão Disponibilidade (Pausar/Reativar) */}
                        <button
                          type="button"
                          onClick={() => handleToggleAvailability(item)}
                          className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                            item.isAvailable !== false
                              ? 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                              : 'bg-red-950/60 border-red-500/40 text-red-400 hover:bg-red-900/60'
                          }`}
                          title={
                            item.isAvailable !== false
                              ? 'Clique para marcar este item como ESGOTADO (pausar do atendimento)'
                              : 'Clique para REATIVAR este item no cardápio'
                          }
                        >
                          {item.isAvailable !== false ? (
                            <Eye className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-red-400" />
                          )}
                        </button>

                        {/* Botão Editar Completo */}
                        <button
                          type="button"
                          onClick={() => handleStartEdit(item)}
                          className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Editar nome, descrição, ingredientes ou categoria"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Editar</span>
                        </button>

                        {/* Botão Excluir / Retirar */}
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmItem(item)}
                          className="p-2 bg-neutral-900 hover:bg-red-950/80 border border-neutral-800 hover:border-red-600/60 text-neutral-400 hover:text-red-400 rounded-xl transition-colors"
                          title="Excluir este produto definitivamente do cardápio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-neutral-800 bg-neutral-950/90 flex items-center justify-between shrink-0">
          <div className="text-xs text-neutral-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              Alterações de preços e produtos salvam automaticamente e atualizam todos os celulares e computadores!
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Concluir
          </button>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {deleteConfirmItem && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-150">
          <div className="bg-neutral-900 border-2 border-red-500/50 rounded-2xl max-w-md w-full p-5 shadow-2xl text-neutral-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-black text-base text-white">Retirar Produto do Cardápio?</h4>
                <p className="text-xs text-neutral-400">Esta ação excluirá o item permanentemente.</p>
              </div>
            </div>

            <div className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
              <span className="text-neutral-400">Produto:</span>{' '}
              <strong className="text-white">{deleteConfirmItem.name}</strong>
              <div className="text-amber-400 font-mono font-bold mt-1">
                R$ {deleteConfirmItem.price.toFixed(2)}
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Dica: Se o ingrediente acabou só hoje, você pode apenas desativar no botão do olho sem precisar excluir o produto!
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="px-3.5 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-lg shadow-md transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Sim, Excluir Produto</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
