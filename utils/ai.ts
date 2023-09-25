import { OpenAI } from 'langchain/llms/openai';
import z from 'zod';
import {
  OutputFixingParser,
  StructuredOutputParser,
} from 'langchain/output_parsers';
import { PromptTemplate } from 'langchain/prompts';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe(
        "the mood of the person who wrote the journal entry, and must be equal to the sentiment in the sentimentScore, for example if it's -10 it's extremely negative"
      ),
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
        "sentiment of the text and rated on a scale from -10 to 10, where , -9 or -8 is very negative, -7 or -6 is negative, -5 or -4 is somewhat negative, -3 or -2 or -1 is slightly negative, is 0 is neutral, 3 or 2 or 1 is slightly positive, 5 or 4 is somewhat positive, 7 or 6 is positive, 9 or 8 is very positive, and 10 is extremely positive. Don't use numeric float."
      ),
  })
);

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions();

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  });

  const input = await prompt.format({
    entry: content,
  });

  return input;
};

export const analyzeEntry = async (entry: any) => {
  const input = await getPrompt(entry);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.call(input);

  try {
    return parser.parse(result);
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(
      new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' }),
      parser
    );
    const fix = await fixParser.parse(result);
    return fix;
  }
};
