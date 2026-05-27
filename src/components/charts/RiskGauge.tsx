import { useEffect, useRef, useState } from 'react';

interface RiskGaugeProps {
  value: number;
}

export default function RiskGauge({ value }: RiskGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Animate the value change
    const startValue = animatedValue;
    const endValue = value;
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);
      
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [value]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) - 30;

    ctx.clearRect(0, 0, rect.width, rect.height);

    // Background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 16;
    ctx.stroke();

    // Risk level segments
    const segments = [
      { start: 0, end: 20, color: '#10B981' }, // Green - Very Low
      { start: 20, end: 40, color: '#3B82F6' }, // Blue - Low
      { start: 40, end: 60, color: '#F59E0B' }, // Yellow - Medium
      { start: 60, end: 80, color: '#F97316' }, // Orange - High
      { start: 80, end: 100, color: '#EF4444' } // Red - Critical
    ];

    segments.forEach(segment => {
      const startAngle = Math.PI + (segment.start / 100) * Math.PI;
      const endAngle = Math.PI + (segment.end / 100) * Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 25, startAngle, endAngle);
      ctx.strokeStyle = segment.color;
      ctx.lineWidth = 4;
      ctx.stroke();
    });

    // Main progress arc
    const angle = Math.PI + (animatedValue / 100) * Math.PI;
    
    // Determine color based on risk level
    let progressColor;
    if (animatedValue < 20) progressColor = '#10B981';
    else if (animatedValue < 40) progressColor = '#3B82F6';
    else if (animatedValue < 60) progressColor = '#F59E0B';
    else if (animatedValue < 80) progressColor = '#F97316';
    else progressColor = '#EF4444';

    // Glowing effect
    ctx.shadowColor = progressColor;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, angle);
    ctx.strokeStyle = progressColor;
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Reset shadow for text
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(15, 18, 51, 0.8)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Main percentage text
    ctx.font = 'bold 28px Inter, sans-serif';
    ctx.fillStyle = '#F4F6FF';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(animatedValue)}%`, centerX, centerY - 5);

    // Risk level label
    ctx.font = '12px Inter, sans-serif';
    ctx.fillStyle = '#9CA3AF';
    const riskLabel = getRiskLabel(animatedValue);
    ctx.fillText(riskLabel, centerX, centerY + 20);

    // Add needle pointer
    const needleAngle = Math.PI + (animatedValue / 100) * Math.PI;
    const needleLength = radius - 10;
    const needleX = centerX + Math.cos(needleAngle) * needleLength;
    const needleY = centerY + Math.sin(needleAngle) * needleLength;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(needleX, needleY);
    ctx.strokeStyle = progressColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Needle center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
    ctx.fillStyle = progressColor;
    ctx.fill();
  }, [animatedValue]);

  const getRiskLabel = (val: number) => {
    if (val < 20) return 'Very Low Risk';
    if (val < 40) return 'Low Risk';
    if (val < 60) return 'Medium Risk';
    if (val < 80) return 'High Risk';
    return 'Critical Risk';
  };

  const getRiskColor = (val: number) => {
    if (val < 20) return 'text-green-400';
    if (val < 40) return 'text-blue-400';
    if (val < 60) return 'text-yellow-400';
    if (val < 80) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="relative">
      <div className="flex justify-center">
        <canvas 
          ref={canvasRef} 
          className="w-80 h-56" 
          style={{ width: '320px', height: '224px' }}
        />
      </div>
      
      {/* Risk indicators */}
      <div className="flex justify-between text-xs text-gray-400 mt-4 px-8">
        <span className="flex flex-col items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mb-1"></div>
          <span>Safe</span>
        </span>
        <span className="flex flex-col items-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full mb-1"></div>
          <span>Low</span>
        </span>
        <span className="flex flex-col items-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full mb-1"></div>
          <span>Med</span>
        </span>
        <span className="flex flex-col items-center">
          <div className="w-2 h-2 bg-orange-400 rounded-full mb-1"></div>
          <span>High</span>
        </span>
        <span className="flex flex-col items-center">
          <div className="w-2 h-2 bg-red-400 rounded-full mb-1"></div>
          <span>Critical</span>
        </span>
      </div>
      
      {/* Current status */}
      <div className={`text-center mt-4 font-semibold ${getRiskColor(animatedValue)}`}>
        {getRiskLabel(animatedValue)}
      </div>
    </div>
  );
}
