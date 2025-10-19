# Recipe Sharing Platform

A modern React application for sharing and discovering recipes, built with Tailwind CSS for responsive design.

## Features

- **Recipe Discovery**: Browse a collection of delicious recipes
- **Recipe Details**: View comprehensive recipe information including ingredients and instructions
- **Add New Recipes**: Submit your own recipes with validation
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Modern JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ozzular/alx-fe-reactjs.git
cd recipe-sharing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── HomePage.jsx          # Main recipe listing page
│   ├── RecipeDetail.jsx      # Individual recipe details
│   └── AddRecipeForm.jsx     # Form for adding new recipes
├── data.json                 # Mock recipe data
├── App.jsx                   # Main application component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles with Tailwind
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Features Overview

### Home Page
- Grid layout displaying recipe cards
- Hover effects with smooth transitions
- Responsive design adapting to screen sizes
- Navigation to recipe details

### Recipe Detail Page
- Complete recipe information display
- Ingredients list with proper formatting
- Step-by-step cooking instructions
- Navigation back to home page

### Add Recipe Form
- Form validation for required fields
- Client-side validation with user feedback
- Responsive form design
- Success/error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the ALX Frontend React.js program.