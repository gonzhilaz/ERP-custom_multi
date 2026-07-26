import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Super Admin Developer Provisioner | ERP Multi-Tenant SaaS',
  description: 'Main Developer Control Center for Parent Provisioning & VPS Deployment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
