export interface JwtPayload {
  userId: string;
  email: string;
  systemRole: 'SUPER_ADMIN' | 'HOLDING_EXECUTIVE' | 'TENANT_USER';
  tenantId?: string;
}

export interface TenantContext {
  tenantId: string;
  code: string;
  name: string;
  industryType: string;
  dbConnectionUri: string;
  modulesEnabled: string[];
}

export interface UserSession {
  userId: string;
  email: string;
  fullName: string;
  systemRole: string;
  activeTenant?: TenantContext;
  availableTenants: {
    tenantId: string;
    code: string;
    name: string;
    roleInTenant: string;
  }[];
}

export interface ChatMessagePayload {
  id: string;
  channelId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  type: 'TEXT' | 'FILE' | 'VOICE_NOTE' | 'SYSTEM_ALERT';
  content?: string;
  fileUrl?: string;
  fileType?: string;
  fileSize?: number;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}
