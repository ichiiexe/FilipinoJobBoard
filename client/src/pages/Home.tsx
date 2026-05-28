import { motion, type Variants } from "framer-motion";

// Component or helper function.
function Home() {
  const bubbles = [
    {
      name: "Google",
      type: "company",
      logo: "/logos/google.png",
      size: "w-20 h-20",
      pos: "top-4 left-6",
      yRange: [-10, 10],
      duration: 4,
    },
    {
      name: "User 1",
      type: "user",
      logo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      size: "w-16 h-16",
      pos: "top-10 right-12",
      yRange: [-12, 12],
      duration: 5,
    },
    {
      name: "Facebook",
      type: "company",
      logo: "/logos/facebook.png",
      size: "w-24 h-24",
      pos: "top-36 left-28",
      yRange: [-8, 8],
      duration: 6,
    },
    {
      name: "User 2",
      type: "user",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      size: "w-14 h-14",
      pos: "bottom-32 left-4",
      yRange: [-15, 15],
      duration: 4.5,
    },
    {
      name: "Amazon",
      type: "company",
      logo: "/logos/amazon.png",
      size: "w-20 h-20",
      pos: "bottom-36 right-8",
      yRange: [-10, 10],
      duration: 5.5,
    },
    {
      name: "Spotify",
      type: "company",
      logo: "/logos/spotify.png",
      size: "w-16 h-16",
      pos: "bottom-10 left-36",
      yRange: [-7, 7],
      duration: 4.8,
    },
    {
      name: "User 3",
      type: "user",
      logo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      size: "w-18 h-18",
      pos: "bottom-6 right-24",
      yRange: [-11, 11],
      duration: 5.2,
    },
  ];

  const popularSearches = ["Remote", "Tech", "Marketing", "Design", "Finance"];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const bubbleVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="flex flex-col p-10 min-h-[80vh] justify-center">
      <section className="mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="md:col-span-3 flex flex-col justify-center">
          <span className="text-text font-bold tracking-wider text-xs uppercase mb-3 block">
            🚀 Explore Jobs or Post a Job
          </span>

          <h1 className="text-6xl lg:text-7xl font-extrabold font-heading mb-6 tracking-tight text-text leading-tight">
            FIND YOUR <br />
            <span className="text-primary">DREAM </span>JOB
          </h1>

          <p className="text-lg text-text-muted leading-relaxed max-w-xl">
            Your gateway to exciting job opportunities. Explore, connect, and
            find your dream job with us today.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-8 flex gap-3 bg-card border border-border shadow-sm rounded-3xl p-3 max-w-2xl">
            <input
              type="text"
              placeholder="Search for jobs..."
              className="flex-1 bg-input text-text placeholder:text-text-dim px-3 py-3 focus:outline-none"
            />
            <div className="w-px bg-border my-2"></div>
            <input
              type="text"
              placeholder="Location"
              className="bg-input text-text placeholder:text-text-dim px-3 py-3 focus:outline-none w-1/3"
            />
            <button className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-primary-hover transition-all shadow-md shadow-primary/20 font-semibold text-sm tracking-wide">
              Search
            </button>
          </div>

          {/* POPULAR SEARCHES */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-text-dim">
            <span className="font-medium">Popular:</span>
            {popularSearches.map((search) => (
              <button
                key={search}
                className="bg-surface hover:bg-elevated text-text-dim px-3 py-1 rounded-full text-xs transition-colors font-medium"
              >
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          className="md:col-span-2 relative h-112.5 w-full hidden md:block select-none"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bubbles.map((bubble, idx) => (
            <motion.div
              key={idx}
              variants={bubbleVariants}
              className={`absolute ${bubble.pos} ${bubble.size} cursor-pointer`}
              whileHover={{
                scale: 1.15,
                zIndex: 50,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-full h-full rounded-full bg-card border border-border p-2 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300"
                animate={{
                  y: bubble.yRange,
                }}
                transition={{
                  y: {
                    duration: bubble.duration,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  },
                }}
              >
                <img
                  src={bubble.logo}
                  alt={bubble.name}
                  className={`w-full h-full object-cover ${bubble.type === "company" ? "object-contain p-2" : "rounded-full"}`}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section>{/*  Jobs Listings or other content can go here */}</section>
    </div>
  );
}

export default Home;
