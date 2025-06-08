# Streamlit to Next.js Migration: Implementation Guide

## Overview

This document provides a concrete implementation guide for migrating Streamlit prototypes to production-ready Next.js applications using Plotly for data visualization. The focus is on practical architecture decisions and code patterns rather than learning paths.

## Architecture Comparison

### Streamlit Architecture
```python
# app.py - Everything in one file
import streamlit as st
import pandas as pd
import plotly.express as px

data = pd.read_csv('data.csv')
filtered = data[data['value'] > st.slider('Threshold', 0, 100)]
st.plotly_chart(px.scatter(filtered, x='x', y='y'))
```

### Next.js Architecture
```
/app
  /api
    /data
      route.ts        # API endpoints
  /components
    DataChart.tsx     # Plotly chart component
    FilterControls.tsx # UI controls
  /lib
    dataProcessing.ts # Business logic
  page.tsx           # Main page
```

## Technology Stack

### Core Stack
- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Plotly.js** for data visualization
- **React Query** for data fetching and caching
- **Tailwind CSS** for styling
- **Zod** for runtime validation

### Backend Options
1. **Next.js API Routes** (for simple cases)
2. **FastAPI** backend (to reuse Python logic)
3. **Separate microservices** (for complex processing)

## Implementation Patterns

### 1. Data Fetching Pattern

**Streamlit Approach:**
```python
@st.cache_data
def load_data():
    return pd.read_csv('large_dataset.csv')

df = load_data()
```

**Next.js Approach:**
```typescript
// app/api/data/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = Object.fromEntries(searchParams);
  
  // Process data (could call Python service here)
  const data = await processData(filters);
  
  return NextResponse.json(data);
}

// components/DataChart.tsx
import { useQuery } from '@tanstack/react-query';

export function DataChart({ filters }) {
  const { data, isLoading } = useQuery({
    queryKey: ['chartData', filters],
    queryFn: () => fetch(`/api/data?${new URLSearchParams(filters)}`).then(r => r.json()),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
  
  if (isLoading) return <Skeleton />;
  return <Plot data={data} />;
}
```

### 2. Interactive Controls Pattern

**Streamlit Approach:**
```python
col1, col2 = st.columns(2)
with col1:
    threshold = st.slider('Threshold', 0, 100, 50)
with col2:
    category = st.selectbox('Category', ['A', 'B', 'C'])
```

**Next.js Approach:**
```typescript
// components/FilterControls.tsx
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select } from '@/components/ui/select';

interface FilterControlsProps {
  onFiltersChange: (filters: Filters) => void;
}

export function FilterControls({ onFiltersChange }: FilterControlsProps) {
  const [filters, setFilters] = useState({
    threshold: 50,
    category: 'A'
  });

  const updateFilter = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label>Threshold</label>
        <Slider
          value={[filters.threshold]}
          onValueChange={([value]) => updateFilter('threshold', value)}
          max={100}
        />
      </div>
      <div>
        <label>Category</label>
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter('category', value)}
        >
          <SelectItem value="A">A</SelectItem>
          <SelectItem value="B">B</SelectItem>
          <SelectItem value="C">C</SelectItem>
        </Select>
      </div>
    </div>
  );
}
```

### 3. Plotly Integration Pattern

**Streamlit Approach:**
```python
fig = px.scatter(df, x='x', y='y', color='category')
st.plotly_chart(fig, use_container_width=True)
```

**Next.js Approach:**
```typescript
// components/PlotlyChart.tsx
import dynamic from 'next/dynamic';
import { PlotlyDataLayoutConfig } from 'plotly.js';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

interface PlotlyChartProps {
  data: any[];
  layout?: Partial<Plotly.Layout>;
  config?: Partial<Plotly.Config>;
}

export function PlotlyChart({ data, layout, config }: PlotlyChartProps) {
  const defaultLayout = {
    autosize: true,
    margin: { l: 0, r: 0, t: 0, b: 0 },
    ...layout
  };

  const defaultConfig = {
    responsive: true,
    displayModeBar: false,
    ...config
  };

  return (
    <div className="w-full h-full">
      <Plot
        data={data}
        layout={defaultLayout}
        config={defaultConfig}
        useResizeHandler
        className="w-full h-full"
      />
    </div>
  );
}

// Usage
<PlotlyChart
  data={[{
    x: data.map(d => d.x),
    y: data.map(d => d.y),
    mode: 'markers',
    type: 'scatter',
    marker: { color: data.map(d => d.category) }
  }]}
  layout={{ title: 'Scatter Plot' }}
/>
```

### 4. State Management Pattern

**Streamlit Approach:**
```python
if 'counter' not in st.session_state:
    st.session_state.counter = 0

if st.button('Increment'):
    st.session_state.counter += 1
```

