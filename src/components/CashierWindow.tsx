import React, { useState } from 'react';
import {
  Order,
  CashRegister,
  PaymentSplit,
  CashMovement,
  CardMachineRates,
  MenuItem,
} from '../types/trailer';
import { PaymentModal } from './PaymentModal';
import { CashMovementModal } from './CashMovementModal';
import { CloseCashModal } from './CloseCashModal';
import { CashReportPrintModal } from './CashReportPrintModal';
import { ReceiptModal } from './ReceiptModal';
import { CashierNewOrderModal } from './CashierNewOrderModal';
import { EditOrderModal } from './EditOrderModal';
import { MenuManagerModal } from './MenuManagerModal';
import { isDrinkItem } from '../utils/orderHelpers';
import { playKitchenBell, playCashierBeep } from '../utils/audio';
import { saveMenu } from '../utils/storage';
import {
  DollarSign,
  QrCode,
  CreditCard,
  Banknote,
  Receipt,
  Printer,
  Lock,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Percent,
  Sliders,
  TrendingUp,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  AlertTriangle,
  Flame,
  UtensilsCrossed,
  Plus,
  Wine,
  Edit2,
  Eye,
  EyeOff,
  Trash2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CashierWindowProps {
  orders: Order[];
  cashRegister: CashRegister;
  menu: MenuItem[];
  onAddOrder?: (newOrder: Order) => void;
  onUpdateOrder: (updatedOrder: Order) => void;
  onUpdateCashRegister: (updatedCash: CashRegister) => void;
  onUpdateMenu?: (updatedMenu: MenuItem[]) => void;
  onSwitchStation?: () => void;
}

export const CashierWindow: React.FC<CashierWindowProps> = ({
  orders,
  cashRegister,
  menu,
  onAddOrder,
  onUpdateOrder,
  onUpdateCashRegister,
  onUpdateMenu,
  onSwitchStation,
}) => {
  const [activeTab, setActiveTab] = useState<'autorizacoes' | 'comandas' | 'historico' | 'movimentacoes' | 'cardapio' | 'taxas'>('autorizacoes');
  const [payingOrder, setPayingOrder] = useState<Order | null>(null);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [showCloseCashModal, setShowCloseCashModal] = useState(false);
  const [showPrintReportModal, setShowPrintReportModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showMenuManagerModal, setShowMenuManagerModal] = useState(false);
  const [cardapioSearch, setCardapioSearch] = useState('');
  const [cardapioCategory, setCardapioCategory] = useState<string>('todos');
  const [inlinePriceMap, setInlinePriceMap] = useState<Record<string, string>>({});
  const [savedPriceId, setSavedPriceId] = useState<string | null>(null);

  const handleUpdateMenuInternal = (updatedMenu: MenuItem[]) => {
    saveMenu(updatedMenu);
    if (onUpdateMenu) {
      onUpdateMenu(updatedMenu);
    }
  };

  // Editable card rates
  const [rates, setRates] = useState<CardMachineRates>(cashRegister.rates || {
    debitoRate: 1.4,
    creditoRate: 3.2,
    pixRate: 0.0,
  });

  // Filter orders by authorization & payment status
  const pendingAuthorizationOrders = orders.filter((o) => o.authorizationStatus === 'aguardando_autorizacao');
  const openOrders = orders.filter((o) => o.authorizationStatus === 'autorizado' && o.paymentStatus === 'pendente');
  const paidOrders = orders.filter((o) => o.paymentStatus === 'pago');

  // Automatically switch tab if new authorization pending
  const hasPending = pendingAuthorizationOrders.length > 0;

  // Authorize order -> sends to Kitchen!
  const handleAuthorizeOrder = (order: Order) => {
    const updated: Order = {
      ...order,
      authorizationStatus: 'autorizado',
      authorizedAt: Date.now(),
      status: 'aguardando', // Envia para a fila da cozinha
    };
    onUpdateOrder(updated);
    playKitchenBell();
  };

  const handleRejectOrder = (order: Order) => {
    const updated: Order = {
      ...order,
      authorizationStatus: 'rejeitado',
      status: 'cancelado',
    };
    onUpdateOrder(updated);
  };

  const handleSaveEditedOrder = (updatedOrder: Order, andAuthorize: boolean = false) => {
    let finalOrder = updatedOrder;
    if (andAuthorize) {
      finalOrder = {
        ...updatedOrder,
        authorizationStatus: 'autorizado',
        authorizedAt: Date.now(),
        status: 'aguardando',
      };
      playKitchenBell();
    }
    onUpdateOrder(finalOrder);
    setEditingOrder(null);
  };

  const handleAddNewOrderFromCashier = (newOrder: Order, andPayImmediately = false) => {
    if (onAddOrder) {
      onAddOrder(newOrder);
    } else {
      onUpdateOrder(newOrder);
    }
    if (andPayImmediately) {
      setPayingOrder(newOrder);
    }
  };

  // Financial Metrics
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

  const currentCashInDrawer =
    cashRegister.initialAmount + cashSales + totalSuprimentos - totalSangrias;

  const totalNet = totalGross - totalFees;
  const averageTicket = paidOrders.length > 0 ? totalGross / paidOrders.length : 0;

  const handleConfirmPayment = (
    orderId: string,
    payments: PaymentSplit[],
    discount: number,
    serviceFee: number,
    deliveryFee: number,
    amountPaid: number,
    change: number
  ) => {
    const existing = orders.find((o) => o.id === orderId);
    if (!existing) return;

    const totalFinal = Math.max(0, existing.subtotal - discount + serviceFee + deliveryFee);
    const updated: Order = {
      ...existing,
      payments,
      discount,
      serviceFee,
      deliveryFee,
      total: totalFinal,
      amountPaid,
      change,
      paymentStatus: 'pago',
      paidAt: Date.now(),
    };

    onUpdateOrder(updated);
    setReceiptOrder(updated);
    try {
      confetti({ particleCount: 35, spread: 60 });
    } catch (e) {}
  };

  const handleAddMovement = (movement: CashMovement) => {
    const updated: CashRegister = {
      ...cashRegister,
      movements: [movement, ...cashRegister.movements],
    };
    onUpdateCashRegister(updated);
  };

  const handleConfirmCloseShift = (countedCash: number, difference: number, notes: string) => {
    const updated: CashRegister = {
      ...cashRegister,
      isOpen: false,
      closedAt: Date.now(),
      closingCashCounted: countedCash,
      closingDifference: difference,
      closingNotes: notes,
    };
    onUpdateCashRegister(updated);
    setShowPrintReportModal(true);
  };

  const handleSaveRates = () => {
    const updated: CashRegister = {
      ...cashRegister,
      rates,
    };
    onUpdateCashRegister(updated);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Top Cash Register Header */}
      <div className="p-3 sm:p-4 border-b border-neutral-800 bg-neutral-900/95 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500 text-neutral-950 rounded-xl font-bold shadow-md">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-black text-lg text-white">CAIXA CENTRAL</h2>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                  cashRegister.isOpen
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-red-500/20 text-red-300 border border-red-500/40'
                }`}
              >
                {cashRegister.isOpen ? 'Caixa Aberto' : 'Caixa Fechado'}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Autorização de pedidos, controle de mesas, pagamentos e gaveta
            </p>
          </div>
        </div>

        {/* Quick Drawer Balance & Actions */}
        <div className="flex items-center gap-2 sm:gap-4 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase font-semibold block">
              Dinheiro na Gaveta
            </span>
            <span className="font-mono font-black text-lg text-emerald-400 tabular-nums">
              R$ {currentCashInDrawer.toFixed(2)}
            </span>
          </div>

          <div className="border-l border-neutral-800 pl-3 flex items-center gap-1.5 flex-wrap">
            {/* GERENCIAR CARDÁPIO E PREÇOS */}
            <button
              onClick={() => setShowMenuManagerModal(true)}
              className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/50 hover:border-amber-400 rounded-lg text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title="Adicionar ou retirar produtos (lanches, bebidas) e alterar preços"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
              <span>Cardápio & Preços ({menu.length})</span>
            </button>

            {/* NOVO PEDIDO DIRETO NO CAIXA */}
            <button
              onClick={() => setShowNewOrderModal(true)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Lançar Pedido Balcão</span>
            </button>

            <button
              onClick={() => setShowMovementModal(true)}
              className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg text-xs font-bold text-neutral-200 flex items-center gap-1 transition-colors"
              title="Registrar Sangria ou Suprimento"
            >
              <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />
              <span>Sangria / Entrada</span>
            </button>

            {cashRegister.isOpen ? (
              <button
                onClick={() => setShowCloseCashModal(true)}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-bold text-white flex items-center gap-1 transition-colors shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Fechar Caixa</span>
              </button>
            ) : (
              <button
                onClick={() => setShowPrintReportModal(true)}
                className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir Fechamento</span>
              </button>
            )}

            {onSwitchStation && (
              <button
                onClick={onSwitchStation}
                className="ml-1 px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs text-neutral-400 hover:text-white"
              >
                Trocar Estação
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="px-3 sm:px-4 py-2 border-b border-neutral-800 bg-neutral-900/40 flex items-center justify-between shrink-0 overflow-x-auto gap-2">
        <div className="flex gap-2">
          {/* Tab 0: Lançar Pedido Balcão */}
          <button
            onClick={() => setShowNewOrderModal(true)}
            className="px-3 py-1.5 text-xs font-black rounded-lg transition-colors flex items-center gap-1.5 bg-amber-400 text-neutral-950 shadow-md hover:bg-amber-300 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Lançar Pedido</span>
          </button>

          {/* Tab 1: Autorizações Pendentes */}
          <button
            onClick={() => setActiveTab('autorizacoes')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 relative ${
              activeTab === 'autorizacoes'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Autorizar Pedidos</span>
            {pendingAuthorizationOrders.length > 0 && (
              <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-red-600 text-white font-black animate-pulse">
                {pendingAuthorizationOrders.length}
              </span>
            )}
          </button>

          {/* Tab 2: Comandas em Aberto */}
          <button
            onClick={() => setActiveTab('comandas')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'comandas'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Comandas Abertas</span>
            <span className="font-mono text-[10px] px-1 rounded bg-black/25 font-bold">
              {openOrders.length}
            </span>
          </button>

          {/* Tab 3: Pedidos Pagos */}
          <button
            onClick={() => setActiveTab('historico')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'historico'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Pagos Hoje ({paidOrders.length})</span>
          </button>

          {/* Tab 4: Cardápio & Preços */}
          <button
            onClick={() => setActiveTab('cardapio')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'cardapio'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Cardápio & Preços</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-bold">
              {menu.length}
            </span>
          </button>

          {/* Tab 5: Movimentações */}
          <button
            onClick={() => setActiveTab('movimentacoes')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'movimentacoes'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Banknote className="w-3.5 h-3.5" />
            <span>Gaveta / Sangrias</span>
          </button>

          {/* Tab 6: Taxas da Maquininha */}
          <button
            onClick={() => setActiveTab('taxas')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'taxas'
                ? 'bg-amber-400 text-neutral-950 font-black'
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Taxas Maquininha</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* TAB 1: PEDIDOS AGUARDANDO AUTORIZAÇÃO PELO CAIXA */}
        {activeTab === 'autorizacoes' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            {pendingAuthorizationOrders.length === 0 ? (
              <div className="text-center py-16 text-neutral-500 bg-neutral-900/40 rounded-2xl border border-neutral-800/80 p-8">
                <ShieldCheck className="w-16 h-16 stroke-[1.2] mx-auto mb-2 text-emerald-500/70" />
                <h3 className="font-extrabold text-base text-neutral-200">
                  Nenhum pedido pendente de autorização
                </h3>
                <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
                  Assim que o garçom ou atendente lançar um pedido pelo celular, ele aparecerá aqui com aviso sonoro para você aprovar e liberar para a cozinha!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-amber-950/40 border border-amber-600/70 p-3 rounded-xl flex items-center justify-between text-xs text-amber-200 font-bold">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span>
                      {pendingAuthorizationOrders.length} pedido(s) aguardando sua autorização para ir para a chapa da cozinha:
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingAuthorizationOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-neutral-900 border-2 border-amber-500 rounded-2xl p-4 flex flex-col justify-between shadow-xl"
                    >
                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-xl text-amber-400">
                                #{String(ord.orderNumber).padStart(3, '0')}
                              </span>
                              <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 text-xs font-bold rounded">
                                {ord.tableOrComanda || (ord.orderType === 'mesa' ? 'Mesa' : 'Balcão')}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-white block truncate">
                              Cliente: {ord.customerName}
                            </span>
                          </div>

                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                            Aguardando Caixa
                          </span>
                        </div>

                        {/* Items list with car names, bread and details */}
                        <div className="space-y-2 py-2 text-xs border-b border-neutral-800">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="space-y-0.5">
                              <div className="flex justify-between font-bold text-white">
                                <span>
                                  <span className="text-amber-400 font-mono mr-1">{it.quantity}x</span>
                                  {it.name}
                                </span>
                                <span className="font-mono tabular-nums text-neutral-200">
                                  R$ {it.totalPrice.toFixed(2)}
                                </span>
                              </div>

                              {/* Bread & Cut */}
                              {(it.breadType || it.isCutInHalf !== undefined) && (
                                <div className="text-[11px] text-amber-300 font-semibold pl-3 flex flex-wrap gap-1.5">
                                  {it.breadType && <span>• Pão: {it.breadType}</span>}
                                  {it.isCutInHalf !== undefined && (
                                    <span>• {it.isCutInHalf ? 'Cortar ao Meio' : 'Inteiro'}</span>
                                  )}
                                </div>
                              )}

                              {/* Doneness */}
                              {it.meatDoneness && (
                                <div className="text-[11px] text-amber-300 font-semibold pl-3">
                                  • Ponto: {it.meatDoneness === 'ao_ponto' ? 'Ao Ponto' : 'Bem Passado'}
                                </div>
                              )}

                              {it.removedIngredients && it.removedIngredients.length > 0 && (
                                <div className="text-[11px] text-red-400 font-bold pl-3">
                                  SEM: {it.removedIngredients.join(', ').toUpperCase()}
                                </div>
                              )}

                              {it.selectedExtras && it.selectedExtras.length > 0 && (
                                <div className="text-[11px] text-emerald-400 pl-3">
                                  +{it.selectedExtras.map((e) => e.name).join(', ')}
                                </div>
                              )}

                              {it.drinkOptions && it.drinkOptions.length > 0 && (
                                <div className="text-[11px] text-sky-300 pl-3">
                                  🥤 {it.drinkOptions.join(', ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* HIGHLIGHT: BEBIDAS A ENTREGAR NO CAIXA (BALCÃO) */}
                        {(() => {
                          const drinks = ord.items.filter((it) => isDrinkItem(it, menu));
                          if (drinks.length === 0) return null;
                          return (
                            <div className="my-2.5 p-2.5 bg-sky-950/70 border border-sky-500/70 rounded-xl text-xs space-y-1">
                              <div className="flex items-center gap-1.5 font-black text-sky-300 text-[11px] uppercase tracking-wide">
                                <Wine className="w-3.5 h-3.5 text-sky-400" />
                                <span>Entregar no Balcão (Bebidas do Caixa):</span>
                              </div>
                              <div className="space-y-1">
                                {drinks.map((d, dIdx) => (
                                  <div
                                    key={dIdx}
                                    className="flex items-center justify-between font-bold text-white bg-neutral-900/90 px-2 py-1 rounded-lg border border-neutral-800"
                                  >
                                    <span>
                                      <span className="text-amber-400 font-mono mr-1.5">{d.quantity}x</span>
                                      {d.name}
                                    </span>
                                    {d.drinkOptions && d.drinkOptions.length > 0 && (
                                      <span className="text-[10px] text-sky-300 font-medium">
                                        ({d.drinkOptions.join(', ')})
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                              <p className="text-[10px] text-sky-400/80 italic pt-0.5">
                                Bebidas não vão para a cozinha. Entregue diretamente ao cliente aqui no caixa!
                              </p>
                            </div>
                          );
                        })()}

                        {/* Total */}
                        <div className="flex justify-between items-baseline pt-2">
                          <span className="text-xs font-bold text-neutral-400 uppercase">Subtotal do Pedido:</span>
                          <span className="font-mono font-black text-xl text-amber-400 tabular-nums">
                            R$ {ord.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Decisions Buttons: Rejeitar, Editar, Autorizar */}
                      <div className="pt-3 mt-3 border-t border-neutral-800 grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => handleRejectOrder(ord)}
                          className="py-2.5 px-2 bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                          <span className="hidden sm:inline">Rejeitar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditingOrder(ord)}
                          className="py-2.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-neutral-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-sm"
                          title="Editar lanches, pão, bebidas ou adicionar novos itens"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAuthorizeOrder(ord)}
                          className="py-2.5 px-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs rounded-xl flex items-center justify-center gap-1 transition-transform active:scale-98 shadow-md cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Autorizar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMANDAS EM ABERTO */}
        {activeTab === 'comandas' && (
          <div className="space-y-4 max-w-6xl mx-auto">
            {openOrders.length === 0 ? (
              <div className="text-center py-16 text-neutral-500">
                <CheckCircle2 className="w-14 h-14 stroke-[1.2] mx-auto mb-2 text-emerald-500/60" />
                <h4 className="font-bold text-base text-neutral-300">Nenhuma comanda em aberto no momento!</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Todos os pedidos autorizados já foram pagos e quitados no caixa.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {openOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-neutral-900 border border-neutral-800 hover:border-amber-400 rounded-2xl p-4 flex flex-col justify-between shadow-lg transition-all"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-xl text-amber-400">
                              #{String(ord.orderNumber).padStart(3, '0')}
                            </span>
                            <span className="px-2 py-0.5 bg-neutral-800 text-neutral-200 text-xs font-bold rounded">
                              {ord.tableOrComanda || (ord.orderType === 'mesa' ? 'Mesa' : 'Balcão')}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-white block truncate">
                            {ord.customerName}
                          </span>
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          {ord.status === 'pronto'
                            ? 'Pronto na Cozinha'
                            : ord.status === 'na_chapa'
                            ? 'Na Chapa'
                            : 'Fila Cozinha'}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5 py-1 text-xs">
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between text-neutral-300">
                            <span className="truncate pr-2">
                              <strong className="text-amber-400 font-mono mr-1">{it.quantity}x</strong>
                              {it.name}
                            </span>
                            <span className="font-mono tabular-nums text-neutral-300">
                              R$ {it.totalPrice.toFixed(2)}
                            </span>
                          </div>
                        ))}
                        {/* Drinks alert in open comanda */}
                        {(() => {
                          const drinks = ord.items.filter((it) => isDrinkItem(it, menu));
                          if (drinks.length === 0) return null;
                          return (
                            <div className="mt-2 p-2 bg-sky-950/60 border border-sky-500/60 rounded-xl text-xs space-y-1">
                              <div className="flex items-center gap-1 font-bold text-sky-300 text-[11px]">
                                <Wine className="w-3 h-3 text-sky-400" />
                                <span>Bebidas Balcão:</span>
                              </div>
                              <div className="space-y-0.5">
                                {drinks.map((d, dIdx) => (
                                  <div key={dIdx} className="text-white text-[11px] font-semibold flex justify-between">
                                    <span>
                                      <span className="text-amber-400 font-mono mr-1">{d.quantity}x</span>
                                      {d.name}
                                    </span>
                                    {d.drinkOptions && d.drinkOptions.length > 0 && (
                                      <span className="text-[10px] text-sky-300">
                                        ({d.drinkOptions.join(', ')})
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Total & Action */}
                    <div className="pt-3 mt-3 border-t border-neutral-800 space-y-2">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-neutral-400 uppercase font-bold">Total a Pagar:</span>
                        <span className="font-mono font-black text-xl text-amber-400 tabular-nums">
                          R$ {ord.total.toFixed(2)}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingOrder(ord)}
                          className="py-2 px-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer border border-neutral-700"
                          title="Editar lanches, adicionar itens ou mudar comanda"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setReceiptOrder(ord)}
                          className="py-2 px-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Pré-Conta</span>
                          <span className="sm:hidden">Conta</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPayingOrder(ord)}
                          className="py-2 px-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs rounded-xl flex items-center justify-center gap-1 transition-transform active:scale-98 shadow-md cursor-pointer"
                        >
                          <DollarSign className="w-4 h-4" />
                          <span>Cobrar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PEDIDOS PAGOS */}
        {activeTab === 'historico' && (
          <div className="max-w-6xl mx-auto space-y-3">
            {paidOrders.length === 0 ? (
              <p className="text-center py-12 text-xs text-neutral-500">Nenhum pagamento registrado ainda hoje.</p>
            ) : (
              paidOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-amber-400 text-base">
                      #{String(ord.orderNumber).padStart(3, '0')}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{ord.customerName}</span>
                        {ord.tableOrComanda && (
                          <span className="px-1.5 py-0.5 bg-neutral-800 rounded text-[10px] text-neutral-300 font-mono">
                            {ord.tableOrComanda}
                          </span>
                        )}
                      </div>
                      <div className="text-neutral-400 text-[11px] mt-0.5">
                        {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-emerald-400 font-bold">
                        {ord.payments.map((p, idx) => (
                          <span key={idx} className="bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                            {p.method.toUpperCase()} R$ {p.amount.toFixed(2)}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-500 font-mono mt-0.5 block">
                        Total Pago: R$ {ord.total.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={() => setReceiptOrder(ord)}
                      className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-300 hover:text-white"
                      title="Reimprimir Comprovante de Pagamento"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: GAVETA & SANGRIA */}
        {activeTab === 'movimentacoes' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex justify-between items-center bg-neutral-900 border border-neutral-800 p-3.5 rounded-xl">
              <div>
                <h4 className="font-bold text-sm text-white">Livro de Movimentações da Gaveta</h4>
                <p className="text-xs text-neutral-400">
                  Retiradas (sangrias) e entradas de troco (suprimentos) para conferência física exata.
                </p>
              </div>
              <button
                onClick={() => setShowMovementModal(true)}
                className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <ArrowDownRight className="w-4 h-4" />
                <span>Nova Sangria / Entrada</span>
              </button>
            </div>

            <div className="space-y-2">
              {cashRegister.movements.length === 0 ? (
                <p className="text-xs text-neutral-500 py-6 text-center">Nenhuma movimentação avulsa registrada.</p>
              ) : (
                cashRegister.movements.map((mov) => (
                  <div
                    key={mov.id}
                    className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`p-2 rounded-lg ${
                          mov.type === 'suprimento'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-red-950 text-red-400 border border-red-800'
                        }`}
                      >
                        {mov.type === 'suprimento' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white uppercase">{mov.type}</span>
                          {mov.timeFormatted && (
                            <span className="text-[10px] text-neutral-500 font-mono">
                              {mov.timeFormatted}
                            </span>
                          )}
                        </div>
                        <span className="text-neutral-400 text-xs">{mov.description}</span>
                      </div>
                    </div>

                    <span
                      className={`font-mono font-bold text-sm tabular-nums ${
                        mov.type === 'suprimento' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {mov.type === 'suprimento' ? '+' : '-'} R$ {mov.amount.toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: TAXAS DA MAQUININHA */}
        {activeTab === 'taxas' && (
          <div className="max-w-2xl mx-auto space-y-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
            <div>
              <h4 className="font-extrabold text-base text-white">Taxas das Maquininhas de Cartão</h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Configure as taxas cobradas pela sua maquininha para calcular o valor líquido real que sobra para você.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  Taxa de Cartão de Débito (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={rates.debitoRate}
                    onChange={(e) => setRates({ ...rates, debitoRate: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-3 pr-8 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                  <Percent className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-300 block mb-1">
                  Taxa de Cartão de Crédito à Vista (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={rates.creditoRate}
                    onChange={(e) => setRates({ ...rates, creditoRate: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-3 pr-8 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-400"
                  />
                  <Percent className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                onClick={handleSaveRates}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-xl shadow transition-colors"
              >
                Salvar Configurações de Taxa
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: CARDÁPIO, PRODUTOS & PREÇOS */}
        {activeTab === 'cardapio' && (
          <div className="space-y-4 max-w-6xl mx-auto pb-12">
            {/* Header banner */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                  <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                  <span>Cardápio, Produtos & Preços do Trailer</span>
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Adicione novos lanches, porções e bebidas, retire itens esgotados e ajuste os preços de venda instantaneamente.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowMenuManagerModal(true)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-xs rounded-xl flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ Adicionar Produto</span>
                </button>
              </div>
            </div>

            {/* Filter and Search */}
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-3 sm:p-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={cardapioSearch}
                    onChange={(e) => setCardapioSearch(e.target.value)}
                    placeholder="Buscar por nome, carro (Opala, Fusca), bebida ou ingrediente..."
                    className="w-full pl-3 pr-8 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-400 font-semibold"
                  />
                  {cardapioSearch && (
                    <button
                      onClick={() => setCardapioSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="text-xs text-neutral-400 flex items-center gap-2 font-bold">
                  <span className="text-amber-400">{menu.length}</span> produtos no total
                </div>
              </div>

              {/* Category pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {[
                  { id: 'todos', label: 'Todos os Produtos' },
                  { id: 'lanches', label: '🍔 Lanches' },
                  { id: 'dogs', label: '🌭 Hot Dogs' },
                  { id: 'porcoes', label: '🍟 Porções' },
                  { id: 'sucos', label: '🍊 Sucos' },
                  { id: 'bebidas', label: '🥤 Bebidas' },
                  { id: 'cervejas', label: '🍺 Cervejas' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCardapioCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      cardapioCategory === cat.id
                        ? 'bg-amber-400 text-neutral-950 shadow-md font-black'
                        : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* List of items */}
            <div className="space-y-2">
              {menu
                .filter((item) => {
                  const matchesCat = cardapioCategory === 'todos' || item.category === cardapioCategory;
                  const q = cardapioSearch.toLowerCase().trim();
                  if (!q) return matchesCat;
                  const matchesQuery =
                    item.name.toLowerCase().includes(q) ||
                    (item.kitchenName && item.kitchenName.toLowerCase().includes(q)) ||
                    (item.carModel && item.carModel.toLowerCase().includes(q)) ||
                    (item.description && item.description.toLowerCase().includes(q));
                  return matchesCat && matchesQuery;
                })
                .map((item) => {
                  const currentPrice =
                    inlinePriceMap[item.id] !== undefined
                      ? inlinePriceMap[item.id]
                      : item.price.toFixed(2);
                  const isSaved = savedPriceId === item.id;

                  const handleSavePrice = () => {
                    const parsed = parseFloat(currentPrice.replace(',', '.'));
                    if (isNaN(parsed) || parsed < 0) {
                      alert('Informe um preço válido.');
                      return;
                    }
                    const updated = menu.map((m) => (m.id === item.id ? { ...m, price: parsed } : m));
                    handleUpdateMenuInternal(updated);
                    setSavedPriceId(item.id);
                    setTimeout(() => setSavedPriceId(null), 2000);
                  };

                  const handleToggleAvailability = () => {
                    const updated = menu.map((m) =>
                      m.id === item.id ? { ...m, isAvailable: !m.isAvailable } : m
                    );
                    handleUpdateMenuInternal(updated);
                  };

                  const handleDelete = () => {
                    if (window.confirm(`Deseja realmente retirar/excluir "${item.name}" do cardápio?`)) {
                      const updated = menu.filter((m) => m.id !== item.id);
                      handleUpdateMenuInternal(updated);
                    }
                  };

                  return (
                    <div
                      key={item.id}
                      className={`bg-neutral-900 border rounded-2xl p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-all ${
                        item.isAvailable === false
                          ? 'border-neutral-800 opacity-60 bg-neutral-950/60'
                          : 'border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm sm:text-base text-white">{item.name}</h4>
                          {item.carModel && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                              🏎️ {item.carModel}
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                            {item.category}
                          </span>
                          {item.isAvailable === false && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-950 border border-red-500/40 text-red-400">
                              Esgotado
                            </span>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-xs text-neutral-400 mt-1 line-clamp-1">{item.description}</p>
                        )}

                        {item.defaultIngredients && item.defaultIngredients.length > 0 && (
                          <p className="text-[11px] text-neutral-500 mt-0.5 truncate">
                            <strong>Ingredientes:</strong> {item.defaultIngredients.join(', ')}
                          </p>
                        )}
                      </div>

                      {/* Right actions: Instant Price edit, Pause, Edit, Delete */}
                      <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto flex-wrap">
                        {/* Price editing box */}
                        <div className="flex items-center gap-1.5 bg-neutral-950 border border-neutral-800 rounded-xl p-1 pl-2">
                          <span className="text-xs font-bold text-neutral-500">R$</span>
                          <input
                            type="text"
                            value={currentPrice}
                            onChange={(e) =>
                              setInlinePriceMap({ ...inlinePriceMap, [item.id]: e.target.value })
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSavePrice();
                            }}
                            className="w-20 bg-transparent text-xs sm:text-sm font-mono font-black text-emerald-400 focus:outline-none"
                            title="Digite o novo preço e aperte Enter ou clique em Salvar"
                          />
                          <button
                            type="button"
                            onClick={handleSavePrice}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                              isSaved
                                ? 'bg-emerald-500 text-neutral-950'
                                : 'bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-neutral-300'
                            }`}
                          >
                            {isSaved ? 'Salvo!' : 'Salvar'}
                          </button>
                        </div>

                        {/* Availability toggle */}
                        <button
                          type="button"
                          onClick={handleToggleAvailability}
                          className={`p-2 rounded-xl border text-xs font-bold transition-colors ${
                            item.isAvailable !== false
                              ? 'bg-neutral-950 border-neutral-800 text-emerald-400 hover:border-emerald-500/40'
                              : 'bg-red-950/60 border-red-500/40 text-red-400'
                          }`}
                          title={
                            item.isAvailable !== false
                              ? 'Marcar como ESGOTADO (pausar)'
                              : 'REATIVAR este item no cardápio'
                          }
                        >
                          {item.isAvailable !== false ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>

                        {/* Edit modal trigger */}
                        <button
                          type="button"
                          onClick={() => setShowMenuManagerModal(true)}
                          className="px-2.5 py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                          title="Abrir editor completo"
                        >
                          <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Editar</span>
                        </button>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={handleDelete}
                          className="p-2 bg-neutral-950 hover:bg-red-950/80 border border-neutral-800 hover:border-red-600/60 text-neutral-400 hover:text-red-400 rounded-xl transition-colors"
                          title="Excluir/Retirar este item do cardápio"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <MenuManagerModal
        isOpen={showMenuManagerModal}
        onClose={() => setShowMenuManagerModal(false)}
        menu={menu}
        onUpdateMenu={handleUpdateMenuInternal}
      />
      <PaymentModal
        order={payingOrder}
        rates={rates}
        onClose={() => setPayingOrder(null)}
        onConfirmPayment={handleConfirmPayment}
      />

      <CashierNewOrderModal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        menu={menu}
        orders={orders}
        onAddOrder={handleAddNewOrderFromCashier}
      />

      <ReceiptModal order={receiptOrder} onClose={() => setReceiptOrder(null)} />

      <EditOrderModal
        isOpen={!!editingOrder}
        order={editingOrder}
        menu={menu}
        onClose={() => setEditingOrder(null)}
        onSaveOrder={handleSaveEditedOrder}
      />

      <CashMovementModal
        isOpen={showMovementModal}
        onClose={() => setShowMovementModal(false)}
        onAddMovement={handleAddMovement}
      />

      <CloseCashModal
        isOpen={showCloseCashModal}
        cashRegister={cashRegister}
        orders={orders}
        onClose={() => setShowCloseCashModal(false)}
        onConfirmClose={handleConfirmCloseShift}
      />

      <CashReportPrintModal
        isOpen={showPrintReportModal}
        cashRegister={cashRegister}
        orders={orders}
        onClose={() => setShowPrintReportModal(false)}
      />
    </div>
  );
};
