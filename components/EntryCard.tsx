type EntryCardType = {
  entry: {
    createdAt: Date;
    analysis: { summary: string; mood: string };
  };
};

const EntryCard = ({ entry }: EntryCardType) => {
  const date = new Date(entry?.createdAt).toDateString();
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow max-w-sm my-3">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{entry?.analysis?.summary}</div>
      <div className="px-4 py-4">{entry?.analysis?.mood}</div>
    </div>
  );
};

export default EntryCard;
