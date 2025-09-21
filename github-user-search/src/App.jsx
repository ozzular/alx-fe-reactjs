import Search from './components/Search'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Search</h1>
        </div>
      </header>
      <main className="py-6">
        <Search />
      </main>
    </div>
  )
}

export default App
