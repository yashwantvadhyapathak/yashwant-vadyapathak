import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

type MediaType = "image" | "video";

interface MediaItem {
  id: number;
  type: MediaType;
  thumb: string;
  src: string;
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: "image",
    thumb:
      "https://images.unsplash.com/photo-1543781035-906d2c4990cf?auto=format&fit=crop&q=80",
    src: "https://images.unsplash.com/photo-1543781035-906d2c4990cf?auto=format&fit=crop&q=100",
  },
  {
    id: 2,
    type: "video",
    thumb:
      "https://images.unsplash.com/photo-1627916560410-d8d1798363fd?auto=format&fit=crop&q=80",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1",
  },
  {
    id: 3,
    type: "image",
    thumb:
      "https://images.unsplash.com/photo-1524317185077-bdc6928e100e?auto=format&fit=crop&q=80",
    src: "https://images.unsplash.com/photo-1524317185077-bdc6928e100e?auto=format&fit=crop&q=100",
  },
  {
    id: 4,
    type: "video",
    thumb:
      "https://images.unsplash.com/photo-1588636906232-a3c3b0eb688e?auto=format&fit=crop&q=80",
    src: "https://www.youtube.com/embed/3JZ_D3ELwOQ?autoplay=1",
  },
  {
    id: 5,
    type: "image",
    thumb:
      "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=80",
    src: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&q=100",
  },
  {
    id: 6,
    type: "video",
    thumb:
      "https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&q=80",
    src: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
  {
    id: 7,
    type: "image",
    thumb: "/gallery_images/ganesha_idol.png",
    src: "/gallery_images/ganesha_idol.png",
  },
  {
    id: 8,
    type: "image",
    thumb: "/gallery_images/dhol_pathak_hero.png",
    src: "/gallery_images/dhol_pathak_hero.png",
  },
  {
    id: 9,
    type: "video",
    thumb:
      "https://images.unsplash.com/photo-1533174000255-1bd718d098a5?auto=format&fit=crop&q=80",
    src: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1",
  },
];

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedItem]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-[90px] pb-20 overflow-hidden">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
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

          <div className="grid grid-cols-1 md:grid-cols-10 gap-3 md:gap-5">
            {mediaItems.map((item, idx) => {
              let spanClass = "md:col-span-3";
              const rowPattern = idx % 9;
              if (rowPattern === 0) spanClass = "md:col-span-3";
              if (rowPattern === 1) spanClass = "md:col-span-4";
              if (rowPattern === 2) spanClass = "md:col-span-3";

              if (rowPattern === 3) spanClass = "md:col-span-5";
              if (rowPattern === 4) spanClass = "md:col-span-2";
              if (rowPattern === 5) spanClass = "md:col-span-3";

              if (rowPattern === 6) spanClass = "md:col-span-3";
              if (rowPattern === 7) spanClass = "md:col-span-3";
              if (rowPattern === 8) spanClass = "md:col-span-4";

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: (idx % 8) * 0.08,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  onClick={() => {
                    if (item.type === "video") setSelectedItem(item);
                  }}
                  className={`relative h-[250px] md:h-[350px] lg:h-[400px] w-full group ${
                    item.type === "video" ? "cursor-pointer" : ""
                  } overflow-hidden rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all border-4 md:border-[6px] border-white bg-white ${spanClass}`}
                >
                  <img
                    src={item.thumb}
                    alt={`Media ${item.id}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-colors border border-white/20 shadow-lg">
                        <Play className="text-white w-6 h-6 md:w-8 md:h-8 fill-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="fixed top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white z-110 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all backdrop-blur-md cursor-pointer"
              title="Close"
            >
              <X size={32} />
            </button>

            {selectedItem.type === "video" && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={selectedItem.src}
                  title="Video Player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
