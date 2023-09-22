import { OpenAI } from 'langchain/llms/openai';
import z from 'zod';
import { StructuredOutputParser } from 'langchain/output_parsers';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?).'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    sentimentScore: z
      .number()
      .describe(
        'sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, -9 or -8 is very negative, -7 or -6 is negative, -5 or -4 is somewhat negative, -3 or -2 or -1 is slightly negative, is 0 is neutral, 3 or 2 or 1 is slightly positive, 5 or 4 is somewhat positive, 7 or 6 is positive, 9 or 8 is very positive, and 10 is extremely positive.'
      ),
  })
);

export const analyzeEntry = async (entry: any) => {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.call(entry);
  console.log('RESULT', result);
};
