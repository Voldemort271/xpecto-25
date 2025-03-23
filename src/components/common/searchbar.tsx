import React, {
  type ChangeEventHandler,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { api } from "@/trpc/react";
import Link from "next/link";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { debounce } from "@/lib/utils";
import { Share_Tech } from "next/font/google";
import { CursorContext } from "@/context/cursor-context";

const sharetech = Share_Tech({ weight: "400", subsets: ["latin"] });

interface SearchBarProps {
  userId: string; // Define userId as a string
}

const getHref = (event: { slug: string; type: string }) => {
  switch (event.type) {
    case "competition": return `/competitions/${event.slug}`;
    case "workshop": return `/workshops/${event.slug}`;
    case "pronite": return `/pronites/${event.slug}`;
    case "expos": return `/expos/${event.slug}`;
    default: return `#`;
  }
};

const SearchBar: React.FC<SearchBarProps> = ({ userId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showRegistered, setShowRegistered] = useState(true);
  const [showUnregistered, setShowUnregistered] = useState(true);
  const path = usePathname();
  const animationDelay = path === "/" ? 8 : 0;
  const { setIsHovered } = React.useContext(CursorContext);

  const { data: registeredEvents = [], isLoading: isLoadingRegistered } =
    api.event.getUserRegisteredEvents.useQuery(
      { userId },
      { enabled: !!userId },
    );

  const { data: searchResults = [], isLoading: isLoadingSearch } =
    api.event.searchEvents.useQuery(
      { query: debouncedQuery },
      {
        enabled: !!debouncedQuery,
        refetchOnWindowFocus: false,
      },
    );

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        // console.time(`searchEvents:${value}:client`);
        setDebouncedQuery(value);
      }, 300),
    [],
  );

  useEffect(() => {
    debouncedSetQuery(searchQuery);
    return () => debouncedSetQuery.cancel();
  }, [searchQuery, debouncedSetQuery]);

  useEffect(() => {
    if (searchResults && debouncedQuery) {
      // console.timeEnd(`searchEvents:${debouncedQuery}:client`);
    }
  }, [searchResults, debouncedQuery]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredResults = useMemo(() => {
    return searchResults.filter((event) => {
      const isRegistered = registeredEvents.some((reg) => reg.eventId === event.id);
      return (showRegistered && isRegistered) || (showUnregistered && !isRegistered);
    });
  }, [searchResults, registeredEvents, showRegistered, showUnregistered]);

  const handleFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, checked } = event.target;
    if (name === "registered") setShowRegistered(checked);
    else if (name === "unregistered") setShowUnregistered(checked);
  };

  // Determine if the query has completed
  const hasQueryCompleted = !!debouncedQuery && !isLoadingSearch && !isLoadingRegistered;

  return (
    <motion.div
      className={`relative w-full cursor-none flex-col items-center justify-center rounded-t-none border-b-2 border-amber-50 text-2xl font-normal text-amber-50 ${sharetech.className} tracking-tight`}
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
        placeholder={`Search events`}
        value={searchQuery}
        onChange={handleInputChange}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-16 w-full cursor-none rounded-none bg-neutral-900/[0.5] px-5 py-2 text-amber-50 outline-none backdrop-blur-sm"
      />

      <div className="absolute right-0 top-0 flex h-16 flex-col justify-center gap-1 border-x-2 border-amber-50 bg-neutral-600 px-5">
        <label
          className="mr-4 flex cursor-none items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            type="checkbox"
            name="registered"
            checked={showRegistered}
            onChange={handleFilterChange}
            className="form-checkbox h-4 w-4 rounded border-amber-50 text-amber-500 focus:ring-amber-500"
          />
          <span className="ml-2 text-base uppercase">Registered</span>
        </label>

        <label
          className="flex cursor-none items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <input
            type="checkbox"
            name="unregistered"
            checked={showUnregistered}
            onChange={handleFilterChange}
            className="form-checkbox h-4 w-4 rounded border-amber-50 text-amber-500 focus:ring-amber-500"
          />
          <span className="ml-2 text-base uppercase">Unregistered</span>
        </label>
      </div>

      <div className="absolute left-[-2px] top-16 w-full max-w-[600px] bg-neutral-900/[0.7] backdrop-blur-xl">
        {searchQuery && (
          <>
            {(isLoadingSearch || isLoadingRegistered || !debouncedQuery) ? (
              <p className="border-2 border-amber-50 px-5 py-2 text-lg text-amber-50">
                Loading...
              </p>
            ) : hasQueryCompleted && filteredResults.length > 0 ? (
              <ul className="max-h-60 list-none overflow-x-hidden overflow-y-scroll border-2 border-amber-50 p-2">
                {filteredResults.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={getHref(event)}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className="block w-full cursor-none px-5 py-1 transition-all duration-200 hover:bg-amber-50/[0.3]"
                      onClick={() => setSearchQuery("")}
                    >
                      {event.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : hasQueryCompleted && filteredResults.length === 0 ? (
              <p className="border-2 border-amber-50 px-5 py-2 text-lg text-amber-50">
                No results found.
              </p>
            ) : null}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;
