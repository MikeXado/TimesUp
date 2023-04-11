import { Chart, Tooltip, CategoryScale, LinearScale, BarElement, Ticks } from "chart.js";
import { Bar } from "react-chartjs-2";
export default function TasksProgress({ chartData }) {

  Chart.register( Tooltip , CategoryScale , LinearScale , BarElement);
  


  return (
    <div  className="w-full lg:mt-5   max-w-full mx-auto">
    
      <Bar
        className=""
        data={chartData}
        options={{
          scales:{
            y: {
              min: 0,
              ticks: {
                stepSize: 1,
                color: "#fff"
                
              }
            },
            x: {
              ticks: {
                color: "#fff"
              }
            }
          },
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          interaction: {
            intersect: false,
          },
          responsive: true,
          borderColor: "rgb(132, 154, 250)"
        }}

      />
    </div>
  );
}
