# 💒 Wedding Day - Invitación Digital Inteligente

Una aplicación web moderna y completamente personalizable para gestionar invitaciones de boda digitales. Construida con Next.js 15, TypeScript y diseño responsive, permite a las parejas crear una experiencia única para sus invitados con gestión avanzada de confirmaciones.

![Wedding Day App](https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)

---

## 🌟 ¿Por qué Wedding Day?

- ✅ **100% Personalizable** - Adapta colores, textos, imágenes y formularios a tu estilo
- ✅ **Sin Límites de Invitados** - Escala desde bodas íntimas hasta eventos de 1000+ personas
- ✅ **Grupos Familiares Inteligentes** - Gestión automática de cónyuges e hijos
- ✅ **Panel Administrativo** - Estadísticas en tiempo real y exportación de datos
- ✅ **Responsive Total** - Perfecta experiencia en móvil, tablet y desktop
- ✅ **Fácil Deploy** - Listo para producción en minutos
- ✅ **Costo Cero** - Hosting gratuito en Vercel/Netlify

---

## 📚 Documentación Rápida

| Documento | Descripción | Para Quién |
|-----------|-------------|------------|
| **[QUICKSTART.md](QUICKSTART.md)** | 🚀 Configuración en 5 minutos | Principiantes |
| **[CUSTOMIZATION.md](CUSTOMIZATION.md)** | 🎨 Guía de personalización completa | Diseñadores |
| **[DEVELOPMENT.md](DEVELOPMENT.md)** | 🔧 Documentación técnica | Desarrolladores |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | 🌐 Guías de deploy | Todos |

---

## ✨ Características Principales

### 🎯 Para Invitados
- **Landing Page Elegante** - Página principal con toda la información del evento
- **RSVP Inteligente** - Formulario adaptativo con validación en tiempo real
- **Gestión Familiar** - Agregar cónyuge e hijos con preferencias individuales
- **Opciones de Menú** - Sistema flexible para diferentes tipos de alimentación
- **Información Completa** - Cronograma, ubicaciones, código de vestimenta
- **Mapas Integrados** - Enlaces directos a Google Maps

### 🎛️ Para Organizadores
- **Dashboard Administrativo** - Panel de control con métricas en tiempo real
- **Gestión de Invitados** - Lista completa con filtros y búsqueda
- **Estadísticas Avanzadas** - Confirmados, declinados, distribución de menús
- **Exportación CSV** - Datos listos para procesamiento externo
- **Configuración Simple** - Cambios sin código para eventos únicos

---

## 🎨 Personalización Total

### 🌈 Paleta de Colores
```css
/* Fácil personalización en globals.css */
--color-primary: #f43f5e;     /* Rosa principal */
--color-secondary: #ec4899;   /* Rosa secundario */
--color-accent: #fdf2f8;      /* Rosa claro */
```

### 📝 Contenido Personalizable
- **Nombres de la pareja**
- **Fecha y horarios del evento**
- **Ubicaciones (ceremonia/recepción)**
- **Código de vestimenta**
- **Información de contacto**
- **Mensaje personal**
- **Cronograma del día**

### 🍽️ Opciones de Menú Flexibles
```typescript
// Personaliza en src/types/index.ts
type MenuOption = 
  | "tradicional"
  | "vegetariano" 
  | "vegano"
  | "sin-gluten"
  | "kosher"
  | "halal"
  | "personalizado";
```

### 🖼️ Imágenes y Diseño
- **Fotos de fondo** - Reemplaza con tus propias imágenes
- **Logo/Iconos** - Personaliza elementos gráficos
- **Tipografía** - Cambio fácil de fuentes
- **Animaciones** - Ajustar intensidad y velocidad

---

## 🚀 Casos de Uso

### 👰🤵 Bodas Tradicionales
- Ceremonia religiosa + recepción
- Grupos familiares grandes
- Múltiples opciones de menú
- Código de vestimenta formal

### 🌸 Bodas Civiles
- Evento único en un lugar
- Lista de invitados reducida
- Ambiente más relajado
- Personalización minimalista

### 🎉 Celebraciones Especiales
- Aniversarios
- Renovación de votos
- Fiestas de compromiso
- Eventos corporativos

---

## 💻 Stack Tecnológico

