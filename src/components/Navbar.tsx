import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isOpen
            ? "bg-transparent shadow-none"
            : isHome && !scrolled
              ? "bg-primary md:bg-transparent md:shadow-none shadow-lg"
              : "bg-primary shadow-lg backdrop-blur-md"
        }`}
      >
        <div className="flex justify-between items-center h-[70px] px-6 md:px-8 overflow-visible">
          <NavLink
            to="/"
            className="flex items-center justify-start py-2"
            onClick={() => {
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="/logos/yashwant_logo.png"
              alt="Yashwant Pathak Logo"
              className="h-[48px] md:h-[58px] w-auto object-contain transition-transform duration-300 hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            />
          </NavLink>

          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={({ isActive }) =>
                  `text-[17px] font-medium text-white relative transition-all duration-300 ${
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
              className="px-3 py-1.5 text-[15px] border border-white text-white bg-transparent rounded-md hover:bg-white/20 transition-all duration-300"
            >
              {i18n.language === "en" ? "मराठी" : "English"}
            </button>
          </div>

          <button
            className="lg:hidden text-white text-2xl bg-transparent border-none p-2 focus:outline-none"
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
