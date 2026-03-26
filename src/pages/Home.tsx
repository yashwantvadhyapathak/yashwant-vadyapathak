import { useState, useEffect, useCallback, useRef } from "react";
import type { TouchEvent } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, History, PlayCircle, Music, ChevronDown } from "lucide-react";
import CountUp from "react-countup";

const Home = () => {
  const { t, i18n } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end 80%"],
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const touchEndYRef = useRef<number | null>(null);

  const minSwipeDistance = 50;
  const minVerticalDeltaForScroll = 20;

  const handleTouchStart = (e: TouchEvent) => {
    const touch = e.targetTouches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchEndXRef.current = null;
    touchEndYRef.current = null;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touch = e.targetTouches[0];
    touchEndXRef.current = touch.clientX;
    touchEndYRef.current = touch.clientY;
  };

  const handleTouchEnd = () => {
    const touchStartX = touchStartXRef.current;
    const touchStartY = touchStartYRef.current;
    const touchEndX = touchEndXRef.current;
    const touchEndY = touchEndYRef.current;

    if (
      touchStartX === null ||
      touchEndX === null ||
      touchStartY === null ||
      touchEndY === null
    ) {
      return;
    }

    const deltaX = touchStartX - touchEndX;
    const deltaY = Math.abs(touchStartY - touchEndY);

    // Ignore primarily vertical gestures so page scrolling remains fluid.
    if (deltaY > minVerticalDeltaForScroll && deltaY > Math.abs(deltaX)) {
      return;
    }

    const isLeftSwipe = deltaX > minSwipeDistance;
    const isRightSwipe = deltaX < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    } else if (isRightSwipe) {
      setCurrentSlide((prev) =>
        prev === 0 ? carouselImages.length - 1 : prev - 1,
      );
    }
  };

  const isMarathi = i18n.language === "mr";

  const toLocalNumbers = useCallback(
    (value: number) => {
      const text = value.toString();
      if (isMarathi) {
        const marathiDigits = [
          "०",
          "१",
          "२",
          "३",
          "४",
          "५",
          "६",
          "७",
          "८",
          "९",
        ];
        return text.replace(/\d/g, (d) => marathiDigits[parseInt(d)]);
      }
      return text;
    },
    [isMarathi],
  );

  const carouselImages = [
    "/carousel/01.jpg",
    "/carousel/02.jpg",
    "/carousel/03.jpg",
    "/carousel/04.jpg",
    "/carousel/05.jpg",
    "/carousel/06.jpg",
    "/carousel/07.jpg",
    "/carousel/08.jpg",
    "/carousel/09.jpg",
    "/carousel/10.jpg",
  ];

  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    // Disable native scroll restoration by the browser
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Force flush scroll multiple times to beat browser quirks and React router hash jumps
    window.scrollTo(0, 0);
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => {
      clearTimeout(timeoutId);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="animate-fade-in">
      <section
        className="w-full relative overflow-hidden bg-black"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="hidden md:block relative w-full h-svh overflow-hidden">
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 z-[1]"
                  : "opacity-0 z-0"
              }`}
              style={{
                backgroundImage: `url(${img})`,
              }}
            />
          ))}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/60 z-[2]" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] text-center w-full px-6">
            <div className="flex flex-col items-center justify-center w-full max-w-[95vw] lg:max-w-6xl mx-auto">
              <div className="grid grid-cols-[1fr_auto_1fr] md:gap-x-4 gap-y-8 md:gap-y-10 items-center justify-center w-full">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-right justify-self-end text-[clamp(1.6rem,3.8vw,3.75rem)] font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] tracking-wide whitespace-nowrap"
                >
                  {t("Home.CarouselTagline").split(" | ")[0]}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center justify-self-center text-[clamp(1.6rem,3.8vw,3.75rem)] font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] mx-4 md:mx-6"
                >
                  |
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="text-left justify-self-start text-[clamp(1.6rem,3.8vw,3.75rem)] font-extrabold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] tracking-wide whitespace-nowrap"
                >
                  {t("Home.CarouselTagline").split(" | ")[1]}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="col-span-3 flex items-center justify-center gap-4 md:gap-5"
                >
                  <Link
                    to="/about"
                    className="inline-block px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/50 hover:border-white text-white text-lg font-bold rounded-full transition-all duration-300 shadow-lg hover:-translate-y-1"
                  >
                    {t("Nav.About")}
                  </Link>

                  <Link
                    to="/registration"
                    className="inline-block px-8 py-3 bg-[#e77218] hover:bg-[#d56612] text-white text-lg font-bold rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(231,114,24,0.5)] hover:shadow-[0_0_25px_rgba(231,114,24,0.7)] hover:-translate-y-1"
                  >
                    {t("Nav.Register")}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex gap-3">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full border-2 border-white/50 bg-transparent cursor-pointer transition-all duration-300 hover:bg-white/50 hover:scale-125 ${
                  index === currentSlide ? "w-8 rounded-md" : ""
                }`}
                style={
                  index === currentSlide
                    ? { backgroundColor: "#FF9933", borderColor: "#FF9933" }
                    : undefined
                }
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { delay: 1, duration: 1 },
            }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 z-5 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]"
          >
            <ChevronDown size={32} className="text-white" />
          </motion.div>
        </div>

        <div
          className="md:hidden flex flex-col w-full bg-[#faf9f8] relative overflow-hidden"
          style={{ height: "100svh", minHeight: "100svh", maxHeight: "100svh" }}
        >
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[30%] bg-[#FF9933]/15 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[30%] bg-[#FF9933]/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="flex flex-col items-center justify-center px-4 pb-6 w-full text-center z-10 flex-shrink-0 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full flex justify-center mb-4 -mt-1 drop-shadow-sm pointer-events-none"
            >
              <motion.img
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src="/logos/logo.png"
                alt="Yashwant Pathak Logo"
                loading="eager"
                fetchPriority="high"
                className="w-full max-w-[420px] object-contain scale-[1.3] sm:scale-[1.4] origin-top"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="relative w-full max-w-[360px] mb-5 mt-4"
            >
              <h1 className="text-[15.5px] sm:text-[17px] font-medium leading-tight text-[#c06b10] tracking-wide">
                {t("Home.CarouselTagline")}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
              className="flex flex-row items-center justify-center gap-3 w-full px-2 max-w-[420px]"
            >
              <Link
                to="/registration"
                className="flex-1 py-3.5 bg-[#d37617] hover:bg-[#c26a11] text-white text-[16px] font-bold rounded-full transition-all active:scale-[0.96] text-center shadow-[0_4px_14px_rgba(211,118,23,0.3)] flex items-center justify-center whitespace-nowrap border-2 border-[#d37617]"
              >
                {t("Nav.Register")}
              </Link>
              <Link
                to="/about"
                className="flex-1 py-3.5 bg-[#faebdb] hover:bg-[#f6dfc7] text-[#c06b10] border-2 border-[#d37617] text-[16px] font-bold rounded-full transition-all active:scale-[0.96] text-center shadow-[0_4px_14px_rgba(0,0,0,0.02)] flex items-center justify-center whitespace-nowrap"
              >
                {t("Nav.About")}
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full flex-grow flex flex-col z-10 px-2.5 pb-[86px]"
          >
            <div className="relative w-full h-full bg-white rounded-[32px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-black/5">
              {carouselImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-out ${
                    index === currentSlide
                      ? "opacity-100 z-[1]"
                      : "opacity-0 z-0"
                  }`}
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}

              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent z-5 pointer-events-none" />

              <div className="flex justify-center gap-2 mt-5 absolute bottom-4 w-full z-20">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className={`h-[6px] rounded-full transition-all duration-400 backdrop-blur-sm ${
                      index === currentSlide
                        ? "w-[24px] bg-[#e77218]"
                        : "w-[6px] bg-white/70 hover:bg-white/90"
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 6, 0] }}
            transition={{
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              opacity: { delay: 1, duration: 1 },
            }}
            className="absolute bottom-8 right-6 z-30 pointer-events-none"
          >
            <ChevronDown size={24} className="text-[#e77218] opacity-80" />
          </motion.div>
        </div>
      </section>

      <section className="bg-[#e77218] pt-6 pb-10 md:pt-8 md:pb-14 relative overflow-hidden flex flex-col items-center">
        <img
          src="/illustrations/drummer-left.svg"
          alt="Drummer Left"
          loading="eager"
          fetchPriority="high"
          className="absolute left-[-2%] bottom-0 h-[50%] md:h-[80%] opacity-70 object-contain object-left-bottom pointer-events-none mix-blend-multiply flex-shrink-0"
        />
        <img
          src="/illustrations/drummer-right.svg"
          alt="Drummer Right"
          loading="eager"
          fetchPriority="high"
          className="absolute right-[-2%] bottom-0 h-[50%] md:h-[80%] opacity-70 object-contain object-right-bottom pointer-events-none mix-blend-multiply flex-shrink-0"
        />

        <motion.img
          initial={{ opacity: 0.15, rotate: -10 }}
          animate={{ opacity: 0.15, rotate: 10 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          src="/corners/dhol_corner_tr.png"
          alt="Dhol"
          className="absolute top-[8%] left-[7%] md:left-[10%] w-32 md:w-48 object-contain pointer-events-none z-0 mix-blend-multiply"
        />
        <motion.img
          initial={{ opacity: 0.15, rotate: 15 }}
          animate={{ opacity: 0.15, rotate: -5 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          src="/corners/tasha_corner_tr.png"
          alt="Tasha"
          className="absolute top-[35%] right-[7%] md:right-[10%] w-32 md:w-48 object-contain pointer-events-none z-0 mix-blend-multiply"
        />
        <motion.img
          initial={{ opacity: 0.15, y: 10 }}
          animate={{ opacity: 0.15, y: -20 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          src="/corners/flag_corner_tr.png"
          alt="Flag"
          className="absolute bottom-[20%] left-[8%] md:left-[12%] w-28 md:w-40 object-contain pointer-events-none z-0 mix-blend-multiply"
        />
        <motion.img
          initial={{ opacity: 0.15, scale: 0.9 }}
          animate={{ opacity: 0.15, scale: 1.1 }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          src="/corners/cymbals_corner_tr.png"
          alt="Cymbals"
          className="absolute bottom-[2%] right-[10%] md:right-[15%] w-28 md:w-44 object-contain pointer-events-none z-0 mix-blend-multiply"
        />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 text-center flex flex-col items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0 mb-4 md:mb-6 pt-1 md:pt-0"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-white/15 text-white/90 border border-white/25 text-xs md:text-sm font-bold tracking-[0.18em] uppercase mb-3">
              {t("Home.AboutPathakHomeTag")}
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-wide drop-shadow-[0_3px_8px_rgba(0,0,0,0.2)]">
              {t("Home.AboutPathakHomeTitle")}
            </h2>
            <div className="mx-auto mt-3 w-20 border-t-4 border-white/70 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full mb-8 md:mb-10"
          >
            <div className="rounded-2xl bg-white/10 backdrop-blur-[2px] border border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.12)] px-4 py-5 md:px-6 md:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 text-white">
              <div className="flex flex-col items-center justify-center text-center p-2 group">
                <Users
                  size={34}
                  className="mb-2 text-white/90 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-1 flex items-center justify-center">
                  <CountUp
                    start={0}
                    end={100}
                    formattingFn={toLocalNumbers}
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                  +
                </h3>
                <p className="text-sm md:text-base font-medium text-white/90">
                  {t("Home.Stat1")}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2 group">
                <History
                  size={34}
                  className="mb-2 text-white/90 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-1 flex items-center justify-center">
                  <CountUp
                    start={0}
                    end={3}
                    formattingFn={toLocalNumbers}
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                  +
                </h3>
                <p className="text-sm md:text-base font-medium text-white/90">
                  {t("Home.Stat2")}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2 group">
                <PlayCircle
                  size={34}
                  className="mb-2 text-white/90 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-1 flex items-center justify-center">
                  <CountUp
                    start={0}
                    end={20}
                    formattingFn={toLocalNumbers}
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                  +
                </h3>
                <p className="text-sm md:text-base font-medium text-white/90">
                  {t("Home.Stat3")}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2 group">
                <Music
                  size={34}
                  className="mb-2 text-white/90 group-hover:scale-110 transition-transform duration-300"
                />
                <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-1 flex items-center justify-center">
                  <CountUp
                    start={0}
                    end={100}
                    formattingFn={toLocalNumbers}
                    enableScrollSpy
                    scrollSpyOnce
                  >
                    {({ countUpRef }) => <span ref={countUpRef} />}
                  </CountUp>
                  +
                </h3>
                <p className="text-sm md:text-base font-medium text-white/90">
                  {t("Home.Stat4")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-[950px] w-full mx-auto text-center pr-2 pb-2 flex flex-col"
          >
            <div>
              <p className="text-white text-sm md:text-base lg:text-[1.1rem] leading-snug lg:leading-relaxed mb-3 md:mb-5 font-medium tracking-wide">
                {t("Home.AboutPathakText")} {t("Home.AboutPathakObjectiveText")}
              </p>

              {/* <p className="text-white text-sm md:text-base lg:text-[1.1rem] leading-snug lg:leading-relaxed mb-3 md:mb-5 font-medium tracking-wide">
                {t("Home.AboutPathakFeature1")} {t("Home.AboutPathakFeature2")}{" "}
                {t("Home.AboutPathakFeature3")}
              </p>

              <p className="text-white text-sm md:text-base lg:text-[1.1rem] leading-snug lg:leading-relaxed mb-3 md:mb-5 font-medium tracking-wide">
                {t("Home.AboutPathakPerformanceText")}{" "}
                {t("Home.AboutPathakFamilyText")}
              </p> */}

              <p className="text-white text-sm md:text-base lg:text-[1.1rem] leading-snug lg:leading-relaxed mb-2 font-medium tracking-wide">
                {t("Home.AboutPathakCTA")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="shrink-0 mt-4 pb-2 md:pb-0"
          >
            <Link
              to="/about"
              className="inline-flex items-center justify-center px-9 md:px-10 py-3 md:py-3.5 rounded-full text-base md:text-lg font-extrabold tracking-wide text-[#e77218] bg-white border-2 border-white/90 shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition-all duration-300 hover:bg-[#fff4ea] hover:text-[#c85f0f] hover:border-[#fff4ea] hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(0,0,0,0.2)] focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              {t("Home.MoreInfoBtn")}
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="pt-10 md:pt-12 pb-8 md:pb-10 bg-gradient-to-b from-[#fffaf0] to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#e77218]/5 to-transparent pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#e77218]/10 text-[#e77218] text-xs md:text-sm font-bold mb-3 border border-[#e77218]/30 tracking-widest shadow-sm">
              {t("Home.Journey")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-[#e77218] tracking-wide font-sans mb-4 drop-shadow-sm">
              {t("Home.HistoryTitle")}
            </h2>
            <div className="mx-auto w-16 border-t-4 border-[#e77218] rounded-full shadow-[0_2px_4px_rgba(231,114,24,0.3)]" />
          </motion.div>

          <div
            ref={timelineRef}
            className="relative max-w-[1300px] mx-auto pt-0 pb-6 md:pb-8 px-1.5 md:px-0"
          >
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#e77218] via-[#e77218] to-transparent rounded-full shadow-[0_0_10px_rgba(231,114,24,0.3)] z-0"
            />

            <div className="relative mb-20 flex w-full pt-[74px] md:pt-0">
              <div className="absolute left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-14 h-14 flex justify-center items-center z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="bg-white border-4 border-[#e77218] text-[#e77218] w-full h-full rounded-full flex items-center justify-center font-extrabold text-lg shadow-[0_0_20px_rgba(231,114,24,0.3)]"
                >
                  2023
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row w-full items-stretch relative z-10">
                <div className="w-full md:w-1/2 px-0 md:px-0 md:pr-14 flex items-center justify-center md:justify-end order-2 md:order-1 mt-8 md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-4 sm:p-5 md:p-8 hover:shadow-[0_15px_40px_rgba(231,114,24,0.1)] transition-all duration-300 relative group"
                  >
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 w-0 h-0 border-t-[12px] border-t-transparent border-l-[16px] border-l-white border-b-[12px] border-b-transparent drop-shadow-[3px_0_3px_rgba(0,0,0,0.03)]" />
                    <div className="md:hidden absolute -top-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-b-[12px] border-b-white border-r-[16px] border-r-transparent drop-shadow-[0_-3px_3px_rgba(0,0,0,0.03)]" />

                    <h3 className="text-2xl font-bold text-[#e77218] mb-3">
                      {t("Home.History2023")}
                    </h3>
                    <p className="text-gray-600 text-[15px] md:text-base leading-relaxed mb-5 text-justify">
                      {t("Home.History2023Text")}
                    </p>
                    <div className="p-4 bg-orange-50/70 rounded-xl border-l-4 border-[#e77218] transition-colors duration-300 group-hover:bg-orange-50">
                      <h4 className="text-base font-bold text-[#e77218] mb-2 flex items-center gap-2">
                        {t("Home.History2023Special")}
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed text-justify">
                        {t("Home.History2023SpecialText")}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2 px-0 md:px-0 md:pl-14 flex items-center justify-center md:justify-start order-1 md:order-2">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="w-full max-h-[250px] md:max-h-[350px] overflow-hidden rounded-2xl shadow-lg relative group"
                  >
                    <div className="absolute inset-0 bg-[#e77218]/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                    <img
                      src="/backgrounds/timeline.jpg"
                      alt="Timeline 2023"
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="relative mb-20 flex w-full pt-[74px] md:pt-0">
              <div className="absolute left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-14 h-14 flex justify-center items-center z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="bg-white border-4 border-[#e77218] text-[#e77218] w-full h-full rounded-full flex items-center justify-center font-extrabold text-lg shadow-[0_0_20px_rgba(231,114,24,0.3)]"
                >
                  2024
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row w-full items-stretch relative z-10">
                <div className="hidden md:flex w-full md:w-1/2 pr-14 items-center justify-end">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="w-full max-h-[350px] overflow-hidden rounded-2xl shadow-lg relative group"
                  >
                    <div className="absolute inset-0 bg-[#e77218]/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                    <img
                      src="/backgrounds/timeline.jpg"
                      alt="Timeline 2024"
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2 px-0 md:px-0 md:pl-14 flex items-center justify-center md:justify-start order-2 md:order-none mt-8 md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-4 sm:p-5 md:p-8 hover:shadow-[0_15px_40px_rgba(231,114,24,0.1)] transition-all duration-300 relative group"
                  >
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -left-4 w-0 h-0 border-t-[12px] border-t-transparent border-r-[16px] border-r-white border-b-[12px] border-b-transparent drop-shadow-[-3px_0_3px_rgba(0,0,0,0.03)]" />
                    <div className="md:hidden absolute -top-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-b-[12px] border-b-white border-r-[16px] border-r-transparent drop-shadow-[0_-3px_3px_rgba(0,0,0,0.03)]" />

                    <h3 className="text-2xl font-bold text-[#e77218] mb-3">
                      {t("Home.History2024")}
                    </h3>
                    <p className="text-gray-600 text-[15px] md:text-base leading-relaxed mb-5 text-justify">
                      {t("Home.History2024Text")}
                    </p>
                    <div className="p-4 bg-orange-50/70 rounded-xl border-l-4 border-[#e77218] transition-colors duration-300 group-hover:bg-orange-50">
                      <h4 className="text-base font-bold text-[#e77218] mb-2 flex items-center gap-2">
                        {t("Home.History2024Ganeshotsav")}
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed text-justify">
                        {t("Home.History2024GaneshotsavText")}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex md:hidden w-full px-0 items-center justify-center order-1">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="w-full max-h-[250px] overflow-hidden rounded-2xl shadow-lg relative group"
                  >
                    <div className="absolute inset-0 bg-[#e77218]/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                    <img
                      src="/backgrounds/timeline.jpg"
                      alt="Timeline 2024"
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="relative flex w-full pt-[74px] md:pt-0">
              <div className="absolute left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-14 h-14 flex justify-center items-center z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    delay: 0.2,
                  }}
                  className="bg-[#e77218] text-white w-full h-full rounded-full flex items-center justify-center font-extrabold text-2xl shadow-[0_0_0_6px_rgba(255,255,255,1),_0_0_20px_rgba(231,114,24,0.4)]"
                >
                  ∞
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row w-full items-stretch relative z-10">
                <div className="w-full md:w-1/2 px-0 md:px-0 md:pr-14 flex items-center justify-center md:justify-end order-2 md:order-1 mt-8 md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 p-4 sm:p-5 md:p-8 hover:shadow-[0_15px_40px_rgba(231,114,24,0.1)] transition-all duration-300 relative group"
                  >
                    <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-4 w-0 h-0 border-t-[12px] border-t-transparent border-l-[16px] border-l-white border-b-[12px] border-b-transparent drop-shadow-[3px_0_3px_rgba(0,0,0,0.03)]" />
                    <div className="md:hidden absolute -top-[12px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-b-[12px] border-b-white border-r-[16px] border-r-transparent drop-shadow-[0_-3px_3px_rgba(0,0,0,0.03)]" />

                    <h3 className="text-2xl font-bold text-[#e77218] mb-3">
                      {t("Home.HistoryConclusion")}
                    </h3>
                    <p className="text-gray-600 text-[15px] md:text-base leading-relaxed text-justify">
                      {t("Home.HistoryConclusionText")}
                    </p>
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2 px-0 md:px-0 md:pl-14 flex items-center justify-center md:justify-start order-1 md:order-2">
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="w-full max-h-[250px] md:max-h-[350px] overflow-hidden rounded-2xl shadow-lg relative group"
                  >
                    <div className="absolute inset-0 bg-[#e77218]/10 group-hover:bg-transparent transition-colors duration-300 z-10 pointer-events-none" />
                    <img
                      src="/backgrounds/timeline.jpg"
                      alt="Timeline Conclusion"
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 10, ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/backgrounds/timeline.jpg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e77218]/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 w-full text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,5vw,5rem)] font-extrabold mb-6 text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] tracking-wide leading-tight font-sans">
              {t("Home.RegistrationCTATitle")}
            </h2>
            <p className="text-xl md:text-3xl text-gray-200 max-w-[900px] mx-auto mb-12 font-medium drop-shadow-lg leading-relaxed">
              {t("Home.RegistrationCTAText")}
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/registration"
                className="inline-flex items-center justify-center px-6 md:px-9 py-2 md:py-3 bg-[#e77218] hover:bg-[#cf6412] text-white text-base md:text-lg font-extrabold rounded-full shadow-[0_10px_24px_rgba(231,114,24,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(231,114,24,0.55)] border-2 border-[#ffb16f]/45 hover:border-[#ffd0a6]/60 tracking-wide"
              >
                {t("Home.RegistrationCTAButton")}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
