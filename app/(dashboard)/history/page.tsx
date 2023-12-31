import HistoryChart from '@/components/HistoryChart';
import { getUserFromClerkID } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getData = async () => {
  const user = await getUserFromClerkID();
  const analyses = await prisma.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const total = analyses.reduce((acc, curr) => {
    return acc + curr.sentimentScore;
  }, 0);

  const average = total / analyses.length;
  return { analyses, average };
};

const HistoryPage = async () => {
  const { analyses, average } = await getData();

  return (
    <>
      {analyses.length > 0 ? (
        <div className="h-full px-6 py-8">
          <h1 className="text-vertfluo text-2xl mb-4">
            Avg. Sentiment: <strong>{average}</strong>
          </h1>
          <div className="h-full w-full">
            <HistoryChart data={analyses} />
          </div>
        </div>
      ) : (
        <div className="h-full px-6 py-8">
          <h1 className="text-vertfluo text-2xl mb-4">Not yet analyses</h1>
        </div>
      )}
    </>
  );
};

export default HistoryPage;
