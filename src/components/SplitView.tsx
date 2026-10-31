import React from 'react';
import { MenuItem, Order, OrderStatus, CashRegister } from '../types/trailer';
import { OrdersWindow } from './OrdersWindow';
import { KitchenWindow } from './KitchenWindow';
import { CashierWindow } from './CashierWindow';
import { Columns3, ClipboardList, Flame, DollarSign } from 'lucide-react';

interface SplitViewProps {
  menu: MenuItem[];
  orders: Order[];
  cashRegister: CashRegister;
  onAddOrder: (newOrder: Order) => void;
  onUpdateOrder: (updatedOrder: Order) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateCashRegister: (updatedCash: CashRegister) => void;
  onUpdateMenu?: (updatedMenu: MenuItem[]) => void;
  onOpenMenuManager?: () => void;
}

export const SplitView: React.FC<SplitViewProps> = ({
  menu,
  orders,
  cashRegister,
  onAddOrder,
  onUpdateOrder,
  onUpdateOrderStatus,
  onUpdateCashRegister,
  onUpdateMenu,
  onOpenMenuManager,
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden">
      {/* Subheader info */}
      <div className="px-4 py-2 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 shrink-0">
        <div className="flex items-center gap-2">
          <Columns3 className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-white">Modo 3 Telas Divididas:</span>
          <span>1. Pedidos + 2. Cozinha + 3. Caixa sincronizados em tempo real</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1 text-neutral-300">
            <ClipboardList className="w-3.5 h-3.5 text-amber-400" /> Janela 1: Pedidos
          </span>
          <span className="flex items-center gap-1 text-neutral-300">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Janela 2: Cozinha
          </span>
          <span className="flex items-center gap-1 text-neutral-300">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Janela 3: Caixa
          </span>
        </div>
      </div>

      {/* 3-Panel Grid */}
      <div className="flex-1 grid grid-cols-1 xl:grid-cols-3 divide-y xl:divide-y-0 xl:divide-x divide-neutral-800 overflow-hidden">
        {/* Janela 1: Pedidos */}
        <div className="flex flex-col h-full overflow-hidden">
          <OrdersWindow
            menu={menu}
            orders={orders}
            onAddOrder={onAddOrder}
            onUpdateOrder={onUpdateOrder}
            rates={cashRegister.rates}
            onOpenMenuManager={onOpenMenuManager}
          />
        </div>

        {/* Janela 2: Cozinha */}
        <div className="flex flex-col h-full overflow-hidden">
          <KitchenWindow orders={orders} menu={menu} onUpdateOrderStatus={onUpdateOrderStatus} />
        </div>

        {/* Janela 3: Caixa */}
        <div className="flex flex-col h-full overflow-hidden">
          <CashierWindow
            orders={orders}
            cashRegister={cashRegister}
            menu={menu}
            onAddOrder={onAddOrder}
            onUpdateOrder={onUpdateOrder}
            onUpdateCashRegister={onUpdateCashRegister}
            onUpdateMenu={onUpdateMenu}
          />
        </div>
      </div>
    </div>
  );
};
