import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const isMarathi = i18n.language === "mr";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toLocalNumbers = (text: string) => {
    if (isMarathi) {
      const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return text.replace(/\d/g, (d) => marathiDigits[parseInt(d)]);
    }
    return text;
  };

  return (
    <footer className="bg-primary text-white pt-16 pb-6 mt-auto relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8 max-w-[1600px] mx-auto px-6 md:px-8 lg:px-4 relative z-10">
        <div className="flex flex-col items-start text-left col-span-1 md:col-span-2 lg:col-span-1 mb-2 lg:mb-0">
          <img
            src="/misc/about.png"
            alt="Yashwant Pathak Logo"
            className="w-[180px] md:w-[200px] object-contain drop-shadow-sm mb-5 -mt-2"
          />
          <p className="text-white/95 text-[15px] md:text-[16px] leading-relaxed mb-4 font-['Tiro_Devanagari_Marathi',serif] font-normal tracking-wide max-w-sm">
            {t("Home.Bg")}
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-bold text-[18px] md:text-[16px] mb-3 tracking-wide drop-shadow-sm relative pb-2 inline-block">
            {t("Nav.Home")}
            <div className="absolute bottom-0 left-0 w-12 h-1 bg-white/70 rounded-full" />
          </h4>
          <ul className="space-y-4 font-['Tiro_Devanagari_Marathi',serif] font-normal tracking-wide text-[16px] md:text-[16px] mt-2">
            <li>
              <NavLink
                to="/about"
                onClick={scrollToTop}
                className="flex items-center text-white/90 hover:text-white transition-all duration-300 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white mr-3 group-hover:scale-125 transition-all shrink-0" />
                {t("Nav.About")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/social-activities"
                onClick={scrollToTop}
                className="flex items-center text-white/90 hover:text-white transition-all duration-300 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white mr-3 group-hover:scale-125 transition-all shrink-0" />
                {t("Nav.Social")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/gallery"
                onClick={scrollToTop}
                className="flex items-center text-white/90 hover:text-white transition-all duration-300 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white mr-3 group-hover:scale-125 transition-all shrink-0" />
                {t("Nav.Gallery")}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/vadans"
                onClick={scrollToTop}
                className="flex items-center text-white/90 hover:text-white transition-all duration-300 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white mr-3 group-hover:scale-125 transition-all shrink-0" />
                {t("Nav.Vadans")}
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-bold text-[18px] md:text-[16px] mb-3 tracking-wide drop-shadow-sm relative pb-2 inline-block">
            {t("Footer.OrgInfo")}
            <div className="absolute bottom-0 left-0 w-12 h-1 bg-white/70 rounded-full" />
          </h4>
          <ul className="space-y-4 font-['Tiro_Devanagari_Marathi',serif] font-normal tracking-wide text-[16px] md:text-[16px] mt-2">
            <li>
              <NavLink
                to="/registration"
                onClick={scrollToTop}
                className="flex items-center text-white/90 hover:text-white transition-all duration-300 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white mr-3 group-hover:scale-125 transition-all shrink-0" />
                {t("Nav.Register")}
              </NavLink>
            </li>
            <li>
              <a
                href="#"
                onClick={scrollToTop}
                className="flex items-center text-white/90 hover:text-white transition-all duration-300 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white mr-3 group-hover:scale-125 transition-all shrink-0" />
                {t("Footer.Terms")}
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={scrollToTop}
                className="flex items-center text-white/90 hover:text-white transition-all duration-300 group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-white mr-3 group-hover:scale-125 transition-all shrink-0" />
                {t("Footer.Privacy")}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="text-white font-bold text-[18px] md:text-[16px] mb-3 tracking-wide drop-shadow-sm relative pb-2 inline-block">
            {t("Nav.Contact")}
            <div className="absolute bottom-0 left-0 w-12 h-1 bg-white/70 rounded-full" />
          </h4>
          <ul className="space-y-6 text-white/90 font-['Tiro_Devanagari_Marathi',serif] text-[16px] md:text-[16px] font-normal tracking-wide mt-2">
            <li className="flex items-start gap-3 group">
              <div className="bg-white/10 p-2.5 rounded-full group-hover:bg-white group-hover:text-primary transition-colors duration-300 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)] mt-0.5">
                <MapPin size={18} strokeWidth={2} />
              </div>
              <span className="leading-normal group-hover:text-white transition-colors duration-300">
                {t("Footer.AddressLine1")} <br />
                {t("Footer.AddressLine2")}
              </span>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="bg-white/10 p-2.5 rounded-full group-hover:bg-white group-hover:text-primary transition-colors duration-300 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                <Phone size={18} strokeWidth={2} />
              </div>
              <a
                href={`tel:${import.meta.env.VITE_CONTACT_PHONE_1 || "+919921773172"}`}
                className="hover:text-white transition-all duration-300 flex-1 whitespace-nowrap"
              >
                {toLocalNumbers(
                  import.meta.env.VITE_CONTACT_PHONE_DISPLAY ||
                    "+91 9921773172, +91 7972269030",
                )}
              </a>
            </li>
            <li className="flex items-center gap-4 group">
              <div className="bg-white/10 p-2.5 rounded-full group-hover:bg-white group-hover:text-primary transition-colors duration-300 shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                <Mail size={18} strokeWidth={2} />
              </div>
              <a
                href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
                className="hover:text-white transition-all duration-300 flex-1 whitespace-nowrap"
              >
                {import.meta.env.VITE_CONTACT_EMAIL}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col mb-4 md:mb-0">
          <h4 className="text-white font-bold text-[18px] md:text-[16px] mb-3 tracking-wide drop-shadow-sm relative pb-2 inline-block">
            {t("Footer.SocialMedia")}
            <div className="absolute bottom-0 left-0 w-12 h-1 bg-white/70 rounded-full" />
          </h4>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              <Facebook size={18} fill="currentColor" className="stroke-none" />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.youtube.com/@yashwantvadyapathak"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center mt-12 pt-5 border-t border-white/20 text-white/90 text-[14px] md:text-[15px] tracking-wide font-['Tiro_Devanagari_Marathi',_serif]">
        <div className="flex justify-center items-center max-w-[1600px] mx-auto px-2 md:px-4">
          <p className="text-center">
            &copy; {new Date().getFullYear()} {t("Footer.Rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
