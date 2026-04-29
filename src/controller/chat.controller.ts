import { Request, Response } from 'express';
import {
  createChat,
  sendChatMessage,
  getChatDetails,
  endChat,
} from '../service/retell.service';
import { AgentName, RETELL_AGENT_IDS } from '../constants';
import logger from '../utils/logger';

export const handleListAgents = (_req: Request, res: Response) => {
  console.log(RETELL_AGENT_IDS);
  return res.status(200).json({ agents: Object.keys(RETELL_AGENT_IDS) });
};

export const handleCreateChat = async (req: Request, res: Response) => {
  try {
    const { agentId } = req.body as { agentId?: AgentName };
    if (!agentId || !(agentId in RETELL_AGENT_IDS)) {
      return res.status(400).json({ error: 'invalid_agent_id' });
    }
    const chat = await createChat(agentId);
    return res.status(200).json(chat);
  } catch (error) {
    logger.error('createChat failed:', error);
    return res.status(502).json({ error: 'upstream_error' });
  }
};

export const handleSendMessage = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId as string;
    const { content } = req.body as { content?: string };
    if (!chatId || typeof content !== 'string') {
      return res.status(400).json({ error: 'invalid_request' });
    }
    const result = await sendChatMessage(chatId, content);
    return res.status(200).json(result);
  } catch (error) {
    logger.error('sendChatMessage failed:', error);
    return res.status(502).json({ error: 'upstream_error' });
  }
};

export const handleGetChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId as string;
    if (!chatId) return res.status(400).json({ error: 'invalid_request' });
    const chat = await getChatDetails(chatId);
    return res.status(200).json(chat);
  } catch (error) {
    logger.error('getChatDetails failed:', error);
    return res.status(502).json({ error: 'upstream_error' });
  }
};

export const handleEndChat = async (req: Request, res: Response) => {
  try {
    const chatId = req.params.chatId as string;
    if (!chatId) return res.status(400).json({ error: 'invalid_request' });
    const result = await endChat(chatId);
    return res.status(200).json(result);
  } catch (error) {
    logger.error('endChat failed:', error);
    return res.status(502).json({ error: 'upstream_error' });
  }
};
