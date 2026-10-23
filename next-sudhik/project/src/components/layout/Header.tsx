
// 'use client';

// import { useEffect, useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Menu, X, User as UserIcon, ShoppingBag } from 'lucide-react';
// import Image from 'next/image';
// import { useAuth } from '@/lib/auth-context';
// import { useCart } from '@/lib/cart-context';

// type NavLink = { label: string; href: string; section?: string };

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isOnDark, setIsOnDark] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();
//   const { user } = useAuth();
//   const { itemCount } = useCart();
//   const headerHeightRef = useRef(80);

//   const navLinks: NavLink[] = [
//     { label: 'The Product', href: '/products/shuddhik-temple-sacred-surface-cleaner' },
//     { label: 'Philosophy', href: '/', section: 'philosophy' },
//     { label: 'Sacred Uses', href: '/', section: 'uses' },
//     { label: 'Blog', href: '/blog' },
//     { label: 'Product Information', href: '/product', section: 'reviews' },
//   ];

//   const leftLinks = navLinks.slice(0, Math.ceil(navLinks.length / 2));
//   const rightLinks = navLinks.slice(Math.ceil(navLinks.length / 2));

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   // Detect which section is currently sitting under the header and read its
//   // data-header-theme attribute ("dark" | "light"). Default is "light" (black text).
//   useEffect(() => {
//     const sections = Array.from(
//       document.querySelectorAll<HTMLElement>('[data-header-theme]')
//     );
//     if (sections.length === 0) {
//       setIsOnDark(false);
//       return;
//     }

//     const checkTheme = () => {
//       const probeY = headerHeightRef.current / 2; // point just under the header
//       let current: HTMLElement | null = null;
//       for (const el of sections) {
//         const rect = el.getBoundingClientRect();
//         if (rect.top <= probeY && rect.bottom > probeY) {
//           current = el;
//           break;
//         }
//       }
//       setIsOnDark(current?.dataset.headerTheme === 'dark');
//     };

//     checkTheme();
//     window.addEventListener('scroll', checkTheme, { passive: true });
//     window.addEventListener('resize', checkTheme);
//     return () => {
//       window.removeEventListener('scroll', checkTheme);
//       window.removeEventListener('resize', checkTheme);
//     };
//   }, [pathname]);

//   // Light (white) text only when header is transparent (not scrolled) AND over a dark section.
//   const isLight = isOnDark && !scrolled;

//   const goSection = (link: NavLink) => {
//     setMobileOpen(false);
//     if (link.section) {
//       if (pathname !== link.href) {
//         router.push(link.href);
//         setTimeout(() => {
//           document.getElementById(link.section!)?.scrollIntoView({ behavior: 'smooth' });
//         }, 400);
//       } else {
//         document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth' });
//       }
//     } else {
//       router.push(link.href);
//     }
//   };

//   const NavButton = ({ l }: { l: NavLink }) => (
//     <button
//       onClick={() => goSection(l)}
//       className={`relative font-sans text-md font-medium transition-colors duration-300 group whitespace-nowrap ${
//         isLight ? 'text-white hover:text-saffron-300' : 'text-black hover:text-saffron-500'
//       }`}
//     >
//       {l.label}
//       <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-line group-hover:w-full transition-all duration-500" />
//     </button>
//   );

//   const ProfileIcon = ({ size = 20 }: { size?: number }) => {
//     const initial = user?.name?.charAt(0)?.toUpperCase();
//     return (
//       <Link
//         href="/profile"
//         aria-label="My Profile"
//         onClick={() => setMobileOpen(false)}
//         className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-display text-sm shadow-gold hover:shadow-glow transition-all shrink-0"
//       >
//         {initial || <UserIcon size={size - 4} />}
//       </Link>
//     );
//   };

//   const CartIcon = () => (
//     <Link
//       href="/cart"
//       aria-label={`Cart, ${itemCount} items`}
//       onClick={() => setMobileOpen(false)}
//       className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
//         isLight ? 'text-white hover:text-saffron-300' : 'text-ink hover:text-saffron-500'
//       }`}
//     >
//       <ShoppingBag size={20} />
//       {itemCount > 0 && (
//         <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron-500 px-1 font-sans text-[10px] font-medium text-ivory">
//           {itemCount}
//         </span>
//       )}
//     </Link>
//   );

