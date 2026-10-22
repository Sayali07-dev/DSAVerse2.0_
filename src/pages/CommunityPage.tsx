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
<<<<<<< HEAD
  Layers 
=======
  Layers,
  Send,
  ChevronDown,
  CheckCircle2,
  Loader2,
  Database
>>>>>>> ecbfa17 (DSAverse)
} from 'lucide-react';
import { mockCommunityPosts, communityTopics } from '../data/dsaData';
import type { CommunityPost } from '../data/dsaData';
import { useAuth } from '../context/AuthContext';

<<<<<<< HEAD
=======
export interface CommunityComment {
  id: string;
  postId: string;
  author: string;
  authorAvatar: string;
  authorRole: string;
  content: string;
  createdAt?: string;
  timeAgo: string;
  likes: number;
}

>>>>>>> ecbfa17 (DSAverse)
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

<<<<<<< HEAD
=======
  // Backend comments state
  const [commentsByPost, setCommentsByPost] = useState<Record<string, CommunityComment[]>>({});
  const [expandedPostIds, setExpandedPostIds] = useState<string[]>([]);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [submittingCommentPostId, setSubmittingCommentPostId] = useState<string | null>(null);
  const [savedSuccessPostId, setSavedSuccessPostId] = useState<string | null>(null);

  // Load comments from backend on mount
  useEffect(() => {
    let isMounted = true;
    const fetchBackendComments = async () => {
      try {
        const res = await fetch('/api/community/comments');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.comments)) {
            const grouped: Record<string, CommunityComment[]> = {};
            data.comments.forEach((c: CommunityComment) => {
              if (!grouped[c.postId]) grouped[c.postId] = [];
              grouped[c.postId].push(c);
            });
            if (isMounted) {
              setCommentsByPost(grouped);
              // Synchronize post commentsCount with backend count
              setPosts((prevPosts) =>
                prevPosts.map((p) => {
                  const count = grouped[p.id]?.length;
                  return count !== undefined ? { ...p, commentsCount: Math.max(p.commentsCount, count) } : p;
                })
              );
            }
          }
        }
      } catch (err) {
        console.warn('Could not connect to backend comments API, using cached state', err);
      }
    };

    fetchBackendComments();
    return () => {
      isMounted = false;
    };
  }, []);

>>>>>>> ecbfa17 (DSAverse)
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

<<<<<<< HEAD
=======
  const handleToggleComments = (postId: string) => {
    setExpandedPostIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  const handleCommentChange = (postId: string, text: string) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: text }));
  };

  const handleAddComment = async (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const content = (commentInputs[postId] || '').trim();
    if (!content) return;

    setSubmittingCommentPostId(postId);

    const payload = {
      postId,
      content,
      author: displayName,
      authorRole: 'PICT Engineering Student',
      authorAvatar:
        userProfile?.avatarUrl ||
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    };

    try {
      const res = await fetch('/api/community/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.comment) {
          // Append comment to state for this post
          setCommentsByPost((prev) => ({
            ...prev,
            [postId]: [...(prev[postId] || []), data.comment],
          }));

          // Update comment count on post
          setPosts((prev) =>
            prev.map((p) =>
              p.id === postId ? { ...p, commentsCount: data.commentsCount || ((p.commentsCount || 0) + 1) } : p
            )
          );

          // Clear input and show success notification
          setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
          setSavedSuccessPostId(postId);
          setTimeout(() => setSavedSuccessPostId(null), 3500);
        }
      } else {
        throw new Error('Failed to save comment to backend');
      }
    } catch (err) {
      console.error('Error saving comment to backend, falling back to local state:', err);
      // Fallback local save so student contribution is never lost
      const fallbackComment: CommunityComment = {
        id: `comment-fallback-${Date.now()}`,
        postId,
        author: displayName,
        authorRole: 'PICT Engineering Student',
        authorAvatar: payload.authorAvatar,
        content,
        createdAt: new Date().toISOString(),
        timeAgo: 'Just now',
        likes: 0,
      };
      setCommentsByPost((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), fallbackComment],
      }));
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p
        )
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      setSavedSuccessPostId(postId);
      setTimeout(() => setSavedSuccessPostId(null), 3500);
    } finally {
      setSubmittingCommentPostId(null);
    }
  };

  const handleLikeComment = async (commentId: string, postId: string) => {
    setCommentsByPost((prev) => ({
      ...prev,
      [postId]: (prev[postId] || []).map((c) =>
        c.id === commentId ? { ...c, likes: (c.likes || 0) + 1 } : c
      ),
    }));

    try {
      await fetch(`/api/community/comments/${commentId}/like`, { method: 'POST' });
    } catch {
      // ignore
    }
  };

