import React from 'react';
import { TicketItem, Customer, PaymentMethod } from '../../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketItem[];
  customer: Customer;
  total: number;
  paymentMethod: PaymentMethod;
  onCompleteSale: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  ticket,
  customer,
  total,
  paymentMethod,
  onCompleteSale
}) => {
  if (!isOpen) return null;

  const invoiceNumber = `FE-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const cufeHash = 'd7a8f93e2b1c4d5e6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9';
  const currentDate = new Date().toLocaleString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getPaymentLabel = () => {
    switch (paymentMethod) {
      case 'cash':
        return 'Efectivo';
      case 'card':
        return 'Datáfono (Tarjeta Débito/Crédito)';
      case 'qr':
        return 'Nequi / Daviplata (QR Bancario)';
      case 'transfer':
        return 'Bancolombia (Transf. Llave)';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleFinish = () => {
    onCompleteSale();
    onClose();
  };

  const subtotalGross = ticket.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const iva = Math.round(subtotalGross * 0.19);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-[#dee8ff] p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#006947] text-[24px]">verified</span>
              <div>
                <h3 className="text-[16px] font-bold text-[#111c2d] leading-none">
                  Factura Electrónica de Venta
                </h3>
                <span className="text-[11px] text-[#574144] font-medium">Validada por DIAN</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center hover:bg-[#ffd9dd] hover:text-[#a72e4b]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Business Details */}
          <div className="text-center py-3 border-b border-[#dee8ff] space-y-0.5">
            <h4 className="text-[16px] font-extrabold text-[#a72e4b]">BELLEZA EN UN CLIC S.A.S.</h4>
            <p className="text-[11px] text-[#574144]">NIT: 901.482.390-4 • Régimen Común</p>
            <p className="text-[11px] text-[#574144]">Sede Neiva Centro • Carrera 5 No. 11-42, Huila</p>
            <p className="text-[10px] text-[#8a7173]">Resolución DIAN No. 18764028919 de 2026</p>
          </div>

          {/* Invoice Info */}
          <div className="py-2.5 space-y-1 text-[11px] text-[#574144] border-b border-[#dee8ff]">
            <div className="flex justify-between">
              <span>No. Factura:</span>
              <strong className="text-[#111c2d]">{invoiceNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span>Fecha y Hora:</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Cliente:</span>
              <strong className="text-[#111c2d]">{customer.name}</strong>
            </div>
            <div className="flex justify-between">
              <span>Identificación:</span>
              <span>{customer.document}</span>
            </div>
            <div className="flex justify-between">
              <span>Forma de Pago:</span>
              <strong className="text-[#006947]">{getPaymentLabel()}</strong>
            </div>
          </div>

          {/* Itemized List */}
          <div className="py-2.5 border-b border-[#dee8ff]">
            <span className="text-[11px] font-bold text-[#111c2d] block mb-1.5">
              Detalle de Productos:
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
              {ticket.map((item) => (
                <div key={item.id} className="flex justify-between text-[11px]">
                  <div className="flex-1 truncate pr-2">
                    <span className="font-semibold text-[#111c2d]">{item.quantity}x</span>{' '}
                    <span>{item.name}</span>
                  </div>
                  <span className="font-bold text-[#111c2d] flex-shrink-0">
                    ${(item.price * item.quantity).toLocaleString('es-CO')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div className="py-2.5 space-y-1 text-[12px] border-b border-[#dee8ff]">
            <div className="flex justify-between text-[#574144]">
              <span>Subtotal:</span>
              <span>${subtotalGross.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex justify-between text-[#574144]">
              <span>IVA (19%):</span>
              <span>${iva.toLocaleString('es-CO')} COP</span>
            </div>
            <div className="flex justify-between text-[16px] font-extrabold text-[#a72e4b] pt-1">
              <span>Total Pagado:</span>
              <span>${total.toLocaleString('es-CO')} COP</span>
            </div>
          </div>

          {/* CUFE & Security Stamp */}
          <div className="py-3 flex items-center gap-3">
            <div className="w-16 h-16 bg-[#f0f3ff] rounded-xl flex items-center justify-center p-1 border border-[#dee8ff] flex-shrink-0">
              <span className="material-symbols-outlined text-[36px] text-[#111c2d]">qr_code_2</span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] font-bold text-[#574144] uppercase block">
                Firma Digital CUFE:
              </span>
              <p className="text-[8px] text-[#8a7173] break-all font-mono leading-tight">
                {cufeHash}
              </p>
              <span className="text-[9px] text-[#006947] font-bold mt-1 block">
                ✓ Transmisión exitosa a la DIAN
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="h-10 rounded-full bg-[#f0f3ff] text-[#111c2d] text-[12px] font-bold flex items-center justify-center gap-1 border border-[#dee8ff] hover:bg-[#dee8ff]"
            >
              <span className="material-symbols-outlined text-[16px]">print</span>
              Imprimir
            </button>
            <button
              onClick={() => alert('Recibo enviado al correo del cliente y WhatsApp.')}
              className="h-10 rounded-full bg-[#f0f3ff] text-[#006947] text-[12px] font-bold flex items-center justify-center gap-1 border border-[#dee8ff] hover:bg-[#6ffbbe]/20"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              Compartir
            </button>
          </div>
          <button
            onClick={handleFinish}
            className="w-full h-11 rounded-full bg-[#a72e4b] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md hover:bg-[#c74763] active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">done_all</span>
            Finalizar y Nuevo Ticket
          </button>
        </div>
      </div>
    </div>
  );
};
