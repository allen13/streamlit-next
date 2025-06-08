'use client';

import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricProps {
  label: string;
  value: string | number;
  delta?: number;
  deltaType?: 'increase' | 'decrease';
}

export function Metric({ label, value, delta, deltaType }: MetricProps) {
  const isPositive = deltaType === 'increase';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {delta !== undefined && (
        <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? (
            <ArrowUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1" />
          )}
          <span>{Math.abs(delta)}%</span>
        </div>
      )}
    </div>
  );
}

interface MetricsGridProps {
  metrics: MetricProps[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Metric key={index} {...metric} />
      ))}
    </div>
  );
}