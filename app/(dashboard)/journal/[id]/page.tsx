import Editor from '@/components/Editor';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id: string) => {
  const user = await getUserFromClerkID();
  const data = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return data;
};

const JournalEditorPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);
  //console.log(entry);
  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  );
};

export default JournalEditorPage;
