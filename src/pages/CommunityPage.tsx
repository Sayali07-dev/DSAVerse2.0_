import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Bookmark, 
  Plus, 
  Search, 
  Sparkles, 
  X, 
  Layers 
} from 'lucide-react';
import { mockCommunityPosts, communityTopics } from '../data/dsaData';
import type { CommunityPost } from '../data/dsaData';
import { useAuth } from '../context/AuthContext';

const POSTS_STORAGE_KEY = 'dsaverse_community_posts_v1';

export const CommunityPage: React.FC = () => {
  const { userProfile, user } = useAuth();
  const displayName = userProfile?.displayName || user?.email?.split('@')[0] || 'Student';
  const userKey = user?.id || userProfile?.email || 'default_student';
  const LIKED_STORAGE_KEY = `dsaverse_liked_posts_${userKey}`;

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(POSTS_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // fallback to default posts
      }
    }
    return mockCommunityPosts;
  });

  const [likedPostIds, setLikedPostIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LIKED_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTopic, setNewTopic] = useState('Arrays');

  // Persist community discussions whenever posts change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
      } catch {
        // ignore storage errors
      }
    }
  }, [posts]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify(likedPostIds));
      } catch {
        // ignore storage errors
      }
    }
  }, [likedPostIds, LIKED_STORAGE_KEY]);

  // 1 person can like a post only once (clicking again unlikes it)
  const handleLike = (id: string) => {
    const alreadyLiked = likedPostIds.includes(id);
    if (alreadyLiked) {
      setLikedPostIds((prev) => prev.filter((postId) => postId !== id));
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes: Math.max(0, p.likes - 1) } : p))
      );
    } else {
      setLikedPostIds((prev) => [...prev, id]);
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
      );
    }
  };

  const handleBookmark = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isBookmarked: !p.isBookmarked } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const cleanTitle = newTitle.replace(/[$#]/g, '').trim();
    const cleanContent = newContent.replace(/[$#]/g, '').trim();

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      author: displayName,
      authorAvatar:
        userProfile?.avatarUrl ||
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      authorRole: 'PICT Engineering Student',
      title: cleanTitle,
      content: cleanContent,
      topic: newTopic,
      tags: [newTopic, 'C++ Discussion'],
      likes: 0,
      commentsCount: 0,
      timeAgo: 'Just now',
    };

    setPosts((prev) => [newPost, ...prev]);
    setSearchQuery('');
    if (activeCategory !== 'All' && activeCategory.toLowerCase() !== newTopic.toLowerCase()) {
      setActiveCategory('All');
    }
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
  };

  const matchesTopicFilter = (post: CommunityPost, category: string) => {
    if (category === 'All') return true;
    return (
      post.topic.toLowerCase() === category.toLowerCase() ||
      post.tags.some((t) => t.toLowerCase() === category.toLowerCase())
    );
  };

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = matchesTopicFilter(p, activeCategory);
    return matchesSearch && matchesCategory;
  });

  const getTopicCount = (topicName: string) => {
    if (topicName === 'All') return posts.length;
    return posts.filter((p) => matchesTopicFilter(p, topicName)).length;
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-teal-500/15">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-text flex items-center">
            <Users className="w-8 h-8 mr-3 text-teal-600 dark:text-teal-400" />
            Engineering Student Forum
          </h1>
          <p className="text-xs sm:text-sm text-theme-text-muted mt-1">
            Browse all discussions together in All, or filter by individual DSA topics alongside it.
          </p>
        </div>

        <button
          onClick={() => {
            if (activeCategory !== 'All') setNewTopic(activeCategory);
            setShowNewPostModal(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold shadow-lg shadow-teal-600/30 transition-all flex items-center space-x-1.5 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion</span>
        </button>
      </div>

      {/* Topic-wise Segregation Bar ("All" + DSA Topic Sections) & Search */}
      <div className="p-4 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Topic Segregation</span>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-theme-text-muted absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts by title, content, or topic..."
              className="w-full bg-theme-card border border-theme-border rounded-xl pl-9 pr-3 py-2 text-xs text-theme-text placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* All + Topic-wise Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {communityTopics.map((topic) => {
            const count = getTopicCount(topic);
            const isActive = activeCategory === topic;
            return (
              <button
                key={topic}
                onClick={() => setActiveCategory(topic)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 border border-teal-400'
                    : 'bg-theme-card text-theme-text-muted border border-theme-border hover:border-teal-500/40 hover:text-theme-text'
                }`}
              >
                <span>{topic}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-teal-500/15 text-teal-700 dark:text-teal-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Section Heading */}
      <div className="flex items-center justify-between px-1">
        <div className="text-xs font-semibold text-theme-text-muted">
          Showing <span className="text-teal-700 dark:text-teal-400 font-bold">{activeCategory}</span> Discussions ({filteredPosts.length})
        </div>
        {activeCategory !== 'All' && (
          <button
            onClick={() => setActiveCategory('All')}
            className="text-xs text-teal-700 dark:text-teal-400 hover:underline font-medium"
          >
            View All Topics
          </button>
        )}
      </div>

      {/* Posts Stream */}
      {filteredPosts.length === 0 ? (
        <div className="p-10 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel text-center space-y-3">
          <p className="text-sm font-semibold text-theme-text">
            No discussions in "{activeCategory}" yet.
          </p>
          <p className="text-xs text-theme-text-muted">
            Start the first discussion for this topic or switch back to the All section.
          </p>
          <button
            onClick={() => {
              if (activeCategory !== 'All') setNewTopic(activeCategory);
              setShowNewPostModal(true);
            }}
            className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-500 transition-all"
          >
            Create Post in {activeCategory === 'All' ? 'Forum' : activeCategory}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map((post) => {
            const isLiked = likedPostIds.includes(post.id);
            return (
              <div
                key={post.id}
                className="p-6 rounded-2xl bg-theme-card border border-teal-500/20 glass-panel space-y-4 shadow-xl"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-9 h-9 rounded-full object-cover border border-teal-500/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-theme-text">{post.author}</h4>
                      <p className="text-[10px] text-theme-text-muted font-mono">{post.authorRole}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setActiveCategory(post.topic)}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/30 hover:bg-teal-500/25 transition-colors"
                    >
                      Topic: {post.topic}
                    </button>
                    <span className="text-[10px] text-theme-text-muted font-mono">{post.timeAgo}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-theme-text hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-theme-text-muted leading-relaxed font-sans">{post.content}</p>
                </div>

                {/* Clean Topic Tags (no # symbols) */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (communityTopics.includes(t)) {
                          setActiveCategory(t);
                        }
                      }}
                      className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20 hover:border-teal-400 transition-colors"
                    >
                      {t.replace(/[$#]/g, '')}
                    </button>
                  ))}
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-theme-border/80 flex items-center justify-between text-xs text-theme-text-muted">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleLike(post.id)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 transition-all cursor-pointer ${
                        isLiked
                          ? 'bg-teal-500/20 border-teal-500/50 text-teal-800 dark:text-teal-300 font-bold'
                          : 'border-theme-border hover:border-teal-500/40 hover:text-teal-700 dark:hover:text-teal-300'
                      }`}
                      title={isLiked ? 'You liked this post (click to remove like)' : 'Like this post (1 like per user)'}
                    >
                      <ThumbsUp className={`w-4 h-4 ${isLiked ? 'text-teal-600 dark:text-teal-400 fill-teal-400/30' : 'text-teal-600 dark:text-teal-400'}`} />
                      <span>{post.likes}</span>
                      <span className="text-[10px] ml-1">{isLiked ? 'Liked' : 'Like'}</span>
                    </button>
                    <div className="flex items-center space-x-1.5 text-theme-text-muted">
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{post.commentsCount} Comments</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookmark(post.id)}
                    className={`p-1.5 rounded-lg hover:border-theme-border transition-colors ${
                      post.isBookmarked ? 'text-amber-500 dark:text-amber-400' : 'text-theme-text-muted'
                    }`}
                    title="Bookmark discussion"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-theme-card border border-teal-500/30 rounded-3xl p-6 shadow-2xl glass-panel space-y-4">
            
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <h3 className="text-base font-bold text-theme-text flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400" /> Start Student Discussion
              </h3>
              <button
                type="button"
                onClick={() => setShowNewPostModal(false)}
                className="p-1 rounded-lg text-theme-text-muted hover:text-theme-text"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-theme-text-muted mb-1">Post Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. How to dry run recursive trees effectively?"
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-theme-text-muted mb-1">DSA Topic Section</label>
                <select
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500"
                >
                  {communityTopics
                    .filter((t) => t !== 'All')
                    .map((topicOption) => (
                      <option key={topicOption} value={topicOption}>
                        {topicOption}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-theme-text-muted mb-1">Post Content</label>
                <textarea
                  required
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share your questions, insights, or C++ tips with fellow students..."
                  className="w-full bg-theme-card border border-theme-border rounded-xl px-3 py-2 text-theme-text focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl border border-theme-border text-theme-text-muted font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold shadow-md"
                >
                  Publish Post
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
