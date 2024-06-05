import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Table,
} from "@material-tailwind/react";
import { FaUser, FaCalendarAlt, FaMoneyBillAlt } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Statistics = () => {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    Umsatz: 0,
    recentActivity: [],
    revenueHistory: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:4000/dashboard/users"
        );
        const usersCount = usersResponse.data.length + 900;

        const eventsCount = 195;
        const Umsatz = 2000;

        const revenueHistory = [
          { date: "2023-01-01", revenue: 1000 },
          { date: "2023-04-01", revenue: 6000 },
          { date: "2023-06-01", revenue: 8000 },
          { date: "2023-07-01", revenue: 4500 },
          { date: "2023-08-01", revenue: 8000 },
          { date: "2023-09-01", revenue: 6000 },
          { date: "2023-10-01", revenue: 11500 },
          { date: "2023-11-01", revenue: 4000 },
        ];

        setStats({
          users: usersCount,
          events: eventsCount,
          revenue: Umsatz,
          revenueHistory: revenueHistory,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ["Users", "Events", "Umsatz"],
    datasets: [
      {
        label: "X",
        data: [stats.users, stats.events, stats.revenue],
        backgroundColor: ["#040414", "#000086", "#10B981"],
        borderColor: ["#040414", "#000086", "#10B981"],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: stats.revenueHistory.map((entry) => entry.date),
    datasets: [
      {
        label: "Umsatz",
        data: stats.revenueHistory.map((entry) => entry.revenue),
        fill: false,
        borderColor: "#10B981",
        tension: 0.1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  // const activityData = [
  //   { id: 1, date: "2024-06-01", action: "Ticket erstellt", user: "Admin" },
  //   {
  //     id: 2,
  //     date: "2024-06-02",
  //     action: "Veranstaltung gelöscht",
  //     user: "Admin",
  //   },
  //   {
  //     id: 3,
  //     date: "2024-06-03",
  //     action: "Nutzerkonto gesperrt",
  //     user: "Admin",
  //   },
  //   { id: 4, date: "2024-06-04", action: "Ticket aktualisiert", user: "Admin" },
  //   {
  //     id: 5,
  //     date: "2024-06-05",
  //     action: "Veranstaltung erstellt",
  //     user: "Admin",
  //   },
  // ];

  return (
    <div className="mb-32 flex flex-col gap-12 m-2">
      <div className="m-1 flex justify-evenly">
        <div className="w-48 p-3">
          <div className="">
            <div className="h-48  bg-blue-200 hover:bg-blue-300 transition duration-300 flex flex-col items-center justify-center border-black border-2">
              <div className="rounded-full bg-white p-4 border-black border-2">
                <FaUser size={24} className="text-blue-500" />
              </div>
              <Typography variant="h2" color="black">
                {stats.users}
              </Typography>
            </div>
          </div>
        </div>

        <div className="w-48 mt-4 sm:mt-0 p-3">
          <div className="h-48  bg-gray-500 hover:bg-gray-700 transition duration-300 flex flex-col  items-center justify-center border-black border-2">
            <div className="rounded-full bg-white p-4 border-black border-2">
              <FaCalendarAlt size={24} className="text-black" />
            </div>
            <Typography variant="h2" color="black">
              {stats.events}
            </Typography>
          </div>
        </div>

        <div className="w-48 mt-4 sm:mt-0 p-3">
          <div className="h-48  bg-green-200 hover:bg-green-300 transition duration-300 flex  flex-col  items-center justify-center border-black border-2">
            <div className="rounded-full bg-white p-4 border-black border-2">
              <FaMoneyBillAlt size={24} className="text-green-500 " />
            </div>
            <Typography variant="h2" color="black">
              {stats.revenue + "€"}
            </Typography>
          </div>
        </div>
      </div>

      <div className="m-1">
        <div className="h-64 w-full mb-4">
          <CardBody className="px-0 ">
            <div className="p-4 rounded overflow-auto h-96">
              <Typography variant="h6" color="black" className="mb-1">
                Statistics Overview
              </Typography>
              <div className="h-72">
                <Bar data={barData} options={options} />
              </div>
            </div>
          </CardBody>
        </div>
      </div>

      <div className="m-1">
        <div className="h-64 w-full mb-4 mt-24">
          <CardHeader floated={false} className="rounded-none"></CardHeader>
          <CardBody className="px-0 mt-2 ">
            <div className="rounded p-4 overflow-auto h-96">
              <Typography variant="h6" color="black" className="mb-1">
                Statistics Distribution
              </Typography>
              <div className="h-72">
                <Line data={lineData} options={options} />
              </div>
            </div>
          </CardBody>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
