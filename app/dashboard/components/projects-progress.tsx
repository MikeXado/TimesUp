"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ProjectType } from "@/types";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProjectsProgress({
  groupedProjects,
}: {
  groupedProjects: { [status: string]: ProjectType[] };
}) {
  const data = {
    datasets: [
      {
        data: Object.keys(groupedProjects).map((el) => {
          return groupedProjects[el].length;
        }),
        backgroundColor: ["#f9c63f", "#504fef", "#3eba7e"],
      },
    ],

    normalized: true,
  };

  // Options for the chart
  const options = {
    responsive: true,

    tooltips: {
      enabled: false,
    },
  };
  return (
    <div className="md:w-[550px] w-full  border  border-gray-300 rounded-xl p-3 pb-10">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl">Performance</h3>
        <Button variant="ghost" className="text-gray-500">
          <MoreHorizontal />
        </Button>
      </div>

      <div className="flex sm:flex-row flex-col items-center mt-10 justify-center sm:space-x-10">
        <div className=" relative max-w-[200px]">
          <Doughnut data={data} options={options} />

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Image
              src="/rocket.png"
              width={50}
              className="w-[40px]"
              height={50}
              alt="rocket"
            />
          </div>
        </div>
        <ul className=" min-[383px]:flex items-center space-y-3 min-[383px]:space-y-0 min-[383px]:space-x-4  mt-5  sm:mt-0 sm:block sm:space-x-0 sm:space-y-3">
          <li className="flex items-center space-x-3">
            <span className="bg-[#f9c63f] w-3 h-3 rounded-full block" />
            <span>Proposed</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="bg-[#504fef] w-3 h-3 rounded-full block" />
            <span>On Going</span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="bg-[#3eba7e] w-3 h-3 rounded-full block" />
            <span>Finished</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectsProgress;
