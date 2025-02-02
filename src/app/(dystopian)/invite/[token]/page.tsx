"use client";
import React, { use, useRef } from "react";
import { api } from "@/trpc/react";
import { useCurrentUser } from "@/lib/utils";

const Page = ({ params }: { params: Promise<{ token: string }> }) => {
  const token = use(params).token;

  const { CurrentUser } = useCurrentUser();
  const userId = CurrentUser?.id;

  const acceptInviteMutation = api.invite.acceptAmbassadorInvite.useMutation();
  const acceptInviteMutationRef = useRef(acceptInviteMutation);

  const deleteInviteMutation = api.invite.deleteAmbassadorInvite.useMutation();
  const deleteInviteMutationRef = useRef(deleteInviteMutation);

  const { data: isInviteValid, isLoading: isValidLoading } = api.invite.isAmbassadorInviteValid.useQuery({
    token: token,
    userId: userId!
  }, { enabled: !!userId } );
  
  if (isValidLoading || !userId) return;


  if (!isInviteValid) {
    alert("This invite token is invalid!");
    window.location.href = "/";
  }

  const handleYes = () => {
    acceptInviteMutationRef.current.mutate({
        token: token,
        userId: userId,
        tier: isInviteValid && "tier" in isInviteValid ? isInviteValid.tier : "unknown",
    }, {
      onSuccess: ()=>{
        alert("Yay you're now an ambassador!");
        window.location.href = "/";
      },
      onError: ()=>{
        console.error("Error occured while making ambassador");
      }
    });
    return;
  };

  const handleNo = () => {
    deleteInviteMutationRef.current.mutate({
      token: token,
    }, {
      onSuccess: ()=>{
        alert("You token is not usable anymore");
        window.location.href = "/";
      },
      onError: ()=>{
        console.error("Error occured while removing invite");
      }
    });
  };

  return (
    <div style={{paddingTop:200, paddingLeft:50}}>
      Do you want to accept this ambassador invite?
      <br />
      <button style={{border:"1px solid white"}} onClick={handleYes}>YES</button>
      <br />
      <button style={{border:"1px solid white"}} onClick={handleNo}>NO</button>
    </div>
  );
};

export default Page;
