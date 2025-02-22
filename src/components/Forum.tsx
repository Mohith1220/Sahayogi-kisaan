import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ForumPost } from '../types';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';

interface ForumProps {
  posts: ForumPost[];
  onCreatePost: (title: string, content: string) => Promise<void>;
  onLike: (postId: string) => Promise<void>;
  onComment: (postId: string, content: string) => Promise<void>;
}

export function Forum({ posts, onCreatePost, onLike, onComment }: ForumProps) {
  const { t } = useTranslation();
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    await onCreatePost(newPostTitle, newPostContent);
    setNewPostTitle('');
    setNewPostContent('');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">{t('forum.title')}</h2>

      <form onSubmit={handleSubmitPost} className="mb-8 bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('forum.postTitle')}
          </label>
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('forum.postContent')}
          </label>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          {t('forum.submit')}
        </button>
      </form>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
              <span>{post.userName}</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
              </div>
            </div>

            <div className="prose max-w-none mb-4">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => onLike(post.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
              >
                <ThumbsUp className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={() => setSelectedPost(post)}
                className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments.length}</span>
              </button>
            </div>

            {selectedPost?.id === post.id && (
              <div className="mt-4 space-y-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium">{comment.userName}</span>
                      <span className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(comment.createdAt))} ago
                      </span>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                ))}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const input = form.elements.namedItem('comment') as HTMLTextAreaElement;
                    onComment(post.id, input.value);
                    input.value = '';
                  }}
                  className="mt-4"
                >
                  <textarea
                    name="comment"
                    className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                    rows={2}
                    placeholder={t('forum.writeComment')}
                    required
                  />
                  <button
                    type="submit"
                    className="mt-2 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition-colors"
                  >
                    {t('forum.submitComment')}
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}