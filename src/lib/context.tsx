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

  const [currentUser, setCurrentUser] = useState<User>({
    name: "",
    email: "",
    college_name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
    role: "",
    POCId: null,
    accomodation: false,
  });
  const { user: clerkUser, isLoaded } = useUser();

  const createUserMutation = api.user.createUser.useMutation();
  const createUserMutationRef = useRef(createUserMutation); // Use a ref to store the mutation function

  const clerkIdUpdateMutation = api.user.addToClerk.useMutation();
  const clerkIdUpdateMutationRef = useRef(clerkIdUpdateMutation); // Use a ref to store the mutation function  

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded || !clerkUser) {
        return; // Wait until the user data is loaded
      } else {
        const userData = {
          name: clerkUser.fullName!,
          email: clerkUser.primaryEmailAddress!.emailAddress,
        };
        if (!userData.name || !userData.email) {
          console.error("Missing user data:", userData);
        } else {
          if (clerkUser.externalId) {
            return; // User already exists
          }

          // Call the createUser mutation
          createUserMutationRef.current.mutate(userData, {
            onSuccess: (data: User | undefined) => {
              if (!data) {
                console.error("Failed to create user:", data);
                return;
              }
              setCurrentUser(data);
              
              // Set the externalId in Clerk (I did not do it in the procedure above because otherwise I won't have id)
              clerkIdUpdateMutationRef.current.mutate(
                { clerkId: clerkUser.id, dbId: data.id },
                {
                  onSuccess: (data) => {
                    if (!data.success) {
                      console.error("Failed to update externalId:", data);
                    }
                  },
                  onError: (error) => {
                    console.error("Failed to update externalId:", error);
                  },
                },
              );
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
  }, [clerkUser, isLoaded, url]);

  return (
    <SharedContext.Provider
      value={{ CurrentUser: currentUser, setCurrentUser }}
    >
      {children}
    </SharedContext.Provider>
  );
};


export default SharedContextProvider;
