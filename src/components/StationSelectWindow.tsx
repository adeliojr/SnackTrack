import React, { useState } from 'react';
import { StationRole } from '../types/trailer';
import {
  Smartphone,
  Monitor,
  Tablet,
  Columns3,
  Check,
  ShieldCheck,
  Flame,
  ArrowRight,
  Sparkles,
  Share2,
  Tv,
  MessageCircle,
  UtensilsCrossed,
} from 'lucide-react';

interface StationSelectWindowProps {
  onSelectStation: (station: StationRole, rememberDevice: boolean) => void;
  onOpenSplitView: () => void;
  onOpenShareLinks: () => void;
  onOpenMenuManager?: () => void;
  menuCount?: number;
  pendingAuthorizationsCount: number;
  cookingOrdersCount: number;
}

export const StationSelectWindow: React.FC<StationSelectWindowProps> = ({
  onSelectStation,
  onOpenSplitView,
  onOpenShareLinks,
  onOpenMenuManager,
  menuCount,
  pendingAuthorizationsCount,
  cookingOrdersCount,
}) => {
  const [remember, setRemember] = useState(true);

  return (
    <div className="min-h-full flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 select-none">
      <div className="w-full max-w-4xl space-y-6 sm:space-y-8 my-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-400 text-neutral-950 font-black text-2xl shadow-xl shadow-amber-500/20 mb-2">
            🍔
          </div>
          <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight text-white uppercase">
            TRAILER <span className="text-amber-400 font-extrabold">PRO</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Selecione qual estação este dispositivo irá operar no trailer:
          </p>

          {/* Quick Actions Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={onOpenShareLinks}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 hover:to-emerald-500/30 border border-amber-500/40 rounded-2xl text-xs sm:text-sm font-bold text-amber-300 hover:text-white transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Enviar Links para o Trailer (WhatsApp / QR Code)</span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/30 ml-0.5" />
            </button>

            {onOpenMenuManager && (
              <button
                type="button"
                onClick={onOpenMenuManager}
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-400 rounded-2xl text-xs sm:text-sm font-bold text-neutral-200 hover:text-white transition-all shadow-md cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <span>Cardápio & Preços {menuCount ? `(${menuCount})` : ''}</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Main Stations Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {/* Estação 1: Atendimento (Celular) */}
          <div
            onClick={() => onSelectStation('atendimento', remember)}
            className="group relative bg-neutral-900/90 border-2 border-neutral-800 hover:border-amber-400 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Dispositivo: Celular
                </span>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">
                  Garçom / Balcão
                </span>
              </div>

              <h2 className="font-black text-xl text-white mb-2 group-hover:text-amber-300 transition-colors">
                1. Atendimento
              </h2>

              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Otimizado para a tela do celular do atendente. Anota pedidos nas mesas com nomes de carros, adicionais e envia para <strong>aprovação do Caixa</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-300 group-hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                Abrir Atendimento
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Estação 2: Caixa (Computador) */}
          <div
            onClick={() => onSelectStation('caixa', remember)}
            className="group relative bg-neutral-900/90 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 ring-1 ring-emerald-500/30"
          >
            {pendingAuthorizationsCount > 0 && (
              <span className="absolute -top-3 right-6 bg-red-500 text-white font-mono font-bold text-xs px-2.5 py-0.5 rounded-full shadow-lg animate-bounce">
                {pendingAuthorizationsCount} p/ autorizar!
              </span>
            )}

            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30 group-hover:scale-110 transition-transform">
                <Monitor className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Dispositivo: Computador
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-800">
                  Central de Decisões
                </span>
              </div>

              <h2 className="font-black text-xl text-white mb-2 group-hover:text-emerald-300 transition-colors">
                2. Caixa Central
              </h2>

              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                <strong>Autoriza pedidos do atendimento</strong>, controla as comandas, recebe pagamentos (Pix, cartões divididos, troco), sangrias e fechamento de caixa.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-300 group-hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
                Abrir Caixa
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Estação 3: Cozinha (Tablet) */}
          <div
            onClick={() => onSelectStation('cozinha', remember)}
            className="group relative bg-neutral-900/90 border-2 border-neutral-800 hover:border-orange-500 rounded-3xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-500/10"
          >
            {cookingOrdersCount > 0 && (
              <span className="absolute -top-3 right-6 bg-amber-500 text-neutral-950 font-mono font-bold text-xs px-2.5 py-0.5 rounded-full shadow-lg">
                {cookingOrdersCount} na fila
              </span>
            )}

            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-4 border border-orange-500/30 group-hover:scale-110 transition-transform">
                <Tablet className="w-6 h-6" />
              </div>

              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">
                  Dispositivo: Tablet
                </span>
                <span className="text-[10px] bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">
                  Chapa & Montagem
                </span>
              </div>

              <h2 className="font-black text-xl text-white mb-2 group-hover:text-orange-300 transition-colors">
                3. Cozinha (KDS)
              </h2>

              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Recebe <strong>somente os pedidos autorizados pelo caixa</strong>. Exibe a montagem dos lanches, ponto da carne, cronômetro e alertas em vermelho de itens retirados.
              </p>
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-300 group-hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                Abrir Cozinha
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Options: Remember & Extra stations */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 border-t border-neutral-800/60">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-amber-500 focus:ring-0"
            />
            <span>Lembrar esta estação neste aparelho (abrir direto nas próximas vezes)</span>
          </label>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              type="button"
              onClick={() => onSelectStation('tv', remember)}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors font-semibold"
              title="Abrir tela cheia para TV ou monitor do salão com chamada de voz"
            >
              <Tv className="w-4 h-4 text-blue-400" />
              <span>Painel TV (Clientes)</span>
            </button>

            <button
              type="button"
              onClick={onOpenSplitView}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-xl transition-colors font-semibold"
            >
              <Columns3 className="w-4 h-4 text-amber-400" />
              <span>Modo 3 Telas Divididas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
