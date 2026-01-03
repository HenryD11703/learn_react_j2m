# Junior to Mid - Code Training Platform

Plataforma interactiva para aprender React y avanzar de nivel Junior a Mid-Level, con ejercicios prácticos, feedback en tiempo real impulsado por IA y un entorno de desarrollo integrado.

## Características

- **Editor de Código en Vivo**: Basado en Sandpack, permite editar y ejecutar código React directamente en el navegador.
- **Feedback Inteligente**: Integración con Google Generative AI (Gemini) para revisar el código, ofrecer correcciones, buenas prácticas y sugerencias personalizadas.
- **Sistema de Ejercicios**:
  - **Objetivos Claros**: Cada ejercicio tiene una meta específica.
  - **Teoría Integrada**: Conceptos clave, buenas y malas prácticas explicadas en contexto.
  - **Pistas Progresivas**: Ayuda paso a paso si te atascas.
- **Interfaz Moderna**: Diseño inspirado en IDEs modernos (VS Code) con temas oscuros y panel de terminal colapsable.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Estilos**: [TailwindCSS 4](https://tailwindcss.com/)
- **Editor**: [@codesandbox/sandpack-react](https://sandpack.codesandbox.io/)
- **AI**: [Google Generative AI SDK](https://ai.google.dev/)
- **Iconos**: [Lucide React](https://lucide.dev/)

## Empezando

### Prerrequisitos

- Node.js 18+ instalado.
- Una API Key de Google Gemini (para la funcionalidad de IA).

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/HenryD11703/learn_react_j2m.git
    cd learn_react_j2m
    ```

2.  Instala las dependencias:
    ```bash
    npm install
    ```

3.  Configura las variables de entorno:
    Crea un archivo `.env` en la raíz (puedes basarte en un `.env.example` si existe o añadir tu key directamente):
    ```env
    GOOGLE_API_KEY=tu_api_key_aqui
    ```

4.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

5.  Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

- `app/components`: Componentes de UI (ReviewPanel, Sidebar, etc.).
- `app/content/react-basics`: Archivos de definición de los ejercicios (Typescript).
- `app/types`: Definiciones de tipos TypeScript (Exercise, Difficulty, etc.).
- `app/api/revisar-codigo`: Endpoint para el análisis de código con IA.

## Creando Nuevo Contenido

Para añadir un nuevo ejercicio:

1.  Ve a `app/content/react-basics`.
2.  Copia el archivo `template.ts` y renómbralo (ej: `12-custom-hooks.ts`).
3.  Rellena la estructura `Exercise`:
    - **slug**: URL única.
    - **theory**: Explica el concepto antes del ejercicio.
    - **steps**: Pasos para completar la tarea.
    - **files**: Código inicial.
    - **aiInstruction**: Instrucciones para que la IA sepa qué evaluar.
