import React from 'react';
import { InventoryItem } from '../../types';

interface TraceabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
}

export const TraceabilityModal: React.FC<TraceabilityModalProps> = ({
  isOpen,
  onClose,
  item
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-[#dee8ff] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006947] text-[22px]">
              verified_user
            </span>
            <h3 className="text-[15px] font-bold text-[#111c2d]">Trazabilidad Sanitaria</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center hover:bg-[#ffd9dd]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="py-4 space-y-3">
          <div className="flex items-center justify-center py-2">
            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-[#dee8ff] flex flex-col items-center">
              <span className="material-symbols-outlined text-[72px] text-[#111c2d]">qr_code_2</span>
              <span className="text-[10px] text-[#574144] font-mono mt-1 font-bold">
                INVIMA-CO-2026-X8849
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-[12px] bg-[#f0f3ff] p-3 rounded-2xl border border-[#dee8ff]">
            <div className="flex justify-between">
              <span className="text-[#574144]">Producto:</span>
              <strong className="text-[#111c2d] truncate max-w-[180px]">{item.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#574144]">SKU de Fábrica:</span>
              <strong className="text-[#111c2d]">{item.sku}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#574144]">Lote de Producción:</span>
              <strong className="text-[#006947]">{item.lot}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#574144]">Registro Sanitario:</span>
              <span className="text-[#111c2d] font-semibold">NSOC98421-22CO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#574144]">Ubicación Físcia:</span>
              <span className="text-[#111c2d]">{item.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#574144]">Vencimiento:</span>
              <strong className="text-[#111c2d]">{item.expiryDate}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#574144]">Temperatura de Custodia:</span>
              <span className="text-[#111c2d]">18°C - 24°C (Óptima)</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 rounded-full bg-[#a72e4b] text-white text-[12px] font-bold shadow-md hover:bg-[#c74763]"
        >
          Cerrar Trazabilidad
        </button>
      </div>
    </div>
  );
};
