import { useState, useEffect } from "react";
import { Facebook, Instagram, Youtube, Share2 } from "lucide-react";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (!isCollapsed) {
      timer = setTimeout(() => {
        setIsCollapsed(true);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isCollapsed]);

  return (
    <>
      <div
        className={`fixed z-50 bottom-4 left-1/2 -translate-x-1/2 flex flex-row items-center
                   md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:flex-col 
                   bg-[#e77218] shadow-[0_8px_30px_rgba(231,114,24,0.4)] border border-[#ff8a33]
                   rounded-full md:rounded-4xl
                   px-4 py-2.5 md:px-3 md:py-6 gap-3 md:gap-4
                   transition-all duration-500 backdrop-blur-md
                   ${
                     isCollapsed
                       ? "md:-translate-x-[150%] md:opacity-0 md:pointer-events-none md:left-0"
                       : "md:translate-x-0 md:opacity-100 md:hover:opacity-100 md:left-6"
                   }`}
      >
        {iconsInfo.map((info) => {
          const IconComponent = info.icon;

          return (
            <a
              key={info.label}
              href={info.link}
              target={info.label === "YouTube" ? "_blank" : "_self"}
              rel={info.label === "YouTube" ? "noopener noreferrer" : ""}
              className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white hover:bg-[#fff9f5] transition-all duration-300 ease-out hover:scale-110 shadow-md text-[#e77218]"
              aria-label={info.label}
            >
              <div className="transition-all duration-300 ease-out flex items-center justify-center">
                <IconComponent
                  size={18}
                  fill={info.isFill ? "currentColor" : "none"}
                  className={info.isFill ? "stroke-none" : "stroke-[2.5]"}
                />
              </div>
            </a>
          );
        })}
      </div>

      <button
        onClick={() => setIsCollapsed(false)}
        className={`fixed z-60 hidden md:flex items-center justify-center
                   left-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#e77218] text-white opacity-90 hover:opacity-100
                   rounded-r-2xl shadow-md transition-all duration-500 cursor-pointer
                   ${isCollapsed ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Open Social Links"
      >
        <Share2 size={18} />
      </button>
    </>
  );
};

export default SocialDock;
