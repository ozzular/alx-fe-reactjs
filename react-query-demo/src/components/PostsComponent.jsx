import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

function PostsComponent() {
  const [refetchCount, setRefetchCount] = useState(0);

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleRefetch = () => {
    refetch();
    setRefetchCount(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="posts-container">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="posts-container">
        <div className="error">
          Error: {error.message}
          <button onClick={handleRefetch} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Posts from JSONPlaceholder API</h2>
        <div className="posts-info">
          <p>Total posts: {posts?.length || 0}</p>
          <p>Refetch count: {refetchCount}</p>
          <p>Status: {isFetching ? 'Fetching...' : 'Idle'}</p>
        </div>
      </div>

      <div className="posts-actions">
        <button
          onClick={handleRefetch}
          disabled={isFetching}
          className="refetch-button"
        >
          {isFetching ? 'Refetching...' : 'Refetch Posts'}
        </button>
      </div>

      <div className="posts-list">
        {posts?.slice(0, 10).map((post) => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className="post-meta">
              <span>Post ID: {post.id}</span>
              <span>User ID: {post.userId}</span>
            </div>
          </div>
        ))}
      </div>

      {posts && posts.length > 10 && (
        <div className="posts-footer">
          <p>Showing first 10 posts out of {posts.length} total posts</p>
        </div>
      )}
    </div>
  );
}

export default PostsComponent;
