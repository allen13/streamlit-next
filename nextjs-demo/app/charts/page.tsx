'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ScatterChart } from '@/components/charts/ScatterChart';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { FilterControls, Filters } from '@/components/FilterControls';
import { PlotlyChart } from '@/components/PlotlyChart';

export default function Charts() {
  const [filters, setFilters] = useState<Filters>({ threshold: 0, category: 'All' });

  const { data: scatterData } = useQuery({
    queryKey: ['scatter', filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        type: 'scatter',
        threshold: filters.threshold.toString(),
        ...(filters.category !== 'All' && { category: filters.category })
      });
      const res = await fetch(`/api/data?${params}`);
      const json = await res.json();
      return json.data;
    }
  });

  const { data: lineData } = useQuery({
    queryKey: ['line'],
    queryFn: async () => {
      const res = await fetch('/api/data?type=line');
      const json = await res.json();
      return json.data;
    }
  });

  const { data: barData } = useQuery({
    queryKey: ['bar'],
    queryFn: async () => {
      const res = await fetch('/api/data?type=bar');
      const json = await res.json();
      return json.data;
    }
  });

  const areaData = lineData?.map((d: any) => ({ ...d, value: Math.abs(d.value) }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Charts and Visualizations</h2>

      <FilterControls onFiltersChange={setFilters} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          {lineData && <LineChart data={lineData} title="Line Chart" />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {barData && <BarChart data={barData} title="Bar Chart" />}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {areaData && (
            <PlotlyChart
              data={[{
                x: areaData.map((d: any) => d.date),
                y: areaData.map((d: any) => d.value),
                type: 'scatter',
                mode: 'lines',
                fill: 'tozeroy',
                name: 'Value',
                line: { color: '#8b5cf6' }
              }]}
              layout={{
                title: 'Area Chart',
                xaxis: { title: 'Date' },
                yaxis: { title: 'Value' },
                height: 400
              }}
            />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          {scatterData && <ScatterChart data={scatterData} title="Scatter Plot (Filtered)" />}
        </div>
      </div>
    </div>
  );
}