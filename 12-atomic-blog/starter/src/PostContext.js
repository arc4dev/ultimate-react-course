import { createContext, useContext, useMemo, useState } from 'react';

import { createRandomPost } from './helpers';

// Always the same structure

// Create a context for the posts
const PostContext = createContext();

function PostContextProvider({ children }) {
  const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Derived state. These are the posts that will actually be displayed
  const searchedPosts =
    searchQuery.length > 0
      ? posts.filter((post) =>
          `${post.title} ${post.body}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : posts;

  function handleAddPost(post) {
    setPosts((posts) => [post, ...posts]);
  }

  function handleClearPosts() {
    setPosts([]);
  }

  // we need separate contexts for posts and searchquery to optimize performance

  const value = useMemo(() => {
    return {
      posts: searchedPosts,
      setPosts,
      onAddPost: handleAddPost,
      onClearPosts: handleClearPosts,
      searchQuery,
      setSearchQuery,
    };
  }, [searchQuery, searchedPosts]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

// Custom hook to consume the posts context
function usePosts() {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePosts must be used within a PostProvider');

  return context;
}

export { PostContextProvider, usePosts };
