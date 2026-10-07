import React from 'react';
import { APP_LOGO, USER_AVATAR } from '../data/mockData';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  viewMode: 'mobile' | 'responsive';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSearchClick,
  onNotificationsClick,
  onProfileClick,
  viewMode,
  onToggleViewMode
}) => {
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'ventas':
        return 'Pedidos & Pos';
      case 'catalogo':
        return 'Catálogo';
      case 'inventario':
        return 'Inventario';
      case 'metricas':
        return 'Métricas & Dashboard';
      default:
        return 'Belleza en un Clic';
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#ffffff]/85 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(167,46,75,0.06)] border-b border-[#dee8ff]/60">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Logo and Screen Title */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <img
            alt="Logo Belleza en un Clic"
            className="h-8 w-auto object-contain flex-shrink-0"
            src={APP_LOGO}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[12px] font-semibold text-[#a72e4b] truncate leading-tight tracking-tight">
              Belleza en un Clic
            </span>
            <h1 className="text-[18px] font-bold text-[#111c2d] truncate leading-none mt-0.5">
              {getScreenTitle()}
            </h1>
          </div>
        </div>

        {/* View mode toggle + Header Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onToggleViewMode}
            title={viewMode === 'mobile' ? 'Cambiar a Pantalla Completa Web' : 'Cambiar a Vista Móvil App'}
            className="hidden sm:flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f0f3ff] text-[#574144] hover:text-[#a72e4b] hover:bg-[#ffd9dd] transition-all border border-[#debfc2]/40"
          >
            <span className="material-symbols-outlined text-[16px]">
              {viewMode === 'mobile' ? 'desktop_windows' : 'smartphone'}
            </span>
            <span>{viewMode === 'mobile' ? 'Web' : 'Móvil'}</span>
          </button>

          <button
            onClick={onSearchClick}
            aria-label="Buscar"
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#574144] hover:text-[#a72e4b] hover:bg-[#f0f3ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onNotificationsClick}
            aria-label="Notificaciones y Alertas"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#574144] hover:text-[#a72e4b] hover:bg-[#f0f3ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#a72e4b] ring-2 ring-white"></span>
          </button>

          <button
            onClick={onProfileClick}
            aria-label="Perfil de usuario"
            className="pl-1 focus:outline-none"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffd9dd] shadow-[0_2px_6px_-1px_rgba(17,28,45,0.08)] hover:ring-[#a72e4b] transition-all"
              src={USER_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
