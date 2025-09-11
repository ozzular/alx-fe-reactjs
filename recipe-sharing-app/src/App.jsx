import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Recipe Sharing App
            </Link>
          </h1>
          <p>Share and discover amazing recipes!</p>

          <nav style={{
            marginTop: '20px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link
              to="/"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '4px'
              }}
            >
              Home
            </Link>
            <Link
              to="/favorites"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '8px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '4px'
              }}
            >
              My Favorites
            </Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecommendationsList />
                <RecipeList />
              </>
            } />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
