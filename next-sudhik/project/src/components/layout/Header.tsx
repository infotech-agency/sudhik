// // 'use client';

// // import { useEffect, useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { usePathname, useRouter } from 'next/navigation';
// // import Link from 'next/link';
// // import { Menu, X } from 'lucide-react';
// // import Image from 'next/image';

// // type NavLink = { label: string; href: string; section?: string };

// // const navLinks: NavLink[] = [
// //   { label: 'The Product', href: '/products' },
// //   { label: 'Philosophy', href: '/', section: 'philosophy' },
// //   { label: 'Sacred Uses', href: '/', section: 'uses' },
// //   { label: 'Blog', href: '/blog' },
// //   { label: 'Reviews', href: '/products', section: 'reviews' },
// //   { label: 'FAQ', href: '/products', section: 'faq' },
// // ];

// // export default function Header() {
// //   const [scrolled, setScrolled] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const pathname = usePathname();
// //   const router = useRouter();

// //   useEffect(() => {
// //     const onScroll = () => setScrolled(window.scrollY > 40);
// //     onScroll();
// //     window.addEventListener('scroll', onScroll, { passive: true });
// //     return () => window.removeEventListener('scroll', onScroll);
// //   }, []);

// //   const goSection = (link: NavLink) => {
// //     setMobileOpen(false);
// //     if (link.section) {
// //       if (pathname !== link.href) {
// //         router.push(link.href);
// //         setTimeout(() => {
// //           document.getElementById(link.section!)?.scrollIntoView({ behavior: 'smooth' });
// //         }, 400);
// //       } else {
// //         document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth' });
// //       }
// //     } else {
// //       router.push(link.href);
// //     }
// //   };

// //   return (
// //     <>
// //       <motion.header
// //         initial={{ y: -80, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
// //         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
// //           scrolled
// //             ? 'bg-ivory/85 backdrop-blur-xl border-b border-gold-400/20 py-3'
// //             : 'bg-transparent py-5'
// //         }`}
// //       >
// //         <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between">
// //           <Link href="/" className="flex items-center gap-2.5 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>

// //             <span className="flex flex-col leading-none">
          
// //               <Image src="/assets/logo.png" height={50} width={50} alt='logo'/>
// //             </span>
// //           </Link>

// //           <nav className="hidden lg:flex items-center gap-9">
// //             {navLinks.map((l) => (
// //               <button
// //                 key={l.label}
// //                 onClick={() => goSection(l)}
// //                 className="relative font-sans text-sm font-medium text-ink/75 hover:text-saffron-500 transition-colors duration-300 group"
// //               >
// //                 {l.label}
// //                 <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-line group-hover:w-full transition-all duration-500" />
// //               </button>
// //             ))}
// //           </nav>

// //           <div className="flex items-center gap-2">
// //             <Link
// //               href="/products"
// //               className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-ivory font-sans text-xs font-semibold tracking-royal-sm uppercase shadow-gold hover:shadow-glow transition-all"
// //             >
// //               Buy Now
// //             </Link>
// //             <button
// //               onClick={() => setMobileOpen(true)}
// //               aria-label="Open menu"
// //               className="lg:hidden p-2.5 rounded-full hover:bg-gold-400/10 transition-colors"
// //             >
// //               <Menu size={20} className="text-ink" />
// //             </button>
// //           </div>
// //         </div>
// //       </motion.header>