//   return (
//     <>
//       <motion.header
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? 'bg-ivory/85 backdrop-blur-xl border-b border-gold-400/20 py-3'
//             : 'bg-transparent py-5'
//         }`}
//       >
//         <div className="mx-auto max-w-7xl px-5 sm:px-8">
//           {/* Mobile / tablet layout: logo left, profile + cart + menu button right */}
//           <div className="flex lg:hidden items-center justify-between">
//             <Link href="/" className="flex items-center gap-2.5 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//               <span className="flex flex-col leading-none">
//                 <Image src="/assets/logo.png" height={50} width={50} alt="logo" />
//               </span>
//             </Link>
//             <div className="flex items-center gap-3">
//               {user ? (
//                 <ProfileIcon />
//               ) : (
//                 <Link
//                   href="/auth/login"
//                   aria-label="Login"
//                   className={`flex items-center justify-center w-9 h-9 rounded-full transition-all shrink-0 ${
//                     isLight ? 'bg-white/10 text-white hover:text-saffron-300' : 'bg-gold-400/10 text-ink hover:text-saffron-500'
//                   }`}
//                 >
//                   <UserIcon size={18} />
//                 </Link>
//               )}
//               <CartIcon />
//               <button
//                 onClick={() => setMobileOpen(true)}
//                 aria-label="Open menu"
//                 className={`p-2.5 rounded-full transition-colors ${
//                   isLight ? 'hover:bg-white/10 text-white' : 'hover:bg-gold-400/10 text-ink'
//                 }`}
//               >
//                 <Menu size={20} />
//               </button>
//             </div>
//           </div>

//           {/* Desktop layout: nav left, logo centered, nav + profile + cart right */}
//           <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-6">
//             <nav className="flex items-center gap-9 justify-start">
//               {leftLinks.map((l) => (
//                 <NavButton key={l.label} l={l} />
//               ))}
//             </nav>

//             <Link href="/" className="flex items-center justify-center group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//               <Image src="/assets/logo.png" height={50} width={50} alt="logo" />
//             </Link>

//             <div className="flex items-center justify-end gap-9">
//               <nav className="flex items-center gap-9">
//                 {rightLinks.map((l) => (
//                   <NavButton key={l.label} l={l} />
//                 ))}
//               </nav>
//               <div className="flex items-center gap-4">
//                 {user ? (
//                   <ProfileIcon />
//                 ) : (
//                   <Link
//                     href="/auth/login"
//                     className={`flex items-center gap-1.5 font-sans text-sm font-medium transition-colors duration-300 ${
//                       isLight ? 'text-white hover:text-saffron-300' : 'text-black hover:text-saffron-500'
//                     }`}
//                   >
//                     <UserIcon size={18} />
//                     <span>Login</span>
//                   </Link>
//                 )}
//                 <CartIcon />
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.header>

//       <AnimatePresence>
//         {mobileOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMobileOpen(false)}
//               className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
//             />
//             <motion.aside
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'spring', stiffness: 300, damping: 32 }}
//               className="fixed right-0 top-0 bottom-0 z-50 w-[80%] max-w-sm bg-ivory shadow-premium lg:hidden flex flex-col"
//             >
//               <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
//                 <span className="font-royal tracking-royal-sm text-ink font-bold">SHUDDHIK™</span>
//                 <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-full hover:bg-gold-400/10">
//                   <X size={20} className="text-ink" />
//                 </button>
//               </div>

//               {user ? (
//                 <Link
//                   href="/profile"
//                   onClick={() => setMobileOpen(false)}
//                   className="flex items-center gap-3 mx-6 mt-6 p-3 rounded-xl bg-gold-50 border border-gold-400/20 hover:bg-gold-100/60 transition-colors"
//                 >
//                   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-display text-sm flex items-center justify-center shrink-0">
//                     {user.name?.charAt(0)?.toUpperCase() || <UserIcon size={16} />}
//                   </div>
//                   <div className="min-w-0">
//                     <p className="font-serif text-sm text-ink truncate">{user.name}</p>
//                     <p className="font-sans text-xs text-ink/45">View Profile</p>
//                   </div>
//                 </Link>
//               ) : (
//                 <div className="mx-6 mt-6">
//                   <Link
//                     href="/auth/login"
//                     onClick={() => setMobileOpen(false)}
//                     className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-saffron-500 text-saffron-600 hover:bg-saffron-50 transition-colors font-sans text-sm font-medium"
//                   >
//                     <UserIcon size={16} />
//                     <span>Login / Sign Up</span>
//                   </Link>
//                 </div>
//               )}

