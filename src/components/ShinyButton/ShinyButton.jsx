import { motion } from "framer-motion";
import "./ShinyButton.css";

const ShinyButton = ({ text }) => {
  return (
    <motion.button
      className="p-1 my-1 rounded-full relative radial-gradient w-[100px] md:w-[150px] h-[40px] md:h-auto flex flex-col items-center justify-center"
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 15,
          mass: 0.1,
        },
      }}
    >
      <span className="text-gray-700 tracking-wide h-full w-full flex flex-col items-center justify-center relative linear-mask text-sm font-bold md:text-lg">
        {text}
      </span>
      <span className="block absolute inset-0 rounded-lg p-px linear-overlay" />
    </motion.button>
  );
};

export default ShinyButton;
