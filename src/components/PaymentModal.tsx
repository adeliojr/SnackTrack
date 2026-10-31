import React, { useState, useEffect } from 'react';
import { Order, PaymentMethod, PaymentSplit, CardMachineRates } from '../types/trailer';
import { playCashierBeep } from '../utils/audio';
import {
  X,
  CreditCard,
  QrCode,
  DollarSign,
  Percent,
  Plus,
  Trash2,
  CheckCircle2,
  Receipt,
  Calculator,
  AlertTriangle,
  Coins,
} from 'lucide-react';

interface PaymentModalProps {
  order: Order | null;
  rates: CardMachineRates;
  onClose: () => void;
  onConfirmPayment: (
    orderId: string,
    payments: PaymentSplit[],
    discount: number,
    serviceFee: number,
    deliveryFee: number,
    amountPaid: number,
    change: number
  ) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  order,
  rates,
  onClose,
  onConfirmPayment,
}) => {
  if (!order) return null;

  // Additional fees & discounts
  const [discountVal, setDiscountVal] = useState<string>(order.discount > 0 ? String(order.discount) : '0');
  const [includeServiceFee, setIncludeServiceFee] = useState<boolean>(order.serviceFee > 0);
  const [customServiceFee, setCustomServiceFee] = useState<string>(
    order.serviceFee > 0 ? String(order.serviceFee) : '0'
  );
  const [deliveryFeeVal, setDeliveryFeeVal] = useState<string>(
    order.deliveryFee > 0 ? String(order.deliveryFee) : '0'
  );

  // Payments split list
  const [payments, setPayments] = useState<PaymentSplit[]>(
    order.payments.length > 0
      ? order.payments
      : []
  );

  // Form for adding a payment part
  const [currentMethod, setCurrentMethod] = useState<PaymentMethod>('pix');
  const [inputAmount, setInputAmount] = useState<string>('');
  const [cashReceivedInput, setCashReceivedInput] = useState<string>('');

  // Calculations
  const subtotal = order.subtotal;
  const numDiscount = Math.max(0, parseFloat(discountVal) || 0);
  const numDeliveryFee = Math.max(0, parseFloat(deliveryFeeVal) || 0);

  // 10% standard service fee
  const calculatedServiceFee = includeServiceFee
    ? customServiceFee && parseFloat(customServiceFee) > 0
      ? parseFloat(customServiceFee)
      : Math.round(subtotal * 0.1 * 100) / 100
    : 0;

  const grandTotal = Math.max(0, subtotal - numDiscount + calculatedServiceFee + numDeliveryFee);

  const totalPaidSoFar = payments.reduce((sum, p) => sum + p.amount, 0);
  const remainingToPay = Math.max(0, grandTotal - totalPaidSoFar);

  // Set default input amount to remaining balance
  useEffect(() => {
    if (remainingToPay > 0 && (!inputAmount || parseFloat(inputAmount) === 0)) {
      setInputAmount(remainingToPay.toFixed(2));
    }
  }, [remainingToPay]);

  // Cash change calculation
  const totalCashPayments = payments
    .filter((p) => p.method === 'dinheiro')
    .reduce((sum, p) => sum + p.amount, 0);

  const numCashReceived = parseFloat(cashReceivedInput) || 0;
  const calculatedChange =
    numCashReceived > totalCashPayments ? numCashReceived - totalCashPayments : 0;

  // Add a payment method to the list
  const handleAddPayment = () => {
    const val = parseFloat(inputAmount);
    if (isNaN(val) || val <= 0) return;

    const amountToAdd = Math.min(val, remainingToPay);

    let feeRate = 0;
    if (currentMethod === 'cartao_debito') feeRate = rates.debitoRate;
    if (currentMethod === 'cartao_credito') feeRate = rates.creditoRate;
    if (currentMethod === 'pix') feeRate = rates.pixRate;

    const feeAmount = (amountToAdd * feeRate) / 100;
    const netAmount = amountToAdd - feeAmount;

    const newPayment: PaymentSplit = {
      id: `pay-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      method: currentMethod,
      amount: amountToAdd,
      feeRate,
      feeAmount,
      netAmount,
    };

    setPayments([...payments, newPayment]);
    playCashierBeep();

    // Reset input amount for remaining
    const newRemaining = remainingToPay - amountToAdd;
    setInputAmount(newRemaining > 0 ? newRemaining.toFixed(2) : '0');
  };

  const handleRemovePayment = (id: string) => {
    setPayments(payments.filter((p) => p.id !== id));
  };

  // Quick cash buttons for banknotes
  const handleQuickCash = (amount: number) => {
    setCashReceivedInput(String(amount));
  };

  // Confirm payment & close check
  const handleFinalize = () => {
    if (remainingToPay > 0.01) return;

    onConfirmPayment(
      order.id,
      payments,
      numDiscount,
      calculatedServiceFee,
      numDeliveryFee,
      numCashReceived > 0 ? numCashReceived : grandTotal,
      calculatedChange
    );
    playCashierBeep();
    onClose();
  };

  const getMethodLabel = (method: PaymentMethod) => {
    switch (method) {
      case 'pix':
        return 'PIX';
      case 'dinheiro':
        return 'Dinheiro em Espécie';
      case 'cartao_debito':
        return 'Cartão de Débito';
      case 'cartao_credito':
        return 'Cartão de Crédito';
      case 'vale_refeicao':
        return 'Vale Refeição (VR/VA)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Fechamento de Conta · Comanda #{String(order.orderNumber).padStart(3, '0')}
              </h3>
              <p className="text-xs text-neutral-400">
                Cliente: <strong className="text-neutral-200">{order.customerName}</strong>
                {order.tableOrComanda && (
                  <span className="ml-2 px-1.5 py-0.5 bg-neutral-800 rounded text-neutral-300 font-mono">
                    {order.tableOrComanda}
                  </span>
                )}
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Items Recap Summary */}
          <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800/80">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1.5">
              Itens Consumidos ({order.items.reduce((acc, i) => acc + i.quantity, 0)} itens)
            </span>
            <div className="space-y-1 text-xs max-h-24 overflow-y-auto pr-1">
              {order.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-neutral-300">
                  <span>
                    <strong className="text-amber-400 font-mono mr-1">{it.quantity}x</strong>
                    {it.name}
                  </span>
                  <span className="font-mono tabular-nums text-neutral-200">
                    R$ {it.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Adjustments: Desconto, Taxa de Serviço e Entrega */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
            {/* Desconto */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                Desconto (R$)
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">R$</span>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={discountVal}
                  onChange={(e) => setDiscountVal(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-red-400 focus:outline-none focus:border-red-400"
                />
              </div>
            </div>

            {/* Taxa de Serviço / 10% */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-bold text-neutral-400 uppercase">
                  Serviço (10%)
                </label>
                <button
                  type="button"
                  onClick={() => setIncludeServiceFee(!includeServiceFee)}
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded transition-colors ${
                    includeServiceFee
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-neutral-800 text-neutral-500'
                  }`}
                >
                  {includeServiceFee ? 'Incluído' : 'Sem 10%'}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">R$</span>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  disabled={!includeServiceFee}
                  value={includeServiceFee ? calculatedServiceFee.toFixed(2) : '0.00'}
                  onChange={(e) => setCustomServiceFee(e.target.value)}
                  className="w-full pl-8 pr-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-emerald-400 disabled:opacity-40 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            {/* Taxa de Entrega (se Delivery) */}
            <div>
              <label className="text-[11px] font-bold text-neutral-400 uppercase block mb-1">
                Taxa de Entrega
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">R$</span>
                <input
                  type="number"
                  step="1"
                  min="0"
                  value={deliveryFeeVal}
                  onChange={(e) => setDeliveryFeeVal(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-8 pr-2 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Totals Header Indicator */}
          <div className="flex items-center justify-between p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
            <div>
              <span className="text-[11px] text-neutral-400 block uppercase font-bold">Total a Cobrar</span>
              <span className="font-mono font-black text-2xl text-amber-400 tabular-nums">
                R$ {grandTotal.toFixed(2)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-neutral-400 block uppercase font-bold">Falta Pagar</span>
              <span
                className={`font-mono font-black text-xl tabular-nums ${
                  remainingToPay <= 0.01 ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                R$ {remainingToPay.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payments registered so far */}
          {payments.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                Pagamentos Lançados nesta Comanda:
              </span>
              <div className="space-y-1.5">
                {payments.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-white">{getMethodLabel(p.method)}</span>
                      {p.feeRate !== undefined && p.feeRate > 0 && (
                        <span className="text-[10px] text-neutral-500 font-mono">
                          (taxa maq: {p.feeRate}% · liq: R$ {(p.netAmount || 0).toFixed(2)})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-emerald-400 text-sm tabular-nums">
                        R$ {p.amount.toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemovePayment(p.id)}
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                        title="Remover este pagamento"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Form to add next payment (if balance remaining) */}
          {remainingToPay > 0.01 ? (
            <div className="bg-neutral-950/80 p-4 rounded-xl border border-neutral-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Adicionar Forma de Pagamento
              </span>

              {/* Method selector buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentMethod('pix')}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currentMethod === 'pix'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>PIX</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentMethod('dinheiro')}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currentMethod === 'dinheiro'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Dinheiro</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentMethod('cartao_debito')}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currentMethod === 'cartao_debito'
                      ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Débito ({rates.debitoRate}%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentMethod('cartao_credito')}
                  className={`p-2.5 rounded-lg border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    currentMethod === 'cartao_credito'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Crédito ({rates.creditoRate}%)</span>
                </button>
              </div>

              {/* Amount input & add button */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 font-mono text-sm">
                    R$
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max={remainingToPay}
                    value={inputAmount}
                    onChange={(e) => setInputAmount(e.target.value)}
                    placeholder="Valor a lançar"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddPayment}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-md active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lançar Pagamento</span>
                </button>
              </div>
            </div>
          ) : null}

          {/* Cash calculator with quick banknote buttons (if any cash payment) */}
          {(currentMethod === 'dinheiro' || payments.some((p) => p.method === 'dinheiro')) && (
            <div className="bg-amber-950/20 border border-amber-800/60 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Coins className="w-4 h-4 text-amber-400" />
                  Calculadora de Troco Automática (Dinheiro)
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  Total em Dinheiro: R$ {(totalCashPayments > 0 ? totalCashPayments : remainingToPay).toFixed(2)}
                </span>
              </div>

              {/* Banknote suggestions */}
              <div>
                <span className="text-[10px] text-neutral-400 uppercase font-semibold block mb-1">
                  Cédulas entregues pelo cliente:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[20, 50, 100, 200].map((note) => (
                    <button
                      key={note}
                      type="button"
                      onClick={() => handleQuickCash(note)}
                      className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-amber-300 transition-colors"
                    >
                      R$ {note},00
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickCash(
                        totalCashPayments > 0 ? totalCashPayments : grandTotal
                      )
                    }
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-bold text-neutral-300 transition-colors"
                  >
                    Valor Exato
                  </button>
                </div>
              </div>

              {/* Received & Calculated change */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amber-900/40">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase font-semibold block mb-1">
                    Valor Recebido em Mãos
                  </span>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">R$</span>
                    <input
                      type="number"
                      step="1"
                      value={cashReceivedInput}
                      onChange={(e) => setCashReceivedInput(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-8 pr-2.5 py-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 flex flex-col justify-center">
                  <span className="text-[10px] text-neutral-400 uppercase font-bold block">
                    Troco a Devolver:
                  </span>
                  <span className="font-mono font-black text-lg text-emerald-400 tabular-nums">
                    R$ {calculatedChange.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900 flex items-center justify-between gap-4 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            disabled={remainingToPay > 0.01}
            onClick={handleFinalize}
            className="flex-1 py-3 px-5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-neutral-950 font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Confirmar Pagamento e Fechar Comanda</span>
          </button>
        </div>
      </div>
    </div>
  );
};
