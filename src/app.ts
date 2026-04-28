import express, { Request, Response } from 'express';
import cors from 'cors';
import logger from './utils/logger';
import { requireApiKey } from './middleware/apiKey.middleware';
import {
  handleListAgents,
  handleCreateChat,
  handleSendMessage,
  handleGetChat,
  handleEndChat,
} from './controller/chat.controller';

const app: express.Application = express();

app.use(express.json({ limit: '1mb' }));
app.use(cors());

app.use((req, _res, next) => {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
});

app.get('/', (_: Request, res: Response): void => {
  res.send('Hello World');
});

app.get('/health', (_: Request, res: Response) => {
  res.status(200).json({ ok: true });
});

app.get('/api/agents', requireApiKey, handleListAgents);
app.post('/api/chat', requireApiKey, handleCreateChat);
app.post('/api/chat/:chatId/message', requireApiKey, handleSendMessage);
app.get('/api/chat/:chatId', requireApiKey, handleGetChat);
app.post('/api/chat/:chatId/end', requireApiKey, handleEndChat);

export default app;
