import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onChangeScreen: (screen: ScreenType) => void;
  ticketItemsCount: number;
  criticalStockCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onChangeScreen,
  ticketItemsCount,
  criticalStockCount
}) => {
  const navItems = [
    {
      id: 'catalogo' as ScreenType,
      label: 'Catálogo',
      icon: 'storefront',
    },
    {
      id: 'inventario' as ScreenType,
      label: 'Inventario',
      icon: 'inventory_2',
      badge: criticalStockCount > 0 ? criticalStockCount : undefined,
      badgeColor: 'bg-[#ba1a1a]',
    },
    {
      id: 'ventas' as ScreenType,
      label: 'Ventas',
      icon: 'receipt_long',
      badge: ticketItemsCount > 0 ? ticketItemsCount : undefined,
      badgeColor: 'bg-[#a72e4b]',
    },
    {
      id: 'metricas' as ScreenType,
      label: 'Métricas',
      icon: 'analytics',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_-4px_24px_-4px_rgba(17,28,45,0.07)] border-t border-[#dee8ff]/80">
      <div className="flex items-center justify-around h-16 px-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeScreen(item.id)}
              className={`relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-all active:scale-95 ${
                isActive
                  ? 'text-[#a72e4b] font-bold'
                  : 'text-[#574144] hover:text-[#a72e4b]'
              }`}
            >
              <div className="relative">
                <span
                  className={`material-symbols-outlined text-[24px] ${
                    isActive ? 'font-bold' : ''
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#a72e4b] -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
