"use client";

import { createContext, useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  const [CurrentUser, setCurrentUser] = useState<User>({
    name: "",
    email: "",
    clerkId: "",
    college_name: "Individual",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
  });
  const { user: clerkUser, isLoaded } = useUser();
  const createUserMutation = api.post.createUser.useMutation();
  const createUserMutationRef = useRef(createUserMutation); // Use a ref to store the mutation function

  
  useEffect(() => {
    
    const fetchUserData = async () => {
      if (!isLoaded) return; // Wait until the user data is loaded
      if (!clerkUser) {
        router.push("/sign-in");
      } else {
        const userData = {
          clerkId: clerkUser.id,
          name: clerkUser.fullName!,
          email: clerkUser.primaryEmailAddress!.emailAddress,
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
    };

    fetchUserData().catch((error) =>
      console.error("Error in fetchUserData:", error),
    );
  }, [clerkUser, isLoaded, router, url]);

  useEffect(() => {
    console.log("currentUser", CurrentUser);
  }, [CurrentUser]);

  return (
    <SharedContext.Provider value={{ CurrentUser, setCurrentUser }}>
      {children}
    </SharedContext.Provider>
  );
};

export default SharedContextProvider;
