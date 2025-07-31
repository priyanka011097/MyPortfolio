# Priyanka's Portfolio with AI Assistant

This is Priyanka's personal portfolio website featuring an AI-powered chatbot assistant that can help visitors schedule consultation calls.

## Features

- **AI Chatbot**: Intelligent assistant powered by Perplexity API
- **Calendly Integration**: Direct booking for 30-minute consultation calls
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Real-time Chat**: Live conversation with typing indicators and timestamps

## AI Assistant Features

The chatbot can help with:
- Scheduling 30-minute consultation calls
- Answering questions about Priyanka's work
- Providing information about services offered
- Directing users to the Calendly booking link

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here
   ```
   
   Get your Perplexity API key from: https://www.perplexity.ai/settings/api

3. **Run the development server**:
   ```bash
   npm run dev
   ```

## Usage

- Click the AI Assistant button (🤖) in the bottom-right corner of the hero section
- Start a conversation with the chatbot
- Ask about booking a call or any questions about Priyanka's services
- The chatbot will provide the Calendly link for scheduling

## Technology Stack

- React 19 with TypeScript
- Vite for build tooling
- Perplexity AI API for chatbot intelligence
- Tailwind CSS for styling
- Framer Motion for animations

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
