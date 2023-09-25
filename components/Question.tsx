'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { askQuestion } from '@/utils/api';
import { useState } from 'react';
import { TinyLoader } from './Loader';

type Response = {
  data: string;
};

const Question = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response>();
  const formSchema = z.object({
    ask: z.string().min(2, {
      message: 'Ask must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ask: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const awswer = await askQuestion(values.ask);
    setResponse(awswer);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center"
      >
        <FormField
          control={form.control}
          name="ask"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  disabled={loading}
                  className="w-64"
                  placeholder="Ask a question"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button variant={'secondary'} className="ml-3" disabled>
            Asking ...
          </Button>
        ) : (
          <Button variant={'secondary'} className="bg-green-400 ml-3">
            Ask
          </Button>
        )}
      </form>
      {loading && <TinyLoader />}
      {response && <div>{response.data}</div>}
    </Form>
  );
};

export default Question;
