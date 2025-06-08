'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Filters {
  threshold: number;
  category: string;
}

interface FilterControlsProps {
  onFiltersChange: (filters: Filters) => void;
  categories?: string[];
}

export function FilterControls({ onFiltersChange, categories = ['All', 'A', 'B', 'C', 'D', 'E'] }: FilterControlsProps) {
  const [filters, setFilters] = useState<Filters>({
    threshold: 50,
    category: 'All'
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">
          Threshold: {filters.threshold}
        </label>
        <Slider
          value={[filters.threshold]}
          onValueChange={([value]) => updateFilter('threshold', value)}
          max={100}
          step={1}
        />
        <p className="text-xs text-gray-600">Filter values above this threshold</p>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">Category</label>
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter('category', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-600">Filter by category</p>
      </div>
    </div>
  );
}