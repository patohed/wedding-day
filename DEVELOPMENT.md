# Guía de Desarrollo

Esta guía contiene información útil para desarrolladores que trabajan en el proyecto.

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo en http://localhost:3000
npm run build        # Compila la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta ESLint para verificar el código

# TypeScript
npx tsc --noEmit     # Verifica errores de TypeScript sin compilar
```

## 🗂️ Componentes UI Instalados

Los siguientes componentes de Shadcn/UI están instalados y configurados:

- ✅ `button` - Botones con variantes
- ✅ `card` - Tarjetas contenedoras
- ✅ `input` - Campos de texto
- ✅ `label` - Etiquetas de formulario
- ✅ `textarea` - Áreas de texto
- ✅ `select` - Selectores desplegables
- ✅ `checkbox` - Casillas de verificación
- ✅ `form` - Componentes de formulario integrados con React Hook Form
- ✅ `table` - Tablas con estilos
- ✅ `badge` - Etiquetas/badges
- ✅ `dialog` - Modales/diálogos
- ✅ `separator` - Separadores visuales
- ✅ `tabs` - Pestañas navegables

### Agregar más componentes:
```bash
npx shadcn@latest add [component-name]
```

Ejemplo:
```bash
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
```

## 🎨 Sistema de Diseño

### Colores Principales

```css
--color-rose-50: #fff1f2
--color-rose-500: #f43f5e
--color-pink-50: #fdf2f8
--color-pink-500: #ec4899
```

### Breakpoints de Tailwind

```
sm: 640px   // Móviles horizontales y tablets pequeñas
md: 768px   // Tablets
lg: 1024px  // Laptops
xl: 1280px  // Escritorios
2xl: 1536px // Pantallas grandes
```

### Espaciado Consistente

```tsx
// Padding interno de secciones
className="py-12 sm:py-16 lg:py-20"

// Spacing entre elementos
className="space-y-4" // 1rem (16px)
className="space-y-6" // 1.5rem (24px)
className="space-y-8" // 2rem (32px)
```

## 🔧 Estructura de Datos

### Formato del archivo wedding-data.json

```json
{
  "event": {
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
  },
  "guests": [],
  "familyGroups": []
}
```

### Cómo funciona el almacenamiento

1. **Lectura**: `readData()` lee el archivo JSON completo
2. **Escritura**: `writeData()` escribe el objeto completo de vuelta
3. **IDs**: Se generan usando timestamps: `guest_${Date.now()}`
4. **Relaciones**: 
   - Guest tiene `familyGroupId` (opcional)
   - FamilyGroup referencia `mainGuestId`, `spouseId`, `childrenIds`

## 🧪 Testing

### Pruebas Manuales Recomendadas

**Flujo de Invitado Individual:**
1. Ir a `/rsvp`
2. Llenar nombre, email, teléfono
3. Seleccionar "Sí, asistiré"
4. Elegir menú
5. Dejar "No vengo con familia" sin marcar
6. Enviar
7. Verificar en `/admin` que aparece

**Flujo de Grupo Familiar:**
1. Ir a `/rsvp`
2. Llenar datos del invitado principal
3. Marcar "Vengo con familia"
4. Agregar cónyuge (nombre y menú)
5. Agregar 2 hijos con el botón "+"
6. Llenar datos de cada hijo
7. Enviar
8. Verificar en `/admin` que aparecen 4 personas

**Exportación CSV:**
1. Ir a `/admin`
2. Click en "Exportar CSV"
3. Verificar que descarga archivo
4. Abrir en Excel/Google Sheets
5. Confirmar que todos los datos están correctos

### Validaciones a Verificar

- ✅ Email debe tener formato válido
- ✅ Nombre es requerido (min 2 caracteres)
- ✅ Menú es requerido para todos
- ✅ Si marca "Vengo con familia", debe agregar al menos cónyuge o 1 hijo
- ✅ Edad de hijos debe ser número positivo
- ✅ No se permiten duplicados de email

## 🐛 Debugging

### Ver datos en tiempo real

```typescript
// En cualquier componente de servidor
import { readData } from '@/lib/services/data-service';

const data = await readData();
console.log('Guests:', data.guests.length);
console.log('Family Groups:', data.familyGroups.length);
```

### Logs de API

Los endpoints ya incluyen logging básico:

```typescript
// En route.ts
console.log('Guest created:', newGuest.id);
console.log('Family group created:', familyGroup.id);
```

### Verificar estado de formulario

```typescript
// En RSVP form
const formValues = form.watch();
console.log('Current form values:', formValues);
console.log('Errors:', form.formState.errors);
```

## 📱 Responsive Design

### Clases Útiles para Responsividad

```tsx
// Texto responsivo
<h1 className="text-2xl sm:text-3xl lg:text-4xl">

// Grid responsivo
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Padding/Margin responsivo
<div className="p-4 sm:p-6 lg:p-8">

// Ocultar/Mostrar según breakpoint
<div className="hidden md:block">     // Oculto en móvil
<div className="block md:hidden">     // Solo en móvil

// Flex direction responsivo
<div className="flex flex-col md:flex-row">
```

## 🚀 Optimización

### Performance Tips

1. **Imágenes**: Usar Next.js `<Image>` component cuando sea posible
2. **Server Components**: Por defecto, solo usar 'use client' cuando sea necesario
3. **Lazy Loading**: Para componentes pesados
4. **Memoization**: React.memo() para componentes que no cambian frecuentemente

### Bundle Size

```bash
# Analizar tamaño del bundle
npm run build

# Ver breakdown detallado
npx @next/bundle-analyzer
```

## 🔐 Seguridad

### Checklist para Producción

- [ ] Agregar autenticación al admin panel
- [ ] Validar datos en servidor (Zod ya implementado)
- [ ] Sanitizar inputs (React ya lo hace por defecto)
- [ ] Rate limiting en APIs
- [ ] HTTPS en producción
- [ ] Variables de entorno para datos sensibles
- [ ] CORS configurado correctamente

## 📦 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

### Variables de Entorno en Vercel

1. Ir a Project Settings → Environment Variables
2. Agregar las necesarias de `.env.example`
3. Redeploy

### Archivo de Datos en Producción

**Problema**: Los archivos JSON no persisten entre deploys en Vercel.

**Soluciones**:
1. **Migrar a Vercel KV** (Redis):
```bash
npm install @vercel/kv
```

2. **Usar Vercel Postgres**:
```bash
npm install @vercel/postgres
```

3. **Usar Supabase** (recomendado para empezar):
- Gratis hasta 500MB
- PostgreSQL completo
- Fácil integración

## 🆘 Troubleshooting

### El build falla con errores de TypeScript

```bash
# Verificar errores específicos
npx tsc --noEmit

# Limpiar caché de Next.js
rm -rf .next
npm run build
```

### Los estilos de Tailwind no se aplican

```bash
# Verificar que Tailwind está configurado
npx tailwindcss init --ts

# Limpiar caché
rm -rf .next
npm run dev
```

### Los componentes de Shadcn no se ven bien

1. Verificar que `globals.css` tiene las importaciones correctas
2. Verificar `tailwind.config.ts` tiene el plugin de Shadcn
3. Reinstalar componente: `npx shadcn@latest add [component]`

### Error: Cannot find module '@/...'

Verificar `tsconfig.json` tiene:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## 📞 Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

¿Necesitas ayuda? Abre un issue en el repositorio.
