# 🚀 Checklist de Producción

Lista de verificación completa antes de lanzar tu aplicación de invitación de boda a producción.

## 📝 Configuración Inicial

### Datos del Evento
- [ ] Actualizar nombres de los novios en `src/data/wedding-data.json`
- [ ] Configurar fecha y hora correcta del evento
- [ ] Actualizar direcciones de ceremonia y recepción
- [ ] Verificar enlaces de Google Maps
- [ ] Configurar email y teléfono de contacto
- [ ] Revisar código de vestimenta
- [ ] Confirmar fecha límite de confirmación (RSVP deadline)

### Contenido
- [ ] Reemplazar textos genéricos por personalizados
- [ ] Actualizar cita bíblica o mensaje principal (si aplica)
- [ ] Verificar cronograma del día (timeline)
- [ ] Confirmar información de regalo/cuenta bancaria
- [ ] Revisar todos los textos en español (ortografía y gramática)

### Imágenes
- [ ] Reemplazar imágenes de Unsplash por fotos propias
- [ ] Optimizar imágenes (usar WebP, comprimir)
- [ ] Verificar que todas las imágenes carguen correctamente
- [ ] Considerar agregar fotos de la pareja
- [ ] Favicon personalizado en `public/favicon.ico`

## 🎨 Diseño y UX

### Responsividad
- [ ] Probar en móvil (iOS y Android)
- [ ] Probar en tablet
- [ ] Probar en desktop (diferentes resoluciones)
- [ ] Verificar que todos los botones sean fáciles de tocar en móvil
- [ ] Confirmar que las tablas sean scrolleables en móvil
- [ ] Verificar legibilidad de textos en todos los dispositivos

### Navegación
- [ ] Probar flujo completo de invitado (landing → RSVP → confirmación)
- [ ] Verificar que todos los enlaces funcionen
- [ ] Confirmar que botones "Volver" funcionen
- [ ] Probar navegación con teclado (accesibilidad)
- [ ] Verificar scroll suave entre secciones

### Animaciones
- [ ] Verificar que animaciones funcionen en todos los navegadores
- [ ] Confirmar que no haya lag o stuttering
- [ ] Asegurar que animaciones no molesten (sutileza)

## 🔧 Funcionalidad

### Formulario RSVP
- [ ] Probar confirmación individual (sin familia)
- [ ] Probar confirmación con cónyuge
- [ ] Probar confirmación con hijos (1, 2, 3+ hijos)
- [ ] Probar todos los tipos de menú
- [ ] Verificar validaciones de campos requeridos
- [ ] Confirmar mensajes de error claros
- [ ] Probar con emails inválidos
- [ ] Verificar mensaje de éxito
- [ ] Confirmar que datos se guarden en JSON

### Panel de Administración
- [ ] Verificar que estadísticas se actualicen en tiempo real
- [ ] Probar exportación CSV
- [ ] Confirmar que CSV se abre correctamente en Excel/Sheets
- [ ] Verificar todas las tabs (Resumen, Invitados, Menús)
- [ ] Confirmar que los números sean correctos
- [ ] Probar filtrado/búsqueda de invitados (si existe)

### APIs
- [ ] Probar POST /api/rsvp con datos válidos
- [ ] Probar POST /api/rsvp con datos inválidos
- [ ] Verificar GET /api/guests
- [ ] Verificar GET /api/stats
- [ ] Confirmar manejo de errores en todas las APIs
- [ ] Verificar que no haya memory leaks

## 🔐 Seguridad

### Autenticación
- [ ] **CRÍTICO**: Agregar autenticación al panel admin
  - Opciones: NextAuth.js, Clerk, Auth0
  - Proteger ruta `/admin`
  - Proteger APIs de modificación
- [ ] Crear contraseña segura
- [ ] Configurar 2FA (opcional pero recomendado)

### Validación de Datos
- [ ] Confirmar validación Zod en servidor
- [ ] Verificar sanitización de inputs
- [ ] Probar ataques XSS básicos (texto con `<script>`)
- [ ] Confirmar que no se permitan emails duplicados
- [ ] Rate limiting en APIs (considerar)

### Variables de Entorno
- [ ] Crear archivo `.env.local` (NO commitear)
- [ ] Configurar variables en plataforma de hosting
- [ ] Nunca exponer API keys en código cliente
- [ ] Verificar que `.env` esté en `.gitignore`

## 📊 Persistencia de Datos

### Almacenamiento
- [ ] **CRÍTICO**: Decidir estrategia de almacenamiento para producción
  
  **Opción 1: JSON File (Actual)**
  - ⚠️ NO recomendado para Vercel/Netlify (archivos no persisten)
  - Solo si usas servidor propio (VPS, Railway con volúmenes)
  
  **Opción 2: Vercel KV (Redis)**
  ```bash
  npm install @vercel/kv
  ```
  - Gratis: 256MB, 10k requests/día
  - Fácil setup
  - Perfecto para este caso de uso
  
  **Opción 3: Base de Datos**
  - Supabase (PostgreSQL): Gratis hasta 500MB
  - PlanetScale (MySQL): Gratis hasta 5GB
  - MongoDB Atlas: Gratis hasta 512MB
  
  **Opción 4: Airtable/Google Sheets**
  - Muy fácil de integrar
  - Los novios pueden ver datos directamente
  - No requiere panel admin

### Backups
- [ ] Configurar backups automáticos
- [ ] Probar restauración de backup
- [ ] Exportar CSV regularmente
- [ ] Guardar copia local antes de eventos importantes

## 🚀 Deployment

