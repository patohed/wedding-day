# ❓ Preguntas Frecuentes (FAQ)

## 🎯 General

### ¿Qué es esta aplicación?
Una aplicación web moderna para invitaciones de boda que permite a los invitados confirmar su asistencia online y a los novios gestionar todas las confirmaciones desde un panel de administración.

### ¿Es gratis?
Sí, el código es completamente gratuito. Los únicos costos opcionales son:
- Dominio personalizado: ~$10-15/año
- Hosting es GRATIS en Vercel/Netlify

### ¿Necesito saber programar?
Para uso básico no, pero para personalización avanzada sí necesitas conocimientos de JavaScript/TypeScript y React.

### ¿Cuántos invitados soporta?
El sistema está diseñado para hasta 1000 invitados principales. Con grupos familiares, puede manejar fácilmente 2000-3000 personas totales.

---

## 🛠️ Instalación y Configuración

### ¿Cómo instalo la aplicación?
```bash
npm install
npm run dev
```
Ver `QUICKSTART.md` para detalles.

### ¿Dónde cambio los datos de mi boda?
En el archivo `src/data/wedding-data.json` - cambiar nombres, fechas, lugares, etc.

### ¿Cómo cambio los colores?
En `src/app/globals.css` puedes modificar las variables de color:
```css
--color-rose-500: #f43f5e; /* Color principal */
```

### ¿Puedo usar mis propias fotos?
Sí, coloca tus fotos en `public/images/` y actualiza las URLs en `src/app/page.tsx`.

---

## 📱 Funcionalidad

### ¿Los invitados pueden traer acompañantes?
Sí, hay dos opciones:
1. **Grupo Familiar**: Cónyuge + hijos (edad y menú para cada uno)
2. **Plus One**: Tendrías que modificar el código para permitir acompañantes genéricos

### ¿Qué opciones de menú hay?
Por defecto:
- Tradicional
- Vegetariano
- Sin gluten (gluten-free)
- Alérgico/Personalizado (allergic-custom)

Puedes agregar más en `src/types/index.ts`.

### ¿Se pueden ver las confirmaciones en tiempo real?
Sí, el panel de administración se actualiza automáticamente al recargar la página.

### ¿Puedo exportar los datos?
Sí, desde `/admin` hay un botón "Exportar CSV" que descarga todos los datos en formato Excel.

### ¿Los invitados pueden editar su confirmación?
No, por defecto no. Tendrían que confirmar nuevamente o contactarte directamente.

---

## 🔐 Seguridad

### ¿El panel de administración es seguro?
**NO** por defecto. Debes agregar autenticación antes de producción. Ver `PRODUCTION_CHECKLIST.md`.

### ¿Cómo protejo el panel admin?
Opciones recomendadas:
1. **NextAuth.js** - Gratis, código abierto
2. **Clerk** - Fácil, tiene capa gratuita
3. **Auth0** - Robusto, tiene capa gratuita

Ver `DEVELOPMENT.md` para implementación.

### ¿Los datos están encriptados?
Las comunicaciones usan HTTPS en producción (automático con Vercel). Los datos en el archivo JSON no están encriptados.

---

## 💾 Datos y Almacenamiento

### ¿Dónde se guardan las confirmaciones?
Por defecto en `src/data/wedding-data.json` (archivo local).

### ¿Qué pasa si borro el archivo JSON?
Pierdes todos los datos. Por eso es CRÍTICO hacer backups regulares (exportar CSV).

### ¿Funciona con Vercel/Netlify?
⚠️ **PROBLEMA**: Los archivos no persisten en estas plataformas entre deploys.

**Solución**: Migrar a base de datos:
- Vercel KV (Redis) - Recomendado
- Supabase (PostgreSQL) - Gratis 500MB
- MongoDB Atlas - Gratis 512MB

Ver `DEVELOPMENT.md` para migración.

### ¿Cómo hago backup de mis datos?
1. Exportar CSV desde `/admin`
2. Copiar `src/data/wedding-data.json` manualmente
3. Hacer esto ANTES del evento y regularmente

---

## 🚀 Deployment

### ¿Dónde puedo hospedar la app?
**Recomendado**: Vercel (gratis, fácil, automático)

**Alternativas**:
- Netlify
- Railway (incluye base de datos)
- Render
- Servidor propio (VPS)

### ¿Necesito un dominio personalizado?
No es obligatorio. Vercel te da una URL gratis: `tu-app.vercel.app`

Pero un dominio personalizado es más profesional: `anacarloslaboda.com`

### ¿Cómo deploy a Vercel?
```bash
npm i -g vercel
vercel login
vercel --prod
```

O conecta tu repositorio GitHub a Vercel para deploys automáticos.

### ¿Cuánto cuesta el hosting?
**$0 USD** con Vercel/Netlify para este proyecto (dentro de límites gratuitos).

---

## 📱 Mobile y Diseño

### ¿Funciona en celulares?
Sí, está completamente optimizado para móviles, tablets y desktop.

### ¿Puedo cambiar el diseño?
Sí, pero requiere conocimientos de Tailwind CSS y React. Todos los estilos están en los componentes.

### ¿Hay tema oscuro?
No por defecto, pero puedes implementarlo usando la funcionalidad de Tailwind CSS.

