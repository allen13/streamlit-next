'use client';

import { PlotlyChart } from '@/components/PlotlyChart';
import { DataPoint } from '@/lib/dataGenerator';

interface ScatterChartProps {
  data: DataPoint[];
  title?: string;
}

export function ScatterChart({ data, title = 'Scatter Plot' }: ScatterChartProps) {
  const categories = Array.from(new Set(data.map(d => d.category)));
  
  const traces = categories.map(category => ({
    x: data.filter(d => d.category === category).map(d => d.x),
    y: data.filter(d => d.category === category).map(d => d.y),
    mode: 'markers' as const,
    type: 'scatter' as const,
    name: category,
    marker: {
      size: 8,
      opacity: 0.8
    }
  }));

  return (
    <PlotlyChart
      data={traces}
      layout={{
        title,
        xaxis: { title: 'X Value' },
        yaxis: { title: 'Y Value' },
        height: 400
      }}
    />
  );
}