### Pre-Deploy
- [ ] Ejecutar `npm run build` sin errores
- [ ] Ejecutar `npm run lint` sin warnings críticos
- [ ] Verificar que no haya `console.log()` innecesarios
- [ ] Confirmar que `.gitignore` incluye `.env`, `.next`, `node_modules`
- [ ] Hacer commit de todos los cambios

### Plataforma de Hosting

**Vercel (Recomendado)**
- [ ] Crear cuenta en [Vercel](https://vercel.com)
- [ ] Conectar repositorio de GitHub
- [ ] Configurar variables de entorno
- [ ] Deploy
- [ ] Verificar que todo funcione en URL de producción
- [ ] Configurar dominio personalizado (opcional)

**Otras Opciones**
- Netlify: Similar a Vercel
- Railway: Incluye base de datos
- Render: Alternativa con capa gratuita

### Post-Deploy
- [ ] Verificar que la app cargue en producción
- [ ] Probar formulario RSVP en producción
- [ ] Verificar panel admin en producción
- [ ] Confirmar que datos se persistan
- [ ] Probar en diferentes navegadores (Chrome, Safari, Firefox)
- [ ] Verificar tiempos de carga (< 3 segundos)
- [ ] Confirmar que SSL/HTTPS funcione

## 📱 Dominio y URL

### Dominio Personalizado
- [ ] Registrar dominio (ej: `anacarloslaboda.com`)
  - Namecheap
  - Google Domains
  - Cloudflare Registrar
- [ ] Configurar DNS en Vercel/Netlify
- [ ] Esperar propagación DNS (24-48 horas)
- [ ] Verificar SSL automático

### URLs Compartibles
- [ ] Crear URL corta para RSVP (ej: `anacarloslaboda.com/rsvp`)
- [ ] Considerar QR code para invitaciones físicas
- [ ] Verificar que URL sea fácil de escribir
- [ ] Probar URL en diferentes dispositivos

## 📧 Comunicación

### Invitaciones
- [ ] Preparar mensaje para compartir link
- [ ] Incluir fecha límite de confirmación
- [ ] Agregar información importante (código vestimenta, etc.)
- [ ] Probar envío por WhatsApp
- [ ] Probar envío por email
- [ ] Considerar invitaciones físicas con QR code

### Recordatorios
- [ ] Planear recordatorio 1 semana antes de deadline
- [ ] Planear recordatorio final antes del evento
- [ ] Preparar mensajes para quienes no confirmaron

## 🧪 Testing Final

### Pruebas de Carga
- [ ] Probar con 10-20 confirmaciones simultáneas
- [ ] Verificar que no haya errores de concurrencia
- [ ] Confirmar que estadísticas se actualicen correctamente

### Pruebas de Usuario
- [ ] Pedir a 3-5 personas que prueben el formulario
- [ ] Recoger feedback sobre UX
- [ ] Corregir problemas encontrados
- [ ] Verificar que personas no técnicas puedan usarlo fácilmente

### Compatibilidad
- [ ] Chrome (desktop y móvil)
- [ ] Safari (desktop y móvil)
- [ ] Firefox
- [ ] Edge
- [ ] Samsung Internet (si es popular en tu región)

## 📊 Analytics (Opcional)

### Tracking
- [ ] Configurar Google Analytics 4
- [ ] Agregar eventos personalizados:
  - Confirmación enviada
  - Familia agregada
  - CSV exportado
- [ ] Configurar Vercel Analytics (incluido gratis)

## 🎯 Día del Evento

### Preparación
- [ ] Exportar CSV final la noche anterior
- [ ] Imprimir lista de confirmados
- [ ] Tener copia de respaldo en teléfono
- [ ] Considerar cerrar formulario RSVP el día del evento

### Post-Evento
- [ ] Agradecer a invitados (opcional: formulario de feedback)
- [ ] Exportar datos finales para recuerdos
- [ ] Considerar agregar galería de fotos al sitio

## ⚠️ Checklist CRÍTICO (No Negociables)

### Antes de compartir link:
- [ ] ✅ Datos del evento correctos (fecha, hora, lugar)
- [ ] ✅ Formulario funciona perfectamente
- [ ] ✅ Panel admin tiene autenticación
- [ ] ✅ Datos se guardan correctamente
- [ ] ✅ Responsive en móvil
- [ ] ✅ Build de producción exitoso
- [ ] ✅ Estrategia de persistencia de datos definida

---

## 📝 Notas Finales

### Estimación de Tiempo
- Configuración inicial: 2-3 horas
- Personalización de contenido: 1-2 horas
- Testing: 2-3 horas
- Deploy: 1 hora
- **Total: ~8-10 horas**

### Costos Aproximados
- Hosting (Vercel/Netlify): **Gratis** para este uso
- Dominio: **$10-15/año** (opcional)
- Base de datos: **Gratis** (tier gratuito de Supabase/Vercel KV)
- **Total: $0-15 USD**

### Soporte
- Documentar problemas comunes
- Tener número de soporte técnico (tuyo o de alguien técnico)
- Considerar FAQ para invitados

---

## ✅ Validación Final

Antes de compartir el link, confirma:

```
[ ] He probado TODO el flujo de usuario
[ ] He verificado en móvil Y desktop
[ ] He exportado un CSV de prueba
[ ] Los datos son correctos
[ ] Tengo autenticación en /admin
[ ] Tengo backup de datos
[ ] Sé cómo responder si algo falla
```

---

**¡Felicidades y que tengas una boda maravillosa! 🎉💒💕**
