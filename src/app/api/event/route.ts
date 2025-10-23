import { NextRequest, NextResponse } from 'next/server';
import { getEvent, updateEvent } from '@/lib/services/data-service';

// GET event data
export async function GET() {
  try {
    const event = getEvent();
    return NextResponse.json({ event });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Error al obtener información del evento' },
      { status: 500 }
    );
  }
}

// PATCH - Update event data
export async function PATCH(request: NextRequest) {
  try {
    const updates = await request.json();
    const updatedEvent = updateEvent(updates);
    
    return NextResponse.json({
      success: true,
      message: 'Evento actualizado',
      event: updatedEvent,
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { error: 'Error al actualizar evento' },
      { status: 500 }
    );
  }
}
