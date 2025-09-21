import Search from './components/Search'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">GitHub User Search</h1>
          <p className="text-lg text-gray-600">Search for GitHub users and explore their profiles</p>
        </div>
      </header>
      <main className="py-8">
        <Search />
      </main>
    </div>
  )
}

export default App
