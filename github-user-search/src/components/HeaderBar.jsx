import { useState } from 'react'

const HeaderBar = () => {
  const [query, setQuery] = useState('')

  const submitIfEnter = (e) => {
    if (e.key === 'Enter') {
      window.dispatchEvent(new CustomEvent('app:search', { detail: { query } }))
    }
  }

  return (
    <div className="bg-[#0d1117] text-white border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left: Logo + Search */}
        <div className="flex items-center space-x-3 w-full">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <span className="sr-only">GitHub</span>
            {/* simple placeholder for octocat */}
            <div className="w-5 h-5 rounded-full bg-white/80" />
          </div>
          <div className="hidden md:block flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={submitIfEnter}
              placeholder="Search"
              className="w-full bg-[#0d1117] border border-gray-700 rounded-md px-3 py-1.5 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        {/* Right: Nav */}
        <nav className="hidden md:flex items-center space-x-5 text-sm text-gray-300">
          <a href="#" className="hover:text-white">Pull requests</a>
          <a href="#" className="hover:text-white">Issues</a>
          <a href="#" className="hover:text-white">Marketplace</a>
          <a href="#" className="hover:text-white">Explore</a>
        </nav>
      </div>
    </div>
  );
};

export default HeaderBar;

