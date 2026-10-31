import React, { useState, useEffect } from 'react';
import { Order } from '../types/trailer';
import { playCallChime, speakOrder } from '../utils/audio';
import {
  Bell,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Flame,
  Clock,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CustomerTvWindowProps {
  orders: Order[];
  lastCalledOrder?: Order | null;
}

export const CustomerTvWindow: React.FC<CustomerTvWindowProps> = ({ orders, lastCalledOrder }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeCallOrder, setActiveCallOrder] = useState<Order | null>(null);

  // Ready orders and cooking orders
  const readyOrders = orders.filter((o) => o.status === 'pronto');
  const cookingOrders = orders.filter((o) => o.status === 'na_chapa' || o.status === 'aguardando');

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync latest called order from prop or latest ready
  useEffect(() => {
    if (lastCalledOrder) {
      setActiveCallOrder(lastCalledOrder);
      triggerConfetti();
    } else if (readyOrders.length > 0 && !activeCallOrder) {
      setActiveCallOrder(readyOrders[0]);
    }
  }, [lastCalledOrder, readyOrders]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }
  };

  const handleManualCall = (order: Order) => {
    setActiveCallOrder(order);
    playCallChime();
    if (voiceEnabled) {
      speakOrder(order.orderNumber, order.customerName);
    }
    triggerConfetti();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formattedTime = currentDateTime.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const formattedDate = currentDateTime.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 text-neutral-100 overflow-hidden select-none">
      {/* TV Header */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/90 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-neutral-950 font-black text-xl shadow-lg">
            🍔
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-white uppercase">
              TRAILER PRO <span className="text-amber-400 font-semibold text-sm">| PAINEL DE RETIRADA</span>
            </h1>
            <p className="text-xs text-neutral-400 capitalize">{formattedDate}</p>
          </div>
        </div>

        {/* Digital Clock & Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-neutral-950 border border-neutral-800 px-4 py-1.5 rounded-xl text-center shadow-inner">
            <span className="font-mono font-black text-xl tracking-wider text-amber-400 tabular-nums">
              {formattedTime}
            </span>
          </div>

          <button
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              voiceEnabled
                ? 'bg-neutral-800 border-neutral-700 text-amber-400'
                : 'bg-neutral-900 border-neutral-800 text-neutral-500'
            }`}
            title="Locutor de voz automática"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{voiceEnabled ? 'Voz Ativada' : 'Sem Voz'}</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl text-neutral-300 hover:text-white transition-colors"
            title="Modo Tela Cheia (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main TV Layout */}
      <div className="flex-1 p-4 lg:p-6 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* LEFT / HERO SECTION: Última Senha Chamada */}
        <div className="w-full lg:w-5/12 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 border-2 border-amber-400/80 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-amber-500/10 shrink-0">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs lg:text-sm font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Bell className="w-4 h-4 animate-bounce" />
                ÚLTIMA SENHA CHAMADA
              </span>
              <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full uppercase">
                Balcão de Entrega
              </span>
            </div>

            {activeCallOrder ? (
              <div className="text-center py-6 lg:py-10">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                  Retirar Agora
                </span>

                <div className="font-mono font-black text-7xl sm:text-8xl lg:text-9xl text-amber-400 tracking-tight drop-shadow-md select-text">
                  #{String(activeCallOrder.orderNumber).padStart(3, '0')}
                </div>

                <div className="mt-4 font-extrabold text-2xl lg:text-3xl text-white tracking-wide uppercase">
                  {activeCallOrder.customerName}
                </div>

                <div className="mt-2 text-sm text-neutral-400">
                  {activeCallOrder.orderType === 'balcao'
                    ? 'Consumo no Local'
                    : activeCallOrder.orderType === 'viagem'
                    ? 'Embalado para Viagem'
                    : 'Pedido para Entrega'}
                </div>

                {/* Items summary */}
                <div className="mt-6 pt-6 border-t border-neutral-800/80 max-w-sm mx-auto text-xs text-neutral-300">
                  <span className="text-neutral-500 uppercase font-semibold block mb-1">Itens do Pedido:</span>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {activeCallOrder.items.map((it, idx) => (
                      <span key={idx} className="bg-neutral-800 px-2 py-1 rounded-md font-medium">
                        {it.quantity}x {it.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-neutral-500">
                <Bell className="w-16 h-16 stroke-[1.2] mx-auto mb-3 text-neutral-600 opacity-60" />
                <h3 className="font-bold text-lg text-neutral-300">Aguardando Chamada</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Os pedidos prontos na cozinha serão destacados e anunciados aqui automaticamente.
                </p>
              </div>
            )}
          </div>

          {/* Action button to re-announce */}
          {activeCallOrder && (
            <button
              onClick={() => handleManualCall(activeCallOrder)}
              className="w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-98"
            >
              <Volume2 className="w-4 h-4" />
              <span>Chamar Senha Novamente (Ding-Dong)</span>
            </button>
          )}
        </div>

        {/* RIGHT SECTION: Grid of Ready Orders & In-Prep Orders */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 overflow-hidden">
          {/* Column 1: PRONTOS PARA RETIRADA */}
          <div className="flex flex-col bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-base text-white uppercase tracking-wider">
                  Prontos para Retirada
                </h3>
              </div>
              <span className="font-mono text-xs font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full">
                {readyOrders.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {readyOrders.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center p-6 text-neutral-500 text-xs">
                  Nenhum pedido aguardando retirada no momento
                </div>
              ) : (
                readyOrders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => handleManualCall(ord)}
                    className="group bg-neutral-950 border border-emerald-500/40 hover:border-emerald-400 rounded-xl p-3 flex items-center justify-between cursor-pointer transition-all hover:bg-neutral-900"
                  >
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono font-black text-2xl text-emerald-400">
                          #{String(ord.orderNumber).padStart(3, '0')}
                        </span>
                        <span className="font-bold text-sm text-white">{ord.customerName}</span>
                      </div>
                      <div className="text-xs text-neutral-400 mt-0.5">
                        {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="p-2 bg-neutral-900 group-hover:bg-emerald-500 group-hover:text-neutral-950 rounded-lg text-emerald-400 transition-colors"
                      title="Chamar no painel"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column 2: EM PREPARO NA CHAPA */}
          <div className="flex flex-col bg-neutral-900/70 border border-neutral-800 rounded-2xl p-4 overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base text-white uppercase tracking-wider">
                  Em Preparo na Chapa
                </h3>
              </div>
              <span className="font-mono text-xs font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full">
                {cookingOrders.length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {cookingOrders.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center p-6 text-neutral-500 text-xs">
                  Sem pedidos em preparo no momento
                </div>
              ) : (
                cookingOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono font-bold text-lg text-amber-400">
                          #{String(ord.orderNumber).padStart(3, '0')}
                        </span>
                        <span className="font-semibold text-xs text-neutral-200">{ord.customerName}</span>
                      </div>
                      <span className="text-[11px] text-neutral-400">
                        {ord.status === 'na_chapa' ? '🔥 Grelhando na Chapa' : '⏳ Na Fila de Espera'}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-1 rounded-md ${
                        ord.status === 'na_chapa'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {ord.status === 'na_chapa' ? 'Na Chapa' : 'Aguardando'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="px-6 py-2.5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 shrink-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-amber-400">BOM APETITE!</span>
          <span>Apresente sua senha para retirada</span>
          <span className="hidden sm:inline text-neutral-600">·</span>
          <span className="hidden sm:inline">Instagram: @trailerlanches</span>
        </div>
        <div className="text-neutral-500 text-[11px]">
          Trailer Pro KDS · Painel do Cliente
        </div>
      </div>
    </div>
  );
};
