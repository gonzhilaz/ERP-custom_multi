import { useState } from 'react';
import {
  MeetingTicket,
  MeetingSession,
  MeetingAgendaItem,
  MOCK_MEETING_TICKETS,
  MOCK_MEETING_SESSIONS,
  MOCK_AGENDA_ITEMS
} from '@/lib/mock/meeting-notes';

export function useMeetingNotes() {
  const [tickets, setTickets] = useState<MeetingTicket[]>(MOCK_MEETING_TICKETS);
  const [sessions, setSessions] = useState<MeetingSession[]>(MOCK_MEETING_SESSIONS);
  const [agendaItems, setAgendaItems] = useState<MeetingAgendaItem[]>(MOCK_AGENDA_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');

  const filteredTickets = tickets.filter((t) => {
    if (t.isDeleted) return false;
    const matchesSearch =
      t.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.createdByName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBranch = selectedBranch === 'ALL' || t.branchLocation.includes(selectedBranch);
    const matchesPriority = selectedPriority === 'ALL' || t.priority === selectedPriority;
    return matchesSearch && matchesBranch && matchesPriority;
  });

  const addTicket = (newTicket: Omit<MeetingTicket, 'id' | 'ticketCode' | 'createdAt' | 'status'>) => {
    const codeNumber = Math.floor(100 + Math.random() * 900);
    const created: MeetingTicket = {
      ...newTicket,
      id: `tck-${Date.now()}`,
      ticketCode: `TCK-202607-${codeNumber}`,
      status: 'OPEN',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setTickets((prev) => [created, ...prev]);
    return created;
  };

  const resolveTicketBySupervisor = (id: string, solutionNote: string, resolvedByName: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: 'RESOLVED',
              solutionNote,
              assignedToName: resolvedByName,
              resolvedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          : t
      )
    );
  };

  const escalateTicketToHO = (id: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: 'ESCALATED_TO_HO' } : t
      )
    );
  };

  const softDeleteTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDeleted: true } : t))
    );
  };

  const addMeetingSession = (newSession: Omit<MeetingSession, 'id' | 'sessionCode'>) => {
    const created: MeetingSession = {
      ...newSession,
      id: `ses-${Date.now()}`,
      sessionCode: `MTS-2026-W${Math.floor(25 + Math.random() * 20)}`
    };
    setSessions((prev) => [created, ...prev]);
  };

  const recordAgendaDecision = (ticketId: string, sessionId: string, status: 'PENDING_CARRY_OVER' | 'RESOLVED_WITH_DECISION', decisionNote: string, actionItem: string, picName: string, dueDate: string) => {
    const targetTicket = tickets.find((t) => t.id === ticketId);
    if (!targetTicket) return;

    const newAgenda: MeetingAgendaItem = {
      id: `agd-${Date.now()}`,
      sessionId,
      ticketId,
      ticketCode: targetTicket.ticketCode,
      ticketTitle: targetTicket.title,
      status,
      decisionNote,
      actionItem,
      picName,
      dueDate,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setAgendaItems((prev) => [newAgenda, ...prev]);

    if (status === 'RESOLVED_WITH_DECISION') {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === ticketId
            ? {
                ...t,
                status: 'CLOSED',
                solutionNote: decisionNote,
                resolvedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
              }
            : t
        )
      );
    }
  };

  return {
    tickets: filteredTickets,
    allTickets: tickets,
    sessions,
    agendaItems,
    searchQuery,
    setSearchQuery,
    selectedBranch,
    setSelectedBranch,
    selectedPriority,
    setSelectedPriority,
    addTicket,
    resolveTicketBySupervisor,
    escalateTicketToHO,
    softDeleteTicket,
    addMeetingSession,
    recordAgendaDecision
  };
}
