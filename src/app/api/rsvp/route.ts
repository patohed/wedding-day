import { NextRequest, NextResponse } from 'next/server';
import { addGuest, addFamilyGroup } from '@/lib/services/data-service';
import { MenuOption } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      isAttending,
      menuPreference,
      allergies,
      hasFamily,
      spouse,
      children,
    } = body;
    
    // Validate required fields
    if (!name || !email || typeof isAttending !== 'boolean' || !menuPreference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create main guest
    const guest = addGuest({
      name,
      email,
      phone,
      isAttending,
      menuPreference: menuPreference as MenuOption,
      allergies,
      isMainGuest: true,
    });
    
    // Create family group if applicable
    let familyGroup = null;
    if (hasFamily && isAttending) {
      familyGroup = addFamilyGroup(guest, spouse, children);
    }
    
    return NextResponse.json(
      {
        success: true,
        message: 'Confirmación recibida exitosamente',
        data: {
          guest,
          familyGroup,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json(
      { error: 'Error al procesar la confirmación' },
      { status: 500 }
    );
  }
}
