export interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAttending: boolean;
  menuPreference: MenuOption;
  allergies?: string;
  isMainGuest: boolean;
  familyGroupId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyGroup {
  id: string;
  mainGuestId: string;
  mainGuestName: string;
  spouse?: {
    name: string;
    menuPreference: MenuOption;
    allergies?: string;
  };
  children: Array<{
    name: string;
    age: number;
    menuPreference: MenuOption;
    allergies?: string;
  }>;
  totalMembers: number;
  createdAt: string;
  updatedAt: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    city: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  reception: {
    time: string;
    venue: string;
    address: string;
  };
  dressCode: string;
  contactInfo: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  rsvpDeadline: string;
  maxGuests: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type MenuOption = 
  | 'traditional'
  | 'vegetarian'
  | 'gluten-free'
  | 'allergic-custom';

export interface GuestFormData {
  name: string;
  email: string;
  phone?: string;
  isAttending: boolean;
  menuPreference: MenuOption;
  allergies?: string;
  hasFamily: boolean;
  spouse?: {
    name: string;
    menuPreference: MenuOption;
    allergies?: string;
  };
  children: Array<{
    name: string;
    age: number;
    menuPreference: MenuOption;
    allergies?: string;
  }>;
}

export interface AdminStats {
  totalInvited: number;
  totalConfirmed: number;
  totalDeclined: number;
  pending: number;
  menuBreakdown: Record<MenuOption, number>;
  familyGroups: number;
  totalGuests: number;
  lastUpdated: string;
}