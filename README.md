# Portfolio de Gonzalo Herrera

![Portfolio Screenshot](./public/favicon/browserconfig.xml)

Este es el portfolio personal de Gonzalo Herrera, desarrollado con [Vite](https://vitejs.dev/), [React](https://reactjs.org/) y [Tailwind CSS](https://tailwindcss.com/). Incluye modo oscuro/claro, soporte multilingüe (Español/Inglés), y un formulario de contacto funcional.

## 🚀 Características

- **Modo Oscuro/Claro**: Toggle para cambiar entre temas
- **Multilingüe**: Soporte completo para Español e Inglés
- **Responsive Design**: Optimizado para móviles y desktop
- **Formulario de Contacto**: Integración con Formspree para envío de emails
- **Secciones**: Home, About, Projects, Contact, Education
- **Tecnologías**: Java, Python, Laravel, React, PHP, TypeScript, JavaScript, Vite, PostgreSQL, MySQL
- **Integración WhatsApp**: Enlaces directos a WhatsApp

## 📦 Instalación

### Clonar el repositorio

```bash
git clone https://github.com/pekzer/portfolio.git
cd portfolio
```

### Instalar dependencias

```bash
npm install
# o
yarn install
```

### Configurar Formspree

1. Ve a [Formspree](https://formspree.io/) y crea una cuenta
2. Crea un nuevo formulario
3. Copia el Form ID (algo como `xeqwryjq`)
4. Abre `src/sections/Contact.jsx`
5. Reemplaza `YOUR_FORM_ID` con tu Form ID real:

```javascript
const FORMSPREE_URL = `https://formspree.io/f/YOUR_FORM_ID`;
```

### Ejecutar el proyecto

```bash
npm run dev
# o
yarn dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver el resultado.

## 🚀 Despliegue en GitHub Pages

### Configuración Automática (Recomendado)

El proyecto incluye un workflow de GitHub Actions que despliega automáticamente en GitHub Pages.

1. **Ve a tu repositorio en GitHub**
2. **Settings → Pages**
3. **Source**: Selecciona "GitHub Actions"
4. **Sube tus cambios** al branch `main`
5. **El despliegue se hará automáticamente**

### Configuración Manual

Si prefieres configurar manualmente:

1. **Build del proyecto:**
   ```bash
   npm run build
   ```

2. **Sube la carpeta `dist`** a un branch `gh-pages` o usa GitHub Actions

### URL del Portfolio

Una vez desplegado, tu portfolio estará disponible en:
```
https://pekzer.github.io/portfolio/
```

## 🔧 Solución de Problemas

### Error de MIME types
- ✅ Configurado `base: '/portfolio/'` en `vite.config.js`
- ✅ Workflow de GitHub Actions incluido
- ✅ Archivo `.nojekyll` creado

### Error 404 en assets
- ✅ Rutas de favicon actualizadas con `/portfolio/`
- ✅ Manifest.json accesible

### Problemas de JavaScript modules
- ✅ GitHub Actions genera archivos compatibles
- ✅ Build optimizado para SPA

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS con paleta de colores personalizada
- **Estado**: Context API para tema e idioma
- **Formulario**: Formspree para envío de emails
- **Fuentes**: Inter (auto-hospedada)
- **Build**: Vite para desarrollo y producción

## 📁 Estructura del Proyecto

```
portfolio/
├── public/
│   ├── favicon/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── CustomLink.jsx
│   │   └── UnstyledLink.jsx
│   ├── context/
│   │   ├── LanguageContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── routes/
│   │   ├── PrivateRoute.jsx
│   │   └── Routes.jsx
│   └── sections/
│       ├── About.jsx
│       ├── Contact.jsx
│       ├── Education.jsx
│       ├── Footer.jsx
│       ├── Hero.jsx
│       ├── Navbar.jsx
│       └── Projects.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Personalización

### Colores
Los colores están definidos en `tailwind.config.js`. Puedes modificar la paleta de colores personalizada:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        // ... más colores
      }
    }
  }
}
```

### Idiomas
Las traducciones están en `src/context/LanguageContext.jsx`. Agrega nuevos idiomas o modifica textos existentes.

### Contenido
- **About**: Modifica `src/sections/About.jsx` para actualizar información personal
- **Projects**: Actualiza `src/sections/Projects.jsx` con tus proyectos
- **Education**: Modifica `src/sections/Education.jsx` para tu formación académica

## 📞 Contacto

Gonzalo Herrera
- **Email**: [tu-email@ejemplo.com]
- **WhatsApp**: [Enlace directo en el portfolio]
- **LinkedIn**: [Tu perfil de LinkedIn]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.