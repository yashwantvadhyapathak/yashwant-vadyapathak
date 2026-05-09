import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Music } from "lucide-react";

const VadansList = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const locationsObj = t("Vadans.Locations", {
    returnObjects: true,
  }) as Record<string, string>;
  const vadansData = Object.values(locationsObj);
  const snakeVadansData = vadansData
    .map((location, index) => ({ location, originalIndex: index }))
    .reduce<Array<{ location: string; originalIndex: number }>>(
      (acc, _, index, arr) => {
        if (index % 4 !== 0) return acc;
        const rowIndex = Math.floor(index / 4);
        const row = arr.slice(index, index + 4);
        acc.push(...(rowIndex % 2 === 0 ? row : row.reverse()));
        return acc;
      },
      [],
    );
  const lgCols = 4;

  const getLgRowStartClass = (index: number) => {
    const row = Math.floor(index / lgCols);
    const isFirstItemInRow = index % lgCols === 0;
    const totalRows = Math.ceil(vadansData.length / lgCols);
    const isLastRow = row === totalRows - 1;
    const itemsInLastRow = vadansData.length % lgCols || lgCols;
    const isOddRow = row % 2 === 1;

    // Keep incomplete odd rows right-aligned so the snake drop stays visually connected.
    if (!isFirstItemInRow || !isLastRow || !isOddRow || itemsInLastRow === lgCols) {
      return "";
    }

    if (itemsInLastRow === 3) return "lg:col-start-2";
    if (itemsInLastRow === 2) return "lg:col-start-3";
    if (itemsInLastRow === 1) return "lg:col-start-4";
    return "";
  };

  const formatNodeNumber = (num: number) => {
    const locale = i18n.language === "en" ? "en-IN" : "mr-IN";
    return new Intl.NumberFormat(locale).format(num);
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0.2 }
        : { type: "spring" as const, stiffness: 85, damping: 24 },
    },
  };

  const renderPath = (d: string) => (
    <>
      {/* Background solid track */}
      <path d={d} fill="none" className="stroke-primary/15" strokeWidth="6px" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
      {/* Glowing flowing energy dash */}
      <path d={d} pathLength="100" fill="none" className="stroke-primary animate-snake" strokeWidth="6px" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
    </>
  );

  const renderConnectors = (flowIndex: number, len: number) => {
    const isFirst = flowIndex === 0;
    const isLast = flowIndex === len - 1;
    const lgCols = 4;
    const lgRow = Math.floor(flowIndex / lgCols);
    const lgIsOddRow = lgRow % 2 === 1;

    // Entry line coming from the left edge of the screen into the first node
    const EntryLine = isFirst && (
      <svg className="absolute top-8 right-1/2 w-[50vw] h-[10px] overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        {renderPath("M 0 50 L 100 50")}
      </svg>
    );

    // Exit line follows snake direction on the final row.
    const ExitLine = isLast && (
      lgIsOddRow ? (
        <svg className="absolute top-8 right-1/2 w-[50vw] h-[10px] overflow-visible hidden lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
          {renderPath("M 100 50 L 0 50")}
        </svg>
      ) : (
        <svg className="absolute top-8 left-1/2 w-[50vw] h-[10px] overflow-visible hidden lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
          {renderPath("M 0 50 L 100 50")}
        </svg>
      )
    );

    if (isLast) return (
      <>
        {EntryLine}
        {ExitLine}
      </>
    );

    // Mobile (1 col) - Slithering drop between nodes
    const mobile = (
      <svg className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-[calc(100%+4rem)] overflow-visible block md:hidden" preserveAspectRatio="none" viewBox="0 0 100 100">
        {renderPath(flowIndex % 2 === 0 ? "M 50 0 C 150 50, -50 50, 50 100" : "M 50 0 C -50 50, 150 50, 50 100")}
      </svg>
    );

    // MD (3 cols)
    const mdEndOfRow = flowIndex % 3 === 2;
    let mdLine = null;
    if (mdEndOfRow) {
      mdLine = (
        <svg className="absolute top-8 right-1/2 w-[calc(200%+4rem)] h-[calc(100%+4rem)] overflow-visible hidden md:block lg:hidden" preserveAspectRatio="none" viewBox="0 0 100 100">
          {renderPath("M 100 0 C 40 0, 60 100, 0 100")}
        </svg>
      );
    } else {
      mdLine = (
        <svg className="absolute top-8 left-1/2 w-[calc(100%+2rem)] h-[10px] overflow-visible hidden md:block lg:hidden" preserveAspectRatio="none" viewBox="0 0 100 100">
          {renderPath("M 0 50 L 100 50")}
        </svg>
      );
    }

    // LG (4 cols)
    const lgEndOfRow = flowIndex % lgCols === lgCols - 1;
    let lgLine = null;
    if (lgEndOfRow) {
      if (lgIsOddRow) {
        lgLine = (
          <svg className="absolute top-8 right-1/2 w-8 h-[calc(100%+4rem)] overflow-visible hidden lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
            {renderPath("M 50 0 L 50 100")}
          </svg>
        );
      } else {
        lgLine = (
          <svg className="absolute top-8 left-1/2 w-8 h-[calc(100%+4rem)] overflow-visible hidden lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
            {renderPath("M 50 0 L 50 100")}
          </svg>
        );
      }
    } else {
      if (lgIsOddRow) {
        lgLine = (
          <svg className="absolute top-8 right-1/2 w-[calc(100%+2rem)] h-[10px] overflow-visible hidden lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
            {renderPath("M 100 50 L 0 50")}
          </svg>
        );
      } else {
        lgLine = (
          <svg className="absolute top-8 left-1/2 w-[calc(100%+2rem)] h-[10px] overflow-visible hidden lg:block" preserveAspectRatio="none" viewBox="0 0 100 100">
            {renderPath("M 0 50 L 100 50")}
          </svg>
        );
      }
    }

    return (
      <>
        {EntryLine}
        {mobile}
        {mdLine}
        {lgLine}
      </>
    );
  };

  return (
    <div className="min-h-screen pt-[90px] pb-24 overflow-hidden relative isolate">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/backgrounds/background.JPG')" }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#fff8ef]/95 via-[#fffaf3]/92 to-[#fff6ea]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.16),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.16),transparent_45%)]" />
      <div className="pointer-events-none absolute -top-36 -left-24 h-96 w-96 rounded-full bg-primary/8 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-amber-200/20 blur-2xl" />
      {/* Global styles for the infinite flowing snake animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes snake-flow {
          to { stroke-dashoffset: -24; }
        }
        .animate-snake {
          stroke-dasharray: 14 10;
          animation: snake-flow 3.6s linear infinite;
          will-change: stroke-dashoffset;
        }
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          .animate-snake {
            animation: none;
            stroke-dasharray: none;
          }
        }
      `}} />

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4 border border-primary/20 tracking-widest shadow-sm uppercase">
            {t("Vadans.Badge") || "Our Timeline"}
          </span>
          <h1 className="text-4xl md:text-[clamp(3rem,5vw,5rem)] font-extrabold text-primary tracking-tight font-sans mb-6 drop-shadow-sm">
            {t("Vadans.Title") || "Vadans List"}
          </h1>
          <div className="mx-auto w-32 border-t-[5px] border-primary rounded-full shadow-[0_2px_10px_rgba(217,119,6,0.4)] mb-6" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
            {t("Vadans.Subtitle") ||
              "Records of our grand public performances and rallies."}
          </p>
        </motion.div>

        {/* Z-Pattern Infinite Flowing Snake Grid Container */}
        <div className="relative max-w-7xl mx-auto py-6 px-3 md:px-5 rounded-4xl border border-primary/10 bg-white/70 shadow-[0_10px_28px_rgba(217,119,6,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-8">
            {snakeVadansData.map((item, idx) => {
              return (
                <div key={idx} className={`relative flex flex-col items-center ${getLgRowStartClass(idx)}`}>
                  
                  {/* Connectors Layer (Stationary Background Z-0) */}
                  {/* Placed OUTSIDE the motion.div to prevent overlapping during fade-in */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    {renderConnectors(item.originalIndex, vadansData.length)}
                  </div>

                  {/* Animated Content Layer (Z-10) */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={itemVariants}
                    className="relative z-10 w-full flex flex-col items-center h-full"
                  >
                    {/* Node Dot (Glowing Checkpoint) */}
                    <div className="w-16 h-16 shrink-0 bg-white/95 rounded-full flex items-center justify-center border-4 border-primary/80 shadow-[0_6px_18px_rgba(217,119,6,0.25)] group transition-transform duration-300 hover:scale-105 relative">
                      <div className="w-full h-full rounded-full bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center group-hover:from-primary group-hover:to-amber-600 transition-all duration-500 relative z-10">
                        <span className="text-primary font-extrabold text-2xl group-hover:text-white transition-colors duration-500 drop-shadow-sm">
                          {formatNodeNumber(item.originalIndex + 1)}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="w-full mt-6 bg-white/95 rounded-3xl shadow-[0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_26px_rgba(217,119,6,0.14)] transition-all duration-300 border border-primary/10 p-5 pt-6 text-center relative group hover:-translate-y-1 flex flex-col items-center h-full overflow-hidden">
                      
                      {/* Glossy top edge */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-300/70 via-primary to-amber-300/70 opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Subtle inner orb */}
                      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-300" />

                      <div className="p-3.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 mb-4 shadow-sm relative z-10">
                        <MapPin className="w-6 h-6" />
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 leading-snug mb-4 flex-1 relative z-10">
                        {item.location}
                      </h3>
                      
                      <div className="flex items-center text-xs font-bold text-primary/80 uppercase tracking-widest mt-auto bg-primary/5 px-4 py-2 rounded-full group-hover:bg-primary/10 transition-colors relative z-10">
                        <Music className="w-3.5 h-3.5 mr-2" />
                        <span>
                          {i18n.language === "en" ? "Public Vadan" : "सार्वजनिक वादन"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VadansList;
