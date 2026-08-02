# Tendón — Kinesiología del Movimiento

Sitio web ficticio para una clínica de kinesiología deportiva y rehabilitación funcional, creado como proyecto de portafolio.

**⚠️ Nota:** Todo el contenido (nombre, profesionales, testimonios, dirección y teléfono) es ficticio, generado con fines de demostración.

## Vista previa

Abre `index.html` en tu navegador, o sírvelo localmente:

```bash
python3 -m http.server 8080
# luego visita http://localhost:8080
```

## Stack

- HTML5 semántico
- CSS puro (sin frameworks) con variables CSS para theming
- JavaScript vanilla (sin dependencias)
- Tipografías: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Inter](https://fonts.google.com/specimen/Inter), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) vía Google Fonts

## Características

- **Goniómetro animado en SVG**: elemento hero que simula la medición de rango de movimiento articular, animado con JavaScript puro
- Diseño responsive (mobile-first breakpoints)
- Menú de navegación con estado móvil (hamburguesa)
- Formulario de contacto con validación HTML5 (sin backend — solo demostración)
- Animaciones de aparición al hacer scroll (`IntersectionObserver`)
- Soporte para `prefers-reduced-motion`

## Estructura

```
tendon-kinesiologia/
├── index.html      # Estructura y contenido
├── styles.css       # Diseño visual y sistema de tokens
├── script.js         # Interactividad (goniómetro, nav, formulario)
└── README.md
```

## Licencia

Libre uso para fines de aprendizaje y portafolio.
