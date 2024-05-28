import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const usersResponse = await axios.get("http://localhost:4000/dashboard/users");
        // const usersCount = usersResponse.data.length;

        // Mock data for events and revenue
        const eventsCount = 148; // Mocked number of events
        const revenue = 1252; // Mocked revenue
        const usersCount = 789; // Mocked number of users

        setStats({
          users: usersCount+789,
          events: eventsCount,
          revenue: revenue,
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
        backgroundColor: ['#3182CE', '#EC4899',  '#4BBF6B'], // Neue Farben für Balkendiagramm
        borderColor: ['#3182CE', '#EC4899', '#4BBF6B'], // Neue Farben für Balkendiagramm
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: ['Users', 'Events', 'Revenue'],
    datasets: [
      {
        data: [stats.users, stats.events, stats.revenue],
        backgroundColor: ['#3182CE', '#EC4899',  '#4BBF6B'], // Neue Farben für Tortendiagramm
        borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'], // Border-Farben für Tortendiagramm (optional)
        borderWidth: 1,
      },
    ],
  };

 
  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white container">
      <h1 className="text-2xl font-bold mb-4 text-center"> Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 p-4 rounded overflow-auto">
          <h2 className="text-xl mb-4">Statistics Overview</h2>
          <div className="h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className='bg-slate-100 p-4'>Y</div>
        <div className="bg-gray-800 p-4 rounded overflow-auto">
          <h2 className="text-xl mb-4">Statistics Distribution</h2>
          <div className="h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
