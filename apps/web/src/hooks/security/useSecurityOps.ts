import { useState } from 'react';
import {
  SecurityGateLog,
  SecurityIncidentReport,
  MOCK_SECURITY_GATE_LOGS,
  MOCK_SECURITY_INCIDENTS
} from '@/lib/mock/security-ops';

export function useSecurityOps() {
  const [gateLogs, setGateLogs] = useState<SecurityGateLog[]>(MOCK_SECURITY_GATE_LOGS);
  const [incidents, setIncidents] = useState<SecurityIncidentReport[]>(MOCK_SECURITY_INCIDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPassType, setSelectedPassType] = useState('ALL');

  const filteredGateLogs = gateLogs.filter((g) => {
    if (g.isDeleted) return false;
    const matchesSearch =
      g.passCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedPassType === 'ALL' || g.passType === selectedPassType;
    return matchesSearch && matchesType;
  });

  const checkInVisitor = (newLog: Omit<SecurityGateLog, 'id' | 'passCode' | 'checkInTime' | 'status'>) => {
    const codeNum = Math.floor(100 + Math.random() * 900);
    const created: SecurityGateLog = {
      ...newLog,
      id: `gt-${Date.now()}`,
      passCode: `GATE-202607-${codeNum}`,
      checkInTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'INSIDE'
    };
    setGateLogs((prev) => [created, ...prev]);
  };

  const checkOutVisitor = (id: string) => {
    setGateLogs((prev) =>
      prev.map((g) =>
        g.id === id
          ? {
              ...g,
              status: 'CHECKED_OUT',
              checkOutTime: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          : g
      )
    );
  };

  const softDeleteGateLog = (id: string) => {
    setGateLogs((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isDeleted: true } : g))
    );
  };

  const reportIncident = (newInc: Omit<SecurityIncidentReport, 'id' | 'incidentCode' | 'createdAt' | 'status'>) => {
    const incNum = Math.floor(100 + Math.random() * 900);
    const created: SecurityIncidentReport = {
      ...newInc,
      id: `inc-${Date.now()}`,
      incidentCode: `INC-202607-${incNum}`,
      status: 'REPORTED',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setIncidents((prev) => [created, ...prev]);
    return created;
  };

  const escalateIncidentToTicket = (incidentId: string, ticketCode: string) => {
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: 'ESCALATED_TO_TICKET',
              linkedTicketCode: ticketCode
            }
          : inc
      )
    );
  };

  return {
    gateLogs: filteredGateLogs,
    allGateLogs: gateLogs,
    incidents,
    searchQuery,
    setSearchQuery,
    selectedPassType,
    setSelectedPassType,
    checkInVisitor,
    checkOutVisitor,
    softDeleteGateLog,
    reportIncident,
    escalateIncidentToTicket
  };
}
