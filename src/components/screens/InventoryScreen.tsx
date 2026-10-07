import React, { useState } from 'react';
import { InventoryItem } from '../../types';

interface InventoryScreenProps {
  inventory: InventoryItem[];
  onOpenNewStockModal: () => void;
  onOpenScannerModal: () => void;
  onOpenAdjustModal: (item: InventoryItem) => void;
  onOpenTraceabilityModal: (item: InventoryItem) => void;
  onOpenAuditModal: () => void;
  onShowToast: (message: string) => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({
  inventory,
  onOpenNewStockModal,
  onOpenScannerModal,
  onOpenAdjustModal,
  onOpenTraceabilityModal,
  onOpenAuditModal,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'critico' | 'vencer' | 'agotados'>('todos');
  const [currentWarehouse, setCurrentWarehouse] = useState({
    title: 'Sede Principal - Neiva, Huila',
    sub: 'Bodega Central • Sector Canaima'
  });

  const filteredItems = inventory.filter((item) => {
    if (activeFilter === 'todos') return true;
    if (activeFilter === 'critico') return item.status === 'critico';
    if (activeFilter === 'vencer') return item.status === 'vencer';
    if (activeFilter === 'agotados') return item.stockActual === 0 || item.status === 'agotado';
    return true;
  });

  const handleSwitchWarehouse = () => {
    if (currentWarehouse.title.includes('Principal')) {
      setCurrentWarehouse({
        title: 'Sede Centro - Neiva Comercial',
        sub: 'Punto de Venta Mostrador • Cra 5 # 11-42'
      });
      onShowToast('Cambiado a Sede Centro Neiva');
    } else {
      setCurrentWarehouse({
        title: 'Sede Principal - Neiva, Huila',
        sub: 'Bodega Central • Sector Canaima'
      });
      onShowToast('Cambiado a Sede Principal Canaima');
    }
  };

  const handleFlashOffer = (item: InventoryItem) => {
    onShowToast(`Oferta Flash activada para ${item.name} (-25% por vencimiento cercano)`);
  };

  const handleTransfer = (item: InventoryItem) => {
    onShowToast(`Solicitud de traslado para SKU ${item.sku} enviada a logística`);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto pb-24">
      {/* Location Selector Bar */}
      <div className="px-4 pt-3 pb-2">
        <div
          onClick={handleSwitchWarehouse}
          className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dee8ff]/60 flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99] transition-transform hover:shadow-md"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#8a1737] flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">warehouse</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-[#a72e4b] uppercase tracking-wider font-bold">
                  Sede Operativa
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006947]"></span>
              </div>
              <p className="text-[14px] text-[#111c2d] truncate font-bold">
                {currentWarehouse.title}
              </p>
              <span className="text-[11px] text-[#574144] truncate">
                {currentWarehouse.sub}
              </span>
            </div>
          </div>
          <button
            aria-label="Cambiar sede operativa"
            className="w-8 h-8 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#574144] flex-shrink-0 hover:text-[#a72e4b] transition-colors border border-[#dee8ff]"
          >
            <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Bento Grid */}
      <div className="px-4 py-1">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* Total SKUs */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dee8ff]/60 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#574144] font-medium">Total SKUs</span>
              <span className="material-symbols-outlined text-[#a72e4b] text-[18px]">inventory</span>
            </div>
            <div className="mt-2">
              <span className="text-[20px] sm:text-[22px] text-[#111c2d] font-bold">1.420</span>
              <p className="text-[11px] text-[#574144] mt-0.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[#006947] text-[14px]">arrow_upward</span>
                <span className="text-[#006947] font-bold">+24</span> este mes
              </p>
            </div>
            <div className="absolute -right-2 -bottom-2 w-14 h-14 bg-[#a72e4b]/5 rounded-full blur-lg pointer-events-none"></div>
          </div>

          {/* Valor Stock */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dee8ff]/60 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#574144] font-medium">Valor Stock</span>
              <span className="material-symbols-outlined text-[#904d00] text-[18px]">payments</span>
            </div>
            <div className="mt-2">
              <span className="text-[20px] sm:text-[22px] text-[#111c2d] font-bold">$148.5M</span>
              <p className="text-[11px] text-[#574144] mt-0.5">COP en custodia</p>
            </div>
            <div className="absolute -right-2 -bottom-2 w-14 h-14 bg-[#fe932c]/5 rounded-full blur-lg pointer-events-none"></div>
          </div>

          {/* Stock Crítico */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dee8ff]/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#ba1a1a] font-bold">Stock Crítico</span>
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] sm:text-[22px] text-[#ba1a1a] font-bold">12</span>
                <span className="text-[11px] text-[#ba1a1a] font-medium">ítems</span>
              </div>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-[#ffdad6] text-[#93000a] rounded-full text-[10px] font-bold">
                <span className="material-symbols-outlined text-[12px]">warning</span>
                Reordenar urgente
              </div>
            </div>
          </div>

          {/* Por Vencer */}
          <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-[#dee8ff]/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#904d00] font-bold">Por Vencer</span>
              <span className="material-symbols-outlined text-[#904d00] text-[18px]">schedule</span>
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-[20px] sm:text-[22px] text-[#904d00] font-bold">5</span>
                <span className="text-[11px] text-[#904d00] font-medium">lotes</span>
              </div>
              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-[#ffdcc3] text-[#6e3900] rounded-full text-[10px] font-bold">
                <span className="material-symbols-outlined text-[12px]">hourglass_bottom</span>
                &lt; 60 días
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Operations Bar */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewStockModal}
            className="flex-1 h-12 bg-[#a72e4b] hover:bg-[#c74763] text-white rounded-full px-4 flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(167,46,75,0.25)] active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">add_box</span>
            <span className="text-[14px] font-bold">Nueva Entrada</span>
          </button>
          <button
            onClick={onOpenScannerModal}
            aria-label="Escanear Código de Barras"
            className="w-12 h-12 bg-[#dee8ff] hover:bg-[#d8e3fb] text-[#a72e4b] rounded-full flex items-center justify-center shadow-xs active:scale-95 transition-all flex-shrink-0 border border-[#dee8ff]"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">barcode_scanner</span>
          </button>
          <button
            onClick={() => onShowToast('Filtrar inventario por proveedor, pasillo o categoría')}
            aria-label="Filtrar por Marca o Categoría"
            className="w-12 h-12 bg-white text-[#574144] rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(17,28,45,0.06)] active:scale-95 transition-all flex-shrink-0 border border-[#dee8ff]"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
          </button>
        </div>
      </div>

      {/* Quick Filter Pills (Horizontal Scroll) */}
      <div className="pt-3 pb-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 px-4 min-w-max">
          <button
            onClick={() => setActiveFilter('todos')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              activeFilter === 'todos'
                ? 'bg-[#263143] text-white'
                : 'bg-[#dee8ff] text-[#574144] hover:bg-[#d8e3fb]'
            }`}
          >
            <span>Todos</span>
            <span className="bg-white/20 text-white px-1.5 py-0.2 rounded-full text-[10px]">
              1.420
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('critico')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              activeFilter === 'critico'
                ? 'bg-[#ba1a1a] text-white'
                : 'bg-[#ffdad6] text-[#93000a] hover:bg-[#ffdad6]/80'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            <span>Bajo Stock</span>
            <span className="font-bold">12</span>
          </button>

          <button
            onClick={() => setActiveFilter('vencer')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              activeFilter === 'vencer'
                ? 'bg-[#904d00] text-white'
                : 'bg-[#ffdcc3] text-[#6e3900] hover:bg-[#ffdcc3]/80'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">history</span>
            <span>Por Vencer</span>
            <span className="font-bold">5</span>
          </button>

          <button
            onClick={() => setActiveFilter('agotados')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition-all shadow-xs ${
              activeFilter === 'agotados'
                ? 'bg-[#263143] text-white'
                : 'bg-[#dee8ff] text-[#574144] hover:bg-[#d8e3fb]'
            }`}
          >
            <span>Agotados</span>
            <span className="font-bold">3</span>
          </button>
        </div>
      </div>

      {/* Inventory Items List */}
      <div className="px-4 py-3 flex flex-col gap-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-sm border border-[#dee8ff]/60 flex flex-col gap-3 relative overflow-hidden"
          >
            {/* Header row with thumbnail */}
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl bg-[#f0f3ff] flex-shrink-0 overflow-hidden relative border border-[#dee8ff]/40">
                <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-[10px] text-[#a72e4b] uppercase font-bold tracking-wider">
                    {item.brand}
                  </span>
                  {item.status === 'critico' && (
                    <span className="px-2 py-0.5 bg-[#ffdad6] text-[#93000a] rounded-full text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                      Crítico
                    </span>
                  )}
                  {item.status === 'vencer' && (
                    <span className="px-2 py-0.5 bg-[#ffdcc3] text-[#6e3900] rounded-full text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">schedule</span>
                      {item.daysToExpiry} días
                    </span>
                  )}
                  {item.status === 'optimo' && (
                    <span className="px-2 py-0.5 bg-[#6ffbbe]/40 text-[#005236] rounded-full text-[10px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">verified</span>
                      Óptimo
                    </span>
                  )}
                </div>
                <h2 className="text-[15px] text-[#111c2d] font-bold line-clamp-1 leading-snug">
                  {item.name}
                </h2>
                <p className="text-[12px] text-[#574144] truncate">{item.variant}</p>
              </div>
            </div>

            {/* Lot & Stock Spec Box */}
            <div className="bg-[#f0f3ff] p-3 rounded-xl flex flex-col gap-1.5 border border-[#dee8ff]">
              <div className="flex items-center justify-between text-[12px] text-[#574144]">
                <span>
                  SKU: <strong className="text-[#111c2d]">{item.sku}</strong>
                </span>
                <span>
                  Lote: <strong className="text-[#111c2d]">{item.lot}</strong>
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px] text-[#574144]">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#a72e4b]">pin_drop</span>
                  {item.location}
                </span>
                <span className={item.status === 'vencer' ? 'text-[#904d00] font-bold' : ''}>
                  {item.status === 'vencer' ? `Expira: ${item.expiryDate}` : `Vence: ${item.expiryDate}`}
                </span>
              </div>

              {item.alertNote && (
                <div className="mt-1 bg-[#ffdcc3]/60 p-2 rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#904d00] text-[16px] flex-shrink-0">
                    campaign
                  </span>
                  <span className="text-[11px] text-[#6e3900] font-medium leading-tight">
                    {item.alertNote}
                  </span>
                </div>
              )}

              {/* Progress bar */}
              <div className="mt-1">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span
                    className={
                      item.status === 'critico'
                        ? 'text-[#ba1a1a] font-bold'
                        : 'text-[#006947] font-bold'
                    }
                  >
                    {item.status === 'optimo'
                      ? `${item.stockActual} unidades disponibles`
                      : `Stock actual: ${item.stockActual} uds`}
                  </span>
                  <span className="text-[#574144]">
                    {item.status === 'optimo'
                      ? 'Saludable (100%)'
                      : `Mínimo sugerido: ${item.stockMinimo} uds`}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#d8e3fb] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.status === 'critico'
                        ? 'bg-[#ba1a1a]'
                        : item.status === 'vencer'
                        ? 'bg-[#fe932c]'
                        : 'bg-[#006947]'
                    }`}
                    style={{ width: `${item.healthPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons per status */}
            <div className="flex items-center gap-2 pt-0.5">
              {item.status === 'critico' && (
                <>
                  <button
                    onClick={() => {
                      onOpenAdjustModal(item);
                    }}
                    className="flex-1 h-10 bg-[#a72e4b] hover:bg-[#c74763] text-white rounded-full text-[12px] font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                    Reabastecer
                  </button>
                  <button
                    onClick={() => onOpenAdjustModal(item)}
                    className="h-10 px-4 bg-[#dee8ff] text-[#111c2d] hover:bg-[#d8e3fb] rounded-full text-[12px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform border border-[#dee8ff]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    Ajuste
                  </button>
                </>
              )}

              {item.status === 'vencer' && (
                <>
                  <button
                    onClick={() => handleFlashOffer(item)}
                    className="flex-1 h-10 bg-[#fe932c] hover:bg-[#904d00] text-white rounded-full text-[12px] font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">sell</span>
                    Crear Oferta Flash
                  </button>
                  <button
                    onClick={() => handleTransfer(item)}
                    className="h-10 px-4 bg-[#dee8ff] text-[#111c2d] hover:bg-[#d8e3fb] rounded-full text-[12px] font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform border border-[#dee8ff]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
                    Trasladar
                  </button>
                </>
              )}

              {item.status === 'optimo' && (
                <div className="w-full flex items-center justify-end gap-2">
                  <button
                    onClick={() => onOpenTraceabilityModal(item)}
                    className="h-9 px-4 bg-[#dee8ff] hover:bg-[#d8e3fb] text-[#111c2d] rounded-full text-[12px] font-bold flex items-center gap-1 active:scale-95 transition-transform border border-[#dee8ff]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                    Ver Trazabilidad
                  </button>
                  <button
                    onClick={() => onOpenAdjustModal(item)}
                    className="h-9 w-9 bg-[#f0f3ff] text-[#574144] rounded-full flex items-center justify-center hover:text-[#a72e4b] active:scale-95 transition-transform border border-[#dee8ff]"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">more_vert</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Audit Quick Sheet / Status Footer banner */}
      <div className="px-4 pb-4">
        <div className="bg-[#ffd9dd]/60 p-3.5 rounded-2xl flex items-center justify-between gap-3 border border-[#ffd9dd]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#a72e4b] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
            </div>
            <div>
              <h3 className="text-[13px] text-[#400013] font-bold leading-tight">
                Auditoría Cíclica en curso
              </h3>
              <p className="text-[11px] text-[#8a1737]">Último corte: Hoy, 08:30 AM</p>
            </div>
          </div>
          <button
            onClick={onOpenAuditModal}
            className="px-4 py-2 bg-[#a72e4b] text-white rounded-full text-[11px] font-bold active:scale-95 transition-transform flex-shrink-0 shadow-xs hover:bg-[#c74763]"
            type="button"
          >
            Continuar
          </button>
        </div>
      </div>

      {/* Floating Fast Scan Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={onOpenScannerModal}
          aria-label="Escanear producto"
          className="w-14 h-14 bg-[#a72e4b] text-white rounded-full shadow-[0_8px_24px_rgba(167,46,75,0.4)] flex items-center justify-center active:scale-90 transition-transform hover:bg-[#c74763]"
          type="button"
        >
          <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
        </button>
      </div>
    </div>
  );
};
