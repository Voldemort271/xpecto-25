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

// This is the context that will be used to store the user data taken from Clerk and merge the extra data with clerk data in db
interface SharedContextProps {
  CurrentUser?: User;
  setCurrentUser?: React.Dispatch<React.SetStateAction<User>>;
  isLoading: boolean;
}

export const SharedContext = createContext<SharedContextProps | undefined>(
  undefined,
);


const SharedContextProvider = ({ children }: { children: ReactNode }) => {
  const url = usePathname();

  const [isLoading, setIsLoading] = useState(true);

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
    contact: "",
  });
  const { user: clerkUser, isLoaded } = useUser();

  const createUserMutation = api.user.createUser.useMutation();
  const createUserMutationRef = useRef(createUserMutation); // Use a ref to store the mutation function

  const clerkIdUpdateMutation = api.user.addToClerk.useMutation();
  const clerkIdUpdateMutationRef = useRef(clerkIdUpdateMutation); // Use a ref to store the mutation function


  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoaded) {
        return; // Wait until the user data is loaded
      } else {
        if (!clerkUser){
          setIsLoading(false);
          return;
        }  
        const userData = {
          name: clerkUser.fullName!,
          email: clerkUser.primaryEmailAddress!.emailAddress,
          contact: currentUser.contact,
        };
        if (!userData.name || !userData.email) {
          console.error("Missing user data:", userData);
          setIsLoading(false);
        } else {
          // Call the createUser mutation
          createUserMutationRef.current.mutate(userData, {
            onSuccess: (data: User | undefined) => {
              if (!data) {
                console.error("Failed to create user:", data);
                setIsLoading(false);
                return;
              }
              setCurrentUser(data);

              if (!clerkUser.externalId) {
                // Set the externalId in Clerk (I did not do it in the procedure above because otherwise I won't have id)
                clerkIdUpdateMutationRef.current.mutate(
                  { clerkId: clerkUser.id, dbId: data.id },
                  {
                    onSuccess: (data) => {
                      if (!data.success) {
                        console.error("Failed to update externalId:", data);
                        setIsLoading(false);
                      }
                    },
                    onError: (error) => {
                      console.error("Failed to update externalId:", error);
                      setIsLoading(false);
                    },
                  },
                );
              }
              else{
                setIsLoading(false);
              }
            },
            onError: (error) => {
              setIsLoading(false);
              console.error("Failed to create user:", error);
            },
          });
        }
      }
    };

    fetchUserData().catch((error) =>{
      setIsLoading(false);
      console.error("Error in fetchUserData:", error);
    });
  }, [clerkUser, isLoaded, url, currentUser.contact]);

  return (
    <SharedContext.Provider
      value={{ CurrentUser: currentUser, setCurrentUser, isLoading }}
    >
      {children}
    </SharedContext.Provider>
  );
};

export default SharedContextProvider;
