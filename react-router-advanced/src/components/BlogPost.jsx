import { useParams, Link, Navigate } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn the basics of React Router and how to implement client-side routing in your React applications.',
    author: 'John Doe',
    date: '2024-01-15',
    content: 'React Router is a powerful library that allows you to add routing to your React applications. It enables you to build single-page applications with navigation without the page refreshing as the user navigates. In this comprehensive guide, we\'ll explore the fundamental concepts of React Router including routes, navigation, and URL parameters. You\'ll learn how to set up basic routing, handle different types of routes, and create a seamless navigation experience for your users.'
  },
  {
    id: 2,
    title: 'Advanced Routing Techniques',
    excerpt: 'Explore advanced routing patterns including nested routes, protected routes, and dynamic routing.',
    author: 'Jane Smith',
    date: '2024-01-20',
    content: 'Advanced routing techniques in React Router include nested routes for organizing related components, protected routes for authentication, and dynamic routes for handling variable paths. This article dives deep into these patterns and shows you how to implement them effectively in your applications. We\'ll cover topics like route nesting, authentication guards, URL parameters, and query strings.'
  },
  {
    id: 3,
    title: 'React Router v6 Features',
    excerpt: 'Discover the new features and improvements in React Router version 6.',
    author: 'Mike Johnson',
    date: '2024-01-25',
    content: 'React Router v6 introduces several new features including a new hooks-based API, improved performance, and better TypeScript support. The latest version brings significant improvements in developer experience and application performance. In this article, we\'ll explore the new hooks like useNavigate, useParams, and useLocation, and see how they simplify routing logic.'
  },
  {
    id: 4,
    title: 'Building SPAs with React Router',
    excerpt: 'Learn how to build scalable single-page applications using React Router.',
    author: 'Sarah Wilson',
    date: '2024-02-01',
    content: 'Single-page applications provide a seamless user experience by loading content dynamically. React Router makes it easy to implement this pattern with declarative routing. This guide covers best practices for building SPAs, including code splitting, lazy loading, and performance optimization techniques that will help you create fast and scalable applications.'
  },
  {
    id: 5,
    title: 'React Router Best Practices',
    excerpt: 'Follow these best practices to write maintainable and performant React Router code.',
    author: 'David Brown',
    date: '2024-02-05',
    content: 'Best practices for React Router include using the correct route patterns, implementing proper loading states, and handling errors gracefully. This comprehensive guide covers essential tips for writing maintainable routing code, including proper component structure, error boundaries, and performance considerations that every React Router developer should know.'
  }
];

function BlogPost() {
  const { id } = useParams();

  const post = blogPosts.find(post => post.id === parseInt(id));

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="error-message">
          <h2>Post Not Found</h2>
          <p>The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="back-link">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <article className="blog-post">
        <header className="post-header">
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">By {post.author}</span>
            <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </header>

        <div className="post-content">
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-body">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <footer className="post-footer">
          <Link to="/blog" className="back-link">← Back to Blog</Link>
        </footer>
      </article>
    </div>
  );
}

export default BlogPost;