**Next.js Approach:**
```typescript
// store/useAppStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  counter: number;
  filters: FilterState;
  increment: () => void;
  setFilters: (filters: FilterState) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      counter: 0,
      filters: { threshold: 50, category: 'A' },
      increment: () => set((state) => ({ counter: state.counter + 1 })),
      setFilters: (filters) => set({ filters }),
    }),
    { name: 'app-store' }
  )
);
```

### 5. File Upload Pattern

**Streamlit Approach:**
```python
uploaded_file = st.file_uploader("Choose a CSV file", type="csv")
if uploaded_file:
    df = pd.read_csv(uploaded_file)
```

**Next.js Approach:**
```typescript
// components/FileUpload.tsx
import { useState } from 'react';
import { parse } from 'papaparse';

export function FileUpload({ onDataLoaded }) {
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    parse(file, {
      complete: (results) => {
        onDataLoaded(results.data);
        setLoading(false);
      },
      header: true,
      dynamicTyping: true,
    });
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-6">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        disabled={loading}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0"
      />
    </div>
  );
}
```

## Python Integration Strategies

### Option 1: API Routes Calling Python
```typescript
// app/api/process/route.ts
import { spawn } from 'child_process';

export async function POST(request: Request) {
  const data = await request.json();
  
  return new Promise((resolve) => {
    const python = spawn('python', ['scripts/process.py', JSON.stringify(data)]);
    let result = '';
    
    python.stdout.on('data', (data) => {
      result += data.toString();
    });
    
    python.on('close', () => {
      resolve(NextResponse.json(JSON.parse(result)));
    });
  });
}
```

### Option 2: FastAPI Backend
```python
# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"])

@app.post("/process-data")
async def process_data(filters: dict):
    # Reuse Streamlit data processing logic
    df = load_and_process_data(filters)
    return df.to_dict(orient='records')
```

```typescript
// Next.js frontend
const response = await fetch('http://localhost:8000/process-data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(filters),
});
```

## Performance Optimizations

### 1. Data Loading
```typescript
// Use React Query for caching
const { data } = useQuery({
  queryKey: ['data', filters],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
});

// Implement pagination for large datasets
const { data } = useInfiniteQuery({
  queryKey: ['infiniteData'],
  queryFn: ({ pageParam = 0 }) => fetchPage(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextCursor,
});
```

### 2. Chart Rendering
```typescript
// Debounce filter changes
import { useDebouncedCallback } from 'use-debounce';

const debouncedUpdate = useDebouncedCallback(
  (filters) => updateChart(filters),
  300
);

// Use WebGL for large datasets
const plotlyData = {
  type: 'scattergl', // Use WebGL renderer
  mode: 'markers',
  marker: { size: 3 },
};
```

### 3. Server-Side Optimization
```typescript
// app/dashboard/page.tsx
import { Suspense } from 'react';

// Parallel data fetching
async function DashboardPage() {
  const [userData, salesData, analyticsData] = await Promise.all([
    fetchUserData(),
    fetchSalesData(),
    fetchAnalyticsData(),
  ]);

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard 
        userData={userData}
        salesData={salesData}
        analyticsData={analyticsData}
      />
    </Suspense>
  );
}
```

## Deployment Architecture

### Production Setup
```yaml
# docker-compose.yml
version: '3.8'
services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PYTHON_SERVICE_URL=http://python:8000
  
  python:
    build: ./python-backend
    ports:
      - "8000:8000"
    volumes:
      - ./data:/app/data
  
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### Environment Configuration
```typescript
// lib/config.ts
export const config = {
  api: {
    pythonService: process.env.PYTHON_SERVICE_URL || 'http://localhost:8000',
    cacheTimeout: parseInt(process.env.CACHE_TIMEOUT || '300'),
  },
  features: {
    enableWebGL: process.env.ENABLE_WEBGL === 'true',
    maxDataPoints: parseInt(process.env.MAX_DATA_POINTS || '10000'),
  },
};
```

## Migration Checklist

- [ ] Identify reusable Python logic
- [ ] Set up Next.js project with TypeScript
- [ ] Create API routes or backend service
- [ ] Implement data fetching with caching
- [ ] Build interactive controls components
- [ ] Integrate Plotly charts
- [ ] Add state management
- [ ] Implement authentication (if needed)
- [ ] Set up error handling and logging
- [ ] Configure production deployment
- [ ] Add monitoring and analytics
- [ ] Performance testing with concurrent users

## Key Differences from Streamlit

1. **Explicit State Management**: Unlike Streamlit's automatic reruns, Next.js requires explicit state management
2. **Component-Based**: Build reusable components instead of linear scripts
3. **Client-Server Separation**: Clear boundary between frontend and backend
4. **Performance Control**: Fine-grained control over rendering and data fetching
5. **Scalability**: Horizontal scaling through standard web deployment practices

This architecture provides the foundation for building production-ready applications that can handle thousands of concurrent users while maintaining the rapid development benefits of your Streamlit prototypes.