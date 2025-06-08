'use client';

import { PlotlyChart } from '@/components/PlotlyChart';

interface LineChartProps {
  data: { date: string; value: number }[];
  title?: string;
}

export function LineChart({ data, title = 'Time Series' }: LineChartProps) {
  const trace = {
    x: data.map(d => d.date),
    y: data.map(d => d.value),
    type: 'scatter' as const,
    mode: 'lines' as const,
    name: 'Value',
    line: {
      color: '#3b82f6',
      width: 2
    }
  };

  return (
    <PlotlyChart
      data={[trace]}
      layout={{
        title,
        xaxis: { title: 'Date' },
        yaxis: { title: 'Value' },
        height: 400
      }}
    />
  );
}