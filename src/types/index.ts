export type ScreenType = 'catalogo' | 'inventario' | 'ventas' | 'metricas';

export type PaymentMethod = 'cash' | 'card' | 'qr' | 'transfer';

export interface ProductItem {
  id: string;
  sku: string;
  brand: string;
  name: string;
  variant?: string;
  category: 'skincare' | 'maquillaje' | 'labios' | 'ojos' | 'capilar' | 'oferta';
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  stockSede: number;
  rating: number;
  reviewsCount: number;
  image: string;
  swatchColor?: string;
  urgentStock?: boolean;
}

export interface TicketItem {
  id: string;
  sku: string;
  brand: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Customer {
  id: string;
  name: string;
  type: string;
  document: string;
  points: number;
  phone?: string;
}

export interface InventoryItem {
  id: string;
  sku: string;
  brand: string;
  name: string;
  variant: string;
  category: string;
  status: 'critico' | 'vencer' | 'optimo' | 'agotado';
  lot: string;
  location: string;
  expiryDate: string;
  daysToExpiry?: number;
  stockActual: number;
  stockMinimo: number;
  healthPercent: number;
  image: string;
  alertNote?: string;
}

export interface SalesMetric {
  period: 'hoy' | 'semana' | 'mes' | 'ano';
  totalSales: number;
  salesGrowth: string;
  lastPeriodSales: string;
  dispatchesCount: number;
  dispatchesPercent: number;
  averageTicket: number;
  ticketGrowth: string;
  itemsPerOrder: number;
  criticalStockCount: number;
  stockAtRiskCount: number;
  ecommerceSales: number;
  posSales: number;
  ecommerceOrders: number;
  posTickets: number;
  ecommerceRatio: number;
  posRatio: number;
}
