import React, { useState } from 'react';
import { CashMovement } from '../types/trailer';
import { X, ArrowDownRight, ArrowUpRight, ShoppingBag, Plus } from 'lucide-react';

interface CashMovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMovement: (movement: CashMovement) => void;
}

export const CashMovementModal: React.FC<CashMovementModalProps> = ({
  isOpen,
  onClose,
  onAddMovement,
}) => {
  if (!isOpen) return null;

  const [type, setType] = useState<'sangria' | 'suprimento' | 'despesa'>('sangria');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const commonReasons = {
    sangria: [
      'Retirada de segurança (cofre)',
      'Pagamento de fornecedor de pães',
      'Pagamento de fornecedor de carnes',
      'Retirada do proprietário',
    ],
    suprimento: [
      'Entrada de moedas para troco',
      'Fundo de troco adicional em notas',
      'Troca de dinheiro com comércio vizinho',
    ],
    despesa: [
      'Compra emergência: Saco de gelo',
      'Compra de guardanapos/embalagens',
      'Troca de botijão de gás',
      'Combustível/reabastecimento',
    ],
  };

  const handleConfirm = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0 || !description.trim()) return;

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const newMov: CashMovement = {
      id: `mov-${Date.now()}`,
      type,
      amount: num,
      description: description.trim(),
      createdAt: Date.now(),
      timeFormatted,
    };

    onAddMovement(newMov);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <h3 className="font-extrabold text-base text-white">Lançar Movimentação de Gaveta</h3>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type Selector */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-xl">
          <button
            type="button"
            onClick={() => setType('sangria')}
            className={`py-2 text-xs font-bold rounded-lg flex flex-col items-center gap-1 transition-all ${
              type === 'sangria'
                ? 'bg-red-500/20 border border-red-500 text-red-300'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ArrowDownRight className="w-4 h-4 text-red-400" />
            <span>Sangria (Saída)</span>
          </button>

          <button
            type="button"
            onClick={() => setType('suprimento')}
            className={`py-2 text-xs font-bold rounded-lg flex flex-col items-center gap-1 transition-all ${
              type === 'suprimento'
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
            <span>Suprimento (Entrada)</span>
          </button>

          <button
            type="button"
            onClick={() => setType('despesa')}
            className={`py-2 text-xs font-bold rounded-lg flex flex-col items-center gap-1 transition-all ${
              type === 'despesa'
                ? 'bg-amber-500/20 border border-amber-500 text-amber-300'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span>Despesa Avulsa</span>
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
            Valor em Dinheiro (R$) *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">
              R$
            </span>
            <input
              type="number"
              step="0.5"
              min="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full pl-9 pr-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-sm font-mono font-bold text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Motivo / Descrição */}
        <div>
          <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
            Motivo / Descrição *
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Retirada para pagamento do fornecedor"
            className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400 mb-2"
          />

          {/* Quick suggestions */}
          <div className="flex flex-wrap gap-1">
            {commonReasons[type].map((reason, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setDescription(reason)}
                className="text-[10px] px-2 py-0.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded transition-colors"
              >
                {reason}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-neutral-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Salvar Movimento</span>
          </button>
        </div>
      </div>
    </div>
  );
};
