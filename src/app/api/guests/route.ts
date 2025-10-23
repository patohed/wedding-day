import { NextRequest, NextResponse } from 'next/server';
import { getAllGuests, getGuestById, updateGuest, deleteGuest } from '@/lib/services/data-service';

// GET all guests or a specific guest by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (id) {
      const guest = getGuestById(id);
      if (!guest) {
        return NextResponse.json(
          { error: 'Invitado no encontrado' },
          { status: 404 }
        );
      }
      return NextResponse.json({ guest });
    }
    
    const guests = getAllGuests();
    return NextResponse.json({ guests, total: guests.length });
  } catch (error) {
    console.error('Error fetching guests:', error);
    return NextResponse.json(
      { error: 'Error al obtener invitados' },
      { status: 500 }
    );
  }
}

// PATCH - Update a guest
export async function PATCH(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID del invitado requerido' },
        { status: 400 }
      );
    }
    
    const updates = await request.json();
    const updatedGuest = updateGuest(id, updates);
    
    if (!updatedGuest) {
      return NextResponse.json(
        { error: 'Invitado no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Invitado actualizado',
      guest: updatedGuest,
    });
  } catch (error) {
    console.error('Error updating guest:', error);
    return NextResponse.json(
      { error: 'Error al actualizar invitado' },
      { status: 500 }
    );
  }
}

// DELETE a guest
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID del invitado requerido' },
        { status: 400 }
      );
    }
    
    const deleted = deleteGuest(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Invitado no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Invitado eliminado',
    });
  } catch (error) {
    console.error('Error deleting guest:', error);
    return NextResponse.json(
      { error: 'Error al eliminar invitado' },
      { status: 500 }
    );
  }
}
