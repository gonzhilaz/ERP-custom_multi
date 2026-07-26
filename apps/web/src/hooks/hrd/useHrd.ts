'use client';

import { useState, useEffect } from 'react';
import { MOCK_EMPLOYEES, MOCK_DEPARTMENTS, EmployeeItem, DepartmentCategory } from '@/lib/mock/hrd';

export function useHrd() {
  const [employees, setEmployees] = useState<EmployeeItem[]>(MOCK_EMPLOYEES);
  const [departments, setDepartments] = useState<DepartmentCategory[]>(MOCK_DEPARTMENTS);
  const [loading, setLoading] = useState(true);
  const [filterSalaryType, setFilterSalaryType] = useState<string>('ALL');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const addEmployee = (newEmp: Omit<EmployeeItem, 'id' | 'netSalary'>) => {
    const net = Math.round(newEmp.baseSalary - newEmp.bpjsKesehatan - newEmp.bpjsKetenagakerjaan);
    const created: EmployeeItem = {
      ...newEmp,
      id: `emp-${Date.now()}`,
      netSalary: net
    };
    setEmployees((prev) => [created, ...prev]);
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const addDepartment = (newDept: Omit<DepartmentCategory, 'id' | 'employeeCount'>) => {
    const created: DepartmentCategory = {
      ...newDept,
      id: `dept-${Date.now()}`,
      employeeCount: 0
    };
    setDepartments((prev) => [created, ...prev]);
  };

  const updateDepartment = (id: string, updatedDept: Partial<DepartmentCategory>) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedDept } : d))
    );
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  };

  return {
    employees,
    allEmployees: employees,
    departments,
    loading,
    filterSalaryType,
    setFilterSalaryType,
    addEmployee,
    deleteEmployee,
    addDepartment,
    updateDepartment,
    deleteDepartment
  };
}
