import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface TrendChartProps {
  data: { timestamp: Date; probability: number }[];
}

export default function TrendChart({ data }: TrendChartProps) {
  // Create gradient for the line
  const createGradient = (ctx: CanvasRenderingContext2D) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)'); // Pink/Magenta at top
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)'); // Blue in middle
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.1)'); // Green at bottom
    return gradient;
  };

  const chartData = {
    labels: data.map((d) => {
      const time = d.timestamp.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      return time;
    }),
    datasets: [
      {
        label: 'Fraud Risk Probability',
        data: data.map((d) => d.probability * 100),
        fill: true,
        borderColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return '#247BFF';
          
          const gradientLine = canvasCtx.createLinearGradient(0, 0, chartArea.width, 0);
          gradientLine.addColorStop(0, '#10B981'); // Green
          gradientLine.addColorStop(0.3, '#3B82F6'); // Blue
          gradientLine.addColorStop(0.6, '#F59E0B'); // Yellow
          gradientLine.addColorStop(0.8, '#F97316'); // Orange
          gradientLine.addColorStop(1, '#EF4444'); // Red
          return gradientLine;
        },
        backgroundColor: (ctx: any) => {
          const chart = ctx.chart;
          const { ctx: canvasCtx, chartArea } = chart;
          if (!chartArea) return 'rgba(36, 123, 255, 0.1)';
          return createGradient(canvasCtx);
        },
        tension: 0.4,
        pointBackgroundColor: (ctx: any) => {
          const value = ctx.parsed.y;
          if (value < 20) return '#10B981'; // Green
          if (value < 40) return '#3B82F6'; // Blue
          if (value < 60) return '#F59E0B'; // Yellow
          if (value < 80) return '#F97316'; // Orange
          return '#EF4444'; // Red
        },
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#D74FFF',
        pointHoverBorderWidth: 3,
        borderWidth: 3,
        shadowOffsetX: 0,
        shadowOffsetY: 2,
        shadowBlur: 10,
        shadowColor: 'rgba(59, 130, 246, 0.3)'
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic'
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#9CA3AF',
          font: {
            size: 12,
            family: 'Inter'
          },
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(15, 18, 51, 0.95)',
        titleColor: '#F4F6FF',
        bodyColor: '#F4F6FF',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 16,
        cornerRadius: 12,
        displayColors: false,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          title: function(context: any) {
            return `Time: ${context[0].label}`;
          },
          label: function (context: any) {
            const value = context.parsed.y;
            let riskLevel = 'Very Low';
            if (value >= 80) riskLevel = 'Critical';
            else if (value >= 60) riskLevel = 'High';
            else if (value >= 40) riskLevel = 'Medium';
            else if (value >= 20) riskLevel = 'Low';
            
            return [
              `Risk Probability: ${value.toFixed(1)}%`,
              `Risk Level: ${riskLevel}`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#6B7280',
          font: {
            size: 11,
            family: 'Inter'
          },
          callback: function (value: any) {
            return value + '%';
          },
          stepSize: 20
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.06)'
        },
        border: {
          display: false
        }
      },
      x: {
        ticks: {
          color: '#6B7280',
          font: {
            size: 10,
            family: 'Inter'
          },
          maxRotation: 0,
          maxTicksLimit: 8
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.06)'
        },
        border: {
          display: false
        }
      }
    }
  };

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500/20 to-security-500/20 flex items-center justify-center">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-sm">No trend data available</p>
          <p className="text-xs text-gray-500">Make predictions to see trend analysis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="h-64 relative">
        <Line data={chartData} options={options} />
      </div>
      
      {/* Risk level indicators */}
      <div className="flex justify-between text-xs mt-4 px-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1 bg-green-400 rounded"></div>
          <span className="text-gray-400">Safe (0-20%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1 bg-blue-400 rounded"></div>
          <span className="text-gray-400">Low (20-40%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1 bg-yellow-400 rounded"></div>
          <span className="text-gray-400">Med (40-60%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1 bg-orange-400 rounded"></div>
          <span className="text-gray-400">High (60-80%)</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-1 bg-red-400 rounded"></div>
          <span className="text-gray-400">Critical (80%+)</span>
        </div>
      </div>
      
      {/* Latest reading */}
      {data.length > 0 && (
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-400">
            Latest Reading: <span className="font-semibold text-primary-400">
              {(data[data.length - 1].probability * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
