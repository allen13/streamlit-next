'use client';

import { PlotlyChart } from '@/components/PlotlyChart';

interface BarChartProps {
  data: { category: string; value: number }[];
  title?: string;
}

export function BarChart({ data, title = 'Bar Chart' }: BarChartProps) {
  const trace = {
    x: data.map(d => d.category),
    y: data.map(d => d.value),
    type: 'bar' as const,
    marker: {
      color: '#10b981'
    }
  };

  return (
    <PlotlyChart
      data={[trace]}
      layout={{
        title,
        xaxis: { title: 'Category' },
        yaxis: { title: 'Value' },
        height: 400
      }}
    />
  );
}