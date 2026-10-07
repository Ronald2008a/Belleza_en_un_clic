import { ProductItem, TicketItem, Customer, InventoryItem, SalesMetric } from '../types';

export const APP_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1WYwONJ68KF5CJA5qJ7yEXXVcbzcUSw8Ha1yQegzjL0-LGMYYCjhEWUTHvoEg8yxGHe0iGPFq-0uM6X6c57Ky5pBQXAFlh0VvsHepJOYPf5nTglYgW1LgsyHAweQEJeoAX7x2dFkN82lF-zNH1aWmKWcbOZGHN-Jn9o4eCC5afllv8xc3Vein8dWfn9ac2T6VsKZIgHjYTmksIrWCnYybs9u5CRkcRooVwrOY3X_xgKyudZkXUKlgHKfiEN';
export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkCMsEMQF6VQ8y6QbGaxMOgkwpCo6Q7USB7FjJi1sVHNoy9Igys_DW9bu50bEQNzPbKu5SWfaTm-g0PxRzg_ZVYpqZ61TrGnX9EMBQxDp1xD_IiXYSto_G7QAuobmtITHvDETzeuRIqi4X9BcoQtIn5_dQpBro0we0o37p2uBRcFiT4oon-eJmjDOEKKXpP92ppvdz0Dfa7NHj8PXQg9xvYxEPTRh5E70hDxiQFDTVbw4KnWeZQvJ9Uw';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    sku: 'SKU-4192',
    brand: 'GLOWLAB',
    name: 'Serum Ácido Hialurónico + B5 30ml',
    variant: '30ml',
    category: 'skincare',
    price: 65000,
    originalPrice: 78000,
    discountBadge: '-16%',
    stockSede: 18,
    rating: 4.9,
    reviewsCount: 124,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtbc04sPgFCdJ2ALKodTcfa7_j1GRublHOTiaxekeJcAemSE6XiS4WV4nuF7qkaWg4JQbugzI2QHUX_CzB4L6wzsCx5QRGPRiQfbILsEbVab33tb4cjDQA96xcl_eg6yrXkdnq-H-CPHuo7N8I8vPQx4aAODPKwmRaV_SHUcTQ5Rf8xMRv6YJBakUT7EBA37xmBwg73fMHtIKemJm5_Oh2cj5h34mWsDUPl3mcIww0RXrX-TrFrudf-Q'
  },
  {
    id: 'prod-2',
    sku: 'SKU-8821',
    brand: 'VELVET LIPS',
    name: 'Labial Matte Larga Duración – Berry Kiss',
    variant: 'Berry Kiss',
    category: 'labios',
    price: 38000,
    stockSede: 34,
    rating: 4.8,
    reviewsCount: 89,
    swatchColor: '#8E1B38',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPU6D2hsVG9EwINBFObJER6j2UzFmEEc9-9MBcEBTiVcBKqwdCAhKgaj8NBil9Kh8-087P80AFsYOsW73RnEUvh7E4HkwvArnOcbV1lHWmOcGTK1AK8pj3cIHshfdb48--kfPpVDtIYv0kj598ZGFVhTBLnSFY44rUitLLp2k20s4orzlMC4gNcniI48_8CD_EjMMhHYyF5x_F_HedvcXVJfxh_-ciYiUSuxz9ejtTxS7a07jJsKNp9w'
  },
  {
    id: 'prod-3',
    sku: 'SKU-9943',
    brand: 'AURA PARIS',
    name: 'Paleta de Sombras Nude Sunset 12 Tonos',
    variant: '12 Tonos',
    category: 'ojos',
    price: 92000,
    stockSede: 4,
    rating: 5.0,
    reviewsCount: 65,
    urgentStock: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjzznGDPaaU1QEn8SNLzD8zCM-tWeHC_bcxUMKq9XjqPhh0xYQrahRBPqhuD_796eCqQrfmgdVdDAOqlB-5qEJvEQGpnuPWNuugcBMtpqcPJaK4Unadahk-fKxi0LwFePyt_W5hBqhduCGkkfu1Uv5kRUE3TuHtQeVF-Tk_-tsOJb3rKcEjYMzeVXUaqhJJkIcqqzTh31wVCBWqFBo6P_PPbFJbXEMsQOZMZmDCgYh8z9JIHj5yjXO2w'
  },
  {
    id: 'prod-4',
    sku: 'SKU-3120',
    brand: 'DERMASHIELD',
    name: 'Bloqueador Solar FPS 50+ Invisible Touch',
    variant: '50ml',
    category: 'skincare',
    price: 54000,
    stockSede: 45,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhotg_r9Jm4Sx3GVyo1NzjvmicPjah18MJpG7-hXbc_3mEwOsJ6n_UOYb3kITAGgZGu2Cqe-NpNL-Bo2QNPt9v5u9kp05WcfRx_oe8WfF7YAONHjCHuYcqWT2aQIlxIPtnv4cGK2htLkuFAjTcEGB8uHwhFXaos0OqrGKNOVi1OXFgzoIbNqtAHjJpF3KrORfYNFQKwQwNLOLDq2rGdGd-kJwVM4PHhWzKhDDSCWI_4jremWN04Rh8xg'
  },
  {
    id: 'prod-5',
    sku: 'SKU-7730',
    brand: 'BOTANIC CLEAN',
    name: 'Agua Micelar Desmaquillante 200ml',
    variant: '200ml',
    category: 'skincare',
    price: 28000,
    stockSede: 22,
    rating: 4.7,
    reviewsCount: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsbeq2VJgNzjII69gt3DHOfBQLk231attMg1BMd3XCGe_augl25gxNE8OgJdW1r7nxhf6FNLFQxR8TREUP7nWvV8KrQtJIO8m9fpUQVPpGvQcRH_-SuUu8P-8JLu6oOxevAEWm56l5c6by-D85_bNpa4Ctfx-Zh04BYHAxvIXCGNzhuiboKYMwI2dvZiHTNlDoG2thHf5v_rYM6-QIOP5GJvRGNQFWlqBD_n-mIrRr61_f_5e3LF0qEg'
  },
  {
    id: 'prod-6',
    sku: 'SKU-BLQ-WS',
    brand: 'COMPLEXION',
    name: 'Base Líquida Iluminadora 30ml',
    variant: 'Warm Sand (WS-04)',
    category: 'maquillaje',
    price: 58000,
    stockSede: 6,
    rating: 4.6,
    reviewsCount: 51,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWMi6InnJpudU0jg1Qty7V-9Wil7YQdNn_4gCFk6Wd-z3EbkhCMRqTKugDLJgs9sCzO8PAOMPVdtMlFL0CP3sY0G2tHkxrE2NeigBmkx_CupNaMDQF_QfVbROsD7w08xEktRAAIFZWuenhp1QTN5vwMzxrLCu-f5vDAwZHfBwcWHf5OK0NZz7nwFCWV1Fc8v7WvsNKQ-3WMVR0hJoXlr61-yGoVubwYFYfBehgP6-u-w5UoUdWsfRQmA'
  }
];

