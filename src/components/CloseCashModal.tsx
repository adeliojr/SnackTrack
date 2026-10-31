import React, { useState } from 'react';
import { CashRegister, Order } from '../types/trailer';
import {
  X,
  Lock,
  DollarSign,
  QrCode,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Printer,
  FileSpreadsheet,
} from 'lucide-react';

interface CloseCashModalProps {
  isOpen: boolean;
  cashRegister: CashRegister;
  orders: Order[];
  onClose: () => void;
  onConfirmClose: (countedCash: number, difference: number, notes: string) => void;
}

export const CloseCashModal: React.FC<CloseCashModalProps> = ({
  isOpen,
  cashRegister,
  orders,
  onClose,
  onConfirmClose,
}) => {
  if (!isOpen) return null;

  // Calculate totals from paid orders
  const paidOrders = orders.filter((o) => o.paymentStatus === 'pago');

  let cashSales = 0;
  let pixSales = 0;
  let debitoSales = 0;
  let creditoSales = 0;
  let totalFees = 0;

  paidOrders.forEach((ord) => {
    ord.payments.forEach((p) => {
      if (p.method === 'dinheiro') cashSales += p.amount;
      if (p.method === 'pix') pixSales += p.amount;
      if (p.method === 'cartao_debito') debitoSales += p.amount;
      if (p.method === 'cartao_credito') creditoSales += p.amount;
      totalFees += p.feeAmount || 0;
    });
  });

  const totalSuprimentos = cashRegister.movements
    .filter((m) => m.type === 'suprimento')
    .reduce((sum, m) => sum + m.amount, 0);

  const totalSangrias = cashRegister.movements
    .filter((m) => m.type === 'sangria' || m.type === 'despesa')
    .reduce((sum, m) => sum + m.amount, 0);

  // Expected cash in drawer
  const expectedCashInDrawer =
    cashRegister.initialAmount + cashSales + totalSuprimentos - totalSangrias;

  // User input for physical cash counted
  const [countedCashInput, setCountedCashInput] = useState<string>('');
  const [closingNotes, setClosingNotes] = useState<string>('');

  const numCounted = parseFloat(countedCashInput) || 0;
  const difference = countedCashInput !== '' ? numCounted - expectedCashInDrawer : 0;

  const handleFinalize = () => {
    onConfirmClose(numCounted, difference, closingNotes.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Fechamento de Caixa do Turno
              </h3>
              <p className="text-xs text-neutral-400">
                Conferência física da gaveta e totalizadores financeiros
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Expected vs Counted Cash Drawer */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              1. Conferência do Dinheiro na Gaveta
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-neutral-900 rounded-lg">
                <span className="text-neutral-400 block mb-0.5">Fundo Inicial de Troco:</span>
                <span className="font-mono font-bold text-white text-sm tabular-nums">
                  R$ {cashRegister.initialAmount.toFixed(2)}
                </span>
              </div>
              <div className="p-2.5 bg-neutral-900 rounded-lg">
                <span className="text-neutral-400 block mb-0.5">(+) Vendas em Dinheiro:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                  R$ {cashSales.toFixed(2)}
                </span>
              </div>
              <div className="p-2.5 bg-neutral-900 rounded-lg">
                <span className="text-neutral-400 block mb-0.5">(+) Suprimentos Entrados:</span>
                <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                  R$ {totalSuprimentos.toFixed(2)}
                </span>
              </div>
              <div className="p-2.5 bg-neutral-900 rounded-lg">
                <span className="text-neutral-400 block mb-0.5">(-) Sangrias / Despesas:</span>
                <span className="font-mono font-bold text-red-400 text-sm tabular-nums">
                  R$ {totalSangrias.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Expected total in drawer */}
            <div className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-700">
              <span className="font-bold text-xs text-white">SALDO ESPERADO NA GAVETA:</span>
              <span className="font-mono font-black text-lg text-amber-400 tabular-nums">
                R$ {expectedCashInDrawer.toFixed(2)}
              </span>
            </div>

            {/* Physical cash input */}
            <div>
              <label className="text-[11px] font-bold text-neutral-300 uppercase block mb-1">
                Quanto você contou fisicamente na gaveta? (Cédulas + Moedas) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">R$</span>
                <input
                  type="number"
                  step="0.5"
                  value={countedCashInput}
                  onChange={(e) => setCountedCashInput(e.target.value)}
                  placeholder={expectedCashInDrawer.toFixed(2)}
                  className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Difference indicator */}
            {countedCashInput !== '' && (
              <div
                className={`p-3 rounded-lg border flex items-center justify-between text-xs font-bold ${
                  Math.abs(difference) < 0.05
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                    : difference > 0
                    ? 'bg-blue-950/60 border-blue-500 text-blue-300'
                    : 'bg-red-950/60 border-red-500 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  {Math.abs(difference) < 0.05 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                  <span>
                    {Math.abs(difference) < 0.05
                      ? 'Caixa 100% Batido! Zero divergência.'
                      : difference > 0
                      ? `Sobra de Caixa na gaveta (+ R$ ${difference.toFixed(2)})`
                      : `Falta de Caixa na gaveta (- R$ ${Math.abs(difference).toFixed(2)})`}
                  </span>
                </div>
                <span className="font-mono tabular-nums">
                  {difference >= 0 ? `+R$ ${difference.toFixed(2)}` : `-R$ ${Math.abs(difference).toFixed(2)}`}
                </span>
              </div>
            )}
          </div>

          {/* Electronic Totals to Check with Banking / Card Terminal */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2.5">
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              2. Conferência de Pagamentos Eletrônicos (Bancos & Maquininha)
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span className="text-neutral-300">Total PIX Recebido (Conferir no Extrato):</span>
                </div>
                <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                  R$ {pixSales.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-blue-400" />
                  <span className="text-neutral-300">Total Cartão Débito (Relatório da Maquininha):</span>
                </div>
                <span className="font-mono font-bold text-blue-400 text-sm tabular-nums">
                  R$ {debitoSales.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-lg">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span className="text-neutral-300">Total Cartão Crédito (Relatório da Maquininha):</span>
                </div>
                <span className="font-mono font-bold text-purple-400 text-sm tabular-nums">
                  R$ {creditoSales.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-neutral-950 rounded border border-neutral-800/80 text-[11px] text-neutral-400">
                <span>Taxas estimadas descontadas pelas operadoras:</span>
                <span className="font-mono text-red-400 tabular-nums">- R$ {totalFees.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
              Observações do Fechamento (Opcional)
            </label>
            <input
              type="text"
              value={closingNotes}
              onChange={(e) => setClosingNotes(e.target.value)}
              placeholder="Ex: Tudo correto, sobra de R$ 2,00 por doação de troco do cliente"
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Voltar
          </button>

          <button
            type="button"
            disabled={countedCashInput === ''}
            onClick={handleFinalize}
            className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:hover:bg-red-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <Lock className="w-4 h-4" />
            <span>Confirmar e Encerrar Caixa</span>
          </button>
        </div>
      </div>
    </div>
  );
};
