'use client';
import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { Textarea } from './ui/textarea';
import { AnalysisCard } from './AnalysisCard';
import { TinyLoader } from './Loader';

const Editor = ({ entry }: any) => {
  const [text, setText] = useState(entry.content);
  const [currentEntry, setEntry] = useState(entry);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  useAutosave({
    data: text,
    onSave: async (_text: string) => {
      if (_text === entry.content) return;
      setIsSaving(true);

      const { data } = await updateEntry(entry.id, { content: _text });

      setEntry(data);
      setIsSaving(false);
    },
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
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="text-xl p-8"
            />
            <p className="text-sm text-white">
              Modify your mood, it will be auto save.
            </p>
          </div>
          <AnalysisCard
            className="ml-3"
            entry={currentEntry}
            setDeleteIsLoading={setDeleteIsLoading}
          />
        </div>
      )}
    </>
  );
};

export default Editor;
