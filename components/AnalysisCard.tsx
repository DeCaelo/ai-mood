import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertDialogWithChildren } from './AlertDialog';
import { Dispatch, SetStateAction } from 'react';
import getColorForSentiment from '@/utils/getColors';

type CardProps = React.ComponentProps<typeof Card>;

type ExtendedCardProps = CardProps & {
  setDeleteIsLoading: Dispatch<SetStateAction<boolean>>;
  entry: {
    id: number;
    content: string;
    analysis: {
      subject: string;
      mood: string;
      negative: boolean;
      sentimentScore: number;
    };
  };
};

export function AnalysisCard({
  setDeleteIsLoading,
  entry,
  className,
  ...props
}: ExtendedCardProps) {
  const color: string = getColorForSentiment(entry?.analysis?.sentimentScore);

  return (
    <Card className={cn('w-[380px] h-[420px]', className)} {...props}>
      <CardHeader
        style={{ background: color || '#FFF' }}
        className="rounded-lg border-2 border-slate-300 hover:border-indigo-300"
      >
        <CardTitle>Analysis</CardTitle>
        <CardDescription style={{ color: '#FFF' }}>
          Your mood this day.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap- mt-5">
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-xl font-medium leading-none">Subject</p>
            <p className="text-sm text-muted-foreground">
              {entry?.analysis?.subject}
            </p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-xl font-medium leading-none">Mood</p>
            <p className="text-sm text-muted-foreground">
              {entry?.analysis?.mood}
            </p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-xl font-medium leading-none">Negative</p>
            <p className="text-sm text-muted-foreground">
              {entry?.analysis?.negative ? 'True' : 'False'}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialogWithChildren
          entry={entry}
          setDeleteIsLoading={setDeleteIsLoading}
        >
          <Button className="w-full font-bold" variant={'destructive'}>
            <Check className="mr-2 h-4 w-4" /> Delete this mood
          </Button>
        </AlertDialogWithChildren>
      </CardFooter>
    </Card>
  );
}
