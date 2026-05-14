# Portafolio 2026 — Martin Mafla

> Re-diseño completo del portafolio personal con enfoque en tendencias 2026: bento grid, kinetic typography, glassmorphism funcional, custom cursor magnético y experiencia 3D con Three.js.

🎨 **Design System:** DEV/CRAFT 2026
🛠 **Stack:** Angular 21 + Three.js r184 + TypeScript 5.8
🌐 **Live:** [martinmafla.github.io/Portafolio](https://martinmafla.github.io/Portafolio/)

---

## ✨ Highlights del re-diseño

- **Zoneless Angular 21** — change detection con signals, sin Zone.js (más rápido)
- **Three.js Dev Workspace** — escena 3D isométrica de un setup de programador como hero (reemplaza al avatar real)
- **Custom magnetic cursor** — interacción premium en hover de elementos
- **Bento grid** — layout dominante 2026 para showcase de proyectos
- **Kinetic typography** — animación con scramble y mouse parallax
- **Glass morphism evolved** — navbar y cards con backdrop blur funcional
- **Editorial typography** — Instrument Serif (display) + Inter Tight (UI) + JetBrains Mono (code)
- **Tactile/Brutalist details** — bordes 1px, números mono, indicadores de estado
- **Página de detalle de proyecto** — formato magazine con parallax

---

## 🚀 Setup local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:4200)
npm start

# Build de producción
npm run build
```

## 📦 Deploy a GitHub Pages

### Opción 1 — Automático (recomendado)
Ya está configurado un GitHub Action en `.github/workflows/deploy.yml`. Cada push a `main` despliega automáticamente.

Solo necesitas:
1. Push a la rama `main`
2. Ir a **Settings → Pages** del repo y elegir **GitHub Actions** como source
3. Listo, tu sitio estará en `https://<usuario>.github.io/Portafolio/`

### Opción 2 — Manual
```bash
npm run deploy:gh-pages
```

---

## 🗂 Estructura

```
src/
├── app/
│   ├── components/        # Reusables
│   │   ├── avatar-glyph/        → Monograma SVG (reemplaza foto real)
│   │   ├── custom-cursor/       → Cursor magnético dual
│   │   ├── dev-workspace/       → Escena Three.js del setup 3D
│   │   ├── magnetic/            → Directiva [magnetic] para hover
│   │   ├── project-card/        → Card reusable
│   │   ├── project-details/     → Caso de estudio editorial
│   │   ├── scramble-text/       → Texto con efecto kinético
│   │   └── tech-marquee/        → Carrusel infinito de tech stack
│   └── pages/
│       ├── home/                → Hero + stats + bento featured
│       ├── about/                → Bio + skills + journey
│       ├── projects/             → Bento grid + filtros
│       ├── contact/              → Form con signals + canales
│       └── education/            → Timeline + filosofía
├── assets/images/         # Screenshots de proyectos
└── styles.scss            # Design system (CSS variables, utilidades, .glass, .btn)
```

---

## 🎨 Design tokens

```scss
// Brand
--brand: #6c5ce7;          // Original elevado
--brand-bright: #8a7ef5;
--accent-violet: #c084fc;
--accent-cyan: #67e8f9;

// Surfaces
--bg-base: #0a0a0f;        // Dark sofisticado
--surface-1: rgba(255,255,255,0.02);
--border-soft: rgba(255,255,255,0.06);

// Type scale
--font-display: 'Instrument Serif';  // Headlines
--font-body: 'Inter Tight';           // UI
--font-mono: 'JetBrains Mono';        // Code/eyebrows
```

---

## 🛠 Tecnologías clave

| Categoría     | Tech                                   |
|---------------|----------------------------------------|
| Framework     | Angular 21 (zoneless, signals)         |
| 3D            | Three.js r184 + three-stdlib           |
| Styles        | SCSS modular + CSS Variables           |
| Forms         | Reactive con Signals (no FormBuilder)  |
| Routing       | Lazy loading + View Transitions API    |
| Build         | @angular/build (esbuild ultra-rápido)  |
| Iconos        | Devicon (CDN) + Lucide Angular         |

---

## 📝 Notas

- **No se usan fotos reales** — reemplazadas por el `<app-avatar-glyph>` (SVG geometric M)
- El home muestra una escena 3D interactiva con `<app-dev-workspace>` en lugar del personaje 3D anterior
- Todas las páginas tienen scroll restoration y view transitions nativas
- Mobile-first responsive con breakpoints 768px, 900px, 1200px
- Reduced motion respetado en TODAS las animaciones

---

**Hecho con cariño obsesivo por el detalle.** 🎯

— Martin Mafla · 2026
