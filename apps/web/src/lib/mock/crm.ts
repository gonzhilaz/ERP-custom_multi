export interface CrmPartner {
  id: string;
  code: string;
  name: string;
  type: 'CLIENT_B2B' | 'VENDOR_SUPPLIER' | 'RETAIL_CUSTOMER';
  industry: string;
  contactPerson: string;
  phone: string;
  email: string;
  creditLimit: number;
  outstandingBalance: number;
  rating: number;
  status: string;
  recentTransactions: Array<{
    id: string;
    description: string;
    date: string;
    amount: number;
    status: string;
  }>;
}

export interface CrmDealItem {
  id: string;
  dealCode: string;
  clientName: string;
  dealTitle: string;
  dealValue: number; // Rp
  stage: 'LEAD' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';
  probabilityPct: number;
  expectedCloseDate: string;
  ownerName: string;
}

export interface QuotationItem {
  id: string;
  quotationNumber: string;
  clientName: string;
  totalAmount: number;
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED';
  validUntil: string;
  createdDate: string;
}

export const MOCK_CRM_PARTNERS: CrmPartner[] = [
  {
    id: 'crm-01',
    code: 'CRM-B2B-001',
    name: 'PT Indofood Catering Corporate',
    type: 'CLIENT_B2B',
    industry: 'Food & Beverage Supply',
    contactPerson: 'Bpk. Handoko',
    phone: '+62 21 5544 3322',
    email: 'purchasing@indofood.co.id',
    creditLimit: 500000000,
    outstandingBalance: 85000000,
    rating: 4.9,
    status: 'ACTIVE',
    recentTransactions: [
      { id: 'tx-01', description: 'Supply Roti Tawar Bulk 5.000 Pack', date: '2026-07-20', amount: 85000000, status: 'LUNAS' }
    ]
  },
  {
    id: 'crm-02',
    code: 'CRM-VND-002',
    name: 'PT Bogasari Flour Mills',
    type: 'VENDOR_SUPPLIER',
    industry: 'Raw Material Supplier',
    contactPerson: 'Ibu Ratna Sales',
    phone: '+62 21 8899 0011',
    email: 'bogasari.b2b@indofood.co.id',
    creditLimit: 1000000000,
    outstandingBalance: 120000000,
    rating: 4.8,
    status: 'ACTIVE',
    recentTransactions: [
      { id: 'tx-02', description: 'Pembelian Terigu Cakra Kembar 500 Karung', date: '2026-07-18', amount: 120000000, status: 'PENDING' }
    ]
  }
];

export const MOCK_CRM_DEALS: CrmDealItem[] = [
  {
    id: 'deal-01',
    dealCode: 'DEAL-2026-001',
    clientName: 'PT Indofood Catering Corporate',
    dealTitle: 'Kontrak Supply Roti Tawar 5.000 Pack/Bulan',
    dealValue: 85000000,
    stage: 'NEGOTIATION',
    probabilityPct: 80,
    expectedCloseDate: '2026-08-15',
    ownerName: 'Maya Indah (Sales B2B)'
  },
  {
    id: 'deal-02',
    dealCode: 'DEAL-2026-002',
    clientName: 'PT Freeport Indonesia Partner',
    dealTitle: 'Pengadaan Emas Batangan 10 Kg Murni',
    dealValue: 13500000000,
    stage: 'PROPOSAL',
    probabilityPct: 60,
    expectedCloseDate: '2026-09-01',
    ownerName: 'Ir. Hidayat (B2B Mining Sales)'
  },
  {
    id: 'deal-03',
    dealCode: 'DEAL-2026-003',
    clientName: 'Garuda Indonesia Crew Services',
    dealTitle: 'Kontrak Katering Penerbangan 10.000 Box',
    dealValue: 450000000,
    stage: 'CLOSED_WON',
    probabilityPct: 100,
    expectedCloseDate: '2026-07-20',
    ownerName: 'Budi Resto (FnB B2B Exec)'
  }
];

export const MOCK_QUOTATIONS: QuotationItem[] = [
  {
    id: 'quo-01',
    quotationNumber: 'QUO-202607-0042',
    clientName: 'PT Indofood Catering Corporate',
    totalAmount: 85000000,
    status: 'SENT',
    validUntil: '2026-08-10',
    createdDate: '2026-07-20'
  }
];
