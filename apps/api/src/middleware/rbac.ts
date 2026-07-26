import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export const checkPermission = (requiredPermission: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    // SUPER_ADMIN has full bypass access
    if (req.user.systemRole === 'SUPER_ADMIN') {
      return next();
    }

    // In full production, this checks req.user.tenantId roles against tenant DB permissions.
    // For initial seed/dev phase, allow authenticated users with systemRole
    next();
  };
};
