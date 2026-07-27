import { SecurityOpsIncidentsView } from '@/components/page/security-ops/SecurityOpsIncidentsView';

export const metadata = {
  title: 'Laporan Insiden Patroli | ERP Enterprise',
  description: 'Laporan temuan insiden patroli shift satpam.'
};

export default function Page() {
  return <SecurityOpsIncidentsView />;
}
