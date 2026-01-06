import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Eye, Share2, ThumbsUp, MessageCircle, Heart } from 'lucide-react';
import { ViewState, NewsItem } from '../types';

interface NewsArticleProps {
  article: NewsItem;
  onNavigate: (view: ViewState) => void | (() => void);
  onBack?: () => void;
}

const NewsArticle: React.FC<NewsArticleProps> = ({ article, onNavigate, onBack }) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(1100);

  // Parse content as array of paragraphs
  const contentParagraphs = Array.isArray(article.content) 
    ? article.content 
    : article.content.split('\n\n').filter(p => p.trim());

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      onNavigate('NEWS');
    }
  };

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      // Fallback: copy to clipboard
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert('Article link copied to clipboard!');
      }).catch(() => {
        alert('Could not copy link. Please try again.');
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-black text-sm transition-colors"
          >
            <ArrowLeft size={20} /> Back to News
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 rounded-lg transition-all ${liked ? 'bg-red-100 dark:bg-red-900/30' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Heart size={20} className={liked ? 'text-red-600' : 'text-slate-600 dark:text-slate-400'} fill={liked ? 'currentColor' : 'none'} />
            </button>
        <button
            onClick={handleShare}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            <Share2 size={20} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400" />
          </button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30">
            <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{article.category}</span>
          </div>

          {/* Title */}
          <h1 className="heading-serif text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
            {article.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-6 md:gap-8 text-slate-600 dark:text-slate-400 font-medium mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-emerald-600 flex items-center justify-center text-white font-black text-sm">
                {article.author[0]}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">By {article.author}</div>
                <div className="text-xs text-slate-500 dark:text-slate-500">Staff Writer</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={18} />
              <span>{article.views || 1200} views</span>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 md:h-[500px] object-cover"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose dark:prose-invert max-w-none mb-16"
        >
          {typeof article.content === 'string' ? (
            contentParagraphs.map((paragraph: string, index: number) => (
              <p
                key={index}
                className="text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-relaxed mb-8 font-light"
              >
                {paragraph}
              </p>
            ))
          ) : Array.isArray(article.content) ? (
            (article.content as any[]).map((section: any, index: number) => (
              <div key={index} className="mb-10">
                {section.heading && (
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 mt-8">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs && section.paragraphs.map((para: string, pidx: number) => (
                  <p
                    key={pidx}
                    className="text-slate-700 dark:text-slate-300 text-lg md:text-xl leading-relaxed mb-6 font-light"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))
          ) : null}
        </motion.div>

        {/* Engagement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-indigo-50 dark:from-indigo-900/20 to-emerald-50 dark:to-emerald-900/20 rounded-3xl p-8 md:p-12 border border-indigo-200 dark:border-indigo-900/30"
        >
          <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Did you find this helpful?</h3>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 ${liked ? 'bg-red-600 text-white shadow-lg' : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:shadow-lg'}`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              {liked ? 'Liked' : 'Like'} ({(likeCount / 1000).toFixed(1)}K)
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:shadow-lg transition-all transform hover:scale-105 active:scale-95">
              <MessageCircle size={20} />
              Comment (43)
            </button>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>

          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Help us improve by sharing your thoughts. Have a story related to this topic? We'd love to hear it!
          </p>
        </motion.div>

        {/* Related Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800"
        >
          <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">More from {article.category}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Breaking: New Scholarship Program Launched',
                excerpt: 'The foundation announces a $25M initiative targeting underrepresented communities.',
                date: '2026-01-14'
              },
              {
                title: 'Scholar Spotlight: From Homelessness to Harvard',
                excerpt: 'Meet Marcus, whose determination led him to academic excellence and a full scholarship.',
                date: '2026-01-12'
              }
            ].map((related, idx) => (
              <button
                key={idx}
                onClick={() => {}}
                className="group text-left p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-all"
              >
                <h4 className="font-black text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-2 line-clamp-2">
                  {related.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                  {related.excerpt}
                </p>
                <div className="text-xs text-slate-500 dark:text-slate-500">
                  {new Date(related.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-black mb-4">Ready to Make a Difference?</h3>
          <p className="text-indigo-100 mb-8 text-lg">Join thousands of scholars and supporters in our mission to provide access to education.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('APPLY')}
              className="px-8 py-4 bg-white text-indigo-600 font-black rounded-xl hover:bg-slate-100 transition-all shadow-lg"
            >
              Apply Now
            </button>
            <button
              onClick={() => onNavigate('DONATE')}
              className="px-8 py-4 border-2 border-white text-white font-black rounded-xl hover:bg-white/10 transition-all"
            >
              Make a Donation
            </button>
          </div>
        </motion.div>
      </article>
    </div>
  );
};

export default NewsArticle;
