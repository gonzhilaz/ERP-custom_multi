import { SecurityOpsAuditLogView } from '@/components/page/security-ops/SecurityOpsAuditLogView';

export const metadata = {
  title: 'Audit Log Keamanan | ERP Enterprise',
  description: 'Catatan audit pos keamanan & data soft-delete.'
};

export default function Page() {
  return <SecurityOpsAuditLogView />;
}
