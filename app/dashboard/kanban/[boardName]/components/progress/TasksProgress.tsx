import { Chart, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export default function TasksProgress({ chartData }) {
  Chart.register(ArcElement, Tooltip);

  return (
    <div className="xl:w-[200px] xl:h-[200px] lg:w-[350px] lg:h-[350px] lg:my-5 max-w-full mx-auto">
      <Doughnut
        className=""
        data={chartData}
        options={{
          interaction: {
            intersect: false,
          },
          responsive: true,
        }}
      />
    </div>
  );
}
