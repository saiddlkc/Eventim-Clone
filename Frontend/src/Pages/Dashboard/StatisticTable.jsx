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
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  ChartDataLabels
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

        // Mock data for events, revenue, recentActivity, and revenueHistory
        const eventsCount = 195; // Mocked number of events
        const Umsatz = 2000; // Mocked revenue

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

  const middleBarData = {
    labels: ["Users", "Tickets", "Revenues"],
    datasets: [
      {
        label: "Statistics",
        data: [stats.users, stats.events, stats.revenue],
        backgroundColor: ["#040414", "#000086", "#10B981"],
        borderColor: ["#040414", "#000086", "#10B981"],
        borderWidth: 1,
      },
    ],
  };

  const optionsWithLabels = {
    plugins: {
      datalabels: {
        display: true,
        color: 'white',
        anchor: 'end',
        align: 'start',
        formatter: (value) => value,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="mb-32 flex flex-col gap-12 m-2">
      <div className="m-1">
        <Card className="h-64 w-full mb-6">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h2">
                  Live Statistics
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <div className="p-4 rounded overflow-auto h-96">
              <Typography variant="h6" color="black" className="mb-4">
                Statistics Overview
              </Typography>
              <div className="h-72">
                <Bar data={barData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="m-1">
        <Card className="h-64 w-full mb-6 mt-24">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h2">
                  Revenue
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            <div className="rounded p-4 overflow-auto h-96">
              <Typography variant="h6" color="black" className="mb-4">
                Statistics Distribution
              </Typography>
              <div className="h-72">
                <Line data={lineData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="m-1">
        <Card className="h-64 w-full mb-6 mt-24">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h2">
                  Users, Tickets and Revenues
                </Typography>
              </div>
            </div>
          </CardHeader>
          <CardBody className="px-0">
            
              <Typography variant="h6" color="black" className="mb-4">
                Numbers Overview
              </Typography>
              <div className="h-72">
                <Bar data={middleBarData} options={optionsWithLabels} />
              </div>
           
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
