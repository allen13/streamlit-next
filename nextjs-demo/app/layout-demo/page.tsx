'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart } from '@/components/charts/LineChart';
import { generateChartData } from '@/lib/dataGenerator';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function LayoutDemo() {
  const [activeTab, setActiveTab] = useState('chart');
  const [expanded, setExpanded] = useState(false);
  const [parameter1, setParameter1] = useState(50);
  const [parameter2, setParameter2] = useState('Option A');

  const chartData = generateChartData(30);
  const tableData = Array.from({ length: 10 }, (_, i) => ({
    A: Math.random().toFixed(3),
    B: Math.random().toFixed(3),
    C: Math.random().toFixed(3)
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Layout Options</h2>

      <div>
        <h3 className="text-xl font-semibold mb-4">Columns</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 bg-blue-100 p-4 rounded-lg">
            <p className="text-blue-800">Left column</p>
          </div>
          <div className="col-span-2 bg-green-100 p-4 rounded-lg">
            <p className="text-green-800">Middle column (wider)</p>
          </div>
          <div className="col-span-1 bg-yellow-100 p-4 rounded-lg">
            <p className="text-yellow-800">Right column</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Tabs</h3>
        <div className="bg-white rounded-lg shadow">
          <div className="border-b">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'chart', label: '📈 Chart', icon: '📈' },
                { id: 'data', label: '🗃 Data', icon: '🗃' },
                { id: 'config', label: '📋 Config', icon: '📋' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'chart' && (
              <LineChart data={chartData} title="Sample Chart" />
            )}
            
            {activeTab === 'data' && (
              <div>
                <p className="mb-4">Sample data table</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        {['A', 'B', 'C'].map(col => (
                          <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {tableData.map((row, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{row.A}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{row.B}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{row.C}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {activeTab === 'config' && (
              <div className="space-y-4">
                <p>Configuration options</p>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Parameter 1: {parameter1}
                  </label>
                  <Slider
                    value={[parameter1]}
                    onValueChange={([value]) => setParameter1(value)}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Parameter 2</label>
                  <Select value={parameter2} onValueChange={setParameter2}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Option A">Option A</SelectItem>
                      <SelectItem value="Option B">Option B</SelectItem>
                      <SelectItem value="Option C">Option C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Containers</h3>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4">This is inside a container</p>
          <div className="h-64">
            <BarChart data={generateChartData(10).map((d, i) => ({ category: `Day ${i + 1}`, value: d.value }))} />
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="font-medium">Click to expand</span>
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expanded && (
            <div className="mt-2 p-6 bg-white rounded-lg shadow">
              <p className="mb-4">This content is hidden by default</p>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Placeholder"
                className="rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-700">Placeholder image</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BarChart({ data }: { data: { category: string; value: number }[] }) {
  return (
    <div className="h-full flex items-end justify-between gap-2">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-blue-500 rounded-t"
            style={{ height: `${(item.value / Math.max(...data.map(d => d.value))) * 100}%` }}
          />
          <span className="text-xs mt-1">{item.category}</span>
        </div>
      ))}
    </div>
  );
}