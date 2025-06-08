export interface DataPoint {
  x: number;
  y: number;
  category: string;
  value: number;
  date: string;
}

export interface Employee {
  name: string;
  age: number;
  city: string;
  salary: number;
}

export function generateChartData(days: number = 100): { date: string; value: number }[] {
  const data: { date: string; value: number }[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  let value = 100;
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Random walk
    value += (Math.random() - 0.5) * 10;
    value = Math.max(0, value);
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(value.toFixed(2))
    });
  }
  
  return data;
}

export function generateScatterData(count: number = 50): DataPoint[] {
  const categories = ['A', 'B', 'C', 'D', 'E'];
  const data: DataPoint[] = [];
  
  for (let i = 0; i < count; i++) {
    data.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.random() * 100,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return data;
}

export function generateEmployeeData(): Employee[] {
  return [
    { name: 'Alice', age: 25, city: 'New York', salary: 50000 },
    { name: 'Bob', age: 30, city: 'London', salary: 60000 },
    { name: 'Charlie', age: 35, city: 'Paris', salary: 75000 },
    { name: 'Diana', age: 28, city: 'Tokyo', salary: 55000 },
    { name: 'Eve', age: 32, city: 'Sydney', salary: 65000 }
  ];
}

export function generateBarData() {
  return [
    { category: 'A', value: 23 },
    { category: 'B', value: 45 },
    { category: 'C', value: 56 },
    { category: 'D', value: 78 },
    { category: 'E', value: 32 }
  ];
}

export function filterData<T extends { value: number; category?: string }>(
  data: T[],
  threshold: number,
  category?: string
): T[] {
  return data.filter(item => {
    const meetsThreshold = item.value >= threshold;
    const meetsCategory = !category || !item.category || item.category === category;
    return meetsThreshold && meetsCategory;
  });
}