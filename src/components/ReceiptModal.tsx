import React from 'react';
import { Order } from '../types/trailer';
import { Printer, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const paymentLabels: Record<string, string> = {
    pix: 'PIX',
    dinheiro: 'Dinheiro',
    cartao_debito: 'Cartão de Débito',
    cartao_credito: 'Cartão de Crédito',
    vale_refeicao: 'Vale Refeição',
  };

  const typeLabels: Record<string, string> = {
    balcao: 'Consumo no Balcão',
    viagem: 'Para Viagem / Retirada',
    delivery: 'Entrega / Delivery',
    mesa: 'Consumo na Mesa',
  };

  const isPaid = order.paymentStatus === 'pago';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            {isPaid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-500" />
            )}
            <h3 className="font-extrabold text-sm text-neutral-100">
              {isPaid ? 'Comprovante de Pagamento' : 'Conferência de Conta / Pré-Conta'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Thermal Receipt Visual Preview (80mm style) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950 flex justify-center">
          <div
            id="receipt-print-area"
            className="w-full max-w-[340px] bg-white text-neutral-950 p-5 font-mono text-xs rounded shadow-lg select-text leading-tight"
          >
            {/* Header */}
            <div className="text-center border-b border-dashed border-neutral-400 pb-3 mb-3">
              <h2 className="text-base font-black tracking-wider uppercase">TRAILER PRO LANCHES</h2>
              <p className="text-[10px] text-neutral-600">O Verdadeiro Sabor na Chapa</p>
              <p className="text-[10px] text-neutral-600">CNPJ: 12.345.678/0001-90</p>
              <p className="text-[10px] text-neutral-600">WhatsApp: (11) 98765-4321</p>
              <div className="mt-1 pt-1 border-t border-neutral-300 font-bold uppercase text-[10px]">
                {isPaid ? '*** CUPOM DE PAGAMENTO ***' : '*** CONFERÊNCIA DE CONTA (NÃO É FISCAL) ***'}
              </div>
            </div>

            {/* Ticket Info */}
            <div className="border-b border-dashed border-neutral-400 pb-2 mb-3">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-sm">SENHA: #{String(order.orderNumber).padStart(3, '0')}</span>
                <span className="text-[11px] font-semibold uppercase">{typeLabels[order.orderType]}</span>
              </div>
              {order.tableOrComanda && (
                <div className="text-[11px] font-bold text-neutral-900 mb-0.5">
                  LOCAL: {order.tableOrComanda.toUpperCase()}
                </div>
              )}
              <div className="text-[11px]">
                <span className="text-neutral-600">Cliente: </span>
                <span className="font-bold uppercase">{order.customerName}</span>
              </div>
              {order.customerPhone && (
                <div className="text-[10px] text-neutral-600">
                  Tel: {order.customerPhone}
                </div>
              )}
              <div className="text-[10px] text-neutral-500 mt-1">Data/Hora: {formattedDate}</div>
            </div>

            {/* Items list */}
            <div className="border-b border-dashed border-neutral-400 pb-3 mb-3">
              <div className="font-bold border-b border-neutral-300 pb-1 mb-2 flex justify-between text-[11px]">
                <span>QTD ITEM</span>
                <span>TOTAL (R$)</span>
              </div>

              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between font-semibold">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="tabular-nums">R$ {item.totalPrice.toFixed(2)}</span>
                    </div>

                    {item.meatDoneness && (
                      <div className="text-[10px] pl-3 text-neutral-700">
                        • Ponto: {item.meatDoneness === 'ao_ponto' ? 'Ao Ponto' : 'Bem Passado'}
                      </div>
                    )}

                    {item.selectedExtras.length > 0 && (
                      <div className="text-[10px] pl-3 text-emerald-800">
                        {item.selectedExtras.map((ex, eIdx) => (
                          <div key={eIdx}>+ {ex.name} (+R$ {ex.price.toFixed(2)})</div>
                        ))}
                      </div>
                    )}

                    {item.removedIngredients.length > 0 && (
                      <div className="text-[10px] pl-3 text-red-700 font-bold">
                        SEM: {item.removedIngredients.join(', ').toUpperCase()}
                      </div>
                    )}

                    {item.notes && (
                      <div className="text-[10px] pl-3 italic text-neutral-600">
                        Obs: "{item.notes}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Total & Payment Details */}
            <div className="border-b border-dashed border-neutral-400 pb-3 mb-3 space-y-1">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="tabular-nums">R$ {order.subtotal.toFixed(2)}</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-red-600">
                  <span>(-) Desconto:</span>
                  <span className="tabular-nums">- R$ {order.discount.toFixed(2)}</span>
                </div>
              )}

              {order.serviceFee > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span>(+) Taxa de Serviço (10%):</span>
                  <span className="tabular-nums">+ R$ {order.serviceFee.toFixed(2)}</span>
                </div>
              )}

              {order.deliveryFee > 0 && (
                <div className="flex justify-between text-neutral-700">
                  <span>(+) Taxa de Entrega:</span>
                  <span className="tabular-nums">+ R$ {order.deliveryFee.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-base font-black pt-1 border-t border-neutral-300">
                <span>TOTAL:</span>
                <span className="tabular-nums">R$ {order.total.toFixed(2)}</span>
              </div>

              {/* Status and payment details */}
              <div className="pt-2">
                <div className="flex justify-between font-bold text-[11px]">
                  <span>Status do Pagamento:</span>
                  <span className={isPaid ? 'text-emerald-800 font-black' : 'text-amber-800 font-black'}>
                    {isPaid ? 'PAGO / QUITADO' : 'PENDENTE NO CAIXA'}
                  </span>
                </div>

                {isPaid && order.payments.length > 0 && (
                  <div className="mt-1 pt-1 border-t border-neutral-200 space-y-0.5 text-[10px]">
                    <span className="font-semibold text-neutral-600">Formas Pagas:</span>
                    {order.payments.map((p, pIdx) => (
                      <div key={pIdx} className="flex justify-between">
                        <span>• {paymentLabels[p.method] || p.method}</span>
                        <span className="font-bold tabular-nums">R$ {p.amount.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {order.amountPaid !== undefined && order.change !== undefined && order.change > 0 && (
                  <div className="mt-1 pt-1 border-t border-neutral-200 text-[10px]">
                    <div className="flex justify-between text-neutral-600">
                      <span>Valor Recebido em Mãos:</span>
                      <span className="tabular-nums font-mono">R$ {order.amountPaid.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-neutral-900">
                      <span>Troco Devolvido:</span>
                      <span className="tabular-nums font-mono">R$ {order.change.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-1 pt-1">
              <p className="font-bold uppercase tracking-wide">Obrigado pela preferência!</p>
              <p className="text-[10px] text-neutral-600">Volte sempre ao Trailer Pro</p>
              <div className="pt-2 tracking-widest text-neutral-400 text-[10px]">
                * * * * * * * * * * * * * * * *
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-between p-4 bg-neutral-900 border-t border-neutral-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Imprimir Comprovante
          </button>
        </div>
      </div>
    </div>
  );
};