//               <nav className="flex flex-col p-6 gap-1">
//                 {navLinks.map((l, i) => (
//                   <motion.button
//                     key={l.label}
//                     onClick={() => goSection(l)}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 + i * 0.07 }}
//                     className="text-left py-3.5 font-serif text-xl text-ink/80 hover:text-saffron-500 border-b border-gold-400/10 transition-colors"
//                   >
//                     {l.label}
//                   </motion.button>
//                 ))}
//               </nav>
//               <div className="mt-auto p-6 border-t border-gold-400/20">
//                 <p className="font-deva text-2xl text-saffron-500/70">ॐ शान्तिः</p>
//                 <p className="font-serif text-sm text-ink/50 mt-1">May your space remain pure.</p>
//               </div>
//             </motion.aside>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, User as UserIcon, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/lib/cart-context';

type NavLink = { label: string; hi: string; href: string; section?: string };
type HeaderUser = { name?: string } | null | undefined;

const NAV_LINKS: NavLink[] = [
  { label: 'The Product', hi: 'उत्पाद', href: '/products/shuddhik-temple-sacred-surface-cleaner' },
  { label: 'Philosophy', hi: 'दर्शन', href: '/', section: 'philosophy' },
  { label: 'Sacred Uses', hi: 'पवित्र उपयोग', href: '/', section: 'uses' },
  { label: 'Blog', hi: 'ब्लॉग', href: '/blog' },
  { label: 'Product Information', hi: 'जानकारी', href: '/product', section: 'reviews' },
];

const HEADER_HEIGHT = 80;
const SPLIT = Math.ceil(NAV_LINKS.length / 2);
const LEFT_LINKS = NAV_LINKS.slice(0, SPLIT);
const RIGHT_LINKS = NAV_LINKS.slice(SPLIT);

const hrefFor = (l: NavLink) => (l.section ? `${l.href}#${l.section}` : l.href);

/* ------------------------------------------------------------------ */
/*  Small pieces (outside Header so they don't remount on scroll)      */
/* ------------------------------------------------------------------ */

