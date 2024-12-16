"use client";

import React, {
  createContext,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import type { User } from "@prisma/client";
import { api } from "@/trpc/react"; // Import the api object

interface SharedContextProps {
  CurrentUser?: User;
  setCurrentUser?: React.Dispatch<React.SetStateAction<User>>;
}

export const SharedContext = createContext<SharedContextProps | undefined>(
  undefined,
);

const SharedContextProvider = ({ children }: { children: ReactNode }) => {
  const url = usePathname();
  // const router = useRouter();

  const [currentUser, setCurrentUser] = useState<User>({
    name: "",
    email: "",
    clerkId: "",
    college_name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
  });
  const { user: clerkUser, isLoaded } = useUser();
  const createUserMutation = api.user.createUser.useMutation();
  const createUserMutationRef = useRef(createUserMutation); // Use a ref to store the mutation function

  const [collName, setCollName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const time = setTimeout(() => {
        const res = api.post.getCollNameFromEmail.useQuery(
          clerkUser!.primaryEmailAddress!.emailAddress,
        );
        if (typeof res == "string") {
          setCollName(res);
        }
      }, 500);

      if (!isLoaded || !clerkUser) {
        return; // Wait until the user data is loaded
        // if (!clerkUser) {
        //   router.push("/sign-in");
      } else {
        const userData = {
          clerkId: clerkUser.id,
          name: clerkUser.fullName!,
          email: clerkUser.primaryEmailAddress!.emailAddress,
          college_name: collName,
        };
        if (!userData.name || !userData.email || !userData.clerkId) {
          console.error("Missing user data:", userData);
        } else {
          // Call the createUser mutation
          createUserMutationRef.current.mutate(userData, {
            onSuccess: (data: User | undefined) => {
              if (!data) {
                console.error("Failed to create user:", data);
                return;
              }
              setCurrentUser(data);
            },
            onError: (error) => {
              console.error("Failed to create user:", error);
            },
          });
        }
      }

      return () => clearTimeout(time);
    };

    fetchUserData().catch((error) =>
      console.error("Error in fetchUserData:", error),
    );
  }, [clerkUser, isLoaded, url]);

  useEffect(() => {
    console.log("currentUser", clerkUser);
  }, [clerkUser, currentUser]);

  return (
    <SharedContext.Provider
      value={{ CurrentUser: currentUser, setCurrentUser }}
    >
      {children}
    </SharedContext.Provider>
  );
};

export default SharedContextProvider;
