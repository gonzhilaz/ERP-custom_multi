export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  actionType: 'CREATE' | 'EDIT' | 'SOFT_DELETE' | 'BACKDATE_UNBLOCK' | 'BACKDATE_LOCK' | 'PAYMENT_SETTLEMENT' | 'APPROVE' | string;
  targetEntity: string;
  details: string;
}

const AUDIT_STORAGE_KEY = 'erp_audit_trail_logs';

export function getStoredAuditLogs(): AuditLogEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading audit logs', e);
  }
  return [];
}

export function logAuditEvent(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
  const newEntry: AuditLogEntry = {
    id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ...entry
  };

  if (typeof window !== 'undefined') {
    try {
      const existing = getStoredAuditLogs();
      const updated = [newEntry, ...existing];
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving audit log', e);
    }
  }

  return newEntry;
}
