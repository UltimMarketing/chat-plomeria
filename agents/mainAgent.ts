import dotenv from 'dotenv';
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { BaseMessage, SystemMessage } from "@langchain/core/messages";
import { MemorySaver } from "@langchain/langgraph";
import { 
  // fetchUserTool,
  // fetchPrizeTool, 
  // puntosFisicosToll,
  // fetchUserTool, 
  retrieverTool,
  puntosFisicosToll,
  direccionesPorCiudad,
  // calculatePaymentPlanTool,
  // generatePaymentOptionsTool,
  // summarizePaymentOptionTool,
  // sendEmailWithPaymentArrengementTool,
} from '../tools/tools';
import { MESSAGES } from '../config/constants';
// UUID
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const memory = new MemorySaver();

const llm = new ChatOpenAI({ 
    temperature: 0,
    model: "gpt-4o-mini",
    // maxTokens: 3000,
    apiKey: process.env.OPENAI_API_KEY,
});

const tools = [
  // fetchUserTool, 
  // fetchUserTool,
  // fetchPrizeTool,  
  // puntosFisicosToll,
  retrieverTool,
  puntosFisicosToll,
  direccionesPorCiudad,
  // calculatePaymentPlanTool,
  // generatePaymentOptionsTool,
  // summarizePaymentOptionTool,
  // sendEmailWithPaymentArrengementTool
];

const modifyMessages = (messages: BaseMessage[]) => {
    return [
      new SystemMessage(MESSAGES.SYSTEM_PROMPT),

      ...messages,
    ];
};

export const appWithMemory = createReactAgent({
    llm,
    tools,
    messageModifier: modifyMessages,
    checkpointSaver: memory,
});

// export const config = {
//     configurable: {
//       thread_id: uuidv4(),
//     },
// };