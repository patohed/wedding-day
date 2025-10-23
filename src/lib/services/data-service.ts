import fs from 'fs';
import path from 'path';
import { Guest, FamilyGroup, WeddingEvent, AdminStats, MenuOption } from '@/types';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'wedding-data.json');

interface WeddingData {
  event: WeddingEvent;
  guests: Guest[];
  familyGroups: FamilyGroup[];
  stats: AdminStats;
}

// Read data from JSON file
export function readData(): WeddingData {
  try {
    const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading data file:', error);
    throw new Error('Failed to read data');
  }
}

// Write data to JSON file
export function writeData(data: WeddingData): void {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing data file:', error);
    throw new Error('Failed to write data');
  }
}

// Get all guests
export function getAllGuests(): Guest[] {
  const data = readData();
  return data.guests;
}

// Get a single guest by ID
export function getGuestById(id: string): Guest | undefined {
  const data = readData();
  return data.guests.find(guest => guest.id === id);
}

// Add a new guest
export function addGuest(guest: Omit<Guest, 'id' | 'createdAt' | 'updatedAt'>): Guest {
  const data = readData();
  
  const newGuest: Guest = {
    ...guest,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  data.guests.push(newGuest);
  
  // Update stats
  data.stats = calculateStats(data);
  
  writeData(data);
  return newGuest;
}

// Add a family group
export function addFamilyGroup(
  mainGuest: Guest,
  spouse?: { name: string; menuPreference: MenuOption; allergies?: string },
  children?: Array<{ name: string; age: number; menuPreference: MenuOption; allergies?: string }>
): FamilyGroup {
  const data = readData();
  
  const familyGroupId = generateId();
  
  // Update main guest with family group ID
  const mainGuestIndex = data.guests.findIndex(g => g.id === mainGuest.id);
  if (mainGuestIndex !== -1) {
    data.guests[mainGuestIndex].familyGroupId = familyGroupId;
  }
  
  const newFamilyGroup: FamilyGroup = {
    id: familyGroupId,
    mainGuestId: mainGuest.id,
    mainGuestName: mainGuest.name,
    spouse,
    children: children || [],
    totalMembers: 1 + (spouse ? 1 : 0) + (children?.length || 0),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  data.familyGroups.push(newFamilyGroup);
  data.stats = calculateStats(data);
  
  writeData(data);
  return newFamilyGroup;
}

// Update guest
export function updateGuest(id: string, updates: Partial<Guest>): Guest | null {
  const data = readData();
  const guestIndex = data.guests.findIndex(guest => guest.id === id);
  
  if (guestIndex === -1) {
    return null;
  }
  
  data.guests[guestIndex] = {
    ...data.guests[guestIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  data.stats = calculateStats(data);
  writeData(data);
  
  return data.guests[guestIndex];
}

// Delete guest
export function deleteGuest(id: string): boolean {
  const data = readData();
  const guestIndex = data.guests.findIndex(guest => guest.id === id);
  
  if (guestIndex === -1) {
    return false;
  }
  
  // Remove associated family group if exists
  const guest = data.guests[guestIndex];
  if (guest.familyGroupId) {
    data.familyGroups = data.familyGroups.filter(fg => fg.id !== guest.familyGroupId);
  }
  
  data.guests.splice(guestIndex, 1);
  data.stats = calculateStats(data);
  
  writeData(data);
  return true;
}

// Get event data
export function getEvent(): WeddingEvent {
  const data = readData();
  return data.event;
}

// Update event data
export function updateEvent(updates: Partial<WeddingEvent>): WeddingEvent {
  const data = readData();
  data.event = {
    ...data.event,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  writeData(data);
  return data.event;
}

// Get statistics
export function getStats(): AdminStats {
  const data = readData();
  return calculateStats(data);
}

// Calculate statistics
function calculateStats(data: WeddingData): AdminStats {
  const totalGuests = data.guests.length;
  const confirmed = data.guests.filter(g => g.isAttending).length;
  const declined = data.guests.filter(g => !g.isAttending).length;
  
  const menuBreakdown: Record<MenuOption, number> = {
    traditional: 0,
    vegetarian: 0,
    'gluten-free': 0,
    'allergic-custom': 0,
  };
  
  // Count main guests
  data.guests.forEach(guest => {
    if (guest.isAttending) {
      menuBreakdown[guest.menuPreference]++;
    }
  });
  
  // Count family members
  data.familyGroups.forEach(family => {
    if (family.spouse) {
      menuBreakdown[family.spouse.menuPreference]++;
    }
    family.children.forEach(child => {
      menuBreakdown[child.menuPreference]++;
    });
  });
  
  // Calculate total people (guests + family members)
  let totalPeople = confirmed;
  data.familyGroups.forEach(family => {
    totalPeople += family.totalMembers - 1; // -1 because main guest is already counted
  });
  
  return {
    totalInvited: totalGuests,
    totalConfirmed: confirmed,
    totalDeclined: declined,
    pending: totalGuests - confirmed - declined,
    menuBreakdown,
    familyGroups: data.familyGroups.length,
    totalGuests: totalPeople,
    lastUpdated: new Date().toISOString(),
  };
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get all family groups
export function getAllFamilyGroups(): FamilyGroup[] {
  const data = readData();
  return data.familyGroups;
}

// Get family group by ID
export function getFamilyGroupById(id: string): FamilyGroup | undefined {
  const data = readData();
  return data.familyGroups.find(fg => fg.id === id);
}
