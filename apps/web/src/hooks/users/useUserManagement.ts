'use client';

import { useState, useEffect } from 'react';
import { MOCK_USERS_LIST, SystemUserItem } from '@/lib/mock/users';

export function useUserManagement() {
  const [users, setUsers] = useState<SystemUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<string>('ALL');

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(MOCK_USERS_LIST);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = users.filter((u) => {
    if (filterRole !== 'ALL' && u.systemRole !== filterRole) return false;
    return true;
  });

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : u
      )
    );
  };

  return {
    users: filteredUsers,
    allUsers: users,
    loading,
    filterRole,
    setFilterRole,
    toggleUserStatus
  };
}
