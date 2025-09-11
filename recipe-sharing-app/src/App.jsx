import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Recipe Sharing App</h1>
        <p>Share and discover amazing recipes!</p>
      </header>
      
      <main>
        <AddRecipeForm />
        <RecipeList />
      </main>
    </div>
  )
}

export default App
