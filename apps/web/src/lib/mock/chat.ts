export interface ChatChannelItem {
  id: string;
  name: string;
  type: 'GROUP' | 'DIRECT';
  unread: number;
}

export interface ChatMessageItem {
  id: string;
  sender: string;
  time: string;
  isMe: boolean;
  type: 'TEXT' | 'VOICE_NOTE' | 'FILE';
  content: string;
  duration?: string;
  fileName?: string;
  fileSize?: string;
}

export const MOCK_CHANNELS: ChatChannelItem[] = [
  { id: 'ch-01', name: '#general-holding', type: 'GROUP', unread: 0 },
  { id: 'ch-02', name: '#finance-coordination', type: 'GROUP', unread: 2 },
  { id: 'ch-03', name: '#mining-site-alpha', type: 'GROUP', unread: 0 },
  { id: 'ch-04', name: 'Siti Aminah (Resto Mgr)', type: 'DIRECT', unread: 1 }
];

export const MOCK_INITIAL_MESSAGES: ChatMessageItem[] = [
  {
    id: 'm-1',
    sender: 'Budi Santoso (Direksi)',
    time: '10:14',
    isMe: true,
    type: 'TEXT',
    content: 'Tolong persiapkan laporan laba rugi konsolidasi 4 unit usaha untuk rapat jam 2 siang ini.'
  },
  {
    id: 'm-2',
    sender: 'Siti Aminah',
    time: '10:18',
    isMe: false,
    type: 'VOICE_NOTE',
    content: 'Voice Mail Catatan Pembelian Bahan Resto (0:24)',
    duration: '0:24'
  },
  {
    id: 'm-3',
    sender: 'Siti Aminah',
    time: '10:20',
    isMe: false,
    type: 'FILE',
    content: 'Lampiran Invoice Supplier Catering (PDF)',
    fileName: 'INV-SUPPLIER-CATERING-882.pdf',
    fileSize: '1.2 MB'
  }
];