function NavItem({
  link,
  light,
  showDot,
  active,
  onHover,
  onNavigate,
}: {
  link: NavLink;
  light: boolean;
  showDot: boolean;
  active: boolean;
  onHover: (label: string | null) => void;
  onNavigate: (e: React.MouseEvent, link: NavLink) => void;
}) {
  return (
    <Link
      href={hrefFor(link)}
      onClick={(e) => onNavigate(e, link)}
      onMouseEnter={() => onHover(link.label)}
      onFocus={() => onHover(link.label)}
      onBlur={() => onHover(null)}
      aria-current={active ? 'page' : undefined}
      className={`relative whitespace-nowrap rounded-sm py-1 font-sans text-[15px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-4 ${
        light ? 'text-white hover:text-saffron-300' : 'text-black hover:text-saffron-600'
      }`}
    >
      {link.label}
      {/* A tiny "diya flame" that glides between links */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 -bottom-2 flex justify-center">
        {showDot && (
          <motion.span
            layoutId="nav-flame"
            transition={{ type: 'spring', stiffness: 500, damping: 34 }}
            className="h-1.5 w-1.5 rounded-full bg-saffron-500 shadow-[0_0_10px_3px_rgba(255,166,64,0.65)]"
          />
        )}
      </span>
    </Link>
  );
}

function ProfileIcon({ user, onClick }: { user: HeaderUser; onClick: () => void }) {
  const initial = user?.name?.charAt(0)?.toUpperCase();
  return (
    <Link
      href="/profile"
      aria-label="My profile"
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 font-display text-sm text-ivory shadow-gold transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2"
    >
      {initial || <UserIcon size={16} />}
    </Link>
  );
}

function CartIcon({ count, light, onClick }: { count: number; light: boolean; onClick: () => void }) {
  return (
    <Link
      href="/cart"
      aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
      onClick={onClick}
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 ${
        light
          ? 'border-white/40 text-white hover:bg-white/10'
          : 'border-ink/15 text-ink hover:border-saffron-500/60 hover:bg-saffron-50'
      }`}
    >
      <ShoppingBag size={17} />
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 1.7 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 18 }}
          className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron-500 px-1 font-sans text-[10px] font-medium text-ivory"
        >
          {count > 9 ? '9+' : count}
        </motion.span>
      )}
    </Link>
  );
}

function Logo({ scrolled, onClick }: { scrolled: boolean; onClick: () => void }) {
  return (
    <Link href="/" aria-label="Shuddhik home" onClick={onClick} className="flex items-center justify-center">
      <Image
        src="/assets/logo.png"
        width={64}
        height={64}
        alt="Shuddhik"
        priority
        className={`object-contain transition-all duration-500 ${
          scrolled ? 'h-10 w-10' : 'h-12 w-12 lg:h-14 lg:w-14'
        }`}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOnDark, setIsOnDark] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const { user } = useAuth();
  const { itemCount } = useCart();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 40);
      const probeY = HEADER_HEIGHT / 2;
      const sections = document.querySelectorAll<HTMLElement>('[data-header-theme]');
      let dark = false;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          dark = sections[i].dataset.headerTheme === 'dark';
          break;
        }
      }
      setIsOnDark(dark);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  // White text only while the bar is transparent AND over a dark section.
  const isLight = isOnDark && !scrolled;

  const closeMobile = () => setMobileOpen(false);

  const handleNavigate = (e: React.MouseEvent, link: NavLink) => {
    setMobileOpen(false);
    if (link.section && pathname === link.href) {
      e.preventDefault();
      document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth' });
      window.history.replaceState(null, '', `#${link.section}`);
    }
  };

  const isActive = (l: NavLink) => !l.section && (pathname === l.href || pathname.startsWith(`${l.href}/`));
  const activeLabel = NAV_LINKS.find(isActive)?.label ?? null;
  const flameTarget = hovered ?? activeLabel;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 px-3 transition-all duration-500 sm:px-6 ${
          scrolled ? 'pt-3' : 'pt-2'
        }`}
      >
        {/* Full-width & transparent at the top → floating ivory pill once you scroll */}
        <div
          className={`mx-auto border transition-all duration-500 ease-out ${
            scrolled
              ? 'max-w-6xl rounded-full border-gold-400/30 bg-ivory/85 px-5 py-2 shadow-[0_10px_40px_-12px_rgba(120,60,10,0.28)] backdrop-blur-xl sm:px-8'
              : 'max-w-7xl rounded-full border-transparent bg-transparent px-5 py-3 sm:px-8'
          }`}
        >
          {/* Mobile / tablet */}
          <div className="flex items-center justify-between lg:hidden">
            <Logo scrolled={scrolled} onClick={scrollTop} />
            <div className="flex items-center gap-2.5">
              {user ? (
                <ProfileIcon user={user} onClick={closeMobile} />
              ) : (
                <Link
                  href="/auth/login"
                  aria-label="Login"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isLight
                      ? 'border-white/40 text-white hover:bg-white/10'
                      : 'border-ink/15 text-ink hover:border-saffron-500/60 hover:bg-saffron-50'
                  }`}
                >
                  <UserIcon size={17} />
                </Link>
              )}
              <CartIcon count={itemCount} light={isLight} onClick={closeMobile} />
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                  isLight ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-gold-400/15'
                }`}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>

          {/* Desktop: nav | logo | nav + actions */}
          <div className="hidden grid-cols-[1fr_auto_1fr] items-center gap-6 lg:grid">
            <nav aria-label="Primary" onMouseLeave={() => setHovered(null)} className="flex items-center justify-start gap-9">
              {LEFT_LINKS.map((l) => (
                <NavItem
                  key={l.label}
                  link={l}
                  light={isLight}
                  showDot={flameTarget === l.label}
                  active={isActive(l)}
                  onHover={setHovered}
                  onNavigate={handleNavigate}
                />
              ))}
            </nav>

            <Logo scrolled={scrolled} onClick={scrollTop} />

            <div className="flex items-center justify-end gap-8">
              <nav aria-label="Secondary" onMouseLeave={() => setHovered(null)} className="flex items-center gap-9">
                {RIGHT_LINKS.map((l) => (
                  <NavItem
                    key={l.label}
                    link={l}
                    light={isLight}
                    showDot={flameTarget === l.label}
                    active={isActive(l)}
                    onHover={setHovered}
                    onNavigate={handleNavigate}
                  />
                ))}
              </nav>
              <div className="flex items-center gap-3">
                {user ? (
                  <ProfileIcon user={user} onClick={closeMobile} />
                ) : (
                  <Link
                    href="/auth/login"
                    className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-sans text-sm font-medium transition-colors duration-300 ${
                      isLight
                        ? 'border-white/40 text-white hover:bg-white/10'
                        : 'border-ink/15 text-black hover:border-saffron-500/60 hover:bg-saffron-50'
                    }`}
                  >
                    <UserIcon size={16} />
                    <span>Login</span>
                  </Link>
                )}
                <CartIcon count={itemCount} light={isLight} onClick={closeMobile} />
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ---------------- Mobile drawer ---------------- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-[86%] max-w-sm flex-col overflow-hidden bg-ivory shadow-premium lg:hidden"
            >
              {/* soft saffron wash + giant faint Om as a watermark */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-saffron-500/10 to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-10 -right-6 select-none font-deva text-[16rem] leading-none text-saffron-500/[0.06]"
              >
                ॐ
              </span>

              <div className="relative flex items-center justify-between border-b border-gold-400/20 p-5">
                <div className="flex items-center gap-3">
                  <Image src="/assets/logo.png" width={40} height={40} alt="" className="h-10 w-10 object-contain" />
                  <span className="font-royal font-bold tracking-royal-sm text-ink">SHUDDHIK™</span>
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={closeMobile}
                  aria-label="Close menu"
                  className="rounded-full p-2 hover:bg-gold-400/10"
                >
                  <X size={20} className="text-ink" />
                </button>
              </div>

              <div className="relative flex-1 overflow-y-auto">
                {user ? (
                  <Link
                    href="/profile"
                    onClick={closeMobile}
                    className="mx-6 mt-6 flex items-center gap-3 rounded-2xl border border-gold-400/20 bg-gold-50 p-3 transition-colors hover:bg-gold-100/60"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 font-display text-sm text-ivory">
                      {user.name?.charAt(0)?.toUpperCase() || <UserIcon size={16} />}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-serif text-sm text-ink">{user.name}</p>
                      <p className="font-sans text-xs text-ink/45">View profile</p>
                    </div>
                  </Link>
                ) : (
                  <div className="mx-6 mt-6">
                    <Link
                      href="/auth/login"
                      onClick={closeMobile}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-saffron-500 py-3 font-sans text-sm font-medium text-saffron-600 transition-colors hover:bg-saffron-50"
                    >
                      <UserIcon size={16} />
                      <span>Login / Sign up</span>
                    </Link>
                  </div>
                )}

                <nav aria-label="Mobile" className="flex flex-col px-6 py-5">
                  {NAV_LINKS.map((l, i) => {
                    const active = isActive(l);
                    return (
                      <motion.div
                        key={l.label}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                      >
                        <Link
                          href={hrefFor(l)}
                          onClick={(e) => handleNavigate(e, l)}
                          aria-current={active ? 'page' : undefined}
                          className="group relative flex items-baseline justify-between border-b border-gold-400/15 py-4 transition-colors"
                        >
                          {active && (
                            <span className="absolute -left-3 top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-saffron-500" />
                          )}
                          <span
                            className={`font-serif text-2xl transition-colors group-hover:text-saffron-500 ${
                              active ? 'text-saffron-600' : 'text-ink/85'
                            }`}
                          >
                            {l.label}
                          </span>
                          <span className="font-deva text-sm text-saffron-600/60">{l.hi}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="relative border-t border-gold-400/20 p-6">
                <Link
                  href={NAV_LINKS[0].href}
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 py-3.5 font-sans text-sm font-semibold text-ivory shadow-gold transition-shadow hover:shadow-glow"
                >
                  Buy Now
                </Link>
                <p className="mt-5 font-deva text-2xl text-saffron-500/70">ॐ शान्तिः</p>
                <p className="mt-1 font-serif text-sm text-ink/50">May your space remain pure.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}