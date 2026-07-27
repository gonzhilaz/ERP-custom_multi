import { MeetingNotesAuditLogView } from '@/components/page/meeting-notes/MeetingNotesAuditLogView';

export const metadata = {
  title: 'Audit Log Rapat | ERP Enterprise',
  description: 'Catatan audit riwayat tiket & soft-delete.'
};

export default function Page() {
  return <MeetingNotesAuditLogView />;
}