export const INITIAL_TICKET: TicketItem[] = [
  {
    id: 'tick-1',
    sku: 'SKU-8821',
    brand: 'BELLEZA VELVET',
    name: 'Labial Matte Larga Duración',
    variant: 'Berry Kiss',
    price: 38000,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuFNRjwaTzAlr8ZuGoL7QwtzZfTDirgoj38kS4LUIvb6pKPvsggIEg6IHgCDYGaDPM7k22a8b6iHtC2Q_bJXrs59GV2teZVjLDrZXCO5jwZN8xiiW1vh54uf0zZw7uByi-uw3mTZsJA3UMTBHd1JzMMSaUqvRMQSa2MYWLck8NFtsFT1gWycs4b4Z7zifN_zX3mcBXmGPGczhSGQ4hMe9WQ4f0GqCLQ58Plc159_24n3zgDO90xLxPgQ'
  },
  {
    id: 'tick-2',
    sku: 'SKU-4192',
    brand: 'DERMA GLOW',
    name: 'Serum Ácido Hialurónico',
    variant: '30ml',
    price: 65000,
    quantity: 2,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSGsJbXqcBulgAfmtR8dGqP_Kbh6tN1_W0KC-Ln3gEFQI4hrlx5rZr_J-GKkm3zjrXDXzQG-gnYzbu-oKYQgTZ-Z8tbVx2XlEnCBqYoiRBYSe2sNQJK_DdIIX0QfIDMfLOKHKRDbnYLHCY9vHoYHZIZckRtRkbq06L0oZsZsDS4taMGZi86Wh0Yi8GwoEdiPOTRqGzIztmoki40jZfCGhCDOx3iX0Qk0sKjuBrUzwbOrFD9c2FHh_qBg'
  },
  {
    id: 'tick-3',
    sku: 'SKU-7730',
    brand: 'BOTANIC CLEAN',
    name: 'Agua Micelar Desmaquillante',
    variant: '200ml',
    price: 28000,
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsbeq2VJgNzjII69gt3DHOfBQLk231attMg1BMd3XCGe_augl25gxNE8OgJdW1r7nxhf6FNLFQxR8TREUP7nWvV8KrQtJIO8m9fpUQVPpGvQcRH_-SuUu8P-8JLu6oOxevAEWm56l5c6by-D85_bNpa4Ctfx-Zh04BYHAxvIXCGNzhuiboKYMwI2dvZiHTNlDoG2thHf5v_rYM6-QIOP5GJvRGNQFWlqBD_n-mIrRr61_f_5e3LF0qEg'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Consumidor Final',
    type: 'Cédula',
    document: '1.075.290.xxx • Carolina T.',
    points: 220,
    phone: '+57 312 458 9912'
  },
  {
    id: 'cust-2',
    name: 'Valeria Gómez Sánchez',
    type: 'Cédula',
    document: '1.082.934.120',
    points: 480,
    phone: '+57 320 890 2311'
  },
  {
    id: 'cust-3',
    name: 'Camila Montes',
    type: 'Cédula',
    document: '1.075.441.802',
    points: 150,
    phone: '+57 311 765 4321'
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'BLQ-WS-04',
    brand: 'COMPLEXION',
    name: 'Base Líquida Iluminadora 30ml',
    variant: 'Tono: Warm Sand (WS-04)',
    category: 'Complexion',
    status: 'critico',
    lot: 'L-2026-08',
    location: 'Pasillo B • Estante 3',
    expiryDate: '15/Dic/2026',
    stockActual: 6,
    stockMinimo: 15,
    healthPercent: 40,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWMi6InnJpudU0jg1Qty7V-9Wil7YQdNn_4gCFk6Wd-z3EbkhCMRqTKugDLJgs9sCzO8PAOMPVdtMlFL0CP3sY0G2tHkxrE2NeigBmkx_CupNaMDQF_QfVbROsD7w08xEktRAAIFZWuenhp1QTN5vwMzxrLCu-f5vDAwZHfBwcWHf5OK0NZz7nwFCWV1Fc8v7WvsNKQ-3WMVR0hJoXlr61-yGoVubwYFYfBehgP6-u-w5UoUdWsfRQmA'
  },
  {
    id: 'inv-2',
    sku: 'SER-VC-15',
    brand: 'TRATAMIENTO FACIAL',
    name: 'Serum Vitamina C 15% + Ferúlico',
    variant: 'Tratamiento Antioxidante Intensivo 30ml',
    category: 'Tratamiento Facial',
    status: 'vencer',
    lot: 'L-2025-11',
    location: 'Pasillo C • Estante 2',
    expiryDate: '28/May/2026',
    daysToExpiry: 34,
    stockActual: 24,
    stockMinimo: 10,
    healthPercent: 65,
    alertNote: 'Lote próximo a umbral de merma. Activar bundle promocional.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANmPyEYrI5XKG-1w08rJPOHrYhJQa2oCjMxpy9Ea05NdK4DfkFdtqJIIJ8wbYU8qo9e8lF-dhTvII-Z9glyTlbin-uP7VvBMaR20OXHXVCY7w6ULEDv62jTWtNmMoos4KkTiooSDMPt0DzcVDUdkZhR2-U4ngf-xrUy4mAal33gAbgXnF6pGz1U8fXFW5JSMtdmhADEULlOBhcOdjgnoISMsBR7lKqN-4ZmA-4JpJbS2sos4QxQ2EaRg'
  },
  {
    id: 'inv-3',
    sku: 'MAS-WL-01',
    brand: 'OJOS',
    name: 'Máscara Ultra Lash Waterproof',
    variant: 'Acabado Extra Volumen • Negro Intenso',
    category: 'Ojos',
    status: 'optimo',
    lot: 'L-2027-02',
    location: 'Pasillo A • Estante 1',
    expiryDate: '10/Feb/2027',
    stockActual: 82,
    stockMinimo: 20,
    healthPercent: 85,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBU_WcsMI3VwdDItUWOnzhl3Bhj7echFdDcvdMRURu1xPnIOYwiAeYL3WhB9nNiHQMAuroa0BshvrN7e7ymOb8rMjslju6HCVrnYYJwRgqPmbhRkh0luLIJ856xNTAxxZF7hpH16_PZ59zg9zHPB0uFWoEGh_ezD_eR51ZAOqG8EoiN9uL_NAEoe50m-CsrW557xB-n4yC7Ef30fXJB35m3Nt26MkJAxkk8yu2j61P0a43BMj2q2EPqhw'
  },
  {
    id: 'inv-4',
    sku: 'LAB-VL-02',
    brand: 'LABIOS',
    name: 'Labial Matte Velvet Lips Berry',
    variant: 'Berry Kiss • Acabado Aterciopelado',
    category: 'Labios',
    status: 'optimo',
    lot: 'L-2026-10',
    location: 'Pasillo A • Estante 2',
    expiryDate: '20/Oct/2026',
    stockActual: 34,
    stockMinimo: 15,
    healthPercent: 78,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPU6D2hsVG9EwINBFObJER6j2UzFmEEc9-9MBcEBTiVcBKqwdCAhKgaj8NBil9Kh8-087P80AFsYOsW73RnEUvh7E4HkwvArnOcbV1lHWmOcGTK1AK8pj3cIHshfdb48--kfPpVDtIYv0kj598ZGFVhTBLnSFY44rUitLLp2k20s4orzlMC4gNcniI48_8CD_EjMMhHYyF5x_F_HedvcXVJfxh_-ciYiUSuxz9ejtTxS7a07jJsKNp9w'
  }
];

