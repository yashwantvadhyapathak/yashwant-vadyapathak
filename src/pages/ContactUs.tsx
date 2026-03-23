import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone, Send, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    success: true,
    message: "",
  });

  const isMarathi = i18n.language === "mr";

  const toLocalNumbers = (text: string) => {
    if (isMarathi) {
      const marathiDigits = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
      return text.replace(/\d/g, (d) => marathiDigits[parseInt(d)]);
    }
    return text;
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[90px] pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-3 border border-primary/30 tracking-widest shadow-sm uppercase">
            {t("Contact.Badge") || "Get In Touch"}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,4vw,4rem)] font-extrabold text-primary tracking-wide font-sans mb-4 drop-shadow-sm">
            {t("Contact.Title") || "Contact Us"}
          </h1>
          <div className="mx-auto w-24 border-t-4 border-primary rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)] mb-4" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("Contact.Subtitle") ||
              "We'd love to hear from you. Have questions or want to collaborate? Reach out to our team."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-6 flex flex-col gap-8"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl shadow-orange-900/5 p-8 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 opacity-70"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {t("Contact.ReachOut") || "Contact Information"}
              </h2>
              <p className="text-gray-600 mb-8">
                {t("Contact.ReachOutDesc") ||
                  "Fill up the form and our team will get back to you within 24 hours."}
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: t("Contact.Location") || "Our Location",
                    detail: isMarathi
                      ? toLocalNumbers(
                          "यशवन सोसायटी, मान रोड, हिंजवडी, पुणे-४११०५७",
                        )
                      : "Yashone Society, Maan Road, Hinjewadi, Pune-411057",
                  },
                  {
                    icon: Phone,
                    title: t("Contact.Phone") || "Phone Number",
                    detail: toLocalNumbers(
                      import.meta.env.VITE_CONTACT_PHONE_DISPLAY ||
                        "+91 9921773172, +91 7972269030",
                    ),
                  },
                  {
                    icon: Mail,
                    title: t("Contact.Email") || "Email Address",
                    detail:
                      import.meta.env.VITE_CONTACT_EMAIL
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="p-3 bg-orange-50 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {t("Contact.SendMsg") || "Send us a Message"}
                </h3>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    const form = e.currentTarget;
                    const formData = new FormData(form);

                    formData.append("_template", "box");
                    formData.append(
                      "_subject",
                      "New Contact Inquiry - Yashwant Vadyapathak",
                    );
                    formData.append(
                      "_autoresponse",
                      "Thank you for contacting Yashwant Vadyapathak. We have received your message and will get back to you soon!",
                    );

                    try {
                      const email = import.meta.env.VITE_CONTACT_EMAIL;
                      const response = await fetch(
                        `https://formsubmit.co/ajax/${email}`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                          },
                          body: JSON.stringify(Object.fromEntries(formData)),
                        },
                      );

                      if (response.ok) {
                        setModalConfig({
                          isOpen: true,
                          success: true,
                          message: isMarathi
                            ? "संदेश यशस्वीरित्या पाठवला! आम्ही लवकरच तुमच्याशी संपर्क साधू."
                            : "Message sent successfully! We will get back to you soon.",
                        });
                        form.reset();
                      } else {
                        setModalConfig({
                          isOpen: true,
                          success: false,
                          message: isMarathi
                            ? "संदेश पाठवताना त्रुटी आली. कृपया नंतर पुन्हा प्रयत्न करा."
                            : "Error sending message. Please try again later.",
                        });
                      }
                    } catch (error) {
                      console.error("Form error:", error);
                      setModalConfig({
                        isOpen: true,
                        success: false,
                        message: isMarathi
                          ? "संदेश पाठवताना त्रुटी आली."
                          : "Error sending message.",
                      });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        {t("Contact.NameField") || "Full Name"}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-gray-50/50"
                        placeholder={t("Contact.PlaceholderName") || "John Doe"}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">
                        {t("Contact.EmailField") || "Email Address"}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-gray-50/50"
                        placeholder={
                          t("Contact.PlaceholderEmail") || "john@example.com"
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {t("Contact.MsgField") || "Message"}
                    </label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-gray-50/50 resize-none"
                      placeholder={
                        t("Contact.PlaceholderMsg") ||
                        "Write your message here..."
                      }
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} />{" "}
                    {isSubmitting
                      ? isMarathi
                        ? "पाठवत आहे..."
                        : "Sending..."
                      : t("Contact.SendBtn") || "Send Message"}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-6 flex flex-col gap-8 h-full"
          >
            <motion.div
              variants={itemVariants}
              className="w-full h-full min-h-[500px] bg-gray-200 rounded-3xl overflow-hidden shadow-lg border border-gray-100 relative group"
            >
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
              <iframe
                title="Google Map"
                src="https://maps.google.com/maps?q=YashOne+Maan+Hinjawadi&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen={false}
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-full h-2 ${
                  modalConfig.success ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <button
                onClick={() =>
                  setModalConfig({ ...modalConfig, isOpen: false })
                }
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div
                  className={`p-4 rounded-full mb-4 ${
                    modalConfig.success
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {modalConfig.success ? (
                    <CheckCircle2 size={40} />
                  ) : (
                    <X size={40} />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {modalConfig.success
                    ? isMarathi
                      ? "यशस्वी!"
                      : "Success!"
                    : isMarathi
                      ? "त्रुटी"
                      : "Error"}
                </h3>
                <p className="text-gray-600 mb-8">{modalConfig.message}</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setModalConfig({ ...modalConfig, isOpen: false })
                  }
                  className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${
                    modalConfig.success
                      ? "bg-green-500 hover:bg-green-600 shadow-green-500/30"
                      : "bg-red-500 hover:bg-red-600 shadow-red-500/30"
                  } shadow-lg`}
                >
                  {isMarathi ? "ठीक आहे" : "Okay"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUs;
