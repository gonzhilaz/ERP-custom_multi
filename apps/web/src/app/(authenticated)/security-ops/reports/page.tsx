import { SecurityOpsReportsView } from '@/components/page/security-ops/SecurityOpsReportsView';

export const metadata = {
  title: 'Laporan Keamanan | ERP Enterprise',
  description: 'Rekapitulasi gate traffic & statistik insiden pos.'
};

export default function Page() {
  return <SecurityOpsReportsView />;
}
