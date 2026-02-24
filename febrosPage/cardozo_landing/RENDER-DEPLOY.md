# 🚀 Guía de Despliegue en Render

## Configuración para Static Site en Render

### Parámetros de Configuración:

```
Name: cardozo-digital-studio
Environment: Static Site
Root Directory: febrosPage/cardozo_landing  ⚠️ IMPORTANTE
Build Command: npm run build
Publish Directory: dist
Branch: main (o la rama que uses)
```

### Pasos Detallados:

1. **Crear cuenta en Render** (si no tienes):
   - Ve a https://render.com
   - Regístrate con GitHub/GitLab/Bitbucket

2. **Crear nuevo Static Site**:
   - Click en "New +" → "Static Site"
   - Conecta tu repositorio

3. **Configurar el Build**:
   - **Name**: `cardozo-digital-studio`
   - **Branch**: `main` (o tu rama principal)
   - **Root Directory**: `febrosPage/cardozo_landing` ⚠️ **MUY IMPORTANTE**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

4. **Variables de Entorno**:
   - No se requieren para este proyecto

5. **Deploy**:
   - Click en "Create Static Site"
   - Render construirá y desplegará automáticamente
   - Obtendrás una URL como: `https://cardozo-digital-studio.onrender.com`

### Configuración Avanzada (render.yaml):

Si prefieres usar el archivo `render.yaml`:
- Render lo detectará automáticamente
- El archivo ya está configurado en la raíz del proyecto

### Comandos Locales:

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview
```

### Notas Importantes:

- ✅ El proyecto usa **Vite** como build tool
- ✅ Los archivos estáticos se generan en `dist/`
- ✅ El logo debe estar en la carpeta `public/` o en la raíz
- ✅ Render detecta automáticamente los cambios en tu repositorio
- ✅ Cada push a la rama principal desplegará automáticamente

### Troubleshooting:

Si el build falla:
1. Verifica que todas las dependencias estén en `package.json`
2. Asegúrate de que el comando `npm run build` funcione localmente
3. Revisa los logs de build en Render para ver el error específico

### URL Final:

Una vez desplegado, tu sitio estará disponible en:
`https://[tu-nombre].onrender.com`
