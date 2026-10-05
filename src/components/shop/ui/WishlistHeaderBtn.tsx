import { useEffect, useState } from 'react';
import { useShopStore } from '../../../store/shop.store';

export default function WishlistHeaderBtn() {
  const [mounted, setMounted] = useState(false);
  const wishlist = useShopStore((state) => state.wishlist);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? wishlist.length : 0;

  return (
    <a
      href="/wishlist"
      aria-label={`Wishlist (${count} saved)`}
      className="relative text-dark hover:text-gray-500 transition-colors p-1.5 flex items-center justify-center group"
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
          count > 0 ? 'fill-dark text-dark' : 'fill-none text-dark stroke-current'
        }`}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 21C12 21 3 14.5 3 8.5C3 5.46 5.46 3 8.5 3C10.24 3 11.91 3.81 13 5.09C14.09 3.81 15.76 3 17.5 3C20.54 3 23 5.46 23 8.5C23 14.5 14 21 12 21Z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-dark text-white text-[9px] font-black flex items-center justify-center animate-fade-in shadow-sm">
          {count}
        </span>
      )}
    </a>
  );
}
