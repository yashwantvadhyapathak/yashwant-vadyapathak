import { useTranslation } from "react-i18next";
import { motion, type Variants } from "framer-motion";
import { MapPin, Music } from "lucide-react";

// Vibrant images representing our Vadan events
const abstractImages = [
  "/vadan-list/01_Hutatma_Babu_Genu.JPEG",
  "/vadan-list/02_Nana_Haud.PNG",
];

const VadansList = () => {
  const { t, i18n } = useTranslation();

  const locationsObj = t("Vadans.Locations", {
    returnObjects: true,
  }) as Record<string, string>;
  const vadansData = Object.values(locationsObj);

  // Function to convert normal numbers to Marathi numerals
  const toMarathiNumeral = (num: number) => {
    const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
    return num
      .toString()
      .split("")
      .map((digit) => marathiDigits[parseInt(digit)])
      .join("");
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[90px] pb-20 overflow-hidden">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-3 border border-primary/30 tracking-widest shadow-sm uppercase">
            {t("Vadans.Badge") || "Our Timeline"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,4vw,4rem)] font-extrabold text-primary tracking-wide font-sans mb-4 drop-shadow-sm">
            {t("Vadans.Title") || "Vadans List"}
          </h1>
          <div className="mx-auto w-24 border-t-4 border-primary rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)] mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("Vadans.Subtitle") ||
              "Records of our grand public performances and rallies."}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          /* We mix grid layout for a robust flow */
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {vadansData.map((location, idx) => {
            const imageSrc = abstractImages[idx % abstractImages.length];
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white flex flex-col rounded-2xl md:rounded-3xl shadow-md hover:shadow-2xl transition-all overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img
                    src={imageSrc}
                    alt={`Vadan location ${idx + 1}`}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  <div className="absolute top-4 left-4 bg-primary text-primary-foreground backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold shadow-lg border border-white/20 text-white">
                    {toMarathiNumeral(idx + 1)}
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col justify-between relative z-10 bg-white">
                  <div>
                    <div className="flex items-start gap-3 mb-2">
                      <MapPin className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight group-hover:text-primary transition-colors">
                        {location}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center text-sm font-medium text-gray-500">
                      <Music className="w-4 h-4 mr-1.5 text-primary" />
                      <span>
                        {i18n.language === "en"
                          ? "Public Vadan"
                          : "सार्वजनिक वादन"}
                      </span>
                    </div>
                    <span className="text-primary font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 duration-300">
                      {i18n.language === "en" ? "View" : "पहा"} &rarr;
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default VadansList;