// //       <AnimatePresence>
// //         {mobileOpen && (
// //           <>
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               onClick={() => setMobileOpen(false)}
// //               className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
// //             />
// //             <motion.aside
// //               initial={{ x: '100%' }}
// //               animate={{ x: 0 }}
// //               exit={{ x: '100%' }}
// //               transition={{ type: 'spring', stiffness: 300, damping: 32 }}
// //               className="fixed right-0 top-0 bottom-0 z-50 w-[80%] max-w-sm bg-ivory shadow-premium lg:hidden flex flex-col"
// //             >
// //               <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
// //                 <span className="font-royal tracking-royal-sm text-ink font-bold">SHUDDHIK™</span>
// //                 <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-full hover:bg-gold-400/10">
// //                   <X size={20} className="text-ink" />
// //                 </button>
// //               </div>
// //               <nav className="flex flex-col p-6 gap-1">
// //                 {navLinks.map((l, i) => (
// //                   <motion.button
// //                     key={l.label}
// //                     onClick={() => goSection(l)}
// //                     initial={{ opacity: 0, x: 20 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     transition={{ delay: 0.1 + i * 0.07 }}
// //                     className="text-left py-3.5 font-serif text-xl text-ink/80 hover:text-saffron-500 border-b border-gold-400/10 transition-colors"
// //                   >
// //                     {l.label}
// //                   </motion.button>
// //                 ))}
// //               </nav>
// //               <div className="mt-auto p-6 border-t border-gold-400/20">
// //                 <p className="font-deva text-2xl text-saffron-500/70">ॐ शान्तिः</p>
// //                 <p className="font-serif text-sm text-ink/50 mt-1">May your space remain pure.</p>
// //               </div>
// //             </motion.aside>
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </>
// //   );
// // }

// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { usePathname, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react';
// import Image from 'next/image';
// import Button from '../ui/Button';

// type NavLink = { label: string; href: string; section?: string };

// const navLinks: NavLink[] = [
//   { label: 'The Product', href: '/products' },
//   { label: 'Philosophy', href: '/', section: 'philosophy' },
//   { label: 'Sacred Uses', href: '/', section: 'uses' },
//   { label: 'Blog', href: '/blog' },
//   { label: 'Reviews', href: '/products', section: 'reviews' },
//   { label: 'FAQ', href: '/products', section: 'faq' },
// ];

// // Nav links split into two halves — left group and right group — so the logo can sit centered between them.
// const leftLinks = navLinks.slice(0, Math.ceil(navLinks.length / 2));
// const rightLinks = navLinks.slice(Math.ceil(navLinks.length / 2));

// export default function Header() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     onScroll();
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

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
//       className="relative font-sans text-md  font-medium text-black hover:text-saffron-500 transition-colors duration-300 group whitespace-nowrap"
//     >
//       {l.label}
//       <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-line group-hover:w-full transition-all duration-500" />
//     </button>
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
//           {/* Mobile / tablet layout: logo left, menu button right */}
//           <div className="flex lg:hidden items-center justify-between">
//             <Link href="/" className="flex items-center gap-2.5 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//               <span className="flex flex-col leading-none">
//                 <Image src="/assets/logo.png" height={50} width={50} alt="logo" />
//               </span>
//             </Link>
//             <button
//               onClick={() => setMobileOpen(true)}
//               aria-label="Open menu"
//               className="p-2.5 rounded-full hover:bg-gold-400/10 transition-colors"
//             >
//               <Menu size={20} className="text-ink" />
//             </button>
//           </div>

//           {/* Desktop layout: nav left, logo centered, nav + CTA right */}
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
//               {/* <Link
//                 href="/products"
//                 className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-saffron-500 to-saffron-600 text-ivory font-sans text-xs font-semibold tracking-royal-sm uppercase shadow-gold hover:shadow-glow transition-all"
//               >
//                 Buy Now
//               </Link> */}
              
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

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import { useAuth } from '@/lib/auth-context';

type NavLink = { label: string; href: string; section?: string };

const navLinks: NavLink[] = [
  { label: 'The Product', href: '/products' },
  { label: 'Philosophy', href: '/', section: 'philosophy' },
  { label: 'Sacred Uses', href: '/', section: 'uses' },
  { label: 'Blog', href: '/blog' },
   { label: 'Product Information', href: '/product', section: 'reviews' },
  { label: 'Reviews', href: '/products', section: 'reviews' },
];

