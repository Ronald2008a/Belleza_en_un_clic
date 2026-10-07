import React, { useState } from 'react';
import { InventoryItem } from '../../types';

interface NewStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNewStock: (item: Partial<InventoryItem>) => void;
  onShowToast: (message: string) => void;
}

export const NewStockModal: React.FC<NewStockModalProps> = ({
  isOpen,
  onClose,
  onAddNewStock,
  onShowToast
}) => {
  const [productName, setProductName] = useState('');
  const [brand, setBrand] = useState('GLOWLAB');
  const [sku, setSku] = useState('');
  const [lot, setLot] = useState('L-2026-12');
  const [quantity, setQuantity] = useState(25);
  const [location, setLocation] = useState('Pasillo B • Estante 2');
  const [expiryDate, setExpiryDate] = useState('20/Dic/2027');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !sku.trim()) return;

    onAddNewStock({
      id: 'inv-' + Date.now(),
      name: productName.trim(),
      brand: brand.toUpperCase(),
      sku: sku.trim().toUpperCase(),
      variant: 'Edición Estándar',
      category: 'Cosméticos',
      status: 'optimo',
      lot,
      location,
      expiryDate,
      stockActual: Number(quantity),
      stockMinimo: 10,
      healthPercent: 100,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCtbc04sPgFCdJ2ALKodTcfa7_j1GRublHOTiaxekeJcAemSE6XiS4WV4nuF7qkaWg4JQbugzI2QHUX_CzB4L6wzsCx5QRGPRiQfbILsEbVab33tb4cjDQA96xcl_eg6yrXkdnq-H-CPHuo7N8I8vPQx4aAODPKwmRaV_SHUcTQ5Rf8xMRv6YJBakUT7EBA37xmBwg73fMHtIKemJm5_Oh2cj5h34mWsDUPl3mcIww0RXrX-TrFrudf-Q'
    });

    onShowToast(`Entrada registrada: +${quantity} uds de ${productName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-[#dee8ff] p-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a72e4b] text-[22px]">add_box</span>
            <h3 className="text-[16px] font-bold text-[#111c2d]">Nueva Entrada de Inventario</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center hover:bg-[#ffd9dd]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-3">
          <div>
            <label className="text-[11px] font-bold text-[#111c2d] block mb-1">
              Nombre del Producto *
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Serum Niacinamida 10%"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[13px] text-[#111c2d] border border-[#dee8ff] focus:ring-2 focus:ring-[#a72e4b]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-[#111c2d] block mb-1">Marca</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[13px] text-[#111c2d] border border-[#dee8ff]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#111c2d] block mb-1">SKU *</label>
              <input
                type="text"
                required
                placeholder="Ej. SER-NC-10"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[13px] text-[#111c2d] border border-[#dee8ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-[#111c2d] block mb-1">
                Lote de Fabricación
              </label>
              <input
                type="text"
                value={lot}
                onChange={(e) => setLot(e.target.value)}
                className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[13px] text-[#111c2d] border border-[#dee8ff]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#111c2d] block mb-1">
                Cantidad Entrante
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[13px] text-[#111c2d] border border-[#dee8ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-[#111c2d] block mb-1">
                Ubicación en Bodega
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[13px] text-[#111c2d] border border-[#dee8ff]"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-[#111c2d] block mb-1">
                Fecha de Vencimiento
              </label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full h-10 px-3 bg-[#f0f3ff] rounded-xl text-[13px] text-[#111c2d] border border-[#dee8ff]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-11 bg-[#a72e4b] hover:bg-[#c74763] text-white rounded-full text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              Registrar Entrada
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