**Frontend:**
- [Next.js 15](https://nextjs.org/) - Framework React con App Router
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS 4](https://tailwindcss.com/) - Estilos utility-first
- [Shadcn/UI](https://ui.shadcn.com/) - Componentes premium

**Backend:**
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) - Backend integrado
- [Zod](https://zod.dev/) - Validación de esquemas
- JSON File Storage - Base de datos simple

**Deployment:**
- [Vercel](https://vercel.com/) - Hosting optimizado para Next.js
- [Netlify](https://netlify.com/) - Alternativa de hosting
- Cualquier servidor Node.js

---

## � Inicio Rápido

### 1️⃣ Instalación
```bash
# Clona el repositorio
git clone https://github.com/patohed/wedding-day.git
cd wedding-day

# Instala dependencias
npm install

# Inicia servidor de desarrollo
npm run dev
```

### 2️⃣ Personalización Básica
Edita `src/data/wedding-data.json`:
```json
{
  "event": {
    "brideName": "Tu Nombre",
    "groomName": "Nombre de tu Pareja", 
    "date": "2025-06-15",
    "venue": {
      "name": "Lugar del Evento",
      "address": "Dirección Completa"
    }
  }
}
```

### 3️⃣ Deploy Instantáneo
```bash
# Deploy en Vercel (gratis)
npm i -g vercel
vercel --prod
```

🎉 **¡Listo!** Tu invitación digital está en línea.

---

## 📊 Demo en Vivo

### 🌐 Vista Previa
- **Landing Page**: [Ver Demo](https://wedding-day-demo.vercel.app)
- **Formulario RSVP**: [Probar](https://wedding-day-demo.vercel.app/rsvp)
- **Panel Admin**: [Acceder](https://wedding-day-demo.vercel.app/admin)

### 📱 Capturas de Pantalla

<details>
<summary>📸 Ver Capturas</summary>

**Landing Page Móvil**
![Mobile Landing](https://via.placeholder.com/300x600/f43f5e/ffffff?text=Mobile+Landing)

**Formulario RSVP**
![RSVP Form](https://via.placeholder.com/600x400/ec4899/ffffff?text=RSVP+Form)

**Dashboard Admin**
![Admin Dashboard](https://via.placeholder.com/800x500/fdf2f8/000000?text=Admin+Dashboard)

</details>

---

## 🎛️ Configuración Avanzada

### 🔧 Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_APP_NAME="Mi Boda Perfecta"
NEXT_PUBLIC_COUPLE_NAMES="Ana & Carlos"
NEXT_PUBLIC_EVENT_DATE="2025-06-15"
```

### 🎨 Temas Preconfigurados

**Tema Clásico Rosa**
```css
--primary: #f43f5e;
--secondary: #ec4899;
--accent: #fdf2f8;
```

**Tema Elegante Azul**
```css
--primary: #3b82f6;
--secondary: #1d4ed8;
--accent: #eff6ff;
```

**Tema Natural Verde**
```css
--primary: #10b981;
--secondary: #059669;
--accent: #ecfdf5;
```

### 📋 Formularios Personalizables

**Campos Estándar:**
- Nombre completo
- Email de contacto
- Teléfono (opcional)
- Confirmación de asistencia
- Preferencia de menú
- Alergias/restricciones

**Campos Opcionales:**
- Mensaje para los novios
- Canción favorita
- Número de acompañantes
- Necesidades especiales
- Hotel/transporte

---

## 🏗️ Arquitectura del Proyecto

```
wedding-app/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Página principal (landing)
│   │   ├── rsvp/
│   │   │   └── page.tsx          # Formulario de confirmación
│   │   ├── admin/
│   │   │   └── page.tsx          # Panel de administración
│   │   └── api/
│   │       ├── rsvp/route.ts     # API: Crear confirmación
│   │       ├── guests/route.ts   # API: CRUD de invitados
│   │       ├── stats/route.ts    # API: Estadísticas
│   │       └── event/route.ts    # API: Configuración del evento
│   ├── components/
│   │   └── ui/                   # Componentes de Shadcn/UI
│   ├── lib/
│   │   └── services/
│   │       └── data-service.ts   # Servicio de datos (CRUD)
│   ├── types/
│   │   └── index.ts              # Definiciones TypeScript
│   └── data/
│       └── wedding-data.json     # Almacenamiento de datos
├── public/                       # Archivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18.x o superior
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio** (o descargar el código):
```bash
cd wedding-app
```

2. **Instalar dependencias**:
```bash
npm install
```

3. **Configurar datos del evento**:
Editar `src/data/wedding-data.json` con la información de tu boda:

```json
{
  "event": {
    "brideName": "Tu Nombre",
    "groomName": "Nombre de tu Pareja",
    "date": "2025-06-15T18:00:00",
    "ceremonyVenue": {
      "name": "Nombre del Lugar",
      "address": "Dirección Completa"
    },
    "receptionVenue": {
      "name": "Nombre del Salón",
      "address": "Dirección Completa"
    },
    "contact": {
      "email": "tuemail@ejemplo.com",
      "phone": "+54 11 1234-5678"
    }
  },
  "guests": [],
  "familyGroups": []
}
```

4. **Ejecutar en modo desarrollo**:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

5. **Compilar para producción**:
```bash
npm run build
npm start
```

## 📱 Rutas de la Aplicación

- `/` - Página principal con información del evento
- `/rsvp` - Formulario de confirmación de asistencia
- `/admin` - Panel de administración (requiere acceso directo)
- `/api/rsvp` - Endpoint para crear confirmaciones
- `/api/guests` - Endpoint para gestión de invitados
- `/api/stats` - Endpoint para estadísticas
- `/api/event` - Endpoint para configuración del evento

## 🎨 Personalización

### Colores y Tema
Los colores principales se pueden modificar en `src/app/globals.css`:

```css
@theme inline {
  --color-primary: #f43f5e; /* Rosa principal */
  --color-secondary: #e11d48; /* Rosa oscuro */
  /* ... más colores */
}
```

### Imágenes
Las imágenes de fondo utilizan Unsplash. Para usar tus propias imágenes:
1. Colocar imágenes en `public/images/`
2. Reemplazar las URLs en `src/app/page.tsx`

### Opciones de Menú
Modificar las opciones en `src/types/index.ts`:

```typescript
export type MenuOption = 
  | "traditional" 
  | "vegetarian" 
  | "gluten-free" 
  | "allergic-custom"
  | "tu-opcion-personalizada";
```

## 📊 API Endpoints

### POST /api/rsvp
Crear una nueva confirmación de asistencia.

**Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "phone": "+54 11 1234-5678",
  "isAttending": true,
  "menuPreference": "traditional",
  "allergies": "",
  "hasFamily": true,
  "spouse": {
    "name": "María García",
    "menuPreference": "vegetarian"
  },
  "children": [
    {
      "name": "Pedrito Pérez",
      "age": 8,
      "menuPreference": "traditional"
    }
  ]
}
```

### GET /api/guests
Obtener lista de invitados o un invitado específico.

**Query params:**
- `id` (opcional): ID del invitado

### PATCH /api/guests
Actualizar información de un invitado.

**Body:**
```json
{
  "id": "guest-id",
  "isAttending": false,
  "menuPreference": "vegetarian"
}
```

### DELETE /api/guests?id={guestId}
Eliminar un invitado y su grupo familiar asociado.

### GET /api/stats
Obtener estadísticas del evento.

**Response:**
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

## 🔒 Seguridad

**Importante**: Esta aplicación NO incluye autenticación. Para producción se recomienda:

1. **Agregar autenticación** al panel de administración:
   - NextAuth.js
   - Clerk
   - Auth0

2. **Proteger las rutas de API** con middleware de autenticación

3. **Validar datos** en el servidor (ya implementado con Zod)

4. **Considerar una base de datos real** para escalabilidad:
   - PostgreSQL con Prisma
   - MongoDB
   - Supabase

## 🌐 Despliegue

### Vercel (Recomendado)
1. Push del código a GitHub
2. Importar proyecto en [Vercel](https://vercel.com)
3. Deploy automático

### Otras Opciones
- **Netlify**: Soporte completo para Next.js
- **Railway**: Deploy con base de datos incluida
- **Render**: Alternativa gratuita

**Nota**: Asegurar que el directorio `src/data/` sea persistente o migrar a una base de datos para producción.

## 📝 Licencia

Este proyecto es de código abierto y está disponible para uso personal y comercial.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:
1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📞 Soporte

Para preguntas o soporte, contactar a través de:
- Email: [configurar en wedding-data.json]
- Issues de GitHub

## 🎉 Próximas Características

- [ ] Autenticación y autorización
- [ ] Galería de fotos del evento
- [ ] Sistema de mensajes para invitados
- [ ] Integración con calendario (iCal/Google Calendar)
- [ ] QR codes para check-in en el evento
- [ ] Notificaciones por email
- [ ] Multi-idioma (i18n)
- [ ] Tema claro/oscuro
- [ ] Contador regresivo animado

---

Hecho con ❤️ para Ana & Carlos
