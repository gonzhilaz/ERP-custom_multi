import { LayoutDashboard } from 'lucide-react';
import { isSubMenuAllowedForRole, SystemRole } from '@/lib/auth/rbac-resolver';
import { holdingCategories } from './tenant-nav/holding';
import { restoCategories } from './tenant-nav/resto';
import { miningCategories } from './tenant-nav/mining';
import { hotelCategories } from './tenant-nav/hotel';
import { retailCategories } from './tenant-nav/retail';

export interface SubMenuItem {
  name: string;
  href: string;
  badge?: string;
  isSectionHeader?: boolean;
}

export interface ModuleCategory {
  id: string;
  name: string;
  icon: any;
  subMenus: SubMenuItem[];
}

// Universal Core Category Headers + Enriched Departmental Sub-Menus for Real Tenants
export const getFilteredCategoriesForTenant = (
  tenantId: string,
  tenantType?: string,
  userRole: SystemRole = 'HOLDING_EXECUTIVE'
): ModuleCategory[] => {
  let rawCategories: ModuleCategory[] = [];

  // 1. 🏢 Parent Company / HO Central Mode
  if (tenantId === 'holding' || tenantId === 'all' || tenantType === 'Parent Company / HO') {
    rawCategories = holdingCategories;
  }
  // 2. 🍲 Resto Alam Rindu & Catering Surya Kencana (FnB & Catering)
  else if (
    tenantId === 'tenant-resto-alam-rindu' ||
    tenantId === 'tenant-catering-surya' ||
    tenantType === 'Restoran & Catering' ||
    tenantType === 'Catering Massal'
  ) {
    rawCategories = restoCategories;
  }
  // 3. ⛏️ Tambang PT. Braxit (Tambang Emas)
  else if (tenantId === 'tenant-mining-braxit' || tenantType === 'Tambang Emas') {
    rawCategories = miningCategories;
  }
  // 4. 🏨 Hotel Alam Pakuan (Hotel & Hospitality)
  else if (tenantId === 'tenant-hotel-alam-pakuan' || tenantType === 'Hotel & Hospitality') {
    rawCategories = hotelCategories;
  }
  // 5. 🍞 Toko Roti (Retail Bakery Chain)
  else if (tenantId === 'tenant-toko-roti' || tenantType === 'Retail Chain') {
    rawCategories = retailCategories;
  } else {
    rawCategories = [
      {
        id: 'dashboard',
        name: 'Holding Overview',
        icon: LayoutDashboard,
        subMenus: [{ name: 'Executive Dashboard', href: '/' }]
      }
    ];
  }

  // Filter Sub-Menus dynamically using RBAC Role Resolver!
  return rawCategories
    .map((category) => {
      const allowedSubMenus = category.subMenus.filter(
        (sub) => sub.isSectionHeader || isSubMenuAllowedForRole(userRole, sub.href)
      );
      return { ...category, subMenus: allowedSubMenus };
    })
    .filter((category) => category.subMenus.length > 0);
};
