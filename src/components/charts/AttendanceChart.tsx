import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { WorkshopStats } from '../../lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AttendanceChartProps {
  data: WorkshopStats[];
}

export function AttendanceChart({ data }: AttendanceChartProps) {
  const chartData = {
    labels: data[0]?.dates || [],
    datasets: data.map((workshop) => ({
      label: workshop.title,
      data: workshop.attendance,
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      tension: 0.4
    }))
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Workshop Attendance Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Attendees'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}