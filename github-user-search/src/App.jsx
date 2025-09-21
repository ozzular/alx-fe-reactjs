import Search from './components/Search'
import HeaderBar from './components/HeaderBar'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <HeaderBar />
      <main className="pb-16">
        <Search />
      </main>
    </div>
  )
}

export default App