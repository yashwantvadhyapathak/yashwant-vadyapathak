import React, { useState, useEffect, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize, X, ChevronLeft, ChevronRight } from "lucide-react";

type MediaType = "image" | "video";

interface MediaItem {
  id: number;
  type: MediaType;
  thumb: string;
  src: string;
}

const originalFiles = [
  "001", "002", "003", "004", "005", "007", "008", "009", "0010", "0011",
  "0012", "0013", "0014", "0015", "0016", "0017", "0018", "0019", "0020",
  "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029",
  "0030", "0031"
];

const mediaItems: MediaItem[] = originalFiles.map((filename, index) => ({
  id: index + 1,
  type: "image",
  thumb: `/gallery_images/thumbnails/${filename}.webp`,
  src: `/gallery_images/full/${filename}.webp`,
}));

const GalleryItem = memo(({
  item,
  idx,
  onSelect
}: {
  item: MediaItem;
  idx: number;
  onSelect: (item: MediaItem) => void;
}) => {
  let spanClass = "md:col-span-3";
  const rowPattern = idx % 9;

  if (rowPattern === 1) spanClass = "md:col-span-4";
  if (rowPattern === 3) spanClass = "md:col-span-5";
  if (rowPattern === 4) spanClass = "md:col-span-2";
  if (rowPattern === 8) spanClass = "md:col-span-4";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{
        duration: 0.5,
        delay: (idx % 10) * 0.05,
        ease: "easeOut",
      }}
      className={`relative h-[250px] md:h-[350px] lg:h-[400px] w-full group overflow-hidden rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 border-4 md:border-[6px] border-white bg-gray-100 ${spanClass}`}
    >
      <img
        src={item.thumb}
        alt={`Gallery view ${item.id}`}
        loading={idx < 6 ? "eager" : "lazy"}
        decoding="async"
        className="w-full h-full object-cover transform-gpu will-change-transform group-hover:scale-105 transition-transform duration-500 ease-out"
      />

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 pointer-events-none" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item);
        }}
        className="absolute bottom-3 right-3 p-2.5 bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full text-white opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-105"
        aria-label="View Fullscreen"
      >
        <Maximize size={20} />
      </button>
    </motion.div>
  );
});

GalleryItem.displayName = "GalleryItem";

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const handleSelect = useCallback((item: MediaItem) => {
    setSelectedItem(item);
  }, []);

  const currentIndex = selectedItem
    ? mediaItems.findIndex((m) => m.id === selectedItem.id)
    : -1;

  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex !== -1 && currentIndex < mediaItems.length - 1) {
      setSelectedItem(mediaItems[currentIndex + 1]);
    }
  }, [currentIndex]);

  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedItem(mediaItems[currentIndex - 1]);
    }
  }, [currentIndex]);

  const handleClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.scrollBehavior = "smooth";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" && currentIndex < mediaItems.length - 1) {
        setSelectedItem(mediaItems[currentIndex + 1]);
      }
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setSelectedItem(mediaItems[currentIndex - 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, currentIndex, handleClose]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-[90px] pb-20">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-3 border border-primary/30 tracking-widest shadow-sm uppercase">
              {t("Gallery.Badge") || "Gallery"}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,4vw,4rem)] font-extrabold text-primary tracking-wide font-sans mb-4 drop-shadow-sm">
              {t("Gallery.Title") || "Our Gallery"}
            </h1>
            <div className="mx-auto w-24 border-t-4 border-primary rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)] mb-4" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("Gallery.Subtitle")}
            </p>
          </motion.div>

          {/* Grid with scroll animations */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-3 md:gap-5">
            {mediaItems.map((item, idx) => (
              <GalleryItem
                key={item.id}
                item={item}
                idx={idx}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Optimized Modal using framer-motion just for entrance/exit */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-md"
            onClick={handleClose}
          >
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-4 right-4 md:top-8 md:right-8 bg-black/50 text-white rounded-full p-2 hover:bg-primary transition-colors z-50 border border-white/20"
                aria-label="Close"
              >
                <X size={28} />
              </button>

              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-primary transition-colors z-50 border border-white/20"
                  aria-label="Previous"
                >
                  <ChevronLeft size={36} />
                </button>
              )}

              {currentIndex < mediaItems.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-primary transition-colors z-50 border border-white/20"
                  aria-label="Next"
                >
                  <ChevronRight size={36} />
                </button>
              )}

              <motion.img
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                src={selectedItem.src}
                className="max-h-[85vh] max-w-[90vw] object-contain shadow-2xl rounded-lg pointer-events-auto"
                alt={`Full View ${selectedItem.id}`}
                onClick={(e) => e.stopPropagation()}
              />
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 font-medium tracking-wide bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10 pointer-events-none">
                {currentIndex + 1} / {mediaItems.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
