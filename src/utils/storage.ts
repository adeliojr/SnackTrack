import { Order, MenuItem, CashRegister, CashMovement } from '../types/trailer';
import { INITIAL_MENU } from '../data/initialMenu';

const ORDERS_KEY = 'trailer_garagem77_orders_v4';
const MENU_KEY = 'trailer_garagem77_menu_v4';
const CASH_KEY = 'trailer_garagem77_cash_v4';
const CALL_EVENT_KEY = 'trailer_garagem77_called_order_v4';

export interface StorageUpdateMessage {
  type: 'ORDERS_UPDATED' | 'MENU_UPDATED' | 'CASH_UPDATED' | 'ORDER_CALLED';
  payload?: unknown;
}

let channel: BroadcastChannel | null = null;
try {
  if (typeof BroadcastChannel !== 'undefined') {
    channel = new BroadcastChannel('trailer_garagem77_sync_v4');
  }
} catch (e) {
  console.warn('BroadcastChannel not available:', e);
}

export function subscribeToSync(callback: (msg: StorageUpdateMessage) => void): () => void {
  const handleMessage = (e: MessageEvent<StorageUpdateMessage>) => {
    callback(e.data);
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === ORDERS_KEY) {
      callback({ type: 'ORDERS_UPDATED' });
    } else if (e.key === MENU_KEY) {
      callback({ type: 'MENU_UPDATED' });
    } else if (e.key === CASH_KEY) {
      callback({ type: 'CASH_UPDATED' });
    } else if (e.key === CALL_EVENT_KEY) {
      callback({ type: 'ORDER_CALLED', payload: e.newValue ? JSON.parse(e.newValue) : undefined });
    }
  };

  if (channel) {
    channel.addEventListener('message', handleMessage);
  }
  window.addEventListener('storage', handleStorage);

  return () => {
    if (channel) {
      channel.removeEventListener('message', handleMessage);
    }
    window.removeEventListener('storage', handleStorage);
  };
}

export function broadcastMessage(msg: StorageUpdateMessage) {
  try {
    if (channel) {
      channel.postMessage(msg);
    }
  } catch (e) {
    console.warn('Broadcast post error:', e);
  }
}

// Initial Realistic Orders demonstrating both paid and open/pending checks
export function getInitialOrders(): Order[] {
  const now = Date.now();
  return [
    {
      id: 'ord-101',
      orderNumber: 101,
      customerName: 'Carlos Eduardo',
      customerPhone: '(11) 98765-4321',
      orderType: 'mesa',
      tableOrComanda: 'Mesa 03',
      items: [
        {
          id: 'item-1',
          menuItemId: 'x-tudo',
          name: 'X-Tudo Campeão do Trailer - OPALA',
          kitchenName: 'X-Tudo Campeão do Trailer',
          unitPrice: 32.0,
          quantity: 1,
          breadType: 'Pão de Hambúrguer (Bola)',
          isCutInHalf: true,
          selectedExtras: [{ id: 'maionese_verde', name: 'Pote Maionese Verde', price: 3.0 }],
          removedIngredients: ['Milho'],
          notes: 'Pão bem tostado na chapa',
          totalPrice: 35.0,
        },
        {
          id: 'item-2',
          menuItemId: 'coca-cola-lata',
          name: 'Coca-Cola Original 350ml Lata',
          kitchenName: 'Coca-Cola Original 350ml Lata',
          unitPrice: 6.0,
          quantity: 1,
          selectedExtras: [],
          removedIngredients: [],
          totalPrice: 6.0,
        },
      ],
      subtotal: 41.0,
      discount: 0,
      serviceFee: 0,
      deliveryFee: 0,
      total: 41.0,
      paymentStatus: 'pendente', // Comanda em aberto! Aguardando cliente pedir a conta no Caixa
      payments: [],
      status: 'pronto',
      authorizationStatus: 'autorizado',
      createdAt: now - 22 * 60 * 1000,
      startedAt: now - 18 * 60 * 1000,
      readyAt: now - 5 * 60 * 1000,
    },
    {
      id: 'ord-102',
      orderNumber: 102,
      customerName: 'Mariana Lima',
      orderType: 'viagem',
      tableOrComanda: 'Balcão #08',
      items: [
        {
          id: 'item-3',
          menuItemId: 'maverick-v8',
          name: 'Double Bacon - HELLCAT',
          kitchenName: 'Double Bacon',
          unitPrice: 34.0,
          quantity: 1,
          breadType: 'Pão Francês',
          isCutInHalf: false,
          selectedExtras: [{ id: 'bacon', name: 'Bacon Crocante Extra', price: 5.0 }],
          removedIngredients: [],
          meatDoneness: 'ao_ponto',
          totalPrice: 39.0,
        },
        {
          id: 'item-4',
          menuItemId: 'batata-nitro',
          name: 'Porção de Batata Frita com Cheddar e Bacon',
          kitchenName: 'Batata Frita com Cheddar e Bacon',
          unitPrice: 32.0,
          quantity: 1,
          selectedExtras: [],
          removedIngredients: [],
          totalPrice: 32.0,
        },
      ],
      subtotal: 71.0,
      discount: 3.0,
      serviceFee: 0,
      deliveryFee: 0,
      total: 68.0,
      paymentStatus: 'pago',
      payments: [
        {
          id: 'pay-1',
          method: 'pix',
          amount: 68.0,
          feeRate: 0,
          feeAmount: 0,
          netAmount: 68.0,
        },
      ],
      status: 'na_chapa',
      authorizationStatus: 'autorizado',
      createdAt: now - 14 * 60 * 1000,
      startedAt: now - 10 * 60 * 1000,
      paidAt: now - 14 * 60 * 1000,
    },
    {
      id: 'ord-103',
      orderNumber: 103,
      customerName: 'Rodrigo Santoro',
      orderType: 'balcao',
      tableOrComanda: 'Balcão #12',
      items: [
        {
          id: 'item-6',
          menuItemId: 'saveiro-prensada',
          name: 'Cachorro Quente com Bacon - PASSAT',
          kitchenName: 'Cachorro Quente com Bacon',
          unitPrice: 20.0,
          quantity: 2,
          breadType: 'Pão de Hot Dog',
          isCutInHalf: true,
          selectedExtras: [{ id: 'catupiry', name: 'Catupiry Original', price: 5.0 }],
          removedIngredients: ['Ervilha', 'Vinagrete'],
          totalPrice: 45.0,
        },
        {
          id: 'item-7',
          menuItemId: 'suco-laranja',
          name: 'Suco de Laranja Natural 500ml',
          kitchenName: 'Suco de Laranja Natural 500ml',
          unitPrice: 9.0,
          quantity: 2,
          selectedExtras: [],
          removedIngredients: [],
          totalPrice: 18.0,
        },
      ],
      subtotal: 63.0,
      discount: 0,
      serviceFee: 0,
      deliveryFee: 0,
      total: 63.0,
      paymentStatus: 'pago',
      amountPaid: 70.0,
      change: 7.0,
      payments: [
        {
          id: 'pay-2',
          method: 'dinheiro',
          amount: 63.0,
          feeRate: 0,
          feeAmount: 0,
          netAmount: 63.0,
        },
      ],
      status: 'aguardando',
      authorizationStatus: 'autorizado',
      createdAt: now - 4 * 60 * 1000,
      paidAt: now - 4 * 60 * 1000,
    },
  ];
}

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      const initial = getInitialOrders();
      saveOrders(initial);
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading orders:', e);
    return getInitialOrders();
  }
}

