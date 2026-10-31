import React from 'react';
import { WindowTab } from '../types/trailer';
import { ClipboardList, Flame, DollarSign, Columns3, Tv, ExternalLink } from 'lucide-react';

interface NavbarProps {
  currentTab: WindowTab;
  onChangeTab: (tab: WindowTab) => void;
  openOrdersCount: number;
  cookingOrdersCount: number;
  readyOrdersCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onChangeTab,
  openOrdersCount,
  cookingOrdersCount,
  readyOrdersCount,
}) => {
  const openExternalWindow = (tab: WindowTab) => {
    const url = `${window.location.origin}${window.location.pathname}?window=${tab}`;
    window.open(url, `_blank_${tab}`, 'width=1280,height=800,menubar=no,toolbar=no');
  };

  return (
    <header className="h-16 px-4 lg:px-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between gap-4 lg:gap-8 shrink-0 z-30 select-none">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-black text-neutral-950 text-base shadow">
          🍔
        </span>
        <button
          onClick={() => onChangeTab('pedidos')}
          className="text-base lg:text-lg font-black tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 text-left"
        >
          TRAILER <span className="text-amber-400 font-extrabold">PRO</span>
        </button>
      </div>

      {/* Zone 2: The 3 Exact Core Operational Windows + Split View */}
      <nav className="flex items-center gap-1.5 lg:gap-2 overflow-x-auto scrollbar-none py-1">
        {/* Janela 1: Pedidos */}
        <button
          onClick={() => onChangeTab('pedidos')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            currentTab === 'pedidos'
              ? 'bg-amber-400 text-neutral-950 shadow-sm'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <ClipboardList className="w-4 h-4" />
          <span>1. Pedidos</span>
        </button>

        {/* Janela 2: Cozinha */}
        <button
          onClick={() => onChangeTab('cozinha')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap shrink-0 relative ${
            currentTab === 'cozinha'
              ? 'bg-amber-400 text-neutral-950 shadow-sm'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>2. Cozinha</span>
          {cookingOrdersCount > 0 && (
            <span
              className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                currentTab === 'cozinha'
                  ? 'bg-neutral-950 text-amber-300'
                  : 'bg-amber-500 text-neutral-950'
              }`}
            >
              {cookingOrdersCount}
            </span>
          )}
        </button>

        {/* Janela 3: Caixa */}
        <button
          onClick={() => onChangeTab('caixa')}
          className={`flex items-center gap-2 px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all whitespace-nowrap shrink-0 relative ${
            currentTab === 'caixa'
              ? 'bg-amber-400 text-neutral-950 shadow-sm'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>3. Caixa</span>
          {openOrdersCount > 0 && (
            <span
              className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                currentTab === 'caixa'
                  ? 'bg-neutral-950 text-emerald-300'
                  : 'bg-emerald-500 text-neutral-950'
              }`}
              title="Comandas em aberto aguardando pagamento"
            >
              {openOrdersCount} abertas
            </span>
          )}
        </button>

        {/* Modo 3 Telas Divididas */}
        <button
          onClick={() => onChangeTab('split')}
          className={`hidden md:flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            currentTab === 'split'
              ? 'bg-amber-400 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Columns3 className="w-4 h-4" />
          <span>3 Telas Divididas</span>
        </button>

        {/* Painel TV (Opcional) */}
        <button
          onClick={() => onChangeTab('tv')}
          className={`hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
            currentTab === 'tv'
              ? 'bg-amber-400 text-neutral-950 shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>Painel TV</span>
          {readyOrdersCount > 0 && (
            <span className="font-mono text-[10px] px-1 rounded bg-neutral-800 text-emerald-400">
              {readyOrdersCount}
            </span>
          )}
        </button>
      </nav>

      {/* Zone 3: Primary Action (Open External Window / Popout) */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => openExternalWindow(currentTab === 'split' ? 'caixa' : currentTab)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-neutral-700 bg-neutral-950 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors whitespace-nowrap shrink-0"
          title="Abre a janela selecionada em uma tela ou aba separada para monitores múltiplos"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nova Janela</span>
        </button>
      </div>
    </header>
  );
};
