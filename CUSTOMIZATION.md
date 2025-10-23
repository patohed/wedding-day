# 🎨 Guía de Personalización - Wedding Day

Esta guía te ayudará a personalizar completamente tu invitación digital sin necesidad de conocimientos técnicos avanzados.

---

## 🌈 Personalización de Colores

### Cambio Rápido de Tema

Edita `src/app/globals.css` y busca la sección `@theme`:

```css
@theme inline {
  /* Tema Rosa Clásico (por defecto) */
  --color-primary: #f43f5e;
  --color-secondary: #ec4899;
  --color-accent: #fdf2f8;
  
  /* Cambia por uno de estos temas: */
  
  /* Tema Azul Elegante */
  /* --color-primary: #3b82f6; */
  /* --color-secondary: #1d4ed8; */
  /* --color-accent: #eff6ff; */
  
  /* Tema Verde Natural */
  /* --color-primary: #10b981; */
  /* --color-secondary: #059669; */
  /* --color-accent: #ecfdf5; */
}
```

### Paletas Recomendadas

**🌸 Romántico Rosa**
```css
--color-primary: #f43f5e;
--color-secondary: #ec4899;
--color-accent: #fdf2f8;
```

**💙 Clásico Azul**
```css
--color-primary: #3b82f6;
--color-secondary: #1d4ed8;
--color-accent: #eff6ff;
```

**🌿 Natural Verde**
```css
--color-primary: #10b981;
--color-secondary: #059669;
--color-accent: #ecfdf5;
```

**🍑 Cálido Coral**
```css
--color-primary: #f97316;
--color-secondary: #ea580c;
--color-accent: #fff7ed;
```

**💜 Elegante Púrpura**
```css
--color-primary: #8b5cf6;
--color-secondary: #7c3aed;
--color-accent: #f5f3ff;
```

---

## 📝 Personalización de Contenido

### Datos del Evento

Edita `src/data/wedding-data.json`:

```json
{
  "event": {
    "brideName": "Tu Nombre",
    "groomName": "Nombre de tu Pareja",
    "date": "2025-06-15",
    "time": "18:00",
    "venue": {
      "name": "Nombre del Lugar",
      "address": "Dirección Completa",
      "city": "Tu Ciudad"
    },
    "reception": {
      "time": "20:00",
      "venue": "Salón de Recepción",
      "address": "Dirección de Recepción"
    },
    "dressCode": "Formal / Cocktail",
    "contactInfo": {
      "phone": "+1 234 567-8900",
      "email": "novios@tuboda.com",
      "whatsapp": "+1 234 567-8900"
    },
    "rsvpDeadline": "2025-05-15"
  }
}
```

### Textos de la Página Principal

Edita `src/app/page.tsx`:

**Hero Section (líneas 50-70):**
```jsx
<h1 className="...">
  Tu Nombre & Nombre de tu Pareja
</h1>
<p className="...">
  Nos casamos
</p>
<p className="...">15 de Junio, 2025</p>
<p className="...">18:00 hs</p>
```

**Sección de Cita (líneas 90-100):**
```jsx
<p className="...">
  "Tu cita favorita o mensaje especial..."
</p>
```

**Código de Vestimenta (líneas 200-220):**
```jsx
<h3>Código de Vestimenta</h3>
<p>Formal / Cocktail / Casual Elegante</p>
```

---

## 🖼️ Personalización de Imágenes

### Imagen Principal de Fondo

1. **Guarda tu imagen** en `public/images/hero-bg.jpg`
2. **Edita** `src/app/page.tsx` línea ~25:

```jsx
style={{
  backgroundImage: "url('/images/hero-bg.jpg')"
}}
```

### Imágenes de Ceremonias

**Ceremonia** (línea ~130):
```jsx
style={{
  backgroundImage: "url('/images/ceremony.jpg')"
}}
```

**Recepción** (línea ~180):
```jsx
style={{
  backgroundImage: "url('/images/reception.jpg')"
}}
```

### Recomendaciones de Imágenes

- **Resolución**: Mínimo 1920x1080px
- **Formato**: JPG o WebP
- **Tamaño**: Máximo 500KB por imagen
- **Orientación**: Landscape (horizontal)

---

## 🍽️ Personalización de Menús

### Opciones de Menú

Edita `src/types/index.ts`:

```typescript
export type MenuOption = 
  | "tradicional"
  | "vegetariano"
  | "vegano"
  | "sin-gluten"
  | "kosher"
  | "halal"
  | "infantil"
  | "personalizado";
```

### Etiquetas en Español

Edita `src/app/rsvp/page.tsx` en la sección del select:

