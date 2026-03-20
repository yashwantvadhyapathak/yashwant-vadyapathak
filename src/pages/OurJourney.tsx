import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SAFFRON = "#FF9933";
const SAFFRON_DEEP = "#e77218";
const TEXT_WARM = "#78350f";

const OurJourney = () => {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
      <section className="min-h-[50vh] pt-[100px] pb-16 md:py-24 bg-gradient-to-b from-[#FF9933] to-[#e77218] relative overflow-hidden flex flex-col justify-center items-center">
        <img
          src="/illustrations/drummer-left.svg"
          alt=""
          className="absolute left-[-2%] bottom-0 h-[40%] md:h-[60%] opacity-50 object-contain object-left-bottom pointer-events-none mix-blend-multiply"
        />
        <img
          src="/illustrations/drummer-right.svg"
          alt=""
          className="absolute right-[-2%] bottom-0 h-[40%] md:h-[60%] opacity-50 object-contain object-right-bottom pointer-events-none mix-blend-multiply"
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto mb-4 w-full max-w-xl border-t-2 border-white border-dashed opacity-80" />
            <h1 className="text-2xl sm:text-3xl md:text-[clamp(2rem,5vw,3.5rem)] font-extrabold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              {t("Home.Journey")}
            </h1>
            <p className="text-white/95 text-base md:text-lg mt-4 font-medium max-w-2xl mx-auto">
              {t("Home.HistoryTitle")}
            </p>
            <div className="mx-auto mt-4 w-full max-w-xl border-t-2 border-white border-dashed opacity-80" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-[#fffaf0] to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-[#FF9933]/5 to-transparent pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-3 border tracking-widest shadow-sm text-white"
              style={{
                backgroundColor: SAFFRON_DEEP,
                borderColor: "rgba(255,255,255,0.3)",
              }}
            >
              {t("Home.Journey")}
            </span>
            <h2
              className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-wide font-sans mb-4 drop-shadow-sm"
              style={{ color: SAFFRON_DEEP }}
            >
              {t("Home.HistoryTitle")}
            </h2>
            <div
              className="mx-auto w-16 border-t-4 rounded-full shadow-[0_2px_4px_rgba(255,153,51,0.3)]"
              style={{ borderColor: SAFFRON }}
            />
          </motion.div>

          <div className="relative max-w-[900px] mx-auto pb-10">
            <div
              className="absolute left-[23px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b rounded-full md:-translate-x-1/2 shadow-[0_0_8px_rgba(255,153,51,0.3)]"
              style={{
                background: `linear-gradient(to bottom, ${SAFFRON}, ${SAFFRON_DEEP}, rgba(231,114,24,0.3))`,
              }}
            />

            <div className="relative mb-16 flex flex-col md:flex-row items-start w-full justify-between">
              <div className="order-1 md:order-1 w-full md:w-[45%]" />
              <div className="absolute left-[24px] md:left-1/2 top-8 md:top-8 -translate-x-1/2 w-[48px] h-[48px] flex justify-center items-center z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-white w-full h-full rounded-full flex items-center justify-center font-bold text-sm lg:text-base shadow-[0_0_0_4px_rgba(255,255,255,1),_0_0_12px_rgba(255,153,51,0.4)]"
                  style={{
                    background: `linear-gradient(135deg, ${SAFFRON}, ${SAFFRON_DEEP})`,
                  }}
                >
                  2023
                </motion.div>
              </div>
              <div className="order-2 md:order-2 w-full md:w-[45%] pl-[60px] md:pl-10 md:pr-0">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white rounded-xl p-6 lg:p-8 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(255,153,51,0.15)] transition-all duration-300 relative group hover:-translate-y-1 border-b-4"
                  style={{ borderBottomColor: SAFFRON }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to bottom left, rgba(255,153,51,0.05), transparent)",
                    }}
                  />
                  <h3
                    className="text-xl md:text-2xl font-bold mb-3 relative z-10 text-left"
                    style={{ color: SAFFRON_DEEP }}
                  >
                    {t("Home.History2023")}
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed mb-4 font-medium relative z-10 text-left"
                    style={{ color: TEXT_WARM }}
                  >
                    {t("Home.History2023Text")}
                  </p>
                  <div
                    className="p-4 rounded-lg border relative z-10 text-left"
                    style={{
                      backgroundColor: "#fffaf0",
                      borderColor: "rgba(255,153,51,0.2)",
                    }}
                  >
                    <h4
                      className="text-base font-bold mb-1.5 flex items-center gap-2"
                      style={{ color: SAFFRON_DEEP }}
                    >
                      <span
                        className="w-2 h-2 rounded-full shadow-[0_0_4px_rgba(255,153,51,0.6)]"
                        style={{ backgroundColor: SAFFRON_DEEP }}
                      />
                      {t("Home.History2023Special")}
                    </h4>
                    <p
                      className="text-xs md:text-sm leading-relaxed"
                      style={{ color: TEXT_WARM }}
                    >
                      {t("Home.History2023SpecialText")}
                    </p>
                  </div>
                  <div className="absolute top-6 md:top-1/2 md:-mt-2 -left-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[16px] border-r-white border-b-[8px] border-b-transparent drop-shadow-[-2px_0_1px_rgba(0,0,0,0.01)] z-10" />
                </motion.div>
              </div>
            </div>

            <div className="relative mb-16 flex flex-col md:flex-row items-start w-full justify-between">
              <div className="order-2 md:order-1 w-full md:w-[45%] pl-[60px] md:pl-0 md:pr-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white rounded-xl p-6 lg:p-8 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(255,153,51,0.15)] transition-all duration-300 relative group hover:-translate-y-1 border-b-4"
                  style={{ borderBottomColor: SAFFRON }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to bottom right, rgba(255,153,51,0.05), transparent)",
                    }}
                  />
                  <h3
                    className="text-xl md:text-2xl font-bold mb-3 relative z-10 text-left"
                    style={{ color: SAFFRON_DEEP }}
                  >
                    {t("Home.History2024")}
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed mb-4 font-medium relative z-10 text-left"
                    style={{ color: TEXT_WARM }}
                  >
                    {t("Home.History2024Text")}
                  </p>
                  <div
                    className="p-4 rounded-lg border relative z-10 text-left"
                    style={{
                      backgroundColor: "#fffaf0",
                      borderColor: "rgba(255,153,51,0.2)",
                    }}
                  >
                    <h4
                      className="text-base font-bold mb-1.5 flex items-center gap-2"
                      style={{ color: SAFFRON_DEEP }}
                    >
                      <span
                        className="w-2 h-2 rounded-full shadow-[0_0_4px_rgba(255,153,51,0.6)]"
                        style={{ backgroundColor: SAFFRON_DEEP }}
                      />
                      {t("Home.History2024Ganeshotsav")}
                    </h4>
                    <p
                      className="text-xs md:text-sm leading-relaxed"
                      style={{ color: TEXT_WARM }}
                    >
                      {t("Home.History2024GaneshotsavText")}
                    </p>
                  </div>
                  <div className="hidden md:block absolute top-1/2 -mt-2 -right-4 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent drop-shadow-[2px_0_1px_rgba(0,0,0,0.02)] z-10" />
                  <div className="block md:hidden absolute top-6 -left-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[16px] border-r-white border-b-[8px] border-b-transparent drop-shadow-[-2px_0_1px_rgba(0,0,0,0.01)] z-10" />
                </motion.div>
              </div>
              <div className="absolute left-[24px] md:left-1/2 top-2 md:top-8 -translate-x-1/2 w-[48px] h-[48px] flex justify-center items-center z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                  className="text-white w-full h-full rounded-full flex items-center justify-center font-bold text-sm lg:text-base shadow-[0_0_0_4px_rgba(255,255,255,1),_0_0_12px_rgba(255,153,51,0.4)]"
                  style={{
                    background: `linear-gradient(135deg, ${SAFFRON}, ${SAFFRON_DEEP})`,
                  }}
                >
                  2024
                </motion.div>
              </div>
              <div className="order-1 md:order-2 w-full md:w-[45%]" />
            </div>

            <div className="relative flex flex-col md:flex-row items-start w-full justify-between">
              <div className="order-2 md:order-1 w-full md:w-[45%] pl-[60px] md:pl-0 md:pr-10">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="bg-white rounded-xl p-6 lg:p-8 shadow-[0_6px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(255,153,51,0.15)] transition-all duration-300 relative group hover:-translate-y-1 border-b-4"
                  style={{ borderBottomColor: SAFFRON }}
                >
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        "linear-gradient(to bottom right, rgba(255,153,51,0.05), transparent)",
                    }}
                  />
                  <h3
                    className="text-xl md:text-2xl font-bold mb-3 relative z-10 text-left"
                    style={{ color: SAFFRON_DEEP }}
                  >
                    {t("Home.HistoryConclusion")}
                  </h3>
                  <p
                    className="text-sm md:text-base leading-relaxed font-medium relative z-10 text-left"
                    style={{ color: TEXT_WARM }}
                  >
                    {t("Home.HistoryConclusionText")}
                  </p>
                  <div className="hidden md:block absolute top-1/2 -mt-2 -right-4 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent drop-shadow-[2px_0_1px_rgba(0,0,0,0.02)] z-10" />
                  <div className="block md:hidden absolute top-6 -left-4 w-0 h-0 border-t-[8px] border-t-transparent border-r-[16px] border-r-white border-b-[8px] border-b-transparent drop-shadow-[-2px_0_1px_rgba(0,0,0,0.01)] z-10" />
                </motion.div>
              </div>
              <div className="absolute left-[24px] md:left-1/2 top-2 md:top-8 -translate-x-1/2 w-[48px] h-[48px] flex justify-center items-center z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                  className="text-white w-full h-full rounded-full flex items-center justify-center font-bold text-xl lg:text-2xl shadow-[0_0_0_4px_rgba(255,255,255,1),_0_0_12px_rgba(255,153,51,0.4)]"
                  style={{
                    background: `linear-gradient(135deg, ${SAFFRON}, ${SAFFRON_DEEP})`,
                  }}
                >
                  ∞
                </motion.div>
              </div>
              <div className="order-1 md:order-2 w-full md:w-[45%]" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 w-full text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold mb-4"
            style={{ color: SAFFRON_DEEP }}
          >
            {t("Home.RegistrationCTATitle")}
          </h2>
          <p
            className="text-lg max-w-[600px] mx-auto mb-8 font-medium"
            style={{ color: TEXT_WARM }}
          >
            {t("Home.RegistrationCTAText")}
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/registration"
              className="inline-flex items-center justify-center px-8 py-4 text-white text-lg font-semibold rounded-md shadow-[0_4px_14px_0_rgba(255,153,51,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,153,51,0.4)]"
              style={{
                background: `linear-gradient(to right, ${SAFFRON}, ${SAFFRON_DEEP})`,
              }}
            >
              {t("Home.RegistrationCTAButton")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default OurJourney;
