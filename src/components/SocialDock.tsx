import { useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

const iconsInfo = [
  { icon: Facebook, label: "Facebook", link: "#", isFill: true },
  { icon: Instagram, label: "Instagram", link: "#", isFill: false },
  {
    icon: Youtube,
    label: "YouTube",
    link: "https://www.youtube.com/@yashwantvadyapathak",
    isFill: false,
  },
];

const SocialDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="fixed z-50 
                 bottom-6 left-1/2 -translate-x-1/2 flex flex-row items-center
                 md:bottom-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col 
                 bg-white/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/80
                 rounded-full md:rounded-[2rem]
                 px-3 py-2 md:px-3 md:py-4 gap-2 md:gap-3
                 transition-all duration-300"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {iconsInfo.map((info, idx) => {
        const isHovered = hoveredIndex === idx;
        const isAdjacent =
          hoveredIndex !== null && Math.abs(hoveredIndex - idx) === 1;

        let sizeClass = "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12";
        let iconScale = "scale-[0.8] sm:scale-90 md:scale-100 opacity-90";
        let zIndex = "z-0";
        let marginClass = "mx-0 my-0";

        if (isHovered) {
          sizeClass = "w-12 h-12 sm:w-14 sm:h-14 md:w-[4.5rem] md:h-[4.5rem]";
          iconScale = "scale-100 sm:scale-110 md:scale-[1.3] opacity-100";
          zIndex = "z-10 shadow-xl";
          marginClass = "md:my-1 mx-1 md:mx-0";
        } else if (isAdjacent) {
          sizeClass = "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14";
          iconScale = "scale-90 sm:scale-100 md:scale-110 opacity-100";
          zIndex = "z-0 shadow-md";
          marginClass = "md:my-0.5 mx-0.5 md:mx-0";
        } else {
          zIndex = "z-0 shadow-sm";
        }

        const IconComponent = info.icon;

        return (
          <a
            key={info.label}
            href={info.link}
            target={info.label === "YouTube" ? "_blank" : "_self"}
            rel={info.label === "YouTube" ? "noopener noreferrer" : ""}
            onMouseEnter={() => setHoveredIndex(idx)}
            className={`${sizeClass} ${marginClass} flex items-center justify-center rounded-2xl md:rounded-[14px] bg-white hover:bg-primary hover:text-white transition-all duration-300 ease-out text-primary border border-black/5 origin-center ${zIndex}`}
            aria-label={info.label}
          >
            <div
              className={`transition-all duration-300 ease-out flex items-center justify-center ${iconScale}`}
            >
              <IconComponent
                size={22}
                fill={info.isFill ? "currentColor" : "none"}
                className={info.isFill ? "stroke-none" : ""}
              />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default SocialDock;
