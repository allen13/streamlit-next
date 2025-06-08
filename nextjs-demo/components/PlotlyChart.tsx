'use client';

import dynamic from 'next/dynamic';
import { PlotParams } from 'react-plotly.js';

const Plot = dynamic(() => import('react-plotly.js'), { 
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading chart...</div>
});

interface PlotlyChartProps {
  data: Plotly.Data[];
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
  className?: string;
}

export function PlotlyChart({ data, layout, config, className = '' }: PlotlyChartProps) {
  const defaultLayout: Partial<Plotly.Layout> = {
    autosize: true,
    margin: { l: 40, r: 40, t: 40, b: 40 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: {
      family: 'system-ui, -apple-system, sans-serif',
      color: '#111827'
    },
    xaxis: {
      gridcolor: '#e5e7eb',
      zerolinecolor: '#e5e7eb'
    },
    yaxis: {
      gridcolor: '#e5e7eb',
      zerolinecolor: '#e5e7eb'
    },
    ...layout
  };

  const defaultConfig: Partial<Plotly.Config> = {
    responsive: true,
    displayModeBar: 'hover',
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    ...config
  };

  return (
    <div className={`w-full ${className}`}>
      <Plot
        data={data}
        layout={defaultLayout}
        config={defaultConfig}
        useResizeHandler
        className="w-full"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}