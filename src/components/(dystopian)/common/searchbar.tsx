import React, { useState, useMemo } from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

function debounce<T extends any[]>(func: (...args: T) => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: T) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

interface Registration {
  id: string;
  userId: string;
  eventId: string;
  planId: string;
}

interface Event {
  id: string;
  slug: string;
  name: string;
  competition?: any;
  expos?: any;
  pronite?: any;
  workshops?: any;
  registrations?: Registration[];
}

const getHref = (event: Event) => {

  if (event.competition) {
    return `/competitions/${event.slug}`;
  } else if (event.expos) {
    return `/expos/${event.slug}`;
  } else if (event.pronite) {
    return `/pronites/${event.slug}`;
  } else if (event.workshops) {
    return `/workshops/${event.slug}`;
  }
  return "#";
};

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRegistered, setShowRegistered] = useState(true);
  const [showUnregistered, setShowUnregistered] = useState(true);
  const [loading, setLoading] = useState(false); // Local loading state
  const path = usePathname();
  const animationDelay = path === "/" ? 8 : 0;

  // Use useQuery to fetch competitions based on searchQuery

  const { data: searchResults = [], refetch } = api.event.searchEvents.useQuery(
    { query: searchQuery },
    {
      enabled: !!searchQuery,
      refetchOnWindowFocus: false,
    },
  );

  // Debounced function to handle input changes
  const debouncedRefetch = debounce(async (query) => {
    setLoading(true);
    try {
      await refetch(); 
    } catch (error) {
      console.error(`Error fetching Event:`, error);
    } finally {
      setLoading(false);
    }
  }, 750);

  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      debouncedRefetch(value); 
    } else {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    if (name === "registered") {
      setShowRegistered(checked);
    } else if (name === "unregistered") {
      setShowUnregistered(checked);
    }
  };

  // Use useMemo to optimize filtered results calculation
  const filteredResults = useMemo(() => {
    return searchResults.filter((event) => {
      const isRegistered =
        event.registrations && event.registrations.length > 0;

      return (
        (showRegistered && isRegistered) || (showUnregistered && !isRegistered)
      );
    });
  }, [searchResults, showRegistered, showUnregistered]);

  return (
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
        placeholder={`Search Events...`}
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full rounded-none bg-[#242424] px-5 py-2 text-amber-50"
      />


      <div className="absolute text-amber-50 z-50 -translate-y-12 block right-72">
        <label className="mr-4 flex cursor-pointer items-center">
          <input
            type="checkbox"
            name="registered"
            checked={showRegistered}
            onChange={handleFilterChange}
            className="form-checkbox h-4 w-4 rounded border-amber-50 text-amber-500 focus:ring-amber-500"
          />
          <span className="ml-2 text-base">Registered Events</span>
        </label>

        <label className="flex cursor-pointer items-center">
          <input
            type="checkbox"
            name="unregistered"
            checked={showUnregistered}
            onChange={handleFilterChange}
            className="form-checkbox h-4 w-4 rounded border-amber-50 text-amber-500 focus:ring-amber-500"
          />
          <span className="ml-2 text-base">Unregistered Events</span>
        </label>
      </div>

      <div className="relative">
        {" "}
        {searchQuery ? (
          loading ? (
            <p className="bg-[#24242479] px-2 text-xl text-amber-50">
              Loading...
            </p>
          ) : filteredResults?.length > 0 ? (
            <ul className="max-h-60 list-none overflow-x-hidden overflow-y-scroll">
              {filteredResults.map((event) => (
                <li key={event.id}>
                  <Link
                    href={getHref(event)}
                    className="duration-250 block w-full border-b-2 border-transparent bg-[#242424] p-0.5 pl-6 pr-4 text-2xl text-amber-50 transition-transform ease-in-out hover:scale-[1.01] hover:border-amber-50 hover:bg-[#2a2a2a] hover:shadow-lg"
                    onClick={() => {
                      setSearchQuery("");
                    }}
                  >
                    {event.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="bg-[#241919] pl-2 text-2xl text-amber-50">
              No results found.
            </p>
          )
        ) : null}{" "}
      </div>
    </motion.div>
  );
};

export default SearchBar;