>>>>>>> ecbfa17 (DSAverse)
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
<<<<<<< HEAD
=======
            const postComments = commentsByPost[post.id] || [];
            const isCommentsExpanded = expandedPostIds.includes(post.id);
            const isSubmittingComment = submittingCommentPostId === post.id;
            const isSavedNotice = savedSuccessPostId === post.id;

>>>>>>> ecbfa17 (DSAverse)
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
<<<<<<< HEAD
                  <div className="flex items-center space-x-4">
=======
                  <div className="flex items-center space-x-3">
>>>>>>> ecbfa17 (DSAverse)
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
<<<<<<< HEAD
                    <div className="flex items-center space-x-1.5 text-theme-text-muted">
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{post.commentsCount} Comments</span>
                    </div>
=======

                    <button
                      type="button"
                      onClick={() => handleToggleComments(post.id)}
                      className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 transition-all cursor-pointer ${
                        isCommentsExpanded
                          ? 'bg-blue-500/15 border-blue-500/40 text-blue-700 dark:text-blue-300 font-bold'
                          : 'border-theme-border hover:border-blue-500/40 hover:text-blue-700 dark:hover:text-blue-300'
                      }`}
                      title="View or add replies to this discussion"
                    >
                      <MessageSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span>{postComments.length > 0 ? postComments.length : post.commentsCount} Comments</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCommentsExpanded ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
                    </button>
>>>>>>> ecbfa17 (DSAverse)
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
<<<<<<< HEAD
=======

                {/* Expandable Comments Section (Saved directly to backend) */}
                {isCommentsExpanded && (
                  <div className="mt-4 pt-4 border-t border-theme-border/60 space-y-4 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-bold text-theme-text">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Discussion Replies ({postComments.length})</span>
                      </div>
                      <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                        <Database className="w-3 h-3 mr-1 text-emerald-600 dark:text-emerald-400" />
                        Saved to Backend
                      </span>
                    </div>

                    {/* Backend saved success notice */}
                    {isSavedNotice && (
                      <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>Your comment was successfully saved to the backend!</span>
                      </div>
                    )}

                    {/* Existing Comments List */}
                    {postComments.length === 0 ? (
                      <div className="p-4 rounded-xl bg-theme-bg/50 border border-theme-border text-center text-xs text-theme-text-muted">
                        No replies yet. Be the first engineering student to share your thoughts!
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        {postComments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3 rounded-xl bg-theme-bg/60 border border-theme-border space-y-1.5 hover:border-theme-border transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <img
                                  src={comment.authorAvatar}
                                  alt={comment.author}
                                  className="w-6 h-6 rounded-full object-cover border border-teal-500/30"
                                />
                                <div>
                                  <span className="text-xs font-bold text-theme-text mr-2">
                                    {comment.author}
                                  </span>
                                  <span className="text-[10px] text-theme-text-muted font-mono">
                                    {comment.authorRole}
                                  </span>
                                </div>
                              </div>
                              <span className="text-[10px] text-theme-text-muted font-mono">
                                {comment.timeAgo}
                              </span>
                            </div>
                            <p className="text-xs text-theme-text leading-relaxed pl-8">
                              {comment.content}
                            </p>
                            <div className="pl-8 pt-1 flex items-center space-x-3 text-[11px] text-theme-text-muted">
                              <button
                                type="button"
                                onClick={() => handleLikeComment(comment.id, post.id)}
                                className="flex items-center space-x-1 hover:text-teal-600 dark:hover:text-teal-400 transition-colors cursor-pointer"
                              >
                                <ThumbsUp className="w-3 h-3" />
                                <span>{comment.likes || 0}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment Input Form */}
                    <form
                      onSubmit={(e) => handleAddComment(post.id, e)}
                      className="flex flex-col sm:flex-row items-stretch gap-2 pt-1"
                    >
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        placeholder="Write a reply or helpful tip (persisted to backend)..."
                        className="flex-1 bg-theme-bg border border-theme-border rounded-xl px-3.5 py-2 text-xs text-theme-text placeholder-slate-500 focus:outline-none focus:border-blue-500"
                        disabled={isSubmittingComment}
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingComment || !(commentInputs[post.id] || '').trim()}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer shrink-0"
                      >
                        {isSubmittingComment ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Post Reply</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                )}
>>>>>>> ecbfa17 (DSAverse)
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
