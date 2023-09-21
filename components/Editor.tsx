'use client';
import { updateEntry } from '@/utils/api';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import { Loader } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { AnalysisCard } from './AnalysisCard';

const Editor = ({ entry }: any) => {
  const [text, setText] = useState(entry.content);
  const [currentEntry, setEntry] = useState(entry);
  const [isSaving, setIsSaving] = useState(false);

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
    <div className="w-full h-full grid grid-cols-3 gap-0 relative">
      <div className="absolute left-0 top-0 p-2">
        {isSaving ? (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="mt-5 ml-4 inline-flex shrink-0 self-center animate-spin-slow">
              <Loader className="w-5" />
            </span>
          </div>
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
      <AnalysisCard className="ml-3" entry={currentEntry} />
    </div>
  );
};

export default Editor;