export const METRICS_DATA: Record<string, SalesMetric> = {
  hoy: {
    period: 'hoy',
    totalSales: 1850000,
    salesGrowth: '+12.1%',
    lastPeriodSales: '$1.65M ayer',
    dispatchesCount: 26,
    dispatchesPercent: 98.5,
    averageTicket: 68500,
    ticketGrowth: '+3.4%',
    itemsPerOrder: 2.2,
    criticalStockCount: 12,
    stockAtRiskCount: 4,
    ecommerceSales: 1050000,
    posSales: 800000,
    ecommerceOrders: 15,
    posTickets: 11,
    ecommerceRatio: 57,
    posRatio: 43
  },
  semana: {
    period: 'semana',
    totalSales: 9420000,
    salesGrowth: '+15.8%',
    lastPeriodSales: '$8.15M semana pasada',
    dispatchesCount: 132,
    dispatchesPercent: 97.1,
    averageTicket: 70200,
    ticketGrowth: '+4.8%',
    itemsPerOrder: 2.3,
    criticalStockCount: 12,
    stockAtRiskCount: 4,
    ecommerceSales: 5460000,
    posSales: 3960000,
    ecommerceOrders: 78,
    posTickets: 54,
    ecommerceRatio: 58,
    posRatio: 42
  },
  mes: {
    period: 'mes',
    totalSales: 24850000,
    salesGrowth: '+18.4%',
    lastPeriodSales: 'vs. mes anterior ($20.9M)',
    dispatchesCount: 348,
    dispatchesPercent: 96.2,
    averageTicket: 71400,
    ticketGrowth: '+5.2%',
    itemsPerOrder: 2.4,
    criticalStockCount: 12,
    stockAtRiskCount: 4,
    ecommerceSales: 14413000,
    posSales: 10437000,
    ecommerceOrders: 202,
    posTickets: 146,
    ecommerceRatio: 58,
    posRatio: 42
  },
  ano: {
    period: 'ano',
    totalSales: 284200000,
    salesGrowth: '+22.6%',
    lastPeriodSales: 'vs. año anterior ($232M)',
    dispatchesCount: 3950,
    dispatchesPercent: 96.8,
    averageTicket: 71900,
    ticketGrowth: '+7.1%',
    itemsPerOrder: 2.5,
    criticalStockCount: 12,
    stockAtRiskCount: 4,
    ecommerceSales: 164800000,
    posSales: 119400000,
    ecommerceOrders: 2290,
    posTickets: 1660,
    ecommerceRatio: 58,
    posRatio: 42
  }
};
