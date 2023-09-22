import { OpenAI } from 'langchain/llms/openai';

export const analyzeEntry = async (entry: any) => {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.call(entry);
  console.log('RESULT', result);
};
