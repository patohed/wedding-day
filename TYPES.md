# Documentación de Tipos de Datos

## Guest (Invitado)

Representa a un invitado individual en la boda.

```typescript
interface Guest {
  id: string;                    // ID único generado automáticamente
  name: string;                  // Nombre completo del invitado
  email: string;                 // Email de contacto
  phone?: string;                // Teléfono (opcional)
  isAttending: boolean;          // ¿Asistirá? true/false
  menuPreference: MenuOption;    // Preferencia de menú
  allergies?: string;            // Alergias o restricciones alimentarias
  message?: string;              // Mensaje opcional para los novios
  familyGroupId?: string;        // ID del grupo familiar (si aplica)
  role: 'main' | 'spouse' | 'child'; // Rol en el grupo familiar
  createdAt: string;             // Fecha de confirmación (ISO 8601)
}
```

### Ejemplo:
```json
{
  "id": "guest_1234567890",
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+54 11 1234-5678",
  "isAttending": true,
  "menuPreference": "traditional",
  "allergies": "Ninguna",
  "message": "¡Felicitaciones!",
  "familyGroupId": "family_9876543210",
  "role": "main",
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

## FamilyGroup (Grupo Familiar)

Representa un grupo familiar con cónyuge e hijos.

```typescript
interface FamilyGroup {
  id: string;                    // ID único del grupo
  mainGuestId: string;           // ID del invitado principal
  spouseId?: string;             // ID del cónyuge (opcional)
  childrenIds: string[];         // Array de IDs de hijos
  createdAt: string;             // Fecha de creación
}
```

### Ejemplo:
```json
{
  "id": "family_9876543210",
  "mainGuestId": "guest_1234567890",
  "spouseId": "guest_1234567891",
  "childrenIds": ["guest_1234567892", "guest_1234567893"],
  "createdAt": "2025-01-15T10:30:00.000Z"
}
```

## MenuOption (Opción de Menú)

Tipos de menú disponibles para selección.

```typescript
type MenuOption = 
  | "traditional"      // Menú tradicional
  | "vegetarian"       // Menú vegetariano
  | "gluten-free"      // Menú sin gluten
  | "allergic-custom"; // Personalizado por alergias
```

## WeddingEvent (Evento de Boda)

Información principal del evento.

```typescript
interface WeddingEvent {
  brideName: string;             // Nombre de la novia
  groomName: string;             // Nombre del novio
  date: string;                  // Fecha del evento (ISO 8601)
  ceremonyVenue: Venue;          // Lugar de la ceremonia
  receptionVenue: Venue;         // Lugar de la recepción
  contact: ContactInfo;          // Información de contacto
}
```

### Ejemplo:
```json
{
  "brideName": "Ana García",
  "groomName": "Carlos López",
  "date": "2025-06-15T18:00:00.000Z",
  "ceremonyVenue": {
    "name": "Iglesia San Miguel",
    "address": "Av. Libertador 1234, Buenos Aires"
  },
  "receptionVenue": {
    "name": "Salón Real Palace",
    "address": "Av. del Libertador 5678, Buenos Aires"
  },
  "contact": {
    "email": "ana.carlos@wedding.com",
    "phone": "+54 11 1234-5678"
  }
}
```

## AdminStats (Estadísticas de Administración)

Estadísticas calculadas del evento.

```typescript
interface AdminStats {
  totalInvited: number;          // Total de invitados principales
  totalConfirmed: number;        // Total que confirmó asistencia
  totalDeclined: number;         // Total que no asistirá
  pending: number;               // Pendientes de responder
  totalGuests: number;           // Total de personas (incluye familias)
  familyGroups: number;          // Total de grupos familiares
  menuBreakdown: {               // Distribución de menús
    traditional: number;
    vegetarian: number;
    "gluten-free": number;
    "allergic-custom": number;
  };
}
```

### Ejemplo:
```json
{
  "totalInvited": 50,
  "totalConfirmed": 35,
  "totalDeclined": 10,
  "pending": 5,
  "totalGuests": 82,
  "familyGroups": 15,
  "menuBreakdown": {
    "traditional": 45,
    "vegetarian": 20,
    "gluten-free": 10,
    "allergic-custom": 7
  }
}
```

## Venue (Lugar)

Información de un lugar del evento.

```typescript
interface Venue {
  name: string;                  // Nombre del lugar
  address: string;               // Dirección completa
}
```

## ContactInfo (Información de Contacto)

Información de contacto de los novios.

```typescript
interface ContactInfo {
  email: string;                 // Email de contacto
  phone: string;                 // Teléfono de contacto
}
```

## ChildFormData (Datos de Formulario de Hijo)

Datos del formulario para un hijo en el grupo familiar.

```typescript
interface ChildFormData {
  name: string;                  // Nombre del hijo
  age: number;                   // Edad del hijo
  menuPreference: MenuOption;    // Preferencia de menú
  allergies?: string;            // Alergias (opcional)
}
```

## FormData (Datos del Formulario Principal)

Estructura completa del formulario de confirmación.

```typescript
interface FormData {
  name: string;                  // Nombre del invitado principal
  email: string;                 // Email
  phone?: string;                // Teléfono (opcional)
  isAttending: boolean;          // ¿Asistirá?
  menuPreference: MenuOption;    // Preferencia de menú
  allergies?: string;            // Alergias
  message?: string;              // Mensaje para los novios
  hasFamily: boolean;            // ¿Viene con familia?
  spouse?: {                     // Datos del cónyuge (opcional)
    name: string;
    menuPreference: MenuOption;
    allergies?: string;
  };
  children: ChildFormData[];     // Array de hijos
}
```

## Notas Importantes

### IDs
- Todos los IDs se generan automáticamente usando timestamps: `{tipo}_{timestamp}`
- Ejemplo: `guest_1705334400000`, `family_1705334400001`

### Fechas
- Todas las fechas usan formato ISO 8601: `YYYY-MM-DDTHH:mm:ss.sssZ`
- Ejemplo: `2025-06-15T18:00:00.000Z`

### Validación
- La validación se realiza con Zod en el cliente y servidor
- Campos requeridos: name, email, isAttending, menuPreference
- Email debe ser válido
- Teléfono es opcional pero recomendado

### Capacidad
- Límite recomendado: 1000 invitados principales
- No hay límite en el tamaño de grupos familiares
- El archivo JSON se mantiene ligero (< 1MB típicamente)
