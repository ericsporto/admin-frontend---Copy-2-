import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
);

interface LineChartProps {
  data?: number[];
  labels?: string[];
  lineColor: string;
  lineWidth: number;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  lineColor,
  lineWidth,
}) => {
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setChartKey((prevKey) => prevKey + 1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        fill: true,
        borderColor: lineColor,
        borderWidth: lineWidth,
        backgroundColor: (context: any) => {
          const bgColor = ['rgba(0, 208, 116, 0.2)', 'rgba(0, 208, 116, 0)'];

          if (!context.chart.chartArea) {
            return;
          }
          const {
            ctx,
            data,
            chartArea: { top, bottom },
          } = context.chart;
          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, bgColor[0]);
          gradient.addColorStop(1, bgColor[1]);
          return gradient;
        },
        lineTension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category' as const,
        labels: labels,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(174, 174, 174, 1)',
        },
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grid: {
          color: 'rgba(174, 174, 174, 1)',
          borderColor: 'rgba(174, 174, 174, 1)',
          borderWidth: 1,
        },
        ticks: {
          color: 'rgba(174, 174, 174, 1)',
          stepSize: 10,
          callback: (value: string | number) => (typeof value === 'number' ? value + 'k' : value),
        },
        font: {
          size: 16,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Line key={chartKey} data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
