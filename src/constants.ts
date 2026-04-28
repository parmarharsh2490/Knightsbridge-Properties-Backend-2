import dotenv from 'dotenv';

dotenv.config();

export const PORT: string | number = process.env.PORT || 4000;

export const RETELL_API_KEY: string = process.env.RETELL_API_KEY || '';

export const RETELL_AGENT_IDS = {
  WEBSITE_CHATBOT: process.env.RETELL_AI_CHATBOT_ID || '',
  WHATSAPP_CHATBOT: process.env.RETELL_AI_WHATSAPP_CHATBOT_ID || '',
} as const;

export type AgentName = keyof typeof RETELL_AGENT_IDS;

export const DIALOFT_AI_API_KEY: string = process.env.DIALOFT_AI_API_KEY || '';