```jsx
<option value="tradicional">Menú Tradicional</option>
<option value="vegetariano">Vegetariano</option>
<option value="vegano">Vegano</option>
<option value="sin-gluten">Sin Gluten</option>
<option value="kosher">Kosher</option>
<option value="halal">Halal</option>
<option value="infantil">Infantil</option>
<option value="personalizado">Personalizado</option>
```

---

## 📱 Personalización de Formularios

### Campos Adicionales

Para agregar campos extra al formulario RSVP:

1. **Actualiza el tipo** en `src/types/index.ts`:
```typescript
interface Guest {
  // ... campos existentes
  songRequest?: string;
  hotelNeeds?: boolean;
  transportation?: boolean;
  specialRequests?: string;
}
```

2. **Agrega al formulario** en `src/app/rsvp/page.tsx`:
```jsx
<div className="space-y-2">
  <Label htmlFor="songRequest">Canción favorita</Label>
  <Input
    id="songRequest"
    {...form.register("songRequest")}
    placeholder="Sugerencia de canción para la fiesta"
  />
</div>
```

### Validaciones Personalizadas

Edita `src/app/rsvp/page.tsx` en el schema de Zod:

```typescript
const formSchema = z.object({
  name: z.string().min(2, "Nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  // Agrega validaciones personalizadas
  songRequest: z.string().max(100, "Máximo 100 caracteres").optional(),
});
```

---

## 🎵 Personalización de Animaciones

### Velocidad de Animaciones

Edita `src/app/globals.css`:

```css
/* Animaciones más rápidas */
.animate-fade-in {
  animation: fade-in 0.5s ease-out; /* era 0.8s */
}

/* Animaciones más lentas */
.animate-slide-up {
  animation: slide-up 1.2s ease-out; /* era 0.8s */
}
```

### Desactivar Animaciones

Para usuarios que prefieren menos movimiento:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in,
  .animate-slide-up,
  .animate-pulse {
    animation: none;
  }
}
```

---

## 📊 Personalización del Admin

### Campos Visibles en Lista

Edita `src/app/admin/page.tsx` en la tabla:

```jsx
<TableHeader>
  <TableRow>
    <TableHead>Nombre</TableHead>
    <TableHead>Email</TableHead>
    <TableHead>Estado</TableHead>
    <TableHead>Menú</TableHead>
    <TableHead>Canción</TableHead> {/* Nuevo */}
    <TableHead>Fecha</TableHead>
  </TableRow>
</TableHeader>
```

### Exportación CSV Personalizada

Modifica `src/app/admin/page.tsx` en la función `exportToCSV`:

```typescript
const headers = [
  'Nombre', 'Email', 'Teléfono', 'Asistencia', 
  'Menú', 'Alergias', 'Canción', 'Fecha'
];

const rows = guests.map(guest => [
  guest.name,
  guest.email,
  guest.phone || '',
  guest.isAttending ? 'Sí' : 'No',
  guest.menuPreference,
  guest.allergies || '',
  guest.songRequest || '', // Nuevo campo
  new Date(guest.createdAt).toLocaleDateString()
]);
```

---

## 🌐 Personalización de Idioma

### Cambiar a Inglés

Busca y reemplaza en todos los archivos:

```javascript
// Español → Inglés
"Confirmar Asistencia" → "RSVP"
"Nos casamos" → "We're Getting Married"
"Detalles del Evento" → "Event Details"
"Código de Vestimenta" → "Dress Code"
```

### Soporte Multiidioma

Para soporte completo de múltiples idiomas, considera usar:
- [next-i18next](https://github.com/isaachinman/next-i18next)
- [react-intl](https://formatjs.io/docs/react-intl/)

---

## 🔧 Personalizaciones Avanzadas

### Agregar Google Analytics

1. **Instala** el paquete:
```bash
npm install @next/third-parties
```

2. **Agrega** en `src/app/layout.tsx`:
```jsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  )
}
```

### Integrar WhatsApp

Agrega botón de contacto directo:

```jsx
<a 
  href="https://wa.me/1234567890?text=Hola! Tengo una pregunta sobre la boda"
  className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 z-50"
>
  <MessageCircle className="w-6 h-6" />
</a>
```

---

## 📞 Soporte

¿Necesitas ayuda con la personalización?

- 📧 **Email**: support@wedding-day.dev
- 💬 **Discord**: [Únete a la comunidad](https://discord.gg/wedding-day)
- 📖 **Documentación**: [Docs completas](https://wedding-day.dev/docs)
- 🐛 **Issues**: [GitHub Issues](https://github.com/patohed/wedding-day/issues)

---

**¡Haz que tu boda sea única! 💕**