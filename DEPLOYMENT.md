# 🌐 Guía de Deploy - Wedding Day

Esta guía te ayudará a desplegar tu invitación digital en diferentes plataformas de hosting.

---

## 🚀 Deploy en Vercel (Recomendado)

### ✅ Ventajas
- ✅ **Gratis** para proyectos personales
- ✅ **Deploy automático** desde GitHub
- ✅ **CDN global** para velocidad óptima
- ✅ **SSL automático** incluido
- ✅ **Optimizado** para Next.js

### 📋 Pasos

1. **Crea cuenta** en [Vercel](https://vercel.com)

2. **Conecta tu repositorio** de GitHub:
   ```bash
   # Si no tienes el código en GitHub
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/tuusuario/tu-boda.git
   git push -u origin main
   ```

3. **Importa proyecto** en Vercel:
   - New Project → Import Git Repository
   - Selecciona tu repo
   - Deploy automático

4. **Configura variables** (opcional):
   ```env
   NEXT_PUBLIC_APP_NAME=Mi Boda Perfecta
   NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX
   ```

5. **Dominio personalizado** (opcional):
   - Settings → Domains
   - Agrega `miboda.com`
   - Configura DNS según instrucciones

### 🔄 Deploy Automático
```bash
# Cada push a main despliega automáticamente
git add .
git commit -m "Actualizar fecha de boda"
git push origin main
# ✅ Deploy automático en ~2 minutos
```

---

## 🌊 Deploy en Netlify

### ✅ Ventajas
- ✅ **Gratis** para proyectos pequeños
- ✅ **Forms handling** integrado
- ✅ **Edge functions** disponibles
- ✅ **Analytics** incluído

### 📋 Pasos

1. **Crea cuenta** en [Netlify](https://netlify.com)

2. **Build settings**:
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy desde GitHub**:
   - New site from Git
   - Connect to GitHub
   - Deploy site

4. **Variables de entorno**:
   - Site settings → Environment variables
   - Agrega las necesarias

---

## 🚂 Deploy en Railway

### ✅ Ventajas
- ✅ **Base de datos** incluida
- ✅ **Escalado automático**
- ✅ **Monitoring** integrado
- ✅ **PostgreSQL** gratis hasta 5GB

### 📋 Pasos

1. **Crea cuenta** en [Railway](https://railway.app)

2. **railway.json**:
   ```json
   {
     "$schema": "https://railway.app/railway.schema.json",
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm start",
       "restartPolicyType": "ON_FAILURE",
       "restartPolicyMaxRetries": 10
     }
   }
   ```

3. **Deploy**:
   - New Project → Deploy from GitHub
   - Connect repo → Deploy

---

## ☁️ Deploy en Render

### ✅ Ventajas
- ✅ **Tier gratuito** generoso
- ✅ **PostgreSQL** gratis
- ✅ **SSL automático**
- ✅ **Monitoreo** incluido

### 📋 Pasos

1. **Web Service** en [Render](https://render.com)
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`
4. **Environment**: Node

---

## 🔧 Deploy Manual (VPS)

### Para Ubuntu/Debian

```bash
# 1. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Instalar PM2
sudo npm install -g pm2

# 3. Clonar proyecto
git clone https://github.com/tuusuario/tu-boda.git
cd tu-boda

# 4. Instalar dependencias
npm install

# 5. Build para producción
npm run build

# 6. Configurar PM2
pm2 start npm --name "wedding-app" -- start
pm2 startup
pm2 save

# 7. Nginx (opcional)
sudo apt install nginx
```

### Configuración Nginx

```nginx
# /etc/nginx/sites-available/wedding-app
server {
    listen 80;
    server_name miboda.com www.miboda.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📊 Configuración de Base de Datos

### Migrar de JSON a PostgreSQL

1. **Instalar Prisma**:
```bash
npm install prisma @prisma/client
npx prisma init
```

2. **Schema** (`prisma/schema.prisma`):
```prisma
model Guest {
  id              String   @id @default(cuid())
  name            String
  email           String   @unique
  phone           String?
  isAttending     Boolean
  menuPreference  String
  allergies       String?
  familyGroupId   String?
  role            String   @default("main")
  createdAt       DateTime @default(now())
  
  familyGroup     FamilyGroup? @relation(fields: [familyGroupId], references: [id])
}

model FamilyGroup {
  id          String   @id @default(cuid())
  mainGuestId String
  createdAt   DateTime @default(now())
  
  guests      Guest[]
}
```

3. **Migrar datos**:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### Variables de Entorno para Producción

```env
# .env.production
DATABASE_URL="postgresql://user:pass@host:5432/wedding_db"
NEXTAUTH_URL="https://miboda.com"
NEXTAUTH_SECRET="tu-secret-super-seguro"
```

---

## 🔒 Configuración de Seguridad

### Variables Sensibles

```env
# .env.local (NUNCA commitear)
ADMIN_PASSWORD=tu-password-seguro
JWT_SECRET=tu-jwt-secret
EMAIL_PASSWORD=tu-email-password
WEBHOOK_SECRET=tu-webhook-secret
```

### Autenticación Admin

```bash
# Instalar NextAuth.js
npm install next-auth
```

```javascript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.password === process.env.ADMIN_PASSWORD) {
          return { id: "admin", name: "Admin" }
        }
        return null
      }
    })
  ]
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
```

---

## 📈 Configuración de Analytics

### Google Analytics 4

```bash
npm install @next/third-parties
```

```jsx
// src/app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  )
}
```

### Plausible Analytics (Privacidad-Friendly)

```jsx
// src/app/layout.tsx
<Script
  defer
  data-domain="miboda.com"
  src="https://plausible.io/js/script.js"
/>
```

---

## 🔔 Configuración de Notificaciones

### Email con Resend

```bash
npm install resend
```

```javascript
// src/lib/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(guest: Guest) {
  await resend.emails.send({
    from: 'noreply@miboda.com',
    to: guest.email,
    subject: '¡Confirmación recibida!',
    html: `
      <h1>¡Gracias ${guest.name}!</h1>
      <p>Hemos recibido tu confirmación de asistencia.</p>
    `
  });
}
```

### WhatsApp con Twilio

```bash
npm install twilio
```

```javascript
// src/lib/whatsapp.ts
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function sendWhatsAppNotification(guest: Guest) {
  await client.messages.create({
    from: 'whatsapp:+14155238886',
    to: `whatsapp:${guest.phone}`,
    body: `¡Hola ${guest.name}! Confirmamos tu asistencia a nuestra boda. ¡Te esperamos! 💒`
  });
}
```

---

## 🌍 Configuración de CDN

### Cloudflare (Recomendado)

1. **Crear cuenta** en [Cloudflare](https://cloudflare.com)
2. **Agregar dominio** y cambiar nameservers
3. **Configurar** SSL/TLS → Full (strict)
4. **Speed** → Optimization → Auto Minify
5. **Caching** → Configuration → Browser Cache TTL

### AWS CloudFront

```yaml
# cloudformation.yml
Resources:
  CloudFrontDistribution:
    Type: AWS::CloudFront::Distribution
    Properties:
      DistributionConfig:
        Origins:
          - DomainName: !GetAtt WebsiteBucket.DomainName
            Id: S3Origin
            S3OriginConfig:
              OriginAccessIdentity: !Ref OriginAccessIdentity
        Enabled: true
        DefaultRootObject: index.html
```

---

## 📋 Checklist Final

### Pre-Deploy
- [ ] ✅ Build exitoso localmente (`npm run build`)
- [ ] ✅ Variables de entorno configuradas
- [ ] ✅ Datos del evento actualizados
- [ ] ✅ Imágenes optimizadas
- [ ] ✅ Pruebas en móvil y desktop

### Post-Deploy
- [ ] ✅ SSL funcionando (https://)
- [ ] ✅ Formulario RSVP operativo
- [ ] ✅ Panel admin accesible
- [ ] ✅ Analytics configurado
- [ ] ✅ Backups automáticos
- [ ] ✅ Dominio personalizado (opcional)

### Monitoreo
- [ ] ✅ Uptime monitoring (UptimeRobot, Pingdom)
- [ ] ✅ Error tracking (Sentry)
- [ ] ✅ Performance monitoring (Vercel Analytics)

---

## 🆘 Troubleshooting

### Build Errors
```bash
# Limpiar cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Problemas de DNS
```bash
# Verificar propagación
nslookup miboda.com
dig miboda.com
```

### Performance Issues
```bash
# Analizar bundle
npm run build
npx @next/bundle-analyzer
```

---

## 📞 Soporte Deploy

¿Problemas con el deploy?

- 📧 **Email**: deploy@wedding-day.dev
- 💬 **Discord**: [#deploy-help](https://discord.gg/wedding-day)
- 📖 **Docs**: [Deploy documentation](https://wedding-day.dev/docs/deploy)

---

**¡Tu boda en línea en minutos! 🚀💍**