import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Society } from '../types';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface ReviewModalProps {
  society: Society;
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: () => void;
}

export function ReviewModal({ society, isOpen, onClose, onReviewSubmitted }: ReviewModalProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            society_id: society.id,
            rating,
            comment,
          }
        ]);

      if (error) throw error;

      toast.success(t('reviews.submitSuccess'));
      onReviewSubmitted();
      onClose();
    } catch (error) {
      toast.error(t('reviews.submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{t('reviews.writeReview')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('reviews.rating')}
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${
                      value <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('reviews.comment')}
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting || rating === 0}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
          >
            {submitting ? t('common.submitting') : t('reviews.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}