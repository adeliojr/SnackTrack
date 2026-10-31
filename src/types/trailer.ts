export type CategoryId = 'lanches' | 'dogs' | 'porcoes' | 'sucos' | 'bebidas' | 'cervejas';

export type StationRole = 'entrada' | 'atendimento' | 'caixa' | 'cozinha' | 'tv';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string; // Nome completo com o carro (ex: "X - Bacon Egg - OPALA")
  kitchenName: string; // Nome exclusivo do lanche para a cozinha (SEM O CARRO: ex: "X-Bacon Egg")
  carModel?: string | null; // Nome do carro (ex: "OPALA")
  category: CategoryId;
  price: number;
  costPrice?: number;
  description: string;
  image?: string;
  isAvailable: boolean;
  defaultIngredients: string[];
  allowedExtras: ExtraOption[];
  allowedBreads?: string[]; // Opções de pão (Pão Francês, Pão Bola, Pão Brioche, Pão Mônaco, etc.)
}

export interface SelectedItemExtra {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string; // Nome comercial (ex: "X - Bacon Egg - OPALA")
  kitchenName: string; // Nome do lanche para o chapeiro (ex: "X-Bacon Egg")
  category?: CategoryId; // Categoria do item (lanches, dogs, porcoes, bebidas, sucos, cervejas)
  unitPrice: number;
  quantity: number;
  breadType?: string; // Qual pão: Pão Francês, Pão de Hambúrguer (Bola), Brioche, Mônaco, Hot Dog
  isCutInHalf?: boolean; // Cortar ao meio: Sim / Não
  selectedExtras: SelectedItemExtra[];
  removedIngredients: string[];
  meatDoneness?: 'ao_ponto' | 'bem_passado' | 'mal_passado';
  drinkOptions?: string[]; // Opções de bebidas: gelo e limão, copo, com leite, açúcar, etc.
  notes?: string;
  totalPrice: number;
}

export type OrderStatus = 'aguardando' | 'na_chapa' | 'pronto' | 'entregue' | 'cancelado';
export type AuthorizationStatus = 'aguardando_autorizacao' | 'autorizado' | 'rejeitado';
export type OrderType = 'mesa' | 'balcao' | 'viagem' | 'delivery';
export type PaymentMethod = 'dinheiro' | 'pix' | 'cartao_debito' | 'cartao_credito' | 'vale_refeicao';
export type PaymentStatus = 'pendente' | 'pago';

export interface PaymentSplit {
  id: string;
  method: PaymentMethod;
  amount: number;
  feeRate?: number;
  feeAmount?: number;
  netAmount?: number;
}

export interface Order {
  id: string;
  orderNumber: number;
  customerName: string;
  customerPhone?: string;
  orderType: OrderType;
  tableOrComanda?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  serviceFee: number;
  deliveryFee: number;
  total: number;
  payments: PaymentSplit[];
  paymentStatus: PaymentStatus;
  amountPaid?: number;
  change?: number;
  status: OrderStatus;
  authorizationStatus: AuthorizationStatus;
  createdAt: number;
  authorizedAt?: number;
  startedAt?: number;
  readyAt?: number;
  deliveredAt?: number;
  paidAt?: number;
  notes?: string;
  attendantName?: string;
}

export interface CashMovement {
  id: string;
  type: 'suprimento' | 'sangria' | 'despesa';
  amount: number;
  description: string;
  createdAt: number;
  timeFormatted?: string;
}

export interface CardMachineRates {
  debitoRate: number;
  creditoRate: number;
  pixRate: number;
}

export interface CashRegister {
  id: string;
  isOpen: boolean;
  openedAt?: number;
  closedAt?: number;
  operatorName: string;
  initialAmount: number;
  movements: CashMovement[];
  rates: CardMachineRates;
  closingCashCounted?: number;
  closingDifference?: number;
  closingNotes?: string;
}

export type WindowTab = 'pedidos' | 'cozinha' | 'caixa' | 'split' | 'tv';
