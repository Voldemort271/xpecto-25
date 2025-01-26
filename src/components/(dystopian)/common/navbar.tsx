"use client";

import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/navbar.module.css";
import NavMobile from "@/components/(dystopian)/common/nav-mobile";
import { useCurrentUser } from "@/lib/utils";
import MarqueeContainer from "@/components/(dystopian)/common/marquee-container";
import { CursorContext } from "@/context/cursor-context";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { api } from "@/trpc/react";
import Link from "next/link";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const DystopianNav = () => {
  const [toggle, setToggle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false); // Local loading state
  const { CurrentUser } = useCurrentUser();
  const { setIsHovered } = useContext(CursorContext);
  const path = usePathname();
  const animationDelay = path === "/" ? 8 : 0;

  // Use useQuery to fetch competitions based on searchQuery
  const { data: searchResults, refetch } =
    api.competition.searchCompetitions.useQuery(
      { query: searchQuery },
      {
        enabled: !!searchQuery,
        refetchOnWindowFocus: false,
      },
    );

  // Debounced function to handle input changes
  const debouncedRefetch = debounce(async (query) => {
    setLoading(true); // Set loading to true when starting a new search
    try {
      await refetch(); // Await refetch to ensure we can catch any errors
    } catch (error) {
      console.error("Error fetching competitions:", error); // Log any errors
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  }, 600); // Adjust delay as needed

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      debouncedRefetch(value); // Call the debounced function only if there's a value
    } else {
      setLoading(false); // Reset loading if search query is empty
    }
  };

  return (
    <motion.div
      className={styles.navContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={styles.brandContainer}
        initial={{ translateY: -100, opacity: 0 }}
        animate={{ translateY: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: animationDelay + 0.25 }}
      >
        <div className="text-4xl font-medium uppercase">xpecto &apos;25</div>
        <div className="text-sm font-normal uppercase leading-5">
          indian institute of technology, mandi
        </div>
      </motion.div>

      <div className="hidden h-full w-full grid-cols-6 grid-rows-2 sm:grid">
        {CurrentUser?.id !== "" ? (
          <motion.div
            className={`relative z-10 col-span-6 flex w-full items-center justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-[#8B8981]`}
            initial={{ translateY: -100 }}
            animate={{ translateY: 0 }}
            transition={{ duration: 0.5, delay: animationDelay + 0.5 }}
          >
            <div className="absolute left-0 top-1/2 h-full w-full cursor-none flex-col items-center justify-center text-4xl font-normal uppercase text-neutral-900">
              <MarqueeContainer
                href={`/profile`}
                text={[
                  "welcome back",
                  CurrentUser?.name ?? "user",
                  "welcome back",
                  CurrentUser?.name ?? "user",
                ]}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            className={`relative z-10 col-span-6 flex w-full items-center justify-center overflow-clip border-2 border-l-0 border-amber-50 bg-[#8B8981]`}
            initial={{ translateY: -100 }}
            animate={{ translateY: 0 }}
            transition={{
              duration: 0.5,
              delay: animationDelay + 0.5,
              ease: "linear",
            }}
          >
            <div className="absolute left-0 top-1/2 h-full w-full cursor-none flex-col items-center justify-center text-4xl font-normal uppercase text-neutral-900">
              <MarqueeContainer
                href={`/sign-in`}
                text={[
                  "login to be cool",
                  "cool stuff i promise",
                  "please trust me",
                  "login to xperience xpecto",
                ]}
              />
            </div>
          </motion.div>
        )}
        <motion.div
          className="absolute left-auto top-1/2 h-full w-full cursor-none flex-col items-center justify-center rounded-t-none text-2xl font-normal uppercase text-neutral-900"
          initial={{ translateY: -160 }}
          animate={{ translateY: 0 }}
          transition={{
            duration: 0.5,
            delay: animationDelay + 0.6,
            ease: "easeOut",
          }}
        >
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full rounded-none bg-[#242424] px-5 py-2 text-amber-50"
          />
          <div className="relative mr-2">
            {" "}
            {/* Added overflow-hidden */}
            {searchQuery ? (
              loading ? ( // Check if the custom loading state is true
                <p className="te bg-[#24242479] px-2 text-3xl text-amber-50">
                  Loading...
                </p>
              ) : searchResults?.length > 0 ? (
                <ul className="max-h-60 list-none overflow-y-scroll overflow-x-hidden ">
                  {/* Use an unordered list */}
                  {searchResults.map((competition) => (
                    <li key={competition.id} className="">
                      {" "}
                      {/* Added margin-bottom for spacing */}
                      <Link
                        href={`/competitions/${competition.competitionDetails.slug}`}
                        className="duration-250 block w-full border-b-2 border-transparent bg-[#242424] p-0.5 pl-6 pr-4 text-3xl text-amber-50 transition-transform ease-in-out hover:scale-[1.01] hover:border-amber-50 hover:bg-[#2a2a2a] hover:shadow-lg"
                        onClick={() => {
                          setSearchQuery("");
                        }}
                      >
                        {competition.competitionDetails.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="bg-[#241919] pl-2 text-3xl text-white">
                  No results found.
                </p> // Message when no results match the query
              )
            ) : null}{" "}
            {/* Render nothing if searchQuery is empty */}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="flex h-full cursor-none flex-col items-end justify-center bg-amber-50 p-5 text-4xl font-bold uppercase text-neutral-900 sm:hidden"
        onClick={() => setToggle(!toggle)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ translateX: -1024 }}
        animate={{ translateX: 0 }}
        transition={{ duration: 0.5, delay: animationDelay + 0.5 }}
      >
        {toggle ? (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 13H16V14H17V15H18V16H19V17H20V18H21V19H22V20H21V21H20V22H19V21H18V20H17V19H16V18H15V17H14V16H13V15H11V16H10V17H9V18H8V19H7V20H6V21H5V22H4V21H3V20H2V19H3V18H4V17H5V16H6V15H7V14H8V13H9V11H8V10H7V9H6V8H5V7H4V6H3V5H2V4H3V3H4V2H5V3H6V4H7V5H8V6H9V7H10V8H11V9H13V8H14V7H15V6H16V5H17V4H18V3H19V2H20V3H21V4H22V5H21V6H20V7H19V8H18V9H17V10H16V11H15V13Z"
              fill="#171717"
            />
          </svg>
        ) : (
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M22 11H23V13H22V14H2V13H1V11H2V10H22V11Z"
              fill="#171717"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M22 19H23V21H22V22H2V21H1V19H2V18H22V19Z"
              fill="#171717"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <motion.path
              d="M23 3V5H22V6H2V5H1V3H2V2H22V3H23Z"
              fill="#171717"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 2 }}
            />
          </svg>
        )}
      </motion.div>
      <NavMobile toggler={toggle} setToggler={setToggle} />
    </motion.div>
  );
};

export default DystopianNav;
