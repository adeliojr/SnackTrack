import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  Monitor,
  Tablet,
  Tv,
  QrCode,
  Share2,
  Sparkles,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';

interface ShareLinksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareLinksModal: React.FC<ShareLinksModalProps> = ({ isOpen, onClose }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrId, setActiveQrId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Base URL from current browser or fallback
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://ais-pre-ouk7m7uah7pylixqa37wbt-425411440698.us-east5.run.app';
  const pathname = typeof window !== 'undefined' && window.location.pathname ? window.location.pathname : '/';
  const cleanBase = `${origin}${pathname === '/' ? '' : pathname}`;

  const stations = [
    {
      id: 'geral',
      title: 'Link Geral (Menu do Trailer)',
      role: 'Tela Inicial / Escolha de Estação',
      device: 'Qualquer aparelho',
      icon: Sparkles,
      color: 'amber',
      url: `${origin}/`,
      description: 'Abre a tela inicial para a pessoa escolher qual estação usar no trailer (com opção de lembrar o aparelho).',
      whatsappText: `🍔 *TRAILER PRO - LINK GERAL*\nAcesse o sistema do trailer por aqui e selecione sua estação:\n${origin}/`,
    },
    {
      id: 'atendimento',
      title: '1. Atendimento / Garçom',
      role: 'Anotar pedidos nas mesas & balcão',
      device: 'Celular (Android ou iPhone)',
      icon: Smartphone,
      color: 'amber',
      url: `${origin}/?station=atendimento`,
      description: 'Abre direto na tela de anotação rápida de lanches, porções e bebidas para garçons e atendentes.',
      whatsappText: `📱 *TRAILER PRO - ATENDIMENTO / GARÇOM*\nLink direto para o celular do garçom anotar os pedidos:\n${origin}/?station=atendimento`,
    },
    {
      id: 'caixa',
      title: '2. Caixa Central',
      role: 'Autorizar comandas & pagamentos',
      device: 'Computador ou Notebook',
      icon: Monitor,
      color: 'emerald',
      url: `${origin}/?station=caixa`,
      description: 'Abre direto na central do operador de caixa: autoriza pedidos para a cozinha, edita comandas e fecha contas.',
      whatsappText: `💻 *TRAILER PRO - CAIXA CENTRAL*\nLink direto para o computador do caixa gerenciar e autorizar pedidos:\n${origin}/?station=caixa`,
    },
    {
      id: 'cozinha',
      title: '3. Cozinha / Chapa (KDS)',
      role: 'Preparo & montagem dos lanches',
      device: 'Tablet na Chapa ou Monitor',
      icon: Tablet,
      color: 'orange',
      url: `${origin}/?station=cozinha`,
      description: 'Abre direto no monitor da chapa com os lanches autorizados, ponto da carne, cronômetro e aviso sonoro.',
      whatsappText: `👨‍🍳 *TRAILER PRO - COZINHA / CHAPA (KDS)*\nLink direto para o tablet da cozinha ver os pedidos autorizados:\n${origin}/?station=cozinha`,
    },
    {
      id: 'tv',
      title: '4. Painel TV / Chamada de Senhas',
      role: 'Chamada com voz para clientes',
      device: 'TV Smart ou Monitor do Salão',
      icon: Tv,
      color: 'blue',
      url: `${origin}/?station=tv`,
      description: 'Exibe os pedidos em preparo e chama com voz e aviso sonoro as senhas prontas para retirada.',
      whatsappText: `📺 *TRAILER PRO - PAINEL TV DE SENHAS*\nLink direto para a TV ou tela dos clientes:\n${origin}/?station=tv`,
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleShareWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleShareAllWhatsApp = () => {
    const fullText = `🍔 *TRAILER PRO - LINKS DE ACESSO DO SISTEMA*\n\n` +
      `📱 *1. Garçom / Atendente (Celular):*\n${origin}/?station=atendimento\n\n` +
      `💻 *2. Caixa Central (Computador):*\n${origin}/?station=caixa\n\n` +
      `👨‍🍳 *3. Cozinha / Chapa (Tablet):*\n${origin}/?station=cozinha\n\n` +
      `📺 *4. Painel TV de Senhas (Clientes):*\n${origin}/?station=tv\n\n` +
      `🌐 *Link Geral (Menu de Estações):*\n${origin}/\n\n` +
      `💡 *Dica:* No celular/tablet, abra o link no navegador e toque em "Adicionar à tela inicial" para usar como aplicativo!`;

    const encoded = encodeURIComponent(fullText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-neutral-100">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center font-black shadow-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                Links de Acesso do Trailer
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold">
                  Pronto para uso
                </span>
              </h2>
              <p className="text-xs text-neutral-400">
                Copie o link direto de cada estação ou envie para a equipe no WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Banner: Enviar tudo no WhatsApp */}
        <div className="bg-gradient-to-r from-emerald-950/60 via-neutral-900 to-neutral-900 border-b border-emerald-900/40 p-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-emerald-200">
            <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Quer mandar para o grupo da equipe?</strong> Clique ao lado para enviar todos os links formatados no WhatsApp!
            </span>
          </div>

          <button
            onClick={handleShareAllWhatsApp}
            className="w-full sm:w-auto shrink-0 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Enviar Todos no WhatsApp</span>
          </button>
        </div>

        {/* Stations Links List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {stations.map((st) => {
            const Icon = st.icon;
            const isCopied = copiedId === st.id;
            const isQrOpen = activeQrId === st.id;
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(st.url)}`;

            const borderTheme =
              st.color === 'emerald'
                ? 'border-emerald-500/40 hover:border-emerald-400'
                : st.color === 'orange'
                ? 'border-orange-500/40 hover:border-orange-400'
                : st.color === 'blue'
                ? 'border-blue-500/40 hover:border-blue-400'
                : 'border-amber-500/40 hover:border-amber-400';

            const bgIcon =
              st.color === 'emerald'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : st.color === 'orange'
                ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                : st.color === 'blue'
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                : 'bg-amber-500/20 text-amber-400 border-amber-500/30';

            return (
              <div
                key={st.id}
                className={`bg-neutral-950/70 border-2 ${borderTheme} rounded-2xl p-4 transition-all duration-150 space-y-3`}
              >
                {/* Station Info Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${bgIcon}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-sm sm:text-base text-white">{st.title}</h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 font-bold">
                          {st.device}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400">{st.role}</p>
                    </div>
                  </div>

                  {/* Actions for this station */}
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      onClick={() => setActiveQrId(isQrOpen ? null : st.id)}
                      className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-colors ${
                        isQrOpen
                          ? 'bg-neutral-800 border-neutral-600 text-white'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                      title="Exibir QR Code para câmera do celular/tablet"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{isQrOpen ? 'Ocultar QR' : 'QR Code'}</span>
                    </button>

                    <button
                      onClick={() => handleShareWhatsApp(st.whatsappText)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      title="Enviar este link específico no WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>

                    <a
                      href={st.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-bold flex items-center gap-1 transition-colors"
                      title="Abrir em uma nova aba"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Abrir</span>
                    </a>
                  </div>
                </div>

                {/* URL Display and Copy Button */}
                <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 rounded-xl p-1.5 pl-3">
                  <span className="text-xs font-mono text-neutral-300 truncate select-all flex-1">
                    {st.url}
                  </span>

                  <button
                    onClick={() => handleCopy(st.id, st.url)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all ${
                      isCopied
                        ? 'bg-emerald-500 text-neutral-950'
                        : 'bg-neutral-800 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* QR Code Expansion */}
                {isQrOpen && (
                  <div className="pt-3 pb-1 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center gap-4 bg-neutral-900/40 rounded-xl p-3 animate-in fade-in duration-150">
                    <div className="p-2 bg-white rounded-xl shadow-lg shrink-0">
                      <img
                        src={qrUrl}
                        alt={`QR Code ${st.title}`}
                        className="w-32 h-32 sm:w-36 sm:h-36 block"
                      />
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                      <h4 className="font-bold text-sm text-white flex items-center justify-center sm:justify-start gap-1.5">
                        <QrCode className="w-4 h-4 text-amber-400" />
                        Aponte a câmera do {st.device.toLowerCase()}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed max-w-md">
                        Abra o aplicativo de câmera no celular ou tablet e aponte para este QR Code. A página da estação abrirá diretamente no navegador sem precisar digitar nada!
                      </p>
                      <p className="text-[11px] text-amber-400 font-medium">
                        URL vinculada: <span className="font-mono">{st.url}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Dica de como instalar como Aplicativo (PWA) */}
          <div className="bg-neutral-950/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Como usar como aplicativo no Celular ou Tablet (sem baixar nada)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-neutral-300">
              <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  No Android (Google Chrome):
                </p>
                <p className="text-neutral-400 text-[11px]">
                  Abra o link no Chrome, toque nos <strong>3 pontinhos (⋮)</strong> no canto superior direito e clique em <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar aplicativo"</strong>.
                </p>
              </div>

              <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  No iPhone ou iPad (Safari):
                </p>
                <p className="text-neutral-400 text-[11px]">
                  Abra o link no Safari, toque no botão <strong>Compartilhar</strong> (ícone do quadrado com a setinha para cima) e selecione <strong>"Adicionar à Tela de Início"</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950/70 flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            Trailer Pro • Pronto para operação em múltiplos dispositivos
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
