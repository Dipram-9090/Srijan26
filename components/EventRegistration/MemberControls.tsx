"use client";

import { removeMember, transferTeamLead } from "@/services/EventsService";
import React from "react";
import { useConfirmationDialogContext } from "@/hooks/useConfirmationDialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function MemberControls({
  memberId,
  memberName,
  teamId,
}: {
  memberId: string;
  memberName: string;
  teamId: string;
}) {
  const modalContext = useConfirmationDialogContext();
  const router = useRouter();

  const handleTransferTeamLead = () => {
    modalContext.showDialog(
      `Are you sure you want to make ${memberName} team lead?`,
      () => {
        transferTeamLead(teamId, memberId).then((res) => {
          if(res.ok){
            toast.success(res.message);
            router.refresh();
          }else{
            toast.error(res.message);
          }
        });
      },
    );
  };
  const handleRemoveMember = () => {
    modalContext.showDialog(`Are you sure you want to remove ${memberName}?`, () => {
      removeMember(teamId, memberId).then((res) => {
        if(res.ok){
            toast.success(res.message);
            router.refresh();
          }else{
            toast.error(res.message);
          }
      });
    });
  };
  return (
    <>
      <button
        className="w-fit rounded-xs bg-white px-2 py-1 text-sm text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        onClick={() => handleRemoveMember()}
      >
        Remove
      </button>
      <button
        className="w-fit justify-self-end rounded-xs bg-white px-2 py-1 text-sm text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        onClick={() => handleTransferTeamLead()}
      >
        Make Team Lead
      </button>
    </>
  );
}

export default MemberControls;
