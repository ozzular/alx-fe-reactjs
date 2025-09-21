import Search from './components/Search'
import HeaderBar from './components/HeaderBar'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderBar />
      <main className="py-8">
        <Search />
      </main>
    </div>
  )
}

export default App
