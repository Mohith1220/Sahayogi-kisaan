import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Forum as ForumComponent } from '../components/Forum';
import { useTheme } from '../hooks/useTheme';
import { motion } from 'framer-motion';
import type { ForumPost } from '../types';

const samplePosts: ForumPost[] = [
  {
    id: '1',
    userId: '1',
    title: 'Best practices for organic farming',
    content: 'I would like to share my experience with organic farming techniques...',
    createdAt: new Date().toISOString(),
    userName: 'Ramesh Kumar',
    likes: 15,
    comments: [
      {
        id: '1',
        postId: '1',
        userId: '2',
        content: 'Thank you for sharing! This is very helpful.',
        createdAt: new Date().toISOString(),
        userName: 'Suresh M'
      }
    ],
    tags: ['organic', 'farming']
  }
];

export function Forum() {
  const { isDark } = useTheme();
  const [posts, setPosts] = useState<ForumPost[]>(samplePosts);

  const handleCreatePost = async (title: string, content: string) => {
    const newPost: ForumPost = {
      id: Date.now().toString(),
      userId: 'current-user',
      title,
      content,
      createdAt: new Date().toISOString(),
      userName: 'Current User',
      likes: 0,
      comments: [],
      tags: []
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = async (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = async (postId: string, content: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now().toString(),
          postId,
          userId: 'current-user',
          content,
          createdAt: new Date().toISOString(),
          userName: 'Current User'
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <ForumComponent
            posts={posts}
            onCreatePost={handleCreatePost}
            onLike={handleLike}
            onComment={handleComment}
          />
        </motion.main>

        <footer className="bg-green-800 dark:bg-green-900 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2024 Sahayogi Kishan</p>
          </div>
        </footer>
      </div>
    </div>
  );
}