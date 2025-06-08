import { NextRequest, NextResponse } from 'next/server';
import { generateChartData, generateScatterData, generateEmployeeData, generateBarData, filterData } from '@/lib/dataGenerator';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type') || 'scatter';
  const threshold = parseInt(searchParams.get('threshold') || '0');
  const category = searchParams.get('category') || undefined;
  const count = parseInt(searchParams.get('count') || '50');
  
  try {
    let data: any;
    
    switch (type) {
      case 'scatter':
        data = generateScatterData(count);
        if (threshold > 0 || category) {
          data = filterData(data, threshold, category);
        }
        break;
      
      case 'line':
        data = generateChartData(count);
        break;
      
      case 'bar':
        data = generateBarData();
        break;
      
      case 'employees':
        data = generateEmployeeData();
        break;
      
      default:
        data = [];
    }
    
    return NextResponse.json({ data, timestamp: new Date().toISOString() });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, filters } = body;
    
    // Process uploaded data with filters
    const processedData = filterData(data, filters.threshold || 0, filters.category);
    
    return NextResponse.json({ 
      data: processedData,
      count: processedData.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process data' },
      { status: 500 }
    );
  }
}