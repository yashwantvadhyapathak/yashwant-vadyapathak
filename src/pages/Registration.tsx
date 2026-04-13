import { useTranslation } from "react-i18next";
import {
  AlertCircle,
  UserPlus,
  CheckCircle2,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  name,
  options,
  placeholder,
  required,
}: {
  name: string;
  options: { label: string; value: string }[];
  placeholder: string;
  required?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || placeholder;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <select
        name={name}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        required={required}
        className="absolute bottom-1/2 left-1/2 -z-10 w-1 h-1 opacity-0 pointer-events-none"
        tabIndex={-1}
      >
        <option value="" disabled></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl border border-gray-200 transition-all outline-none bg-gray-50/50 cursor-pointer flex justify-between items-center ${
          isOpen
            ? "ring-2 ring-primary/20 border-primary"
            : "focus:ring-2 focus:ring-primary/20 focus:border-primary"
        }`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className={selected ? "text-gray-900" : "text-gray-500"}>
          {selectedLabel}
        </span>
        <ChevronDown
          className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  setSelected(option.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  selected === option.value
                    ? "bg-primary text-white font-medium"
                    : "text-gray-700 hover:bg-primary hover:text-white"
                }`}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Registration = () => {
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    success: true,
    message: "",
  });
  const isMarathi = i18n.language === "mr";

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
    <div className="min-h-screen bg-gray-50 pt-[90px] pb-20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-primary/5 rounded-bl-full -z-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-yellow-500/5 rounded-tr-full -z-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-bold mb-3 border border-primary/30 tracking-widest shadow-sm uppercase">
            {t("Registration.Title")}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[clamp(2.5rem,4vw,4rem)] font-extrabold text-primary tracking-wide font-sans mb-4 drop-shadow-sm">
            {t("Registration.Header")}
          </h1>
          <div className="mx-auto w-24 border-t-4 border-primary rounded-full shadow-[0_2px_4px_rgba(217,119,6,0.3)] mb-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                <AlertCircle size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                {t("Registration.Rules")}
              </h2>
            </div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-xl shadow-orange-900/5 p-8 border border-orange-100/50 relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 opacity-70"></div>

              <ul className="space-y-5 text-gray-700">
                {[
                  t("Registration.Rule1"),
                  t("Registration.Rule2"),
                  t("Registration.Rule3"),
                  t("Registration.Rule4"),
                  t("Registration.Rule5"),
                  t("Registration.Rule6"),
                  t("Registration.Rule7"),
                ].map((rule, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2
                      className="text-primary shrink-0 mt-1"
                      size={20}
                    />
                    <span className="leading-relaxed">{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="lg:col-span-7"
          >
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-3xl shadow-xl shadow-orange-900/10 p-8 md:p-10 border border-gray-100 h-full"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <UserPlus size={24} />
                </div>
                {t("Registration.Form")}
              </h3>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);

                  const form = e.currentTarget;
                  const formData = new FormData(form);

                  formData.append("date", new Date().toLocaleString());

                  const searchParams = new URLSearchParams();
                  formData.forEach((value, key) => {
                    searchParams.append(key, value.toString());
                  });

                  const GOOGLE_SCRIPT_URL = import.meta.env
                    .VITE_REGISTRATION_SCRIPT_URL;
                  try {
                    const response = await fetch(GOOGLE_SCRIPT_URL, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: searchParams.toString(),
                    });

                    const result = await response.json();
                    console.log("Result", result);

                    if (result.status === "duplicate") {
                      setModalConfig({
                        isOpen: true,
                        success: false,
                        message: isMarathi
                          ? "हा मोबाईल नंबर आधीच नोंदणीकृत आहे. कृपया दुसरा मोबाईल नंबर वापरा."
                          : "You have already submitted the form with this phone number. Please use a different phone number.",
                      });
                    } else {
                      setModalConfig({
                        isOpen: true,
                        success: true,
                        message: isMarathi
                          ? "नोंदणी यशस्वीरित्या पूर्ण झाली! आम्ही लवकरच आपल्याशी संपर्क साधू."
                          : "Registration submitted successfully! We will get in touch with you soon.",
                      });

                      form.reset();
                    }
                  } catch (error) {
                    console.error("Form submission error:", error);

                    setModalConfig({
                      isOpen: true,
                      success: false,
                      message: isMarathi
                        ? "अर्ज सबमिट करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा."
                        : "Error submitting the form. Please try again.",
                    });
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    {t("Registration.FullName")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-gray-50/50"
                    placeholder={
                      isMarathi ? "पहिले नाव, आडनाव" : "First Name, Last Name"
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {t("Registration.Age")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-gray-50/50"
                      min="1"
                      max="120"
                      placeholder={isMarathi ? "उदा. १८" : "e.g. 18"}
                      required
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /^0+|[^0-9]/g,
                          "",
                        );

                        if (parseInt(e.currentTarget.value) > 120) {
                          e.currentTarget.value = "120";
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2 relative z-50">
                    <label className="text-sm font-semibold text-gray-700">
                      {t("Registration.Gender")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      name="gender"
                      required
                      placeholder={isMarathi ? "लिंग निवडा" : "Select Gender"}
                      options={[
                        { label: t("Registration.Male"), value: "Male" },
                        { label: t("Registration.Female"), value: "Female" },
                        { label: t("Registration.Other"), value: "Other" },
                      ]}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">
                      {t("Registration.Phone")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-4 text-gray-500 font-semibold border-r border-gray-200 pr-3">
                        {isMarathi ? "+९१" : "+91"}
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        className="w-full pl-16 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-gray-50/50"
                        required
                        placeholder={isMarathi ? "००००००००००" : "0000000000"}
                        pattern="[0-9]{10}"
                        maxLength={10}
                        minLength={10}
                        onInput={(e) => {
                          e.currentTarget.value = e.currentTarget.value.replace(
                            /[^0-9]/g,
                            "",
                          );
                        }}
                        title={
                          isMarathi
                            ? "कृपया १० अंकी मोबाईल नंबर टाका"
                            : "Please enter a 10-digit mobile number"
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2 relative z-40">
                    <label className="text-sm font-semibold text-gray-700">
                      {t("Registration.Instrument")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      name="instrument"
                      required
                      placeholder={
                        isMarathi ? "वाद्य निवडा" : "Select Instrument"
                      }
                      options={[
                        { label: isMarathi ? "ढोल" : "Dhol", value: "Dhol" },
                        { label: isMarathi ? "ताशा" : "Tasha", value: "Tasha" },
                        { label: isMarathi ? "ध्वज" : "Dhwaj", value: "Dhwaj" },
                        { label: isMarathi ? "झांज" : "Zanj", value: "Zanj" },
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    {t("Registration.Experience")}
                  </label>
                  <textarea
                    name="experience"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-gray-50/50 resize-none"
                    placeholder={
                      t("Registration.ExpPlaceholder") ||
                      "Any previous experience?"
                    }
                    rows={4}
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 disabled:opacity-70 disabled:cursor-not-allowed bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  <UserPlus size={20} />{" "}
                  {isSubmitting
                    ? isMarathi
                      ? "सबमिट करत आहे..."
                      : "Submitting..."
                    : t("Registration.Submit")}
                </motion.button>
              </form>
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

export default Registration;