export function saveOrders(orders: Order[]) {
  try {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    broadcastMessage({ type: 'ORDERS_UPDATED' });
  } catch (e) {
    console.error('Error saving orders:', e);
  }
}

export function loadMenu(): MenuItem[] {
  try {
    const raw = localStorage.getItem(MENU_KEY);
    if (!raw) {
      saveMenu(INITIAL_MENU);
      return INITIAL_MENU;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading menu:', e);
    return INITIAL_MENU;
  }
}

export function saveMenu(menu: MenuItem[]) {
  try {
    localStorage.setItem(MENU_KEY, JSON.stringify(menu));
    broadcastMessage({ type: 'MENU_UPDATED' });
  } catch (e) {
    console.error('Error saving menu:', e);
  }
}

export function loadCashRegister(): CashRegister {
  try {
    const raw = localStorage.getItem(CASH_KEY);
    if (!raw) {
      const initial: CashRegister = {
        id: `cash-${Date.now()}`,
        isOpen: true,
        openedAt: Date.now() - 4 * 3600 * 1000,
        operatorName: 'Adelio (Operador)',
        initialAmount: 150.0, // Fundo de troco inicial
        movements: [
          {
            id: 'mov-1',
            type: 'sangria',
            amount: 25.0,
            description: 'Compra de emergência: Saco de gelo e guardanapos',
            createdAt: Date.now() - 2 * 3600 * 1000,
            timeFormatted: '19:30',
          },
        ],
        rates: {
          debitoRate: 1.4, // 1.4%
          creditoRate: 3.2, // 3.2%
          pixRate: 0.0, // 0.0%
        },
      };
      saveCashRegister(initial);
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading cash register:', e);
    return {
      id: `cash-${Date.now()}`,
      isOpen: true,
      operatorName: 'Operador',
      initialAmount: 150.0,
      movements: [],
      rates: {
        debitoRate: 1.4,
        creditoRate: 3.2,
        pixRate: 0.0,
      },
    };
  }
}

export function saveCashRegister(cash: CashRegister) {
  try {
    localStorage.setItem(CASH_KEY, JSON.stringify(cash));
    broadcastMessage({ type: 'CASH_UPDATED' });
  } catch (e) {
    console.error('Error saving cash register:', e);
  }
}

export function notifyOrderCalled(order: Order) {
  try {
    localStorage.setItem(CALL_EVENT_KEY, JSON.stringify(order));
    broadcastMessage({ type: 'ORDER_CALLED', payload: order });
  } catch (e) {
    console.error('Error broadcasting called order:', e);
  }
}
