import './App.css'
import Search from './components/Search'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and explore their profiles</p>
      </header>
      <main>
        <Search />
      </main>
    </div>
  )
}

export default App
