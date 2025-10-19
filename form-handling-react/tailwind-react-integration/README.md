# Tailwind CSS React Integration

This project demonstrates how to integrate Tailwind CSS with a React application using Vite.

## Features

- React 18+ with Vite
- Tailwind CSS v4
- Responsive design
- Component-based architecture

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   └── UserProfile.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the project for production
- `npm run preview` - Previews the production build locally

## Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Tailwind CSS Configuration

The project uses Tailwind CSS v4 with the following configuration in [tailwind.config.js](file:///C:/Users/perso/Downloads/alx-fe-reactjs/tailwind-react-integration/tailwind.config.js):

```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

The Tailwind directives are imported in [src/index.css](file:///C:/Users/perso/Downloads/alx-fe-reactjs/tailwind-react-integration/src/index.css):

```css
@import "tailwindcss/theme.css";
@import "tailwindcss/components.css";
@import "tailwindcss/utilities.css";
```