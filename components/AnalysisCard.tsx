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
  isSaving: boolean;
  analysisData: {
    id: number;
    name: string;
    value: string;
  }[];
};

export function AnalysisCard({
  isSaving,
  color,
  setDeleteIsLoading,
  entry,
  className,
  analysisData,
  ...props
}: ExtendedCardProps) {
  return (
    <>
      <Card className={cn('w-[380px] h-[480px]', className)} {...props}>
        <CardHeader
          style={{ background: color || '#FFF' }}
          className="rounded-lg border-2 border-slate-300 hover:border-indigo-300"
        >
          <CardTitle>Analysis</CardTitle>
          <CardDescription style={{ color: '#FFF' }}>
            Your mood this day.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 mt-5">
          {analysisData.map((analysis) => (
            <div key={analysis.id}>
              <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-xl font-medium leading-none">
                    {analysis.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
    </>
  );
}