### ¿Puedo agregar más secciones?
Sí, editando `src/app/page.tsx` puedes agregar:
- Galería de fotos
- Historia de la pareja
- Alojamiento recomendado
- Registro de regalos
- etc.

---

## 🎨 Personalización

### ¿Puedo cambiar el idioma?
Sí, todos los textos están en español (Argentina). Puedes cambiarlos manualmente en cada componente o implementar i18n para multi-idioma.

### ¿Cómo agrego más tipos de menú?
1. Editar `src/types/index.ts`:
```typescript
export type MenuOption = 
  | "traditional" 
  | "vegetarian"
  | "vegan"  // NUEVO
  | "gluten-free";
```

2. Actualizar formulario en `src/app/rsvp/page.tsx`

### ¿Puedo quitar la sección de hijos?
Sí, editando `src/app/rsvp/page.tsx` y removiendo todo el código relacionado con `children`.

---

## 🐛 Problemas Comunes

### Error: "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### El build falla
```bash
rm -rf .next
npm run build
```

### Los estilos no funcionan
Verificar que `src/app/globals.css` existe y reiniciar:
```bash
npm run dev
```

### Las confirmaciones no se guardan
Verificar:
1. Permisos de escritura en `src/data/wedding-data.json`
2. Formato JSON válido
3. Logs de error en la consola del navegador (F12)

### No puedo exportar CSV
Verificar:
1. Que haya al menos 1 confirmación
2. Que el navegador permita descargas
3. Popup blockers deshabilitados

---

## 📊 Estadísticas y Reportes

### ¿Qué estadísticas muestra el panel?
- Total de invitados (principales)
- Total confirmados
- Total que no asisten
- Pendientes de respuesta
- Total de personas (incluyendo familias)
- Grupos familiares
- Distribución de menús

### ¿Puedo ver quién no ha confirmado?
Por defecto no hay lista explícita de pendientes, pero puedes calcularlo sabiendo cuántos invitaste y cuántos confirmaron.

### ¿Puedo filtrar por tipo de menú?
Hay una tab "Menús" en el admin que muestra la distribución.

---

## 🔧 Desarrollo Avanzado

### ¿Cómo agrego autenticación?
Ver `DEVELOPMENT.md` sección "Seguridad" para implementación con NextAuth.js.

### ¿Cómo migro a una base de datos?
1. Elegir DB (Supabase recomendado)
2. Crear tablas: guests, family_groups, event
3. Modificar `src/lib/services/data-service.ts`
4. Cambiar operaciones de archivo a queries SQL

### ¿Puedo agregar envío de emails?
Sí, usando:
- **Resend** (recomendado, fácil)
- **SendGrid** (robusto)
- **Nodemailer** (DIY)

### ¿Hay tests?
No incluidos por defecto. Podrías agregar:
- **Jest** para unit tests
- **Playwright** para E2E tests

---

## 📞 Soporte para Invitados

### ¿Qué le digo a un invitado que no puede confirmar?
1. Verificar que use el link correcto
2. Probar en otro navegador/dispositivo
3. Verificar conexión a internet
4. Tomar confirmación manual y agregarla tú

### ¿Un invitado puede cambiar su confirmación?
No automáticamente. Debe contactarte y tú editas desde el admin.

### ¿Qué pasa si un invitado confirma dos veces?
Se crearán dos registros. Deberías eliminar el duplicado desde el admin.

---

## 🎉 Día del Evento

### ¿Qué hago el día del evento?
1. Exportar CSV final la noche anterior
2. Imprimir lista de confirmados
3. Tener copia en tu teléfono
4. Opcional: Cerrar formulario RSVP

### ¿Puedo hacer check-in digital?
No incluido, pero podrías implementar:
- QR codes para cada invitado
- App de check-in con tablet
- Lista digital actualizable

---

## 💡 Mejoras Futuras

### Características que podrías agregar:
- [ ] Sistema de mensajes para invitados
- [ ] Galería de fotos
- [ ] Contador regresivo
- [ ] Integración con calendario (Google/iCal)
- [ ] Playlist colaborativa (Spotify)
- [ ] Mapa de asientos
- [ ] Registry/Lista de regalos
- [ ] Livestream para invitados remotos
- [ ] Guest book digital

---

## 📄 Licencia y Uso

### ¿Puedo usar esto para mi boda?
¡Sí! Es exactamente para eso.

### ¿Puedo modificarlo?
Sí, es código abierto.

### ¿Puedo venderlo o usarlo para otros eventos?
Sí, pero da crédito si lo redistribuyes.

### ¿Hay garantía?
No. Úsalo bajo tu propio riesgo. Prueba TODO antes del evento.

---

## 🆘 ¿Necesitas Ayuda?

1. **Lee la documentación**:
   - `README.md` - Overview general
   - `QUICKSTART.md` - Inicio rápido
   - `DEVELOPMENT.md` - Desarrollo
   - `PRODUCTION_CHECKLIST.md` - Pre-producción

2. **Revisa Issues de GitHub** (si aplica)

3. **Contacta al desarrollador** (configura email en wedding-data.json)

---

**¡Éxito en tu boda! 💒💕🎉**
