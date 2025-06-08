'use client';

import { useQuery } from '@tanstack/react-query';
import { MetricsGrid } from '@/components/Metrics';
import { Employee } from '@/lib/dataGenerator';

export default function DataDisplay() {
  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await fetch('/api/data?type=employees');
      const json = await res.json();
      return json.data as Employee[];
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const employees = data || [];
  const avgAge = employees.length > 0 
    ? employees.reduce((sum, e) => sum + e.age, 0) / employees.length 
    : 0;
  const avgSalary = employees.length > 0
    ? employees.reduce((sum, e) => sum + e.salary, 0) / employees.length
    : 0;
  const cities = new Set(employees.map(e => e.city)).size;

  const metrics = [
    { label: 'Total Employees', value: employees.length },
    { label: 'Average Age', value: avgAge.toFixed(1) },
    { label: 'Average Salary', value: `$${avgSalary.toLocaleString()}` },
    { label: 'Cities', value: cities }
  ];

  const sampleJson = {
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      preferences: {
        theme: 'dark',
        notifications: true
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold">Data Display</h2>

      <div>
        <h3 className="text-xl font-semibold mb-4">DataFrame</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {['Name', 'Age', 'City', 'Salary'].map(header => (
                  <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${employee.salary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Metrics</h3>
        <MetricsGrid metrics={metrics} />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">JSON Display</h3>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <pre className="text-gray-100">
            <code className="text-gray-100">{JSON.stringify(sampleJson, null, 2)}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}