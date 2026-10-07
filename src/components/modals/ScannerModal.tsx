import React, { useState } from 'react';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanResult: (sku: string) => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  onScanResult
}) => {
  const [torchOn, setTorchOn] = useState(false);
  const [customCode, setCustomCode] = useState('');

  if (!isOpen) return null;

  const quickDemos = [
    { label: 'Labial Berry Kiss', sku: 'SKU-8821' },
    { label: 'Serum Hialurónico', sku: 'SKU-4192' },
    { label: 'Agua Micelar 200ml', sku: 'SKU-7730' },
    { label: 'Base Iluminadora', sku: 'BLQ-WS-04' },
    { label: 'Bloqueador FPS 50+', sku: 'SKU-3120' }
  ];

  const handleSelectCode = (sku: string) => {
    onScanResult(sku);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111c2d] text-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a72e4b] text-[22px]">
              barcode_scanner
            </span>
            <h3 className="text-[15px] font-bold">Lector Óptico de Códigos</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 text-white/80 hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative aspect-square w-full bg-black/80 flex items-center justify-center overflow-hidden">
          {/* Animated red laser scanning line */}
          <div className="absolute inset-x-8 h-0.5 bg-[#a72e4b] shadow-[0_0_12px_#a72e4b] animate-bounce"></div>

          {/* Target Corners */}
          <div className="w-56 h-56 border-2 border-[#a72e4b] rounded-2xl relative flex flex-col justify-between p-2">
            <div className="flex justify-between">
              <span className="w-4 h-4 border-t-2 border-l-2 border-white"></span>
              <span className="w-4 h-4 border-t-2 border-r-2 border-white"></span>
            </div>
            <p className="text-[11px] text-center text-white/80 font-medium bg-black/40 py-1 rounded-full px-2">
              Alinea el código de barras o QR
            </p>
            <div className="flex justify-between">
              <span className="w-4 h-4 border-b-2 border-l-2 border-white"></span>
              <span className="w-4 h-4 border-b-2 border-r-2 border-white"></span>
            </div>
          </div>

          {/* Torch Button */}
          <button
            onClick={() => setTorchOn(!torchOn)}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              torchOn ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/50' : 'bg-white/20 text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {torchOn ? 'flashlight_on' : 'flashlight_off'}
            </span>
          </button>
        </div>

        {/* Manual SKU input & Quick simulation buttons */}
        <div className="p-4 bg-[#111c2d] space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Digitar código manual..."
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customCode) {
                  handleSelectCode(customCode);
                }
              }}
              className="flex-1 h-10 px-3 bg-white/10 rounded-xl text-[13px] text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#a72e4b]"
            />
            <button
              onClick={() => customCode && handleSelectCode(customCode)}
              className="px-4 h-10 rounded-xl bg-[#a72e4b] text-white text-[12px] font-bold active:scale-95 transition-all"
            >
              OK
            </button>
          </div>

          <div>
            <span className="text-[11px] text-white/60 block mb-1.5 font-medium">
              O simula escanear un producto de prueba:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickDemos.map((demo) => (
                <button
                  key={demo.sku}
                  onClick={() => handleSelectCode(demo.sku)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#a72e4b] text-white text-[11px] font-semibold transition-all border border-white/5 active:scale-95"
                >
                  {demo.label} ({demo.sku})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
