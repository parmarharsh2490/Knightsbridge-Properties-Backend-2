import Retell from 'retell-sdk';
import { RETELL_API_KEY, RETELL_AGENT_IDS, AgentName } from '../constants';
import logger from '../utils/logger';

const client = new Retell({ apiKey: RETELL_API_KEY });

export async function createChat(agentName: AgentName) {
  const agent_id = RETELL_AGENT_IDS[agentName];
  if (!agent_id) {
    throw new Error(`Unknown agent name: ${agentName}`);
  }
  logger.info(`Creating chat for agent ${agentName}`);
  return client.chat.create({ agent_id });
}

export async function sendChatMessage(chatId: string, content: string) {
  logger.info(`Sending message to chat ${chatId}`);
  const response = await client.chat.createChatCompletion({
    chat_id: chatId,
    content,
  });
  const last = response.messages[response.messages.length - 1] as any;
  return { content: last?.content ?? '' };
}

export async function getChatDetails(chatId: string) {
  return client.chat.retrieve(chatId);
}

export async function endChat(chatId: string) {
  await client.chat.end(chatId);
  return { ok: true };
}
