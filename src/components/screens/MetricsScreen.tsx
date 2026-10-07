import React, { useState } from 'react';
import { METRICS_DATA } from '../../data/mockData';

interface MetricsScreenProps {
  onGoToCatalog: () => void;
  onShowToast: (message: string) => void;
}

export const MetricsScreen: React.FC<MetricsScreenProps> = ({
  onGoToCatalog,
  onShowToast
}) => {
  const [period, setPeriod] = useState<'hoy' | 'semana' | 'mes' | 'ano'>('mes');
  const metric = METRICS_DATA[period];

  const formatCOP = (val: number) => {
    return '$' + val.toLocaleString('es-CO');
  };

  const handlePeriodChange = (newPeriod: 'hoy' | 'semana' | 'mes' | 'ano', label: string) => {
    setPeriod(newPeriod);
    onShowToast(`Métricas actualizadas para: ${label}`);
  };

  const handleExportPDF = () => {
    onShowToast('Informe Ejecutivo Gerencial Abril 2026 generado en PDF.');
  };

  const handleExportExcel = () => {
    onShowToast('Libro consolidado descargado con éxito en Excel (XLSX).');
  };

  const handleQuickDownload = () => {
    onShowToast('Descargando resumen ejecutivo de métricas en tiempo real...');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto pb-24">
      {/* Period & Context Filter Header */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex w-2 h-2 rounded-full bg-[#006947] animate-pulse"></span>
              <span className="text-[10px] text-[#006947] uppercase tracking-wider font-bold">
                Datos en Tiempo Real
              </span>
            </div>
            <h2 className="text-[20px] font-bold text-[#111c2d] leading-tight">
              Resumen Gerencial
            </h2>
            <p className="text-[12px] text-[#574144]">Abril 2026 • Vista Directiva y Operativa</p>
          </div>
          <button
            onClick={handleQuickDownload}
            aria-label="Descarga rápida"
            className="w-10 h-10 rounded-full bg-[#dee8ff] flex items-center justify-center text-[#a72e4b] shadow-xs active:scale-95 transition-transform hover:bg-[#ffd9dd] border border-[#dee8ff]"
          >
            <span className="material-symbols-outlined text-[20px]">file_download</span>
          </button>
        </div>

        {/* Segmented Control Period Pills */}
        <div className="flex p-1 bg-[#e7eeff] rounded-full gap-1 overflow-x-auto no-scrollbar" role="tablist">
          <button
            onClick={() => handlePeriodChange('hoy', 'Hoy')}
            className={`period-tab flex-1 py-1.5 px-3 rounded-full text-[12px] transition-all text-center whitespace-nowrap ${
              period === 'hoy'
                ? 'bg-white font-bold text-[#a72e4b] shadow-sm'
                : 'text-[#574144] hover:text-[#111c2d]'
            }`}
          >
            Hoy
          </button>
          <button
            onClick={() => handlePeriodChange('semana', 'Esta Semana')}
            className={`period-tab flex-1 py-1.5 px-3 rounded-full text-[12px] transition-all text-center whitespace-nowrap ${
              period === 'semana'
                ? 'bg-white font-bold text-[#a72e4b] shadow-sm'
                : 'text-[#574144] hover:text-[#111c2d]'
            }`}
          >
            Esta Semana
          </button>
          <button
            onClick={() => handlePeriodChange('mes', 'Este Mes')}
            className={`period-tab flex-1 py-1.5 px-3 rounded-full text-[12px] transition-all text-center whitespace-nowrap ${
              period === 'mes'
                ? 'bg-white font-bold text-[#a72e4b] shadow-sm'
                : 'text-[#574144] hover:text-[#111c2d]'
            }`}
          >
            Este Mes
          </button>
          <button
            onClick={() => handlePeriodChange('ano', 'Año')}
            className={`period-tab flex-1 py-1.5 px-3 rounded-full text-[12px] transition-all text-center whitespace-nowrap ${
              period === 'ano'
                ? 'bg-white font-bold text-[#a72e4b] shadow-sm'
                : 'text-[#574144] hover:text-[#111c2d]'
            }`}
          >
            Año
          </button>
        </div>
      </div>

      {/* 2x2 Primary KPI Metric Cards */}
      <div className="px-4 py-1">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          {/* KPI 1: Ventas Totales */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#dee8ff]/60 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#a72e4b]/5 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#ffd9dd] flex items-center justify-center text-[#400013]">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#006947]/10 text-[10px] text-[#006947] font-bold">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                {metric.salesGrowth}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#574144] block uppercase tracking-wide font-bold">
                Ventas Totales
              </span>
              <span className="text-[18px] sm:text-[20px] text-[#111c2d] font-extrabold tracking-tight block mt-0.5">
                {formatCOP(metric.totalSales)}
              </span>
              <span className="text-[10px] text-[#574144] mt-0.5 block truncate">
                {metric.lastPeriodSales}
              </span>
            </div>
          </div>

          {/* KPI 2: Pedidos Despachados */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#dee8ff]/60 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#fe932c]/10 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#ffdcc3] flex items-center justify-center text-[#2f1500]">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </div>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#006947]/10 text-[10px] text-[#006947] font-bold">
                {metric.dispatchesPercent}%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#574144] block uppercase tracking-wide font-bold">
                Despachos
              </span>
              <span className="text-[18px] sm:text-[20px] text-[#111c2d] font-extrabold tracking-tight block mt-0.5">
                {metric.dispatchesCount} pedidos
              </span>
              <span className="text-[10px] text-[#574144] mt-0.5 block truncate">
                Efectividad logística alta
              </span>
            </div>
          </div>

          {/* KPI 3: Ticket Promedio */}
          <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#dee8ff]/60 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#dee8ff] pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#e7eeff] flex items-center justify-center text-[#111c2d]">
                <span className="material-symbols-outlined text-[18px]">shopping_basket</span>
              </div>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#006947]/10 text-[10px] text-[#006947] font-bold">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                {metric.ticketGrowth}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#574144] block uppercase tracking-wide font-bold">
                Ticket Promedio
              </span>
              <span className="text-[18px] sm:text-[20px] text-[#111c2d] font-extrabold tracking-tight block mt-0.5">
                {formatCOP(metric.averageTicket)} COP
              </span>
              <span className="text-[10px] text-[#574144] mt-0.5 block truncate">
                {metric.itemsPerOrder} productos / orden
              </span>
            </div>
          </div>

          {/* KPI 4: Stock Crítico */}
          <div className="bg-[#ffdad6]/40 rounded-2xl p-3.5 shadow-sm border border-[#ffdad6] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-[#ba1a1a]/10 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="w-8 h-8 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
                <span className="material-symbols-outlined text-[18px]">warning</span>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold animate-pulse">
                Acción
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[#93000a] block uppercase tracking-wide font-bold">
                Stock Crítico
              </span>
              <span className="text-[18px] sm:text-[20px] text-[#93000a] font-extrabold tracking-tight block mt-0.5">
                {metric.criticalStockCount} SKUs
              </span>
              <span className="text-[10px] text-[#93000a]/80 mt-0.5 block truncate">
                {metric.stockAtRiskCount} en quiebre inminente
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Performance Breakdown */}
      <div className="px-4 py-2">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee8ff]/60">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-[15px] font-bold text-[#111c2d]">Canales de Venta</h3>
              <p className="text-[11px] text-[#574144]">Omnicanalidad e ingresos consolidados</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#f0f3ff] flex items-center justify-center text-[#574144]">
              <span className="material-symbols-outlined text-[18px]">donut_small</span>
            </div>
          </div>

          {/* Segmented Bar Visualization */}
          <div className="space-y-1.5 mb-3">
            <div className="h-3.5 w-full rounded-full bg-[#f0f3ff] flex overflow-hidden p-0.5 gap-0.5 border border-[#dee8ff]">
              <div
                className="h-full bg-[#a72e4b] rounded-l-full transition-all duration-700"
                style={{ width: `${metric.ecommerceRatio}%` }}
              ></div>
              <div
                className="h-full bg-[#fe932c] rounded-r-full transition-all duration-700"
                style={{ width: `${metric.posRatio}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] font-semibold text-[#574144] px-1">
              <span>Tienda Virtual ({metric.ecommerceRatio}%)</span>
              <span>Mostrador Físico ({metric.posRatio}%)</span>
            </div>
          </div>

          {/* Channel Details Row */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-3 bg-[#f0f3ff] rounded-xl flex flex-col border border-[#dee8ff]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a72e4b]"></span>
                <span className="text-[11px] font-bold text-[#111c2d] truncate">E-Commerce / App</span>
              </div>
              <span className="text-[15px] text-[#111c2d] font-bold">
                {formatCOP(metric.ecommerceSales)}
              </span>
              <span className="text-[10px] text-[#574144] mt-0.5">
                {metric.ecommerceOrders} pedidos cerrados
              </span>
            </div>

            <div className="p-3 bg-[#f0f3ff] rounded-xl flex flex-col border border-[#dee8ff]">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c]"></span>
                <span className="text-[11px] font-bold text-[#111c2d] truncate">POS Físico Neiva</span>
              </div>
              <span className="text-[15px] text-[#111c2d] font-bold">
                {formatCOP(metric.posSales)}
              </span>
              <span className="text-[10px] text-[#574144] mt-0.5">
                {metric.posTickets} tickets mostrador
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Logistics & Delivery Status Tracker */}
      <div className="px-4 py-1">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee8ff]/60">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#006947]/10 text-[#006947] flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              </div>
              <h3 className="text-[15px] font-bold text-[#111c2d]">Logística en Curso</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#e7eeff] text-[10px] text-[#574144] font-bold">
              HU10 • RF10
            </span>
          </div>

          <div className="space-y-2">
            {/* Status 1 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] transition-colors border border-[#dee8ff]/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#ffdcc3] flex items-center justify-center text-[#2f1500] shrink-0">
                  <span className="material-symbols-outlined text-[19px]">inventory</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[12px] text-[#111c2d] block font-bold truncate">
                    En Picking &amp; Packing
                  </span>
                  <span className="text-[10px] text-[#574144] block">Armado en bodega central</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[16px] text-[#904d00] font-bold">14</span>
                <span className="text-[9px] text-[#574144] block">pedidos</span>
              </div>
            </div>

            {/* Status 2 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] transition-colors border border-[#dee8ff]/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#400013] shrink-0">
                  <span className="material-symbols-outlined text-[19px]">near_me</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[12px] text-[#111c2d] block font-bold truncate">
                    En Tránsito con Guía
                  </span>
                  <span className="text-[10px] text-[#574144] block">
                    Coordinadora / Interrapidísimo
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[16px] text-[#a72e4b] font-bold">29</span>
                <span className="text-[9px] text-[#574144] block">envíos</span>
              </div>
            </div>

            {/* Status 3 */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f0f3ff] hover:bg-[#e7eeff] transition-colors border border-[#dee8ff]/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#006947]/15 flex items-center justify-center text-[#006947] shrink-0">
                  <span className="material-symbols-outlined text-[19px]">task_alt</span>
                </div>
                <div className="min-w-0">
                  <span className="text-[12px] text-[#111c2d] block font-bold truncate">
                    Entregados con Éxito Hoy
                  </span>
                  <span className="text-[10px] text-[#574144] block">Clientes satisfechos</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[16px] text-[#006947] font-bold">18</span>
                <span className="text-[9px] text-[#574144] block">entregas</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Best-selling Products */}
      <div className="px-4 py-1">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee8ff]/60">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-[15px] font-bold text-[#111c2d]">Top Productos Más Vendidos</h3>
              <p className="text-[11px] text-[#574144]">Líderes de rotación este mes</p>
            </div>
            <button
              onClick={onGoToCatalog}
              className="text-[11px] text-[#a72e4b] font-bold hover:underline"
            >
              Ver Catálogo
            </button>
          </div>

          <div className="space-y-2">
            {/* Top 1 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#f0f3ff]/60 hover:bg-[#e7eeff] transition-all border border-[#dee8ff]/40">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex-shrink-0 relative overflow-hidden border border-[#dee8ff]/60">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4sFdK2LjLdjMPGDuTjTYGG4QIjR7R02cB8P7_6H_U8p3exEBfDZ8DENzKAc2jRiXYguTWFUJfjhSCdoxnWFPSz2hgjzRUuCnM74HzfatK7V7g8mWdb1LAuJE9Tv7FBiENC5uUsSFI1MczPUKsHDwLD2pv9AoCqwzy6GJProBJyOePKl-kWZ511pgYsSM_BAd88DrF8kgPktIgH-2-SDSUxL5G0RdpEi6AoMfEMCE7-FgEJzhQpqGRTQ"
                  alt="Serum Ácido Hialurónico"
                />
                <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#a72e4b] text-white text-[9px] flex items-center justify-center font-bold">
                  1
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] text-[#111c2d] font-bold truncate block">
                  Serum Ácido Hialurónico
                </span>
                <span className="text-[10px] text-[#574144] block truncate">
                  GlowLab Skin Essentials
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-[#a72e4b]">142 uds vendidas</span>
                  <span className="text-[#574144] text-[10px]">• $68.000 COP</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-[#006947] font-bold">$9.65M</span>
                <span className="material-symbols-outlined text-[16px] text-[#006947]">
                  arrow_upward
                </span>
              </div>
            </div>

            {/* Top 2 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#f0f3ff]/60 hover:bg-[#e7eeff] transition-all border border-[#dee8ff]/40">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex-shrink-0 relative overflow-hidden border border-[#dee8ff]/60">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuByfRBafx08DY_d31N5tfKtjwObTVo8hIGdthuQPpkY5kER8DHEb52QXk4wyIwdn9koKDTOAIbwkJZCbrs8xpuhHGLfXNFLrAsYPb6uO1CVKfGQRoLBOigCbohnBC42BmccMo404UwcAoe2-hbYM8zhogBycIazhlTR1vQpvhCVgIDjFX_5BsTniILrPb5M39eoCYL65lOh3k9tcD_oeEajDf0QVgd8tjt5RNQD4QOX1j_dX4OsYIc7lg"
                  alt="Labial Matte Velvet Lips"
                />
                <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#fe932c] text-[#2f1500] text-[9px] flex items-center justify-center font-bold">
                  2
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] text-[#111c2d] font-bold truncate block">
                  Labial Matte Velvet Lips
                </span>
                <span className="text-[10px] text-[#574144] block truncate">
                  ColorCouture Paris
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-[#a72e4b]">115 uds vendidas</span>
                  <span className="text-[#574144] text-[10px]">• $45.000 COP</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-[#006947] font-bold">$5.17M</span>
                <span className="material-symbols-outlined text-[16px] text-[#006947]">
                  arrow_upward
                </span>
              </div>
            </div>

            {/* Top 3 */}
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#f0f3ff]/60 hover:bg-[#e7eeff] transition-all border border-[#dee8ff]/40">
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex-shrink-0 relative overflow-hidden border border-[#dee8ff]/60">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhLotrO3kERzjjHspwcR8tKTkpdpcLXglDxSoLS-xbSavzXPGe3Ndx5pruyUEaKANtS8Kq36y_NmMc0qLV04bUPlZErkaSe8anOkBEDCnLm4bzklCCwaS5kYCFS2G_4YPHgRO2RPBOlREDqchYYYMqHqiB0yvIlD0FbI5DsJoKdzc6UHAzBE06DZUXZ_T_mvgBFdqb_pSOK7sdQt53xr5z8colWAQMohfDRsbPT0N5MVzoGvD9_pCDJg"
                  alt="Bloqueador FPS 50+ SunShield"
                />
                <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-[#d8e3fb] text-[#111c2d] text-[9px] flex items-center justify-center font-bold">
                  3
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] text-[#111c2d] font-bold truncate block">
                  Bloqueador FPS 50+ SunShield
                </span>
                <span className="text-[10px] text-[#574144] block truncate">
                  Dermashield Clinical Care
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] font-bold text-[#a72e4b]">98 uds vendidas</span>
                  <span className="text-[#574144] text-[10px]">• $82.000 COP</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[12px] text-[#006947] font-bold">$8.03M</span>
                <span className="material-symbols-outlined text-[16px] text-[#006947]">
                  arrow_upward
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Action Sheet & Export Buttons */}
      <div className="px-4 pt-2 pb-4 flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleExportPDF}
            className="h-12 rounded-full bg-[#a72e4b] hover:bg-[#c74763] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
            Exportar PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="h-12 rounded-full bg-white hover:bg-[#f0f3ff] text-[#111c2d] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all border border-[#dee8ff]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#006947]">table_chart</span>
            Excel (XLSX)
          </button>
        </div>

        {/* Institutional SENA Project Attribution Footnote */}
        <div className="pt-2 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dee8ff]/70 border border-[#dee8ff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a72e4b]"></span>
            <span className="text-[10px] text-[#574144] font-semibold">
              Proyecto SENA CIES • Ficha 3413988 • Neiva, Huila
            </span>
          </div>
          <p className="text-[10px] text-[#8a7173] mt-1 font-medium">
            Módulos HU17, HU30, HU40 • RF17, RF29, RF30 • Dirección Ronald Olaya
          </p>
        </div>
      </div>
    </div>
  );
};
