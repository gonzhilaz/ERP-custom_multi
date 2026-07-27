import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';

import authRoutes from './routes/auth';
import tenantRoutes from './routes/tenant';
import financeRoutes from './routes/finance';
import chatRoutes from './routes/chat';
import inventoryRoutes from './routes/inventory';
import vendorRoutes from './routes/vendor';
import hrdRoutes from './routes/hrd';
import essRoutes from './routes/ess';
import managerialRoutes from './routes/managerial';
import aiRoutes from './routes/ai';
import posRoutes from './routes/pos';
import hotelierRoutes from './routes/hotelier';
import healthRoutes from './routes/health';
import userRoutes from './routes/users';
import manufacturingRoutes from './routes/manufacturing';
import developerRoutes from './routes/developer';
import miningRoutes from './routes/mining';
import cateringRoutes from './routes/catering';
import provisionerRoutes from './routes/provisioner';
import reportsRoutes from './routes/reports';
import bankAccountsRoutes from './routes/bank-accounts';
import assetDepreciationRoutes from './routes/asset-depreciation';
import whatsappRoutes from './routes/whatsapp';
import { setupSocketChatHandlers } from './socket/chat-handler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON Parser
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// HTTP Server + Socket.io Server Setup
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Setup Realtime WebSockets
setupSocketChatHandlers(io);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'Enterprise Multi-Tenant ERP Engine',
    version: '2.2.0-user-management-rbac',
    timestamp: new Date().toISOString()
  });
});

// Route Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/tenants', tenantRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/vendor', vendorRoutes);
app.use('/api/hrd', hrdRoutes);
app.use('/api/ess', essRoutes);
app.use('/api/managerial', managerialRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/pos', posRoutes);
app.use('/api/hotelier', hotelierRoutes);
app.use('/api/system-health', healthRoutes);
app.use('/api/users', userRoutes);
app.use('/api/manufacturing', manufacturingRoutes);
app.use('/api/developer', developerRoutes);
app.use('/api/mining', miningRoutes);
app.use('/api/catering', cateringRoutes);
app.use('/api/provisioner', provisionerRoutes);
app.use('/api/finance/reports', reportsRoutes);
app.use('/api/finance/bank-accounts', bankAccountsRoutes);
app.use('/api/asset/depreciation', assetDepreciationRoutes);
app.use('/api/whatsapp', whatsappRoutes);

server.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 ERP Multi-Tenant API Server running on port ${PORT}`);
  console.log(`📡 WebSocket Server ready for Chat & Voice Notes`);
  console.log(`=======================================================`);
});
