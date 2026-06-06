import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [

  {
    name: "Java",
    score: 90,
  },

  {
    name: "React",
    score: 75,
  },

  {
    name: "Spring",
    score: 85,
  },

  {
    name: "SQL",
    score: 70,
  },

  {
    name: "DSA",
    score: 60,
  },
];

const ATSChart = () => {

  return (

    <div className="bg-slate-900 p-6 rounded-2xl shadow-lg mt-10">

      <h2 className="text-2xl font-bold text-white mb-6">

        Skills Analytics

      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ATSChart;