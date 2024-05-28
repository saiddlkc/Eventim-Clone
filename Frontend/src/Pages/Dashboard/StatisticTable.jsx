import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
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
} from 'chart.js';

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
    revenue: 0,
    recentActivity: [],
    revenueHistory: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get("http://localhost:4000/dashboard/users");
        const usersCount = usersResponse.data.length+900;

        // Mock data for events, revenue, recentActivity, and revenueHistory
        const eventsCount = 195; // Mocked number of events
        const revenue = 2000; // Mocked revenue
       
        const revenueHistory = [
          { date: '2023-01-01', revenue: 4000 },
          { date: '2023-02-01', revenue: 8000 },
          { date: '2023-03-01', revenue: 9000 },
          { date: '2023-04-01', revenue: 11500 },
          { date: '2023-05-01', revenue: 4000 },
        ];

        setStats({
          users: usersCount,
          events: eventsCount,
          revenue: revenue,
          revenueHistory: revenueHistory,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ['Users', 'Events', 'Revenue'],
    datasets: [
      {
        label: 'Count',
        data: [stats.users, stats.events, stats.revenue],
        backgroundColor: ['#3182CE', '#EC4899', '#4BBF6B'], // Neue Farben für Balkendiagramm (grün für Revenue)
        borderColor: ['#3182CE', '#EC4899', '#4BBF6B'], // Neue Farben für Balkendiagramm (optional)
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Users', 'Events', 'Revenue'],
    datasets: [
      {
        data: [stats.users, stats.events, stats.revenue],
        backgroundColor: ['#3182CE', '#EC4899', '#4BBF6B'], // Neue Farben für Tortendiagramm (grün für Revenue)
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Border-Farben für Tortendiagramm (optional)
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: stats.revenueHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Revenue',
        data: stats.revenueHistory.map(entry => entry.revenue),
        fill: false,
        borderColor: '#4BBF6B',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white border-slate-50">
      <h1 className="text-2xl font-bold mb-4">Dashboard Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded overflow-auto">
          <h2 className="text-xl mb-4">Statistics Overview</h2>
          <div className="h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded overflow-auto">
          <h2 className="text-xl mb-4">Statistics Distribution</h2>
          <div className="h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-4 rounded overflow-auto mt-4">
        <h2 className="text-xl mb-4">Revenue History</h2>
        <div className="h-64">
          <Line data={lineData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
