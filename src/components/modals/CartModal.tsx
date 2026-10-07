import React from 'react';
import { TicketItem } from '../../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onGoToCheckout: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  ticket,
  onUpdateQuantity,
  onRemoveItem,
  onGoToCheckout
}) => {
  if (!isOpen) return null;

  const total = ticket.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalCount = ticket.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] flex flex-col shadow-2xl border border-[#dee8ff] p-5">
        {/* Drawer header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a72e4b] text-[22px]">shopping_bag</span>
            <h3 className="text-[16px] font-bold text-[#111c2d]">Tu Canasta de Pedido</h3>
            <span className="px-2 py-0.5 rounded-full bg-[#ffd9dd] text-[#8a1737] text-[10px] font-bold">
              {totalCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center hover:bg-[#ffd9dd]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 no-scrollbar">
          {ticket.length === 0 ? (
            <div className="text-center py-10 text-[#574144]">
              <span className="material-symbols-outlined text-[36px] text-[#8a7173]">
                production_quantity_limits
              </span>
              <p className="text-[13px] font-bold mt-1">No tienes artículos añadidos</p>
            </div>
          ) : (
            ticket.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-3 p-2.5 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#dee8ff]"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[12px] font-bold text-[#111c2d] truncate">{item.name}</h4>
                  <span className="text-[11px] text-[#a72e4b] font-bold">
                    ${(item.price * item.quantity).toLocaleString('es-CO')} COP
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center bg-white rounded-full p-0.5 border border-[#dee8ff]">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-[#f0f3ff] text-[#111c2d] font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-[11px] font-bold text-[#111c2d]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-[#f0f3ff] text-[#111c2d] font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-[#8a7173] hover:text-[#ba1a1a] p-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer total and checkout */}
        {ticket.length > 0 && (
          <div className="pt-3 border-t border-[#dee8ff] space-y-2.5">
            <div className="flex justify-between items-baseline">
              <span className="text-[13px] text-[#574144] font-medium">Total Estimado</span>
              <span className="text-[20px] font-extrabold text-[#a72e4b]">
                ${total.toLocaleString('es-CO')} COP
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onGoToCheckout();
              }}
              className="w-full h-11 rounded-full bg-[#a72e4b] hover:bg-[#c74763] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <span>Ir a Cobrar en Punto de Venta</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
