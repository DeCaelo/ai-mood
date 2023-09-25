'use client';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z, ZodError } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { Textarea } from './ui/textarea';
import { AnalysisCard } from './AnalysisCard';
import { TinyLoader } from './Loader';
import getColorForSentiment from '@/utils/getColors';

type EditorProps = {
  entry: any;
};

type FormData = {
  text: string;
};

const Editor: React.FC<EditorProps> = ({ entry }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        text: z.string().min(10, 'Minimum 10 characters please :)'),
      })
    ),
  });

  const [text, setText] = useState(entry.content);
  const [analysis, setAnalysis] = useState(entry.analysis);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const { mood, summary, subject, negative, sentimentScore } = analysis;
  const color: string = getColorForSentiment(sentimentScore);

  const analysisData = [
    { id: 1, name: 'Summary', value: summary },
    { id: 2, name: 'Subject', value: subject },
    { id: 3, name: 'Mood', value: mood },
    { id: 4, name: 'Negative', value: negative ? 'true' : 'false' },
  ];

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (data.text === entry.content) return;
    setIsSaving(true);

    try {
      const { data: responseData } = await updateEntry(entry.id, {
        content: data.text,
      });

      setAnalysis(responseData.analysis);
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error);
      } else {
        console.error('API error:', error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  useAutosave({
    data: text,
    onSave: handleSubmit(onSubmit),
  });

  return (
    <>
      {deleteIsLoading ? (
        <TinyLoader />
      ) : (
        <div className="w-full h-full grid grid-cols-3 gap-0 relative">
          <div className="absolute left-0 top-0 p-2">
            {isSaving ? (
              <TinyLoader />
            ) : (
              <div className="w-[16px] h-[16px] rounded-full bg-green-500"></div>
            )}
          </div>
          <div className="col-span-2">
            <Controller
              name="text"
              control={control}
              defaultValue={text}
              render={({ field }) => (
                <Textarea
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setText(e.target.value);
                  }}
                  className={`text-xl p-8 ${
                    errors.text ? 'border-red-500 border-4' : ''
                  }`}
                />
              )}
            />
            {errors.text && (
              <p className="text-sm text-white">{errors.text.message}</p>
            )}
            {!errors?.text?.message && (
              <p className="text-sm text-white">
                Modify your mood, it will be auto save.
              </p>
            )}
          </div>
          <AnalysisCard
            className="ml-3"
            analysisData={analysisData}
            setDeleteIsLoading={setDeleteIsLoading}
            isSaving={isSaving}
            color={color}
            entry={entry}
          />
        </div>
      )}
    </>
  );
};

export default Editor;
