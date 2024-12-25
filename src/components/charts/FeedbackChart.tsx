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

interface FeedbackChartProps {
  data: WorkshopStats[];
}

export function FeedbackChart({ data }: FeedbackChartProps) {
  const chartData = {
    labels: data[0]?.dates || [],
    datasets: data.map((workshop) => ({
      label: workshop.title,
      data: workshop.feedback,
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
        text: 'Workshop Feedback Scores Over Time'
      }
    },
    scales: {
      y: {
        min: 0,
        max: 5,
        title: {
          display: true,
          text: 'Average Feedback Score'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}