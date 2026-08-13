// 'use client';

// import { motion } from 'framer-motion';
// import SectionHeading from '@/components/ui/SectionHeading';
// import Divider from '@/components/ui/Divider';
// import ProductGallery from './ProductGallery';
// import PurchaseCard from './PurchaseCard';
// import ProductAccordion from './ProductAccordion';
// import ProductInfoTabs from './ProductInfoTabs';
// import type { Product } from '@/lib/types';

// interface ProductDetailsProps {
//   product: Product;
//   rating: number;
//   reviewCount: number;
// }

// export default function ProductDetails({ product, rating, reviewCount }: ProductDetailsProps) {
//   console.log("product", product);
//   return (
//     <section id="product" className="relative py-24 sm:py-32 bg-ivory">
//       <div className="absolute inset-0 bg-lotus-fade opacity-60 pointer-events-none" />

//       <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
//         <SectionHeading
//           eyebrow="The Product"
//           hindiTitle="उत्पाद"
//           title={
//             <>
//               Meet <span className="text-saffron-gradient">{product.title}</span>
//             </>
//           }
//           subtitle="One bottle. One devotion. Every detail considered."
//         />

//         <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mt-16">
//           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-20">
//             <ProductGallery product={product} />
//           </motion.div>
//           <PurchaseCard product={product} rating={rating} reviewCount={reviewCount} />
//         </div>

//         <div className="mt-20 lg:mt-24 max-w-4xl mx-auto">
//           <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-display text-2xl sm:text-3xl text-ink text-center mb-10">
//             Everything You Wish To Know
//           </motion.h3>
//           {/* <ProductAccordion product={product} /> */}
//         </div>

//         <div className="mt-24 max-w-5xl mx-auto">
//           <SectionHeading eyebrow="Product Information" hindiTitle="उत्पाद जानकारी" title="The Complete Picture" />
//           <ProductInfoTabs product={product} />
//         </div>

//         <Divider className="mt-28" />
//       </div>
//     </section>
//   );
// }

'use client';

import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Divider from '@/components/ui/Divider';
import ProductGallery from './ProductGallery';
import PurchaseCard from './PurchaseCard';
import ProductAccordion from './ProductAccordion';
import ProductInfoTabs from './ProductInfoTabs';
import type { Product } from '@/lib/types';

interface ProductDetailsProps {
  product: Product;
  rating: number;
  reviewCount: number;
}

export default function ProductDetails({ product, rating, reviewCount }: ProductDetailsProps) {
  console.log("product", product);
  return (
    <section id="product" className="relative py-24 sm:py-32 bg-ivory">
      <div className="absolute inset-0 bg-lotus-fade opacity-60 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="The Product"
          hindiTitle="उत्पाद"
          title={
            <>
              Meet <span className="text-saffron-gradient">{product.title}</span>
            </>
          }
          subtitle="One bottle. One devotion. Every detail considered."
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-deva text-center text-maroon-600 text-lg mt-4"
        >
          हर बूँद में गंगाजल — शुद्धता की पवित्र गारंटी।
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-20">
            <ProductGallery product={product} />
          </motion.div>
          <PurchaseCard product={product} rating={rating} reviewCount={reviewCount} />
        </div>

        <div className="mt-20 lg:mt-24 max-w-4xl mx-auto">
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-display text-2xl sm:text-3xl text-ink text-center mb-10">
            Everything You Wish To Know
          </motion.h3>
          {/* <ProductAccordion product={product} /> */}
        </div>

        <div className="mt-24 max-w-5xl mx-auto">
          <SectionHeading eyebrow="Product Information" hindiTitle="उत्पाद जानकारी" title="The Complete Picture" />
          <ProductInfoTabs product={product} />
        </div>

        <Divider className="mt-28" />
      </div>
    </section>
  );
}