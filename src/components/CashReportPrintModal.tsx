import React from 'react';
import { CashRegister, Order } from '../types/trailer';
import { Printer, X, CheckCircle2 } from 'lucide-react';

interface CashReportPrintModalProps {
  isOpen: boolean;
  cashRegister: CashRegister;
  orders: Order[];
  onClose: () => void;
}

export const CashReportPrintModal: React.FC<CashReportPrintModalProps> = ({
  isOpen,
  cashRegister,
  orders,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const paidOrders = orders.filter((o) => o.paymentStatus === 'pago');

  let cashSales = 0;
  let pixSales = 0;
  let debitoSales = 0;
  let creditoSales = 0;
  let totalFees = 0;
  let totalGross = 0;

  paidOrders.forEach((ord) => {
    totalGross += ord.total;
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

  const expectedCash = cashRegister.initialAmount + cashSales + totalSuprimentos - totalSangrias;
  const countedCash = cashRegister.closingCashCounted ?? expectedCash;
  const difference = cashRegister.closingDifference ?? 0;
  const totalNet = totalGross - totalFees;

  const openDate = cashRegister.openedAt
    ? new Date(cashRegister.openedAt).toLocaleString('pt-BR')
    : 'Hoje';
  const closeDate = cashRegister.closedAt
    ? new Date(cashRegister.closedAt).toLocaleString('pt-BR')
    : new Date().toLocaleString('pt-BR');

  // Top products
  const productCounts: Record<string, number> = {};
  paidOrders.forEach((ord) => {
    ord.items.forEach((item) => {
      productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
    });
  });
  const topProducts = Object.entries(productCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm text-white">Comprovante de Fechamento de Caixa</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable thermal container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950 flex justify-center">
          <div
            id="receipt-print-area"
            className="w-full max-w-[340px] bg-white text-neutral-950 p-5 font-mono text-xs rounded shadow-lg select-text leading-tight"
          >
            {/* Header */}
            <div className="text-center border-b border-dashed border-neutral-400 pb-3 mb-3">
              <h2 className="text-base font-black uppercase tracking-wider">TRAILER PRO LANCHES</h2>
              <p className="text-[10px] text-neutral-600">RELATÓRIO DE FECHAMENTO DE CAIXA</p>
              <p className="text-[10px] text-neutral-600">OPERADOR: {cashRegister.operatorName.toUpperCase()}</p>
              <div className="text-[9px] text-neutral-500 mt-1">
                <div>Abertura: {openDate}</div>
                <div>Fechamento: {closeDate}</div>
              </div>
            </div>

            {/* Dinheiro & Gaveta */}
            <div className="border-b border-dashed border-neutral-400 pb-2 mb-2 space-y-1">
              <div className="font-bold border-b border-neutral-300 pb-0.5 text-[11px]">
                CONFERÊNCIA DA GAVETA (DINHEIRO)
              </div>
              <div className="flex justify-between">
                <span>Fundo Inicial:</span>
                <span className="tabular-nums">R$ {cashRegister.initialAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>(+) Vendas em Dinheiro:</span>
                <span className="tabular-nums">R$ {cashSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>(+) Suprimentos Entrados:</span>
                <span className="tabular-nums">R$ {totalSuprimentos.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>(-) Sangrias / Despesas:</span>
                <span className="tabular-nums">- R$ {totalSangrias.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-neutral-200">
                <span>Saldo Esperado Gaveta:</span>
                <span className="tabular-nums">R$ {expectedCash.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Dinheiro Contado na Gaveta:</span>
                <span className="tabular-nums">R$ {countedCash.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-[11px] pt-0.5">
                <span>Diferença de Caixa:</span>
                <span className="tabular-nums">
                  {difference >= 0 ? `+ R$ ${difference.toFixed(2)}` : `- R$ ${Math.abs(difference).toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Totalizadores por Forma de Pagamento */}
            <div className="border-b border-dashed border-neutral-400 pb-2 mb-2 space-y-1">
              <div className="font-bold border-b border-neutral-300 pb-0.5 text-[11px]">
                TOTAIS POR FORMA DE PAGAMENTO
              </div>
              <div className="flex justify-between">
                <span>PIX (Banco):</span>
                <span className="tabular-nums font-bold">R$ {pixSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cartão Débito:</span>
                <span className="tabular-nums font-bold">R$ {debitoSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Cartão Crédito:</span>
                <span className="tabular-nums font-bold">R$ {creditoSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Dinheiro:</span>
                <span className="tabular-nums font-bold">R$ {cashSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-neutral-600 pt-0.5 border-t border-neutral-200">
                <span>Taxas Maquininha (Est.):</span>
                <span className="tabular-nums text-neutral-700">- R$ {totalFees.toFixed(2)}</span>
              </div>
            </div>

            {/* Faturamento Geral */}
            <div className="border-b border-dashed border-neutral-400 pb-2 mb-2 space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span>FATURAMENTO BRUTO:</span>
                <span className="tabular-nums text-sm font-black">R$ {totalGross.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold text-neutral-700">
                <span>FATURAMENTO LÍQUIDO:</span>
                <span className="tabular-nums">R$ {totalNet.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-neutral-600">
                <span>Total de Pedidos Pagos:</span>
                <span className="tabular-nums">{paidOrders.length}</span>
              </div>
              <div className="flex justify-between text-[10px] text-neutral-600">
                <span>Ticket Médio por Cliente:</span>
                <span className="tabular-nums">
                  R$ {paidOrders.length > 0 ? (totalGross / paidOrders.length).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>

            {/* Top Lanches */}
            {topProducts.length > 0 && (
              <div className="border-b border-dashed border-neutral-400 pb-2 mb-3">
                <div className="font-bold text-[10px] text-neutral-700 mb-1">
                  PRODUTOS MAIS VENDIDOS:
                </div>
                {topProducts.map(([name, qty], idx) => (
                  <div key={idx} className="flex justify-between text-[10px]">
                    <span className="truncate pr-2">{idx + 1}. {name}</span>
                    <span className="tabular-nums font-bold">{qty} un</span>
                  </div>
                ))}
              </div>
            )}

            {/* Observações */}
            {cashRegister.closingNotes && (
              <div className="border-b border-dashed border-neutral-400 pb-2 mb-3 text-[10px]">
                <span className="font-bold">Obs: </span>
                <span>{cashRegister.closingNotes}</span>
              </div>
            )}

            {/* Assinatura */}
            <div className="text-center pt-4 space-y-4">
              <div>
                <div className="border-b border-neutral-400 w-48 mx-auto mb-1"></div>
                <div className="text-[10px] text-neutral-600 uppercase">Assinatura do Responsável</div>
              </div>
              <div className="text-[9px] text-neutral-400 tracking-wider">
                * * * FIM DO RELATÓRIO DO TURNO * * *
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Imprimir Relatório (80mm)
          </button>
        </div>
      </div>
    </div>
  );
};
