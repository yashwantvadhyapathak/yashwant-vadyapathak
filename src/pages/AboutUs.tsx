import { useTranslation } from "react-i18next";
import { motion, animate, useInView, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Users,
  Award,
  Star,
  History,
} from "lucide-react";

const toMarathiNumber = (numStr: string) => {
  const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  return numStr
    .split("")
    .map((char) => {
      if (char >= "0" && char <= "9") {
        return marathiDigits[parseInt(char)];
      }
      return char;
    })
    .join("");
};

const AnimatedCounter = ({
  from = 0,
  to,
  isMarathi,
}: {
  from?: number;
  to: number;
  isMarathi: boolean;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            const numStr = Math.round(value).toString();
            ref.current.textContent = isMarathi
              ? toMarathiNumber(numStr)
              : numStr;
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, inView, isMarathi]);

  return (
    <span ref={ref}>{isMarathi ? toMarathiNumber(from.toString()) : from}</span>
  );
};

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end 80%"],
  });
  const isMarathi = i18n.language === "mr";

  const instruments = [
    {
      name: isMarathi ? "ढोल" : "Dhol",
      desc: t("About.Dhol"),
      short: isMarathi ? "मोठा आणि खोल" : "Loud & Deep",
      img: "/instruments/gen_dhol.png",
      color: "from-orange-500 to-red-600",
    },
    {
      name: isMarathi ? "ताशा" : "Tasha",
      desc: t("About.Tasha"),
      short: isMarathi ? "तीक्ष्ण आणि भेदक" : "Sharp & Piercing",
      img: "/instruments/gen_tasha.png",
      color: "from-amber-400 to-orange-500",
    },
    {
      name: isMarathi ? "ध्वज" : "Dhwaj",
      desc: t("About.Dhwaj"),
      short: isMarathi ? "उंच आणि अभिमानाने" : "High & Proud",
      img: "/instruments/gen_dhwaj.png",
      color: "from-saffron-500 to-orange-600",
    },
    {
      name: isMarathi ? "झांज" : "Zanj",
      desc: t("About.Zanj"),
      short: isMarathi ? "तालबद्ध वादन" : "Rhythmic Clashes",
      img: "/instruments/gen_zanj.png",
      color: "from-yellow-400 to-amber-500",
    },
    {
      name: isMarathi ? "संबाळ" : "Sambal",
      desc: t("About.Sambal"),
      short: isMarathi ? "दुहेरी ताल" : "Twin Beats",
      img: "/instruments/gen_sambal.png",
      color: "from-orange-400 to-red-500",
    },
  ];

  const values = [
    { icon: Heart, title: t("About.V1"), desc: t("About.V1Text") },
    { icon: Shield, title: t("About.V2"), desc: t("About.V2Text") },
    { icon: Users, title: t("About.V3"), desc: t("About.V3Text") },
  ];

  const stats = [
    { num: 10, label: t("About.StatExperience"), icon: History },
    { num: 250, label: t("About.StatFamily"), icon: Users },
    { num: 15, label: t("About.StatAwards"), icon: Award },
    { num: 50, label: isMarathi ? "सादरीकरणे" : "Performances", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-[90px] pb-20 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-3 border border-primary/30 tracking-widest shadow-sm uppercase">
            {t("About.Badge")}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,4vw,4rem)] font-extrabold text-primary tracking-wide font-sans mb-4 drop-shadow-sm">
            {t("About.Title")}
          </h1>
          <div className="mx-auto w-24 border-t-4 border-primary rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)] mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-6">
            {isMarathi
              ? "आम्ही केवळ एक पथक नाही, आम्ही ढोल-ताशाच्या दैवी नादाने जोडलेले एक मोठे, चैतन्यमय कुटुंब आहोत."
              : "We are not just a pathak; we are a massive, vibrant family bound by the divine rhythm of Dhol & Tasha."}
          </p>
        </motion.div>
      </div>

      <section className="relative z-20 -mt-10 px-6">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-8 md:p-12 border border-orange-100 flex flex-wrap justify-between items-center gap-8"
          >
            {stats.map((st, i) => (
              <div
                key={i}
                className="flex flex-col items-center flex-1 min-w-[150px] group"
              >
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white shadow-[0_4px_10px_rgba(217,119,6,0.15)]">
                  <st.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-primary mb-1 inline-flex items-baseline">
                  <AnimatedCounter to={st.num} isMarathi={isMarathi} />
                  <span className="text-3xl font-bold ml-1">+</span>
                </h3>
                <p className="text-gray-500 font-semibold text-sm uppercase tracking-wider text-center mt-2">
                  {st.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgba(217,119,6,0.12)] border border-orange-50 relative overflow-hidden flex flex-col items-start transition-shadow duration-300"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <Target className="w-14 h-14 text-primary mb-6 relative z-10" />
            <h2 className="text-3xl font-bold text-primary mb-4 relative z-10">
              {t("About.Mission")}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed relative z-10 font-medium text-justify">
              {t("About.MissionText")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group bg-gradient-to-br from-primary to-orange-600 p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(217,119,6,0.25)] relative overflow-hidden text-white flex flex-col items-start transition-shadow duration-300"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <Eye className="w-14 h-14 text-orange-100 mb-6 relative z-10" />
            <h2 className="text-3xl font-bold mb-4 relative z-10 text-white">
              {t("About.Vision")}
            </h2>
            <p className="text-lg text-orange-50 leading-relaxed relative z-10 font-medium text-justify">
              {t("About.VisionText")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-12 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12 relative">
            <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-primary tracking-wide mb-4 drop-shadow-sm">
              {t("About.ValuesTitle")}
            </h2>
            <div className="w-24 border-t-4 border-primary mx-auto rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgba(217,119,6,0.15)] border border-orange-50 hover:-translate-y-2 transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-primary mb-6 transition-transform hover:scale-110 shadow-sm border border-primary/10">
                  <v.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-4 group-hover:text-primary transition-colors">
                  {v.title}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-primary tracking-wide mb-4 drop-shadow-sm">
              {t("About.History")}
            </h2>
            <div className="w-24 border-t-4 border-primary mx-auto rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)] mb-8" />
            <p className="text-[15px] md:text-lg text-gray-600 leading-relaxed font-medium text-justify md:text-center">
              {t("About.HistoryText")}
            </p>
          </div>

          <div ref={timelineRef} className="relative">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
              className="absolute left-1/2 -translate-x-1/2 top-4 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 rounded-full"
            />

            {[
              {
                year: isMarathi ? "शिवजयंती २०२३" : "Shivjayanti 2023",
                title: isMarathi ? "स्थापनेची संकल्पना" : "The Spark",
                desc: isMarathi
                  ? "यशवन सोसायटी मधील रहिवाशांना शिवजयंती ढोल ताशाच्या गजरात साजरी करायची होती पण कोणतेही पथक उपलब्ध नव्हते. हा घाव जिव्हारी घेऊन दत्ता सुकाळकर, सुमित पाठक आणि मयुर हिरे यांच्या मनात पथक स्थापनेचा विचार आला. IT कर्मचाऱ्यांचे अपूर्ण स्वप्न पूर्ण करण्यासाठी त्यांनी हे शिवधनुष्य उचलले."
                  : "The desire to celebrate Shivjayanti with Dhol Tasha sparked the idea. With no pathaks available in Hinjawadi, Datta Sukalkar, Sumit Pathak, and Mayur Hire decided to form one, fulfilling the childhood dreams of many IT professionals.",
                img: "https://images.unsplash.com/photo-1549556150-1c58619be4ad?auto=format&fit=crop&w=800&q=80",
              },
              {
                year: isMarathi ? "२२ मार्च २०२३" : "22 March 2023",
                title: isMarathi ? "पथकाची स्थापना" : "The Foundation",
                desc: isMarathi
                  ? "पुण्यातील नामवंत बिल्डर श्री. सर्वेश जावडेकर यांनी आर्थिक मदत केली आणि गुढीपाडव्याच्या शुभ मुहूर्तावर पथकाची स्थापना झाली. 'अभेद्य' पथकाच्या वादकांचे मार्गदर्शन लाभल्यामुळे आम्ही ढोल ताशा शिकलो आणि इतरांनाही शिकवण दिली."
                  : "With financial support from renowned builder Mr. Sarvesh Javdekar, the pathak was founded on Gudi Padwa. Under the guidance of Pune's 'Abhedya' pathak, we learned the art of Dhol Tasha and started teaching others.",
                img: "https://images.unsplash.com/photo-1629854492476-dcb999be5bd3?auto=format&fit=crop&w=800&q=80",
              },
              {
                year: isMarathi ? "सद्यस्थिती" : "Present",
                title: isMarathi ? "न संपणारा प्रवास" : "An Endless Journey",
                desc: isMarathi
                  ? "यशवंत वाद्यपथक हे स्वप्नातून सत्यात उतरवलेलं एक शिवधनुष्य आहे. चौथ्या वर्षात पदार्पण करत असताना, अनेक कलाकारांची कला प्रकाशझोतात आणण्याचा हा प्रवास आता अविरत सुरू आहे."
                  : "Yashwant Vadyapathak is a dream turned reality by the residents. Entering its fourth year, the pathak continues its never-ending journey, bringing the talent of many artists into the limelight.",
                img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-20 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""} pt-[40px] md:pt-0`}
              >
                <div className="absolute left-1/2 top-0 md:top-1/2 -translate-y-0 md:-translate-y-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full -translate-x-1/2 z-20 shadow-[0_0_15px_rgba(217,119,6,0.3)]" />

                <div
                  className={`w-full md:w-1/2 px-0 md:px-0 group ${i % 2 !== 0 ? "md:text-left" : "md:text-right"} order-2 md:order-none`}
                >
                  <div className="bg-white/95 md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none relative z-10 shadow-sm md:shadow-none border border-orange-50 md:border-transparent backdrop-blur-sm md:backdrop-blur-none">
                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary font-bold rounded-full mb-4 md:text-lg border border-primary/20">
                      {item.year}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-text-main mb-3 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p
                      className={`text-gray-600 text-[15px] md:text-lg leading-relaxed text-justify ${i % 2 !== 0 ? "md:text-left" : "md:text-right"}`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-0 md:px-0 order-1 md:order-none">
                  <div className="rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative z-10 bg-white aspect-[4/3] group cursor-pointer border border-gray-100">
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white/50 px-6 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] mix-blend-multiply pointer-events-none" />

        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold text-primary tracking-wide mb-4 drop-shadow-sm">
              {t("About.Instruments")}
            </h2>
            <div className="w-24 border-t-4 border-primary mx-auto rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)] mb-8" />
            <p className="text-[15px] md:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              {isMarathi
                ? "लाकूड, धातू आणि शुद्ध भक्तीने तयार केलेली महाराष्ट्राची स्पंदने."
                : "The heartbeat of Maharashtra, crafted with wood, metal, skin, and pure devotion."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10 w-full">
            {instruments.map((inst, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 cursor-pointer w-full bg-slate-50 hover:shadow-[0_15px_40px_rgba(217,119,6,0.15)] transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1/2 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none" />
                  <img
                    src={inst.img}
                    alt={inst.name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute -bottom-6 right-6 w-12 h-12 rounded-full border-4 border-white bg-orange-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all z-20 shadow-md">
                    <span className="text-xl font-bold">
                      {inst.name.charAt(0)}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1/2 p-8 flex flex-col justify-center bg-white z-20">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

                  <p className="text-orange-500 font-bold tracking-widest uppercase text-xs mb-2">
                    {inst.short}
                  </p>
                  <h3 className="text-3xl font-black text-text-main mb-3 group-hover:text-primary transition-colors">
                    {inst.name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                    {inst.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="text-center text-primary mb-12 text-[2.5rem] font-bold">
              {t("Members.SpecialThanksTitle")}
            </h2>
            <div className="flex flex-col md:flex-row bg-gray-50 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex-1 bg-[#a6b0c6] flex justify-center items-end pt-8">
                <img
                  src="/special-thanks/one.jpg"
                  alt={t("Members.SarveshName")}
                  className="w-full object-contain max-h-[500px] object-bottom"
                />
              </div>
              <div className="flex-[1.2] p-12 flex flex-col justify-center">
                <h3 className="text-[1.75rem] font-semibold mb-6 text-gray-800">
                  {t("Members.SarveshName")}
                </h3>
                <p className="mb-5 text-gray-600 leading-relaxed text-justify">
                  {t("Members.SarveshDesc1")}
                </p>
                <p className="mb-5 text-gray-600 leading-relaxed text-justify">
                  {t("Members.SarveshDesc2")}
                </p>
                <p className="text-gray-600 leading-relaxed text-justify">
                  {t("Members.SarveshDesc3")}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <h2 className="text-center text-primary mb-12 text-[2.5rem] font-bold">
              {t("Members.CooperationTitle")}
            </h2>
            <div className="flex flex-col md:flex-row-reverse bg-gray-50 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex-1 flex">
                <img
                  src="/special-thanks/two.jpg"
                  alt={t("Members.CooperationTitle")}
                  className="w-full h-full object-cover min-h-[350px]"
                />
              </div>
              <div className="flex-[1.2] p-12 flex flex-col justify-center">
                <p className="mb-6 text-gray-600 leading-[1.9] text-justify text-[1.05rem]">
                  {t("Members.CooperationDesc1")}
                </p>
                <p className="text-gray-600 leading-[1.9] text-justify font-semibold text-[1.05rem]">
                  {t("Members.CooperationDesc2")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
