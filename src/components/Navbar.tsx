import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      setScrolled((prev) => {
        // Small hysteresis prevents jitter around threshold.
        const nextScrolled = prev ? window.scrollY > 14 : window.scrollY > 24;
        return prev === nextScrolled ? prev : nextScrolled;
      });
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateScrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "mr" : "en";
    i18n.changeLanguage(newLanguage);
    localStorage.setItem("preferred-language", newLanguage);
    setIsOpen(false);
  };

  const navLinks = [
    { name: t("Nav.Home"), path: "/" },
    { name: t("Nav.About"), path: "/about" },
    { name: t("Nav.Social"), path: "/social-activities" },
    { name: t("Nav.Vadans"), path: "/vadans" },
    { name: t("Nav.Gallery"), path: "/gallery" },
    { name: t("Nav.Contact"), path: "/contact" },
    { name: t("Nav.Register"), path: "/registration" },
  ];

  const isHome = location.pathname === "/";
  const isHomeAtTop = isHome && !scrolled;
  const showNavLogo = !isHomeAtTop;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50"
      >
        <div
          className={`absolute inset-0 transition-opacity duration-300 ease-out ${
            isOpen || isHomeAtTop ? "opacity-0" : "opacity-100"
          } bg-primary/95 backdrop-blur-md shadow-lg pointer-events-none`}
        />
        <div className="relative flex justify-between items-center h-[70px] px-6 md:px-8 overflow-visible">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`lg:hidden absolute left-4 top-1/2 -translate-y-1/2 h-[70px] flex items-center transition-opacity duration-300 ${
              showNavLogo
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Go to home"
          >
            <img
              src="/logos/logo.png"
              alt="Yashwant"
              className="h-18 w-auto object-contain object-left brightness-0 invert"
              loading="eager"
            />
          </Link>

          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 h-[70px] items-center transition-opacity duration-300 ${
              showNavLogo
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            aria-label="Go to home"
          >
            <img
              src="/logos/logo.png"
              alt="Yashwant"
              className="h-20 w-auto object-contain object-left brightness-0 invert"
              loading="eager"
            />
          </Link>

          <div className="hidden lg:flex gap-8 items-center ml-auto">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={({ isActive }) =>
                  `text-[17px] font-semibold text-white relative transition-all duration-300 ${
                    isHomeAtTop
                      ? "hover:text-[#e77218] after:bg-[#e77218]"
                      : "hover:text-white after:bg-white"
                  } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "after:w-full" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-[15px] rounded-md border border-white text-white bg-transparent hover:bg-white/20 transition-all duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
            >
              {i18n.language === "en" ? "मराठी" : "English"}
            </button>
          </div>

          <button
            className={`lg:hidden absolute right-4 top-1/2 -translate-y-1/2 text-2xl bg-transparent border-none p-2 focus:outline-none z-50 ${
              isOpen
                ? "text-white"
                : isHome && !scrolled
                  ? "text-[#e77218]"
                  : "text-white"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-primary z-40 flex flex-col pt-[80px] pb-6 overflow-y-auto items-center lg:hidden"
          >
            <div className="flex flex-col items-center justify-center min-h-full gap-4 sm:gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.4 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-[18px] sm:text-[20px] font-semibold tracking-wide transition-all duration-300 ${isActive ? "text-white underline decoration-2 underline-offset-8" : "text-white/80 hover:text-white"}`
                    }
                    onClick={() => {
                      setIsOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.2 + navLinks.length * 0.05,
                  duration: 0.4,
                }}
              >
                <button
                  onClick={toggleLanguage}
                  className="mt-4 sm:mt-6 px-6 py-2 sm:px-8 sm:py-3 text-[15px] sm:text-[16px] bg-white text-primary font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 tracking-wide"
                >
                  {i18n.language === "en" ? "मराठी" : "English"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
