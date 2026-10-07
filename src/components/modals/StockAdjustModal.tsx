import React, { useState } from 'react';
import { InventoryItem } from '../../types';

interface StockAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onConfirmAdjust: (itemId: string, newStock: number, reason: string) => void;
  onShowToast: (message: string) => void;
}

export const StockAdjustModal: React.FC<StockAdjustModalProps> = ({
  isOpen,
  onClose,
  item,
  onConfirmAdjust,
  onShowToast
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(item.stockActual);
  const [reason, setReason] = useState('Reabastecimiento regular');

  const reasons = [
    'Reabastecimiento regular',
    'Conteo físico / Cuadre',
    'Merma por daño cosmético',
    'Entrega muestra promocional',
    'Devolución de cliente'
  ];

  const handleSave = () => {
    onConfirmAdjust(item.id, quantity, reason);
    onShowToast(`Stock de ${item.name} actualizado a ${quantity} uds`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-[#dee8ff] p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a72e4b] text-[20px]">edit_note</span>
            <h3 className="text-[15px] font-bold text-[#111c2d]">Ajuste de Existencias</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center hover:bg-[#ffd9dd]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="py-3 space-y-3">
          <div className="flex items-center gap-3 bg-[#f0f3ff] p-2.5 rounded-xl border border-[#dee8ff]">
            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] text-[#a72e4b] font-bold block">{item.sku}</span>
              <h4 className="text-[12px] font-bold text-[#111c2d] truncate">{item.name}</h4>
              <span className="text-[10px] text-[#574144] block">Lote: {item.lot}</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#111c2d] block mb-1">
              Nueva Cantidad en Físico
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 5))}
                className="w-9 h-9 rounded-xl bg-[#e7eeff] font-bold text-[#111c2d] hover:bg-[#ffd9dd]"
              >
                -5
              </button>
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                className="w-9 h-9 rounded-xl bg-[#e7eeff] font-bold text-[#111c2d] hover:bg-[#ffd9dd]"
              >
                -1
              </button>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
                className="flex-1 h-10 text-center font-bold text-[16px] text-[#a72e4b] bg-[#f0f3ff] rounded-xl border border-[#dee8ff]"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-xl bg-[#e7eeff] font-bold text-[#111c2d] hover:bg-[#ffd9dd]"
              >
                +1
              </button>
              <button
                onClick={() => setQuantity((q) => q + 5)}
                className="w-9 h-9 rounded-xl bg-[#e7eeff] font-bold text-[#111c2d] hover:bg-[#ffd9dd]"
              >
                +5
              </button>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#111c2d] block mb-1">
              Motivo del Ajuste
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[12px] text-[#111c2d] border border-[#dee8ff]"
            >
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-full bg-[#f0f3ff] text-[#574144] text-[12px] font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-10 rounded-full bg-[#a72e4b] text-white text-[12px] font-bold shadow-md hover:bg-[#c74763]"
          >
            Confirmar Ajuste
          </button>
        </div>
      </div>
    </div>
  );
};
