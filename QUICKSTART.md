# 🚀 Quick Start Guide

Guía de inicio rápido para poner en marcha tu aplicación de invitación de boda en 5 minutos.

## ⚡ Instalación Rápida

```bash
# 1. Navegar a la carpeta del proyecto
cd wedding-app

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

🎉 **¡Listo!** Abre http://localhost:3000 en tu navegador.

---

## 📋 Configuración Mínima (Antes de compartir)

### 1️⃣ Actualizar Datos del Evento
Editar `src/data/wedding-data.json`:

```json
{
  "event": {
    "groomName": "Tu Nombre",
    "brideName": "Nombre de tu Pareja",
    "date": "2025-06-15",
    "venue": {
      "name": "Nombre del Lugar",
      "address": "Dirección del Evento"
    }
  }
}
```

### 2️⃣ Personalizar Textos
Editar `src/app/page.tsx` (líneas 30-60):
- Cambiar nombres en el hero
- Actualizar fechas y horarios
- Modificar direcciones

### 3️⃣ Probar el Flujo

**Como Invitado:**
1. Ir a http://localhost:3000
2. Click en "Confirmar Asistencia"
3. Llenar formulario
4. Enviar

**Como Admin:**
1. Ir a http://localhost:3000/admin
2. Ver estadísticas
3. Exportar CSV

---

## 🌐 Deploy a Producción (Vercel)

```bash
# 1. Instalar Vercel CLI (una sola vez)
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Deploy a producción
vercel --prod
```

✅ Tu app estará en vivo en una URL de Vercel (ej: `tu-app.vercel.app`)

---

## 🔑 URLs Importantes

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con info del evento |
| `/rsvp` | Formulario de confirmación |
| `/admin` | Panel de administración ⚠️ |

⚠️ **IMPORTANTE**: El panel admin NO tiene autenticación. Ver `PRODUCTION_CHECKLIST.md` para agregar seguridad.

---

## 🆘 Problemas Comunes

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### El build falla
```bash
rm -rf .next
npm run build
```

### Los estilos no se aplican
1. Verificar que `src/app/globals.css` existe
2. Reiniciar servidor: `Ctrl+C` y `npm run dev`

---

## 📚 Documentación Completa

- **README.md** - Documentación completa del proyecto
- **DEVELOPMENT.md** - Guía de desarrollo y debugging
- **TYPES.md** - Documentación de tipos de datos
- **PRODUCTION_CHECKLIST.md** - Lista de verificación pre-producción

---

## 🎯 Próximos Pasos

1. ✅ Instalar y correr localmente
2. ✅ Personalizar datos del evento
3. ✅ Probar formulario RSVP
4. ✅ Verificar panel admin
5. ⚠️ **CRÍTICO**: Agregar autenticación al admin
6. ✅ Deploy a Vercel
7. ✅ Compartir link con invitados

---

## 💡 Tips Rápidos

- **Backup**: Exporta CSV regularmente desde `/admin`
- **Testing**: Pide a amigos que prueben antes de compartir
- **Mobile**: Verifica que funcione en celulares
- **Deadline**: Configura fecha límite de confirmación clara

---

**¿Necesitas ayuda?** Lee el README.md completo o contacta al desarrollador.

**¡Felicitaciones por tu boda! 💒💕**
