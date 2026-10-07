import React, { useState } from 'react';
import { TicketItem, Customer, PaymentMethod } from '../../types';

interface PosScreenProps {
  ticket: TicketItem[];
  setTicket: React.Dispatch<React.SetStateAction<TicketItem[]>>;
  customer: Customer;
  onChangeCustomerClick: () => void;
  onOpenScannerClick: () => void;
  onCheckoutClick: (total: number, paymentMethod: PaymentMethod) => void;
  onShowToast: (message: string) => void;
}

export const PosScreen: React.FC<PosScreenProps> = ({
  ticket,
  setTicket,
  customer,
  onChangeCustomerClick,
  onOpenScannerClick,
  onCheckoutClick,
  onShowToast
}) => {
  const [skuInput, setSkuInput] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>('card');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponValue, setCouponValue] = useState(15000);

  // Calculate totals
  const subtotalGross = ticket.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemsCount = ticket.reduce((acc, item) => acc + item.quantity, 0);
  const discountAmount = couponApplied && subtotalGross > 0 ? Math.min(couponValue, subtotalGross) : 0;
  const totalNet = Math.max(0, subtotalGross - discountAmount);
  const ivaEstimated = Math.round(subtotalGross * 0.19);

  const formatCOP = (val: number) => {
    return '$' + val.toLocaleString('es-CO');
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setTicket((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as TicketItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setTicket((prev) => prev.filter((item) => item.id !== id));
    onShowToast('Producto removido del ticket');
  };

  const handleClearTicket = () => {
    if (ticket.length === 0) return;
    if (window.confirm('¿Deseas vaciar el ticket actual?')) {
      setTicket([]);
      onShowToast('Ticket de venta vaciado');
    }
  };

  const handleAddSku = (skuToAdd?: string) => {
    const sku = (skuToAdd || skuInput).trim().toUpperCase();
    if (!sku) return;

    if (sku.includes('BOLSA')) {
      const existing = ticket.find((t) => t.sku === 'SKU-BOLSA');
      if (existing) {
        handleUpdateQuantity(existing.id, 1);
      } else {
        setTicket((prev) => [
          ...prev,
          {
            id: 'tick-bolsa-' + Date.now(),
            sku: 'SKU-BOLSA',
            brand: 'ECOLÓGICO',
            name: 'Bolsa Ecológica Reutilizable',
            variant: 'Mediana',
            price: 2500,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80'
          }
        ]);
      }
      onShowToast('Bolsa Ecológica agregada');
      setSkuInput('');
      return;
    }

    if (sku.includes('MUESTRA')) {
      const existing = ticket.find((t) => t.sku === 'SKU-MUESTRA');
      if (existing) {
        handleUpdateQuantity(existing.id, 1);
      } else {
        setTicket((prev) => [
          ...prev,
          {
            id: 'tick-muestra-' + Date.now(),
            sku: 'SKU-MUESTRA',
            brand: 'GLOWLAB',
            name: 'Muestra Mágica Sérum Glow',
            variant: 'Cortesía 5ml',
            price: 0,
            quantity: 1,
            image:
              'https://images.unsplash.com/photo-1608248597359-0a273b5bf958?auto=format&fit=crop&w=150&q=80'
          }
        ]);
      }
      onShowToast('Muestra Mágica agregada de cortesía');
      setSkuInput('');
      return;
    }

    if (sku.includes('BONO')) {
      setCouponApplied(true);
      setCouponValue(10000);
      onShowToast('Bono $10.000 aplicado al ticket');
      setSkuInput('');
      return;
    }

    // Generic SKU addition simulation
    const newItem: TicketItem = {
      id: 'tick-' + Date.now(),
      sku: sku.startsWith('SKU-') ? sku : `SKU-${sku}`,
      brand: 'BELLEZA LAB',
      name: `Cosmético Escaneado (${sku})`,
      variant: 'Edición Estándar',
      price: 35000,
      quantity: 1,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAuFNRjwaTzAlr8ZuGoL7QwtzZfTDirgoj38kS4LUIvb6pKPvsggIEg6IHgCDYGaDPM7k22a8b6iHtC2Q_bJXrs59GV2teZVjLDrZXCO5jwZN8xiiW1vh54uf0zZw7uByi-uw3mTZsJA3UMTBHd1JzMMSaUqvRMQSa2MYWLck8NFtsFT1gWycs4b4Z7zifN_zX3mcBXmGPGczhSGQ4hMe9WQ4f0GqCLQ58Plc159_24n3zgDO90xLxPgQ'
    };
    setTicket((prev) => [newItem, ...prev]);
    onShowToast(`Producto ${sku} ingresado al ticket`);
    setSkuInput('');
  };

  const handleHoldTicket = () => {
    if (ticket.length === 0) {
      onShowToast('El ticket está vacío para poner en espera');
      return;
    }
    const ticketId = `#02-${Math.floor(100 + Math.random() * 900)}`;
    onShowToast(`Ticket ${ticketId} guardado en espera con éxito.`);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 sm:px-4 py-3 space-y-3.5">
      {/* Register Context Strip */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee8ff]/60 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006947] animate-pulse flex-shrink-0"></span>
            <span className="text-[11px] font-bold text-[#006947] truncate uppercase tracking-wider">
              Caja Abierta • Turno Mañana
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#e7eeff] px-2.5 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[#a72e4b] text-[15px]">point_of_sale</span>
            <span className="text-[11px] text-[#574144] font-bold">POS #02</span>
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <h2 className="text-[19px] font-bold text-[#111c2d] truncate">Venta en Mostrador</h2>
          <span className="text-[13px] text-[#574144] flex-shrink-0">Sede Neiva Centro</span>
        </div>
      </div>

      {/* Customer Fast Assignment Pill & Quick Loyalty */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee8ff]/60 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#ffd9dd] flex items-center justify-center text-[#400013] flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">person_pin</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[14px] text-[#111c2d] font-bold truncate">
                {customer.name}
              </span>
              <span className="px-2 py-0.5 bg-[#ffdcc3] text-[#2f1500] text-[10px] font-bold rounded-full">
                {customer.points} Pts
              </span>
            </div>
            <p className="text-[12px] text-[#574144] truncate">{customer.document}</p>
          </div>
        </div>
        <button
          onClick={onChangeCustomerClick}
          className="flex-shrink-0 px-3 py-1.5 rounded-full bg-[#e7eeff] text-[#a72e4b] text-[12px] font-bold hover:bg-[#ffd9dd] transition-colors flex items-center gap-1 shadow-xs active:scale-95"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          <span>Cambiar</span>
        </button>
      </div>

      {/* Quick Barcode / SKU Direct Scanner Input */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee8ff]/60 space-y-2.5">
        <div className="relative flex items-center">
          <input
            className="w-full h-12 pl-11 pr-24 rounded-xl bg-[#f9f9ff] text-[#111c2d] placeholder-[#8a7173] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#a72e4b] focus:bg-white transition-all border border-[#dee8ff]"
            placeholder="Escanear o digitar SKU..."
            value={skuInput}
            onChange={(e) => setSkuInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddSku();
            }}
            type="text"
          />
          <span className="material-symbols-outlined absolute left-3.5 text-[#574144] text-[22px] pointer-events-none">
            barcode_scanner
          </span>
          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              onClick={onOpenScannerClick}
              aria-label="Abrir Cámara Escáner"
              className="w-8 h-8 rounded-lg bg-[#e7eeff] text-[#a72e4b] flex items-center justify-center hover:bg-[#ffd9dd] transition-colors"
              type="button"
              title="Abrir Escáner de Cámara"
            >
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            </button>
            <button
              onClick={() => handleAddSku()}
              aria-label="Agregar SKU"
              className="w-8 h-8 rounded-lg bg-[#a72e4b] text-white flex items-center justify-center hover:bg-[#c74763] transition-colors shadow-sm active:scale-95"
              type="button"
              title="Agregar producto"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>
        </div>

        {/* Quick SKU Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
          <span className="text-[11px] text-[#574144] font-medium flex-shrink-0 mr-1">Rápidos:</span>
          <button
            onClick={() => handleAddSku('BOLSA')}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#111c2d] text-[11px] font-semibold flex items-center gap-1 hover:bg-[#ffd9dd] hover:text-[#a72e4b] transition-all active:scale-95 border border-transparent hover:border-[#debfc2]"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px] text-[#a72e4b]">auto_fix_high</span>
            Bolsa Ecológica
          </button>
          <button
            onClick={() => handleAddSku('MUESTRA')}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#111c2d] text-[11px] font-semibold flex items-center gap-1 hover:bg-[#ffd9dd] hover:text-[#a72e4b] transition-all active:scale-95 border border-transparent hover:border-[#debfc2]"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px] text-[#a72e4b]">redeem</span>
            Muestra Mágica
          </button>
          <button
            onClick={() => handleAddSku('BONO')}
            className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#e7eeff] text-[#111c2d] text-[11px] font-semibold flex items-center gap-1 hover:bg-[#ffd9dd] hover:text-[#a72e4b] transition-all active:scale-95 border border-transparent hover:border-[#debfc2]"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px] text-[#a72e4b]">loyalty</span>
            Bono $10k
          </button>
        </div>
      </div>

      {/* Active Order / Ticket Item List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#a72e4b] text-[19px]">receipt_long</span>
            <h3 className="text-[14px] text-[#111c2d] font-bold">Ticket de Venta</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#dee8ff] text-[#574144] text-[11px] font-bold">
              {totalItemsCount} {totalItemsCount === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>
          {ticket.length > 0 && (
            <button
              onClick={handleClearTicket}
              className="text-[11px] font-semibold text-[#ba1a1a] hover:underline flex items-center gap-0.5"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">delete_sweep</span>
              Vaciar
            </button>
          )}
        </div>

        {ticket.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-[#debfc2] flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[36px] text-[#8a7173]">remove_shopping_cart</span>
            <p className="text-[14px] font-semibold text-[#111c2d]">El ticket está vacío</p>
            <p className="text-[12px] text-[#574144]">
              Escanea un SKU o añade productos desde el catálogo para iniciar la venta.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {ticket.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#dee8ff]/60 flex items-center justify-between gap-3 transition-transform active:scale-[0.99]"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#e7eeff] flex-shrink-0 border border-[#dee8ff]/40">
                  <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[10px] text-[#a72e4b] font-bold uppercase tracking-wide">
                      {item.brand}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c74763]"></span>
                    <span className="text-[10px] text-[#574144] truncate">{item.variant}</span>
                  </div>
                  <h4 className="text-[13px] text-[#111c2d] font-bold leading-tight truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <p className="text-[12px] text-[#a72e4b] font-bold">
                      {formatCOP(item.price * item.quantity)} COP
                    </p>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-[#574144]">
                        ({formatCOP(item.price)} c/u)
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Eliminar producto"
                    className="text-[#8a7173] hover:text-[#ba1a1a] transition-colors p-0.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                  <div className="flex items-center bg-[#f0f3ff] rounded-full p-0.5 border border-[#dee8ff]">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      aria-label="Reducir cantidad"
                      className="w-6 h-6 rounded-full bg-white text-[#111c2d] flex items-center justify-center shadow-xs text-xs font-bold active:scale-95 leading-none hover:bg-[#ffd9dd]"
                      type="button"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-[12px] text-[#111c2d] font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      aria-label="Aumentar cantidad"
                      className="w-6 h-6 rounded-full bg-white text-[#111c2d] flex items-center justify-center shadow-xs text-xs font-bold active:scale-95 leading-none hover:bg-[#ffd9dd]"
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bill Financial Breakdown Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dee8ff]/60 space-y-2.5">
        <div className="flex items-center justify-between text-[13px]">
          <span className="text-[#574144]">Subtotal Bruto ({ticket.length} ref.)</span>
          <span className="text-[#111c2d] font-semibold">{formatCOP(subtotalGross)} COP</span>
        </div>
        <div className="flex items-center justify-between text-[13px]">
          <div className="flex items-center gap-1 text-[#574144]">
            <span>IVA Incluido (19%)</span>
            <span
              className="material-symbols-outlined text-[15px] text-[#8a7173] cursor-pointer"
              title="IVA del 19% desglosado según estatuto tributario colombiano"
            >
              help
            </span>
          </div>
          <span className="text-[#111c2d] font-semibold">{formatCOP(ivaEstimated)} COP</span>
        </div>

        {couponApplied && (
          <div className="flex items-center justify-between py-1.5 bg-[#f0f3ff] px-2.5 rounded-xl border border-[#dee8ff]">
            <div className="flex items-center gap-1.5 text-[#006947]">
              <span className="material-symbols-outlined text-[16px]">stars</span>
              <span className="text-[12px] font-bold">Cupón Fidelización Aplicado</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] text-[#006947] font-bold">
                -{formatCOP(discountAmount)} COP
              </span>
              <button
                onClick={() => {
                  setCouponApplied(false);
                  onShowToast('Cupón de descuento removido');
                }}
                className="text-[#8a7173] hover:text-[#ba1a1a]"
                title="Remover cupón"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-[#dee8ff] flex items-baseline justify-between">
          <div>
            <span className="text-[10px] text-[#574144] uppercase tracking-wider block font-bold">
              Total Neto a Cobrar
            </span>
            <span className="text-[12px] text-[#006947] font-bold flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              Factura Electrónica DIAN
            </span>
          </div>
          <div className="text-right">
            <span className="text-[26px] sm:text-[28px] text-[#a72e4b] tracking-tight font-extrabold leading-none block">
              {formatCOP(totalNet)}
            </span>
            <span className="text-[10px] text-[#574144] font-bold block mt-0.5">COP</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="space-y-1.5">
        <label className="text-[12px] text-[#111c2d] font-bold px-1 block">
          Método de Pago
        </label>
        <div className="grid grid-cols-2 gap-2">
          {/* Efectivo */}
          <button
            onClick={() => setSelectedPayment('cash')}
            className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left shadow-xs transition-all border ${
              selectedPayment === 'cash'
                ? 'bg-[#a72e4b] text-white border-[#a72e4b]'
                : 'bg-white text-[#111c2d] border-[#dee8ff] hover:bg-[#f0f3ff]'
            }`}
            type="button"
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedPayment === 'cash'
                  ? 'bg-[#c74763] text-white'
                  : 'bg-[#ffdcc3] text-[#904d00]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div className="min-w-0">
              <span className="text-[12px] font-bold block truncate">Efectivo</span>
              <span
                className={`text-[10px] block truncate ${
                  selectedPayment === 'cash' ? 'text-[#ffd9dd]' : 'text-[#574144]'
                }`}
              >
                Cambio exacto
              </span>
            </div>
          </button>

          {/* Datáfono */}
          <button
            onClick={() => setSelectedPayment('card')}
            className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left shadow-xs transition-all border ${
              selectedPayment === 'card'
                ? 'bg-[#a72e4b] text-white border-[#a72e4b]'
                : 'bg-white text-[#111c2d] border-[#dee8ff] hover:bg-[#f0f3ff]'
            }`}
            type="button"
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedPayment === 'card'
                  ? 'bg-[#c74763] text-white'
                  : 'bg-[#e7eeff] text-[#a72e4b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
            </div>
            <div className="min-w-0">
              <span className="text-[12px] font-bold block truncate">Datáfono</span>
              <span
                className={`text-[10px] block truncate ${
                  selectedPayment === 'card' ? 'text-[#ffd9dd]' : 'text-[#574144]'
                }`}
              >
                Débito / Crédito
              </span>
            </div>
          </button>

          {/* Nequi / Davi */}
          <button
            onClick={() => setSelectedPayment('qr')}
            className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left shadow-xs transition-all border ${
              selectedPayment === 'qr'
                ? 'bg-[#a72e4b] text-white border-[#a72e4b]'
                : 'bg-white text-[#111c2d] border-[#dee8ff] hover:bg-[#f0f3ff]'
            }`}
            type="button"
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedPayment === 'qr'
                  ? 'bg-[#c74763] text-white'
                  : 'bg-[#e7eeff] text-[#a72e4b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            </div>
            <div className="min-w-0">
              <span className="text-[12px] font-bold block truncate">Nequi / Davi</span>
              <span
                className={`text-[10px] block truncate ${
                  selectedPayment === 'qr' ? 'text-[#ffd9dd]' : 'text-[#574144]'
                }`}
              >
                QR Directo
              </span>
            </div>
          </button>

          {/* Bancolombia */}
          <button
            onClick={() => setSelectedPayment('transfer')}
            className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left shadow-xs transition-all border ${
              selectedPayment === 'transfer'
                ? 'bg-[#a72e4b] text-white border-[#a72e4b]'
                : 'bg-white text-[#111c2d] border-[#dee8ff] hover:bg-[#f0f3ff]'
            }`}
            type="button"
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectedPayment === 'transfer'
                  ? 'bg-[#c74763] text-white'
                  : 'bg-[#e7eeff] text-[#006947]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">account_balance</span>
            </div>
            <div className="min-w-0">
              <span className="text-[12px] font-bold block truncate">Bancolombia</span>
              <span
                className={`text-[10px] block truncate ${
                  selectedPayment === 'transfer' ? 'text-[#ffd9dd]' : 'text-[#574144]'
                }`}
              >
                Transf. Llave
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Primary Sticky Transaction Controls */}
      <div className="pt-1 space-y-2">
        <button
          onClick={() => onCheckoutClick(totalNet, selectedPayment)}
          disabled={ticket.length === 0}
          className="w-full h-12 rounded-full bg-[#a72e4b] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#c74763] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">receipt</span>
          <span>Cobrar {formatCOP(totalNet)} COP</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleHoldTicket}
            disabled={ticket.length === 0}
            className="flex-1 h-11 rounded-full bg-[#e7eeff] text-[#111c2d] text-[13px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#dee8ff] active:scale-[0.98] transition-all disabled:opacity-50"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#574144]">
              pause_circle
            </span>
            <span>Poner en Espera</span>
          </button>

          <button
            onClick={() => onShowToast('Opciones de venta: Factura proforma, Descuento especial, Divisa')}
            aria-label="Opciones avanzadas de venta"
            className="w-11 h-11 rounded-full bg-[#e7eeff] text-[#574144] flex items-center justify-center hover:text-[#a72e4b] hover:bg-[#ffd9dd] transition-colors flex-shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">more_vert</span>
          </button>
        </div>
      </div>
    </div>
  );
};
