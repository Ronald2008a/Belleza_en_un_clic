/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, TicketItem, Customer, ProductItem, InventoryItem, PaymentMethod } from './types';
import { INITIAL_PRODUCTS, INITIAL_TICKET, INITIAL_CUSTOMERS, INITIAL_INVENTORY, USER_AVATAR, APP_LOGO } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { PosScreen } from './components/screens/PosScreen';
import { CatalogScreen } from './components/screens/CatalogScreen';
import { InventoryScreen } from './components/screens/InventoryScreen';
import { MetricsScreen } from './components/screens/MetricsScreen';
import { InvoiceModal } from './components/modals/InvoiceModal';
import { ScannerModal } from './components/modals/ScannerModal';
import { CustomerModal } from './components/modals/CustomerModal';
import { NewStockModal } from './components/modals/NewStockModal';
import { StockAdjustModal } from './components/modals/StockAdjustModal';
import { TraceabilityModal } from './components/modals/TraceabilityModal';
import { CartModal } from './components/modals/CartModal';
import { AuditModal } from './components/modals/AuditModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('ventas');
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

  // Application Data States
  const [ticket, setTicket] = useState<TicketItem[]>(INITIAL_TICKET);
  const [customer, setCustomer] = useState<Customer>(INITIAL_CUSTOMERS[0]);
  const [products] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);

  // Modals
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [lastCheckoutTotal, setLastCheckoutTotal] = useState(181000);
  const [lastCheckoutPayment, setLastCheckoutPayment] = useState<PaymentMethod>('card');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isCustomerOpen, setIsCustomerOpen] = useState(false);
  const [isNewStockOpen, setIsNewStockOpen] = useState(false);
  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [selectedAdjustItem, setSelectedAdjustItem] = useState<InventoryItem | null>(null);
  const [isTraceabilityOpen, setIsTraceabilityOpen] = useState(false);
  const [selectedTraceItem, setSelectedTraceItem] = useState<InventoryItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add Product from Catalog to Ticket
  const handleAddToCart = (product: ProductItem) => {
    setTicket((prev) => {
      const existing = prev.find((item) => item.sku === product.sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: 'tick-' + Date.now(),
          sku: product.sku,
          brand: product.brand,
          name: product.name,
          variant: product.variant || 'Regular',
          price: product.price,
          quantity: 1,
          image: product.image
        }
      ];
    });
  };

  // Barcode scanned handler
  const handleScanResult = (scannedSku: string) => {
    const foundProd = products.find(
      (p) => p.sku.toUpperCase() === scannedSku.toUpperCase()
    );
    if (foundProd) {
      handleAddToCart(foundProd);
      showToast(`Escaneado con éxito: ${foundProd.name}`);
    } else {
      // Add generic item
      setTicket((prev) => [
        {
          id: 'tick-' + Date.now(),
          sku: scannedSku,
          brand: 'BELLEZA LAB',
          name: `Producto Escaneado (${scannedSku})`,
          variant: 'Edición Estándar',
          price: 32000,
          quantity: 1,
          image:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAuFNRjwaTzAlr8ZuGoL7QwtzZfTDirgoj38kS4LUIvb6pKPvsggIEg6IHgCDYGaDPM7k22a8b6iHtC2Q_bJXrs59GV2teZVjLDrZXCO5jwZN8xiiW1vh54uf0zZw7uByi-uw3mTZsJA3UMTBHd1JzMMSaUqvRMQSa2MYWLck8NFtsFT1gWycs4b4Z7zifN_zX3mcBXmGPGczhSGQ4hMe9WQ4f0GqCLQ58Plc159_24n3zgDO90xLxPgQ'
        },
        ...prev
      ]);
      showToast(`Producto agregado: ${scannedSku}`);
    }
  };

  // Checkout Trigger
  const handleCheckout = (total: number, paymentMethod: PaymentMethod) => {
    setLastCheckoutTotal(total);
    setLastCheckoutPayment(paymentMethod);
    setIsInvoiceOpen(true);
  };

  // Complete Sale
  const handleCompleteSale = () => {
    setTicket([]);
    showToast('¡Venta completada y Factura DIAN emitida con éxito!');
  };

  // Update Inventory Stock
  const handleConfirmStockAdjust = (itemId: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              stockActual: newStock,
              status:
                newStock === 0
                  ? 'agotado'
                  : newStock <= item.stockMinimo
                  ? 'critico'
                  : item.status === 'vencer'
                  ? 'vencer'
                  : 'optimo',
              healthPercent: Math.min(100, Math.round((newStock / item.stockMinimo) * 60))
            }
          : item
      )
    );
  };

  // Add New Stock Item
  const handleAddNewStock = (newItem: Partial<InventoryItem>) => {
    setInventory((prev) => [newItem as InventoryItem, ...prev]);
  };

  const criticalStockCount = inventory.filter((i) => i.status === 'critico').length;
  const ticketItemsCount = ticket.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#111c2d] flex flex-col font-sans selection:bg-[#a72e4b] selection:text-white">
      {/* Top Banner Navigation bar across screens for testing on desktop */}
      <div className="hidden sm:flex items-center justify-between px-4 py-1.5 bg-[#e7eeff] text-[#574144] text-[11px] font-semibold border-b border-[#dee8ff]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#006947] animate-pulse"></span>
          <span>Belleza en un Clic — Sistema Omnicanal POS &amp; E-commerce Neiva</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#8a7173] mr-2">Vistas rápidas:</span>
          <button
            onClick={() => setCurrentScreen('catalogo')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              currentScreen === 'catalogo' ? 'bg-[#a72e4b] text-white' : 'hover:bg-[#ffd9dd]'
            }`}
          >
            1. Catálogo
          </button>
          <button
            onClick={() => setCurrentScreen('inventario')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              currentScreen === 'inventario' ? 'bg-[#a72e4b] text-white' : 'hover:bg-[#ffd9dd]'
            }`}
          >
            2. Inventario
          </button>
          <button
            onClick={() => setCurrentScreen('ventas')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              currentScreen === 'ventas' ? 'bg-[#a72e4b] text-white' : 'hover:bg-[#ffd9dd]'
            }`}
          >
            3. Ventas (POS)
          </button>
          <button
            onClick={() => setCurrentScreen('metricas')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              currentScreen === 'metricas' ? 'bg-[#a72e4b] text-white' : 'hover:bg-[#ffd9dd]'
            }`}
          >
            4. Métricas
          </button>
        </div>
      </div>

      {/* Main Header */}
      <Header
        currentScreen={currentScreen}
        onSearchClick={() => {
          setCurrentScreen('catalogo');
          showToast('Búsqueda rápida activada en catálogo');
        }}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode((m) => (m === 'mobile' ? 'responsive' : 'mobile'))}
      />

      {/* Main App Content Container */}
      <main
        className={`flex-1 flex flex-col relative w-full pt-16 transition-all ${
          viewMode === 'mobile'
            ? 'max-w-[420px] mx-auto shadow-[0_0_50px_rgba(167,46,75,0.08)] bg-[#f9f9ff] min-h-screen'
            : 'max-w-4xl mx-auto px-2 sm:px-4'
        }`}
      >
        {currentScreen === 'ventas' && (
          <PosScreen
            ticket={ticket}
            setTicket={setTicket}
            customer={customer}
            onChangeCustomerClick={() => setIsCustomerOpen(true)}
            onOpenScannerClick={() => setIsScannerOpen(true)}
            onCheckoutClick={handleCheckout}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'catalogo' && (
          <CatalogScreen
            products={products}
            ticket={ticket}
            onAddToCart={handleAddToCart}
            onOpenCartModal={() => setIsCartOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'inventario' && (
          <InventoryScreen
            inventory={inventory}
            onOpenNewStockModal={() => setIsNewStockOpen(true)}
            onOpenScannerModal={() => setIsScannerOpen(true)}
            onOpenAdjustModal={(item) => {
              setSelectedAdjustItem(item);
              setIsAdjustOpen(true);
            }}
            onOpenTraceabilityModal={(item) => {
              setSelectedTraceItem(item);
              setIsTraceabilityOpen(true);
            }}
            onOpenAuditModal={() => setIsAuditOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'metricas' && (
          <MetricsScreen
            onGoToCatalog={() => setCurrentScreen('catalogo')}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onChangeScreen={setCurrentScreen}
        ticketItemsCount={ticketItemsCount}
        criticalStockCount={criticalStockCount}
      />

      {/* Toast Notification Micro-interaction */}
      {toastMessage && (
        <div className="fixed bottom-24 left-4 right-4 max-w-sm mx-auto z-50 bg-[#263143] text-[#ecf1ff] px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-fade-in border border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <span className="material-symbols-outlined text-[#6ffbbe] text-[20px] flex-shrink-0">
              check_circle
            </span>
            <span className="text-[12px] font-medium truncate">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#debfc2] hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <InvoiceModal
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        ticket={ticket}
        customer={customer}
        total={lastCheckoutTotal}
        paymentMethod={lastCheckoutPayment}
        onCompleteSale={handleCompleteSale}
      />

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanResult={handleScanResult}
      />

      <CustomerModal
        isOpen={isCustomerOpen}
        onClose={() => setIsCustomerOpen(false)}
        currentCustomer={customer}
        onSelectCustomer={setCustomer}
        onShowToast={showToast}
      />

      <NewStockModal
        isOpen={isNewStockOpen}
        onClose={() => setIsNewStockOpen(false)}
        onAddNewStock={handleAddNewStock}
        onShowToast={showToast}
      />

      <StockAdjustModal
        isOpen={isAdjustOpen}
        onClose={() => {
          setIsAdjustOpen(false);
          setSelectedAdjustItem(null);
        }}
        item={selectedAdjustItem}
        onConfirmAdjust={handleConfirmStockAdjust}
        onShowToast={showToast}
      />

      <TraceabilityModal
        isOpen={isTraceabilityOpen}
        onClose={() => {
          setIsTraceabilityOpen(false);
          setSelectedTraceItem(null);
        }}
        item={selectedTraceItem}
      />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        ticket={ticket}
        onUpdateQuantity={(id, delta) => {
          setTicket((prev) =>
            prev
              .map((it) => (it.id === id ? { ...it, quantity: it.quantity + delta } : it))
              .filter((it) => it.quantity > 0)
          );
        }}
        onRemoveItem={(id) => {
          setTicket((prev) => prev.filter((it) => it.id !== id));
          showToast('Producto eliminado');
        }}
        onGoToCheckout={() => {
          setCurrentScreen('ventas');
          showToast('Listo para cobrar en el Punto de Venta');
        }}
      />

      <AuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        onShowToast={showToast}
      />

      {/* Notifications Drawer */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-[#dee8ff] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#dee8ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#a72e4b] text-[22px]">
                  notifications
                </span>
                <h3 className="text-[15px] font-bold text-[#111c2d]">Notificaciones y Alertas</h3>
              </div>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="py-3 space-y-2.5">
              <div className="p-2.5 rounded-xl bg-[#ffdad6]/60 border border-[#ffdad6] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#ba1a1a] text-[18px] mt-0.5">
                  warning
                </span>
                <div>
                  <span className="text-[12px] font-bold text-[#93000a] block">
                    Alerta de Quiebre de Stock
                  </span>
                  <p className="text-[11px] text-[#574144]">
                    Base Líquida Warm Sand (WS-04) tiene 6 unidades (mínimo 15).
                  </p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#ffdcc3]/60 border border-[#ffdcc3] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#904d00] text-[18px] mt-0.5">
                  schedule
                </span>
                <div>
                  <span className="text-[12px] font-bold text-[#6e3900] block">
                    Lote próximo a vencer (34 días)
                  </span>
                  <p className="text-[11px] text-[#574144]">
                    Serum Vitamina C 15% requiere activación de oferta flash.
                  </p>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#e7eeff] border border-[#dee8ff] flex items-start gap-2.5">
                <span className="material-symbols-outlined text-[#006947] text-[18px] mt-0.5">
                  task_alt
                </span>
                <div>
                  <span className="text-[12px] font-bold text-[#111c2d] block">
                    Turno Mañana Abierto
                  </span>
                  <p className="text-[11px] text-[#574144]">
                    Caja POS #02 habilitada por Carolina T. a las 08:00 AM.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="w-full h-10 rounded-full bg-[#f0f3ff] text-[#111c2d] text-[12px] font-semibold hover:bg-[#dee8ff]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Profile Drawer */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl border border-[#dee8ff] p-5 text-center">
            <div className="flex justify-end">
              <button
                onClick={() => setIsProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f0f3ff] text-[#574144] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col items-center -mt-3">
              <img
                src={USER_AVATAR}
                alt="Usuario"
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#ffd9dd] shadow-md mb-2"
              />
              <h3 className="text-[16px] font-bold text-[#111c2d]">Carolina Trujillo</h3>
              <p className="text-[12px] text-[#a72e4b] font-semibold">Cajera &amp; Administradora POS</p>
              <span className="text-[11px] text-[#574144] mt-0.5">Sede Neiva Centro • Caja #02</span>
            </div>
            <div className="mt-4 p-3 rounded-2xl bg-[#f0f3ff] border border-[#dee8ff] text-left text-[12px] space-y-1.5 text-[#574144]">
              <div className="flex justify-between">
                <span>Turno:</span>
                <strong className="text-[#006947]">Mañana (08:00 - 16:00)</strong>
              </div>
              <div className="flex justify-between">
                <span>Ventas hoy:</span>
                <strong className="text-[#111c2d]">$1.850.000 COP</strong>
              </div>
              <div className="flex justify-between">
                <span>Tickets emitidos:</span>
                <strong className="text-[#111c2d]">11 transacciones</strong>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  showToast('Cierre de turno en proceso...');
                }}
                className="flex-1 h-10 rounded-full bg-[#a72e4b] text-white text-[12px] font-bold hover:bg-[#c74763]"
              >
                Cerrar Caja &amp; Turno
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
