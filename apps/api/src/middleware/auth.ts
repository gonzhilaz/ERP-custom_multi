import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload, TenantContext } from '@erp/shared-types';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
  activeTenant?: TenantContext;
}

const JWT_SECRET = process.env.JWT_SECRET || 'erp-super-secret-jwt-key-2026';

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;

    // Optional x-tenant-id header override for tenant switching
    const tenantIdHeader = req.headers['x-tenant-id'] as string;
    if (tenantIdHeader) {
      req.user.tenantId = tenantIdHeader;
    }

    next();
  } catch (err) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
};
