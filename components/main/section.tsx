import { motion } from "framer-motion";

export function Section({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      id={title?.toLowerCase()}
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-800 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <motion.h2
          initial={{ opacity: 0, x: -70 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only"
        >
          {title}
        </motion.h2>
      </div>
      {children}
    </section>
  );
}
