# GitHub User Search

A modern React application for searching GitHub users with advanced filtering capabilities.

## Features

- **Basic Search**: Search for GitHub users by username
- **Advanced Search**: Filter users by location and minimum repository count
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **Real-time Results**: Fast API integration with GitHub's REST API
- **Pagination**: Load more results with infinite scroll functionality

## Technologies Used

- React 19
- Vite
- Tailwind CSS
- Axios
- GitHub REST API

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ozzular/alx-fe-reactjs.git
cd alx-fe-reactjs/github-user-search
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

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Basic Search**: Enter a GitHub username and click "Search" to find a specific user
2. **Advanced Search**: Switch to advanced mode to filter by location and minimum repositories
3. **View Profiles**: Click on any user result to visit their GitHub profile
4. **Load More**: Use the "Load More" button to see additional search results

## API Rate Limits

This application uses GitHub's public API without authentication, which has the following rate limits:
- 60 requests per hour for unauthenticated requests
- 5,000 requests per hour for authenticated requests

For production use, consider adding a GitHub Personal Access Token to increase rate limits.

## Deployment

This application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is part of the ALX Frontend React.js curriculum.
