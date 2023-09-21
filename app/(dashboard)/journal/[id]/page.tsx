const JournalEditorPage = async ({ params }: { params: { id: number } }) => {
  return <div className="w-full h-full">{params.id}</div>;
};

export default JournalEditorPage;