// Nav links split into two halves — left group and right group — so the logo can sit centered between them.
const leftLinks = navLinks.slice(0, Math.ceil(navLinks.length / 2));
const rightLinks = navLinks.slice(Math.ceil(navLinks.length / 2));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goSection = (link: NavLink) => {
    setMobileOpen(false);
    if (link.section) {
      if (pathname !== link.href) {
        router.push(link.href);
        setTimeout(() => {
          document.getElementById(link.section!)?.scrollIntoView({ behavior: 'smooth' });
        }, 400);
      } else {
        document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(link.href);
    }
  };

  const NavButton = ({ l }: { l: NavLink }) => (
    <button
      onClick={() => goSection(l)}
      className="relative font-sans text-md  font-medium text-black hover:text-saffron-500 transition-colors duration-300 group whitespace-nowrap"
    >
      {l.label}
      <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-line group-hover:w-full transition-all duration-500" />
    </button>
  );

  const ProfileIcon = ({ size = 20 }: { size?: number }) => {
    const initial = user?.name?.charAt(0)?.toUpperCase();
    return (
      <Link
        href="/profile"
        aria-label="My Profile"
        onClick={() => setMobileOpen(false)}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-display text-sm shadow-gold hover:shadow-glow transition-all shrink-0"
      >
        {initial || <UserIcon size={size - 4} />}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ivory/85 backdrop-blur-xl border-b border-gold-400/20 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Mobile / tablet layout: logo left, profile + menu button right */}
          <div className="flex lg:hidden items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="flex flex-col leading-none">
                <Image src="/assets/logo.png" height={50} width={50} alt="logo" />
              </span>
            </Link>
            <div className="flex items-center gap-3">
              {user ? (
                <ProfileIcon />
              ) : (
                <Link
                  href="/auth/login"
                  aria-label="Login"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gold-400/10 text-ink hover:text-saffron-500 transition-all shrink-0"
                >
                  <UserIcon size={18} />
                </Link>
              )}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="p-2.5 rounded-full hover:bg-gold-400/10 transition-colors"
              >
                <Menu size={20} className="text-ink" />
              </button>
            </div>
          </div>

          {/* Desktop layout: nav left, logo centered, nav + CTA right */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-6">
            <nav className="flex items-center gap-9 justify-start">
              {leftLinks.map((l) => (
                <NavButton key={l.label} l={l} />
              ))}
            </nav>

            <Link href="/" className="flex items-center justify-center group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Image src="/assets/logo.png" height={50} width={50} alt="logo" />
            </Link>

            <div className="flex items-center justify-end gap-9">
              <nav className="flex items-center gap-9">
                {rightLinks.map((l) => (
                  <NavButton key={l.label} l={l} />
                ))}
              </nav>
              {user ? (
                <ProfileIcon />
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-1.5 font-sans text-sm font-medium text-black hover:text-saffron-500 transition-colors duration-300"
                >
                  <UserIcon size={18} />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[80%] max-w-sm bg-ivory shadow-premium lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gold-400/20">
                <span className="font-royal tracking-royal-sm text-ink font-bold">SHUDDHIK™</span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2 rounded-full hover:bg-gold-400/10">
                  <X size={20} className="text-ink" />
                </button>
              </div>

              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 mx-6 mt-6 p-3 rounded-xl bg-gold-50 border border-gold-400/20 hover:bg-gold-100/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-500 to-maroon-500 text-ivory font-display text-sm flex items-center justify-center shrink-0">
                    {user.name?.charAt(0)?.toUpperCase() || <UserIcon size={16} />}
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif text-sm text-ink truncate">{user.name}</p>
                    <p className="font-sans text-xs text-ink/45">View Profile</p>
                  </div>
                </Link>
              ) : (
                <div className="mx-6 mt-6">
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-saffron-500 text-saffron-600 hover:bg-saffron-50 transition-colors font-sans text-sm font-medium"
                  >
                    <UserIcon size={16} />
                    <span>Login / Sign Up</span>
                  </Link>
                </div>
              )}

              <nav className="flex flex-col p-6 gap-1">
                {navLinks.map((l, i) => (
                  <motion.button
                    key={l.label}
                    onClick={() => goSection(l)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="text-left py-3.5 font-serif text-xl text-ink/80 hover:text-saffron-500 border-b border-gold-400/10 transition-colors"
                  >
                    {l.label}
                  </motion.button>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t border-gold-400/20">
                <p className="font-deva text-2xl text-saffron-500/70">ॐ शान्तिः</p>
                <p className="font-serif text-sm text-ink/50 mt-1">May your space remain pure.</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}