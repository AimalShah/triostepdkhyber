import { useState } from 'react';
import type { Product } from '../../../data/shop.products';
import { REVIEWS } from '../../../data/shop.reviews';

export default function ProductReviews({ product }: { product: Product }) {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [showModal, setShowModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Filter reviews relevant to this product category or general
  const filteredReviews = reviewsList.filter(
    (r) => r.productCategory === product.category || r.rating >= 4
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      city: city.trim() || 'Verified Client',
      rating,
      date: 'Just now',
      title: title.trim() || 'Superb artisanal quality',
      content: content.trim(),
      productName: product.name,
      productCategory: product.category,
      size: 42,
      verified: true,
      helpfulCount: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setAuthorName('');
      setCity('');
      setTitle('');
      setContent('');
    }, 2000);
  };

  return (
    <section className="border-t border-gray-100 py-16 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-gray-100 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-gray-400 font-black block mb-2">
              Patina & Fit Verification
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-dark">
              Client <span className="text-gray-400">Reviews</span>
            </h2>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="self-start md:self-auto bg-dark text-white px-6 py-3.5 text-[10px] uppercase tracking-[0.25em] font-black hover:bg-black transition-all shadow-md"
          >
            Write a Review +
          </button>
        </div>

        {/* Rating Breakdown Summary Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 bg-[#FAFAFA] p-6 md:p-10 border border-gray-100 rounded-sm items-center">
          {/* Main Score */}
          <div className="lg:col-span-4 text-center lg:border-r border-gray-200 lg:pr-8">
            <span className="text-5xl md:text-6xl font-black text-dark tracking-tighter leading-none block">
              {product.rating.toFixed(1)}
            </span>
            <div className="flex text-amber-500 text-sm mt-2 justify-center gap-0.5">
              {'★★★★★'}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-2">
              Based on {product.reviews} Verified Customer Reviews
            </p>
          </div>

          {/* Star Distribution Progress Bars */}
          <div className="lg:col-span-5 space-y-2 text-[10px] font-bold uppercase tracking-wider text-dark">
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-400">5 Star</span>
              <div className="flex-1 h-2 bg-gray-200 overflow-hidden rounded-full">
                <div className="h-full bg-dark w-[88%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">88%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-400">4 Star</span>
              <div className="flex-1 h-2 bg-gray-200 overflow-hidden rounded-full">
                <div className="h-full bg-dark w-[10%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">10%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-400">3 Star</span>
              <div className="flex-1 h-2 bg-gray-200 overflow-hidden rounded-full">
                <div className="h-full bg-dark w-[2%]"></div>
              </div>
              <span className="w-8 text-right text-gray-500">2%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-12 text-gray-400">2 Star</span>
              <div className="flex-1 h-2 bg-gray-200 overflow-hidden rounded-full">
                <div className="h-full bg-dark w-[0%]"></div>
              </div>
              <span className="w-8 text-right text-gray-400">0%</span>
            </div>
          </div>

          {/* Quick Fit Satisfaction Stats */}
          <div className="lg:col-span-3 lg:border-l border-gray-200 lg:pl-8 space-y-3">
            <div>
              <p className="text-sm font-black text-dark">98% Fit Accuracy</p>
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Standard EU sizing</p>
            </div>
            <div>
              <p className="text-sm font-black text-dark">100% Genuine Leather</p>
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">Goodyear welt stitched</p>
            </div>
          </div>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-gray-100 p-6 md:p-8 hover:border-dark hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-amber-500 text-xs">
                  {'★'.repeat(rev.rating)}
                  {'☆'.repeat(5 - rev.rating)}
                </div>
                <span className="inline-flex items-center gap-1 text-[8px] uppercase tracking-widest font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Verified Buyer
                </span>
              </div>

              <h4 className="text-sm md:text-base font-bold text-dark mb-2">"{rev.title}"</h4>
              <p className="text-xs md:text-sm text-gray-600 font-light leading-relaxed mb-6">
                {rev.content}
              </p>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span className="font-bold text-dark">{rev.author} ({rev.city})</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Write a Review */}
        {showModal && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-dark/70 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <div className="relative bg-white w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-gray-100 rounded-sm z-10">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-400 block mb-1">
                    Atelier Feedback
                  </span>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-dark">
                    Review {product.name}
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-dark hover:text-white flex items-center justify-center text-xs transition-colors"
                >
                  ✕
                </button>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-dark uppercase tracking-tight mb-1">
                    Review Submitted Successfully
                  </h4>
                  <p className="text-xs text-gray-500">
                    Thank you for sharing your experience with the atelier community.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">
                      Your Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`text-xl transition-transform ${
                            star <= rating ? 'text-amber-500 scale-110' : 'text-gray-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        placeholder="e.g. Farhan Khan"
                        className="w-full border border-gray-200 px-3 py-2 text-xs font-medium outline-none focus:border-dark"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">
                        City / Region
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Islamabad"
                        className="w-full border border-gray-200 px-3 py-2 text-xs font-medium outline-none focus:border-dark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">
                      Headline / Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Incredible leather patina and comfortable fit"
                      className="w-full border border-gray-200 px-3 py-2 text-xs font-medium outline-none focus:border-dark"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block mb-1">
                      Your Review *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Describe the leather quality, fit, welt stitching, and break-in experience..."
                      className="w-full border border-gray-200 p-3 text-xs font-medium outline-none focus:border-dark resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-dark text-white py-3.5 text-[10px] uppercase tracking-[0.25em] font-black hover:bg-black transition-all shadow-md"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
