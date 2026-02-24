# Configuración para Render - Static Site

## Pasos para desplegar en Render:

### 1. Crear un nuevo Static Site en Render:
- Ve a https://render.com
- Click en "New +" → "Static Site"
- Conecta tu repositorio de GitHub/GitLab/Bitbucket

### 2. Configuración del Build:
- **Name**: cardozo-digital-studio (o el nombre que prefieras)
- **Environment**: Static Site
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### 3. Variables de Entorno:
No se requieren variables de entorno para este proyecto.

### 4. Configuración Avanzada (opcional):
Si tienes un archivo `render.yaml` en la raíz del proyecto, Render lo detectará automáticamente.

### 5. Despliegue:
- Render detectará automáticamente los cambios en tu repositorio
- Cada push a la rama principal desplegará automáticamente
- Obtendrás una URL como: `https://cardozo-digital-studio.onrender.com`

## Comandos locales:

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Notas:
- El proyecto usa Vite como build tool
- Los archivos estáticos se generan en la carpeta `dist/`
- Asegúrate de que el logo esté en la carpeta `public/` o en la raíz del proyecto
