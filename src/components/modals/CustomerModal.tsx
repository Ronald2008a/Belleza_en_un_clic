import React, { useState } from 'react';
import { Customer } from '../../types';
import { INITIAL_CUSTOMERS } from '../../data/mockData';

interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCustomer: Customer;
  onSelectCustomer: (customer: Customer) => void;
  onShowToast: (message: string) => void;
}

export const CustomerModal: React.FC<CustomerModalProps> = ({
  isOpen,
  onClose,
  currentCustomer,
  onSelectCustomer,
  onShowToast
}) => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState('');
  const [newName, setNewName] = useState('');
  const [newDoc, setNewDoc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  if (!isOpen) return null;

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.document.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDoc.trim()) return;

    const newCust: Customer = {
      id: 'cust-' + Date.now(),
      name: newName.trim(),
      type: 'Cédula',
      document: newDoc.trim(),
      points: 50
    };

    setCustomers((prev) => [newCust, ...prev]);
    onSelectCustomer(newCust);
    onShowToast(`Cliente registrado: ${newCust.name}`);
    setShowAddForm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-[#dee8ff] p-5 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a72e4b] text-[22px]">person_pin</span>
            <h3 className="text-[16px] font-bold text-[#111c2d]">Asignación de Cliente</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center hover:bg-[#ffd9dd]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="py-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#574144] text-[20px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar por nombre o número de cédula..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-3 rounded-xl bg-[#f0f3ff] text-[#111c2d] text-[13px] border border-[#dee8ff] focus:outline-none focus:ring-2 focus:ring-[#a72e4b]"
            />
          </div>
        </div>

        {/* Customer list */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 no-scrollbar">
          {filtered.map((cust) => {
            const isSelected = cust.id === currentCustomer.id;
            return (
              <div
                key={cust.id}
                onClick={() => {
                  onSelectCustomer(cust);
                  onClose();
                }}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#ffd9dd]/50 border-[#a72e4b]'
                    : 'bg-white hover:bg-[#f0f3ff] border-[#dee8ff]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold ${
                      isSelected
                        ? 'bg-[#a72e4b] text-white'
                        : 'bg-[#dee8ff] text-[#111c2d]'
                    }`}
                  >
                    {cust.name[0]}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[13px] font-bold text-[#111c2d] block truncate">
                      {cust.name}
                    </span>
                    <span className="text-[11px] text-[#574144] block truncate">
                      {cust.document}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-[10px] font-bold">
                    {cust.points} Pts
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[#a72e4b] text-[18px]">
                      check_circle
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add new customer toggle */}
        <div className="pt-3 border-t border-[#dee8ff]">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full h-10 rounded-full bg-[#f0f3ff] hover:bg-[#ffd9dd] text-[#a72e4b] text-[12px] font-bold flex items-center justify-center gap-1 border border-[#dee8ff]"
            >
              <span className="material-symbols-outlined text-[16px]">person_add</span>
              Registrar Nuevo Cliente
            </button>
          ) : (
            <form onSubmit={handleCreateCustomer} className="space-y-2">
              <input
                type="text"
                placeholder="Nombre y Apellidos"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full h-9 px-3 bg-[#f0f3ff] rounded-xl text-[12px] text-[#111c2d] border border-[#dee8ff]"
              />
              <input
                type="text"
                placeholder="Cédula / Documento"
                required
                value={newDoc}
                onChange={(e) => setNewDoc(e.target.value)}
                className="w-full h-9 px-3 bg-[#f0f3ff] rounded-xl text-[12px] text-[#111c2d] border border-[#dee8ff]"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 h-9 bg-[#a72e4b] text-white rounded-full text-[12px] font-bold"
                >
                  Guardar y Asignar
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 h-9 bg-[#f0f3ff] text-[#574144] rounded-full text-[12px]"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
