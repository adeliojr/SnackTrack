import React, { useState } from 'react';
import { MenuItem, OrderItem, SelectedItemExtra } from '../types/trailer';
import {
  X,
  Plus,
  Minus,
  Check,
  Flame,
  Scissors,
  Sandwich,
  Wine,
  CupSoda,
  Sparkles,
  UtensilsCrossed,
  MapPin,
} from 'lucide-react';

interface CustomizationModalProps {
  item: MenuItem | null;
  initialOrderItem?: OrderItem | null;
  confirmButtonText?: string;
  orderTargetText?: string;
  onClose: () => void;
  onAddToCart: (orderItem: OrderItem) => void;
}

export const CustomizationModal: React.FC<CustomizationModalProps> = ({
  item,
  initialOrderItem,
  confirmButtonText,
  orderTargetText,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(initialOrderItem?.quantity ?? 1);
  const [selectedExtras, setSelectedExtras] = useState<SelectedItemExtra[]>(initialOrderItem?.selectedExtras ?? []);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>(initialOrderItem?.removedIngredients ?? []);
  const [meatDoneness, setMeatDoneness] = useState<'ao_ponto' | 'bem_passado' | 'mal_passado'>(
    initialOrderItem?.meatDoneness ?? 'ao_ponto'
  );
  const [isCutInHalf, setIsCutInHalf] = useState<boolean>(
    initialOrderItem?.isCutInHalf !== undefined ? initialOrderItem.isCutInHalf : true
  );
  const [notes, setNotes] = useState(initialOrderItem?.notes ?? '');

  // Opções para Bebidas & Cervejas
  const [iceOption, setIceOption] = useState<string>(
    initialOrderItem?.drinkOptions?.find((o) => o.includes('Gelo')) || 'Com Gelo e Limão'
  );
  const [cupOption, setCupOption] = useState<string>(
    initialOrderItem?.drinkOptions?.find((o) => o.includes('Copo')) || 'Com Copo Descartável'
  );

  // Opções para Sucos
  const [juiceBase, setJuiceBase] = useState<string>(
    initialOrderItem?.drinkOptions?.find((o) => o.includes('Água') || o.includes('Leite')) || 'Com Água'
  );
  const [sweetenerOption, setSweetenerOption] = useState<string>(
    initialOrderItem?.drinkOptions?.find((o) => o.includes('Açúcar') || o.includes('Adoçante') || o.includes('Puro')) ||
      'Com Açúcar'
  );
  const [juiceIce, setJuiceIce] = useState<string>(
    initialOrderItem?.drinkOptions?.find((o) => o.includes('Gelo')) || 'Com Gelo'
  );

  // Opções para Porções
  const [sauceOption, setSauceOption] = useState<string>('Maionese Verde da Casa');

  // Default bread
  const defaultBread =
    initialOrderItem?.breadType ||
    (item.allowedBreads && item.allowedBreads.length > 0
      ? item.allowedBreads[0]
      : item.category === 'dogs'
      ? 'Pão de Hot Dog'
      : 'Pão de Hambúrguer (Bola)');

  const [selectedBread, setSelectedBread] = useState<string>(defaultBread);

  const isSandwichOrDog = item.category === 'lanches' || item.category === 'dogs';
  const isMeatItem =
    isSandwichOrDog &&
    (item.name.toLowerCase().includes('filé') ||
      item.name.toLowerCase().includes('churrasco') ||
      item.name.toLowerCase().includes('hambúrguer') ||
      item.name.toLowerCase().includes('costela') ||
      item.name.toLowerCase().includes('bacon') ||
      item.description.toLowerCase().includes('hambúrguer') ||
      item.description.toLowerCase().includes('carne'));

  const isDrink = item.category === 'bebidas' || item.category === 'cervejas';
  const isJuice = item.category === 'sucos';
  const isPortion = item.category === 'porcoes';

  const hasBreadOptions = isSandwichOrDog;

  const breadList =
    item.allowedBreads && item.allowedBreads.length > 0
      ? item.allowedBreads
      : item.category === 'dogs'
      ? ['Pão de Hot Dog', 'Pão Francês', 'Pão de Hambúrguer (Bola)']
      : ['Pão de Hambúrguer (Bola)', 'Pão Francês', 'Pão Brioche', 'Pão Mônaco'];

  const toggleExtra = (extra: { id: string; name: string; price: number }) => {
    if (selectedExtras.some((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const toggleRemoveIngredient = (ingredient: string) => {
    if (removedIngredients.includes(ingredient)) {
      setRemovedIngredients(removedIngredients.filter((i) => i !== ingredient));
    } else {
      setRemovedIngredients([...removedIngredients, ingredient]);
    }
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitTotal = item.price + extrasTotal;
  const grandTotal = unitTotal * quantity;

  const handleConfirm = () => {
    // Compile drink options if applicable
    const drinkOpts: string[] = [];
    if (isDrink) {
      if (iceOption) drinkOpts.push(iceOption);
      if (cupOption) drinkOpts.push(cupOption);
    } else if (isJuice) {
      if (juiceBase) drinkOpts.push(juiceBase);
      if (sweetenerOption) drinkOpts.push(sweetenerOption);
      if (juiceIce) drinkOpts.push(juiceIce);
    } else if (isPortion) {
      if (sauceOption) drinkOpts.push(`Molho: ${sauceOption}`);
    }

    const orderItem: OrderItem = {
      id: initialOrderItem?.id || `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menuItemId: item.id,
      name: item.name, // Nome comercial com o carro para o Caixa e Atendimento
      kitchenName: item.kitchenName, // APENAS o nome do lanche para a Cozinha (SEM carro!)
      category: item.category,
      unitPrice: unitTotal,
      quantity,
      breadType: hasBreadOptions ? selectedBread : undefined,
      isCutInHalf: isSandwichOrDog ? isCutInHalf : undefined,
      selectedExtras,
      removedIngredients,
      meatDoneness: isMeatItem ? meatDoneness : undefined,
      drinkOptions: drinkOpts.length > 0 ? drinkOpts : undefined,
      notes: notes.trim() || undefined,
      totalPrice: grandTotal,
    };

    onAddToCart(orderItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900/95 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                {isSandwichOrDog
                  ? 'Personalização do Lanche'
                  : isJuice
                  ? 'Opções do Suco Natural'
                  : isDrink
                  ? 'Opções da Bebida'
                  : 'Opções da Porção'}
              </span>
              {item.carModel && (
                <span className="text-[10px] bg-neutral-800 text-amber-300 font-mono font-bold px-2 py-0.5 rounded">
                  🏎️ {item.carModel}
                </span>
              )}
            </div>
            <h3 className="font-black text-lg text-white leading-tight mt-0.5">{item.name}</h3>
            {orderTargetText && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-600/50 px-2 py-0.5 rounded-md mt-1">
                <MapPin className="w-3 h-3 text-amber-400" />
                <span>Para: {orderTargetText}</span>
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Item Description & Price */}
          <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800/80">
            {item.description ? (
              <p className="text-xs text-neutral-300 leading-relaxed mb-2">{item.description}</p>
            ) : (
              <p className="text-xs text-neutral-400 italic mb-2">Item oficial do cardápio Garagem 77</p>
            )}
            <div className="flex justify-between items-baseline pt-1 border-t border-neutral-800/60">
              <span className="text-xs text-neutral-400">Preço unitário:</span>
              <span className="text-sm font-mono font-black text-amber-400 tabular-nums">
                R$ {item.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* ===================== CASO 1: LANCHES & DOGS ===================== */}
          {isSandwichOrDog && (
            <>
              {/* 1. QUAL O PÃO? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sandwich className="w-4 h-4 text-amber-400" />
                  <span>Qual o Pão do Lanche? *</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {breadList.map((bread) => {
                    const isSelected = selectedBread === bread;
                    return (
                      <button
                        key={bread}
                        type="button"
                        onClick={() => setSelectedBread(bread)}
                        className={`p-2.5 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white'
                        }`}
                      >
                        <span className="truncate pr-1">{bread}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. CORTAR AO MEIO? */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-amber-400" />
                  <span>Cortar o Lanche ao Meio?</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCutInHalf(true)}
                    className={`p-2.5 text-xs font-bold rounded-xl border flex items-center justify-between transition-all ${
                      isCutInHalf
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span>✂️ Sim, cortar ao meio</span>
                    {isCutInHalf && <Check className="w-4 h-4 text-amber-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCutInHalf(false)}
                    className={`p-2.5 text-xs font-bold rounded-xl border flex items-center justify-between transition-all ${
                      !isCutInHalf
                        ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span>🥪 Não cortar (Inteiro)</span>
                    {!isCutInHalf && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                </div>
              </div>

              {/* 3. PONTO DA CARNE */}
              {isMeatItem && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Ponto da Carne na Chapa</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'ao_ponto', label: 'Ao Ponto' },
                      { id: 'bem_passado', label: 'Bem Passado' },
                      { id: 'mal_passado', label: 'Mal Passado' },
                    ].map((doneness) => {
                      const isSelected = meatDoneness === doneness.id;
                      return (
                        <button
                          key={doneness.id}
                          type="button"
                          onClick={() => setMeatDoneness(doneness.id as any)}
                          className={`p-2 text-xs font-bold rounded-xl border text-center transition-all ${
                            isSelected
                              ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          {doneness.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 4. RETIRAR INGREDIENTES */}
              {item.defaultIngredients && item.defaultIngredients.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                      Retirar Algum Ingrediente?
                    </label>
                    <span className="text-[10px] text-neutral-500">Toque para retirar (sem)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.defaultIngredients.map((ingredient) => {
                      const isRemoved = removedIngredients.includes(ingredient);
                      return (
                        <button
                          key={ingredient}
                          type="button"
                          onClick={() => toggleRemoveIngredient(ingredient)}
                          className={`px-3 py-1.5 text-xs rounded-xl font-bold transition-all flex items-center gap-1.5 border ${
                            isRemoved
                              ? 'bg-red-950/80 border-red-500 text-red-300 line-through'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          {isRemoved && <X className="w-3.5 h-3.5 text-red-400" />}
                          {ingredient}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 5. ADICIONAIS */}
              {item.allowedExtras && item.allowedExtras.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                    Adicionais Turbinados
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.allowedExtras.map((extra) => {
                      const isSelected = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`p-2.5 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          <span className="truncate pr-1">{extra.name}</span>
                          <span className="font-bold text-amber-400 tabular-nums shrink-0">
                            +R$ {extra.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ===================== CASO 2: REFRIGERANTES & CERVEJAS ===================== */}
          {isDrink && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                  <CupSoda className="w-4 h-4 text-amber-400" />
                  <span>Como Servir / Gelo e Limão</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Com Gelo e Limão',
                    'Bem Gelada (Sem Gelo)',
                    'Sem Gelo e Sem Limão',
                    'Temperatura Ambiente',
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIceOption(opt)}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                        iceOption === opt
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {iceOption === opt && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Copo Descartável</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Com Copo Descartável', 'Não precisa de copo'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setCupOption(opt)}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                        cupOption === opt
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {cupOption === opt && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== CASO 3: SUCOS NATURAIS ===================== */}
          {isJuice && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                  Base do Suco
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Com Água', 'Com Leite'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setJuiceBase(opt)}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                        juiceBase === opt
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {juiceBase === opt && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                  Adoçar
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Com Açúcar', 'Com Adoçante', 'Sem Açúcar (Puro)'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSweetenerOption(opt)}
                      className={`p-2 text-xs font-bold rounded-xl border text-center transition-all ${
                        sweetenerOption === opt
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                  Gelo
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Com bastante gelo', 'Com pouco gelo', 'Sem gelo'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setJuiceIce(opt)}
                      className={`p-2 text-xs font-bold rounded-xl border text-center transition-all ${
                        juiceIce === opt
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== CASO 4: PORÇÕES ===================== */}
          {isPortion && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                  <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                  <span>Molho de Acompanhamento</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Maionese Verde da Casa',
                    'Ketchup e Mostarda',
                    'Molho Barbecue',
                    'Sem Molho',
                  ].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSauceOption(opt)}
                      className={`p-2.5 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                        sauceOption === opt
                          ? 'bg-amber-400/15 border-amber-400 text-amber-300'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {sauceOption === opt && <Check className="w-4 h-4 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Adicionais para porção */}
              {item.allowedExtras && item.allowedExtras.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-200 uppercase tracking-wider">
                    Adicionais da Porção
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.allowedExtras.map((extra) => {
                      const isSelected = selectedExtras.some((e) => e.id === extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra)}
                          className={`p-2.5 text-xs font-bold rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          <span className="truncate pr-1">{extra.name}</span>
                          <span className="font-bold text-amber-400 tabular-nums shrink-0">
                            +R$ {extra.price.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OBSERVAÇÕES LIVRES */}
          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Observações Adicionais
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Pão bem tostado na chapa, pouco sal, etc."
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Sticky Footer: Quantidade e Botão Confirmar */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/95 flex items-center justify-between gap-3 shrink-0">
          {/* Quantity stepper */}
          <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-xl p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-black text-sm text-white tabular-nums">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add button */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 flex items-center justify-between px-5 py-3 rounded-xl font-black text-sm text-neutral-950 bg-amber-400 hover:bg-amber-300 shadow-xl transition-all active:scale-98 cursor-pointer"
          >
            <span>{confirmButtonText || (initialOrderItem ? 'SALVAR ALTERAÇÕES' : 'ADICIONAR AO PEDIDO')}</span>
            <span className="tabular-nums font-mono">R$ {grandTotal.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
