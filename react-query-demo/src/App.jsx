import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostsComponent from './components/PostsComponent';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>React Query Demo</h1>
        <p>Fetching posts from JSONPlaceholder API with caching and refetch capabilities</p>
        <PostsComponent />
      </div>
    </QueryClientProvider>
  );
}

export default App
