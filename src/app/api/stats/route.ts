import { NextResponse } from 'next/server';
import { getStats } from '@/lib/services/data-service';

export async function GET() {
  try {
    const stats = getStats();
    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}
