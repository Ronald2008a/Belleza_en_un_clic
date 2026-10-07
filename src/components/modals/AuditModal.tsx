import React, { useState } from 'react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'aud-1': true,
    'aud-2': true,
    'aud-3': false,
    'aud-4': false
  });

  if (!isOpen) return null;

  const auditTasks = [
    { id: 'aud-1', name: 'Pasillo A: Labiales Matte Velvet (Conteo Físico)', target: '34 uds', status: 'Conforme' },
    { id: 'aud-2', name: 'Pasillo A: Máscara Ultra Lash Waterproof', target: '82 uds', status: 'Conforme' },
    { id: 'aud-3', name: 'Pasillo B: Base Líquida Iluminadora WS-04', target: '6 uds', status: 'Pendiente' },
    { id: 'aud-4', name: 'Pasillo C: Serum Vitamina C Lote L-2025-11', target: '24 uds', status: 'Pendiente' }
  ];

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFinishAudit = () => {
    onShowToast('Auditoría Cíclica cerrada y sincronizada con el sistema central.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-[#dee8ff] p-5 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a72e4b] text-[22px]">fact_check</span>
            <div>
              <h3 className="text-[16px] font-bold text-[#111c2d] leading-none">
                Auditoría Cíclica de Inventario
              </h3>
              <span className="text-[11px] text-[#574144]">Corte Diario • Sede Neiva Centro</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center hover:bg-[#ffd9dd]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="py-3 space-y-2.5">
          <p className="text-[12px] text-[#574144]">
            Verifica el recuento físico por estantería para asegurar la concordancia con el kardex digital.
          </p>

          <div className="space-y-2">
            {auditTasks.map((task) => {
              const isChecked = !!checkedItems[task.id];
              return (
                <div
                  key={task.id}
                  onClick={() => toggleCheck(task.id)}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-[#006947]/5 border-[#006947]'
                      : 'bg-[#f0f3ff] border-[#dee8ff]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isChecked ? 'text-[#006947]' : 'text-[#8a7173]'
                      }`}
                    >
                      {isChecked ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[12px] font-bold text-[#111c2d] block truncate">
                        {task.name}
                      </span>
                      <span className="text-[11px] text-[#574144]">Esperado: {task.target}</span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isChecked
                        ? 'bg-[#6ffbbe]/40 text-[#005236]'
                        : 'bg-[#ffdcc3] text-[#6e3900]'
                    }`}
                  >
                    {isChecked ? 'Verificado' : 'Pendiente'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-[#dee8ff] flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-full bg-[#f0f3ff] text-[#574144] text-[12px] font-semibold"
          >
            Pausar
          </button>
          <button
            onClick={handleFinishAudit}
            className="flex-1 h-10 rounded-full bg-[#a72e4b] text-white text-[12px] font-bold shadow-md hover:bg-[#c74763]"
          >
            Finalizar Conteo
          </button>
        </div>
      </div>
    </div>
  );
};
