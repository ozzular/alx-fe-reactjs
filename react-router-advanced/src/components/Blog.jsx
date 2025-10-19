import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn the basics of React Router and how to implement client-side routing in your React applications.',
    author: 'John Doe',
    date: '2024-01-15',
    content: 'React Router is a powerful library that allows you to add routing to your React applications. It enables you to build single-page applications with navigation without the page refreshing as the user navigates.'
  },
  {
    id: 2,
    title: 'Advanced Routing Techniques',
    excerpt: 'Explore advanced routing patterns including nested routes, protected routes, and dynamic routing.',
    author: 'Jane Smith',
    date: '2024-01-20',
    content: 'Advanced routing techniques in React Router include nested routes for organizing related components, protected routes for authentication, and dynamic routes for handling variable paths.'
  },
  {
    id: 3,
    title: 'React Router v6 Features',
    excerpt: 'Discover the new features and improvements in React Router version 6.',
    author: 'Mike Johnson',
    date: '2024-01-25',
    content: 'React Router v6 introduces several new features including a new hooks-based API, improved performance, and better TypeScript support.'
  },
  {
    id: 4,
    title: 'Building SPAs with React Router',
    excerpt: 'Learn how to build scalable single-page applications using React Router.',
    author: 'Sarah Wilson',
    date: '2024-02-01',
    content: 'Single-page applications provide a seamless user experience by loading content dynamically. React Router makes it easy to implement this pattern with declarative routing.'
  },
  {
    id: 5,
    title: 'React Router Best Practices',
    excerpt: 'Follow these best practices to write maintainable and performant React Router code.',
    author: 'David Brown',
    date: '2024-02-05',
    content: 'Best practices for React Router include using the correct route patterns, implementing proper loading states, and handling errors gracefully.'
  }
];

function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Blog Posts</h1>
        <p>Explore our latest articles on React Router and web development</p>
      </div>

      <div className="blog-posts">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-post-card">
            <div className="post-header">
              <h2>
                <Link to={`/blog/${post.id}`} className="post-title-link">
                  {post.title}
                </Link>
              </h2>
              <div className="post-meta">
                <span className="post-author">By {post.author}</span>
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="post-content">
              <p className="post-excerpt">{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="read-more-link">
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
