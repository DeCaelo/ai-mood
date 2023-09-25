'use client';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

const CustomTooltip = ({
  payload,
  label,
  active,
}: {
  payload: { payload: { color: string; mood: string } }[];
  label: string;
  active: boolean;
}) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  if (active) {
    const { color, mood } = payload[0].payload;
    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{mood}</p>
      </div>
    );
  }

  return null;
};

const HistoryChart = ({ data }: { data: any }) => {
  return (
    <ResponsiveContainer width="50%" height="50%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#39FF14"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
        <XAxis dataKey="updatedAt" stroke="#39FF14" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoryChart;
