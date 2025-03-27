"use client";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface DeleteAgentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  agentName: string;
  agentId: string;
  userId?: string;
}

export default function DeleteAgentDialog({
  open,
  setOpen,
  agentName,
  agentId,
  userId,
}: DeleteAgentDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deletAgentMutation = useMutation(api.agent.deleteAgent);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await deletAgentMutation({
        agentId: agentId,
      });
      if (result.success) {
        console.log("Deleted agent", agentId);
        return {
          success: true,
        };
      }
      return {
        success: false,
        error: "Failed to delete agent",
      };
    } catch (error) {
      console.error("Error deleting agent:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete agent",
      };
    }
  }

  /*
  const handleDelete = async () => {
    if (!agentId) {
      toast.error("Agent ID is missing");
      return;
    }
    try {
      setIsDeleting(true);
      console.log("Deleting agent", agentId);

      const user = await currentUser();
          if (!user?.id) {
              console.log("No user found");
              throw new Error("No user found");
          }
      console.log("Deleting agent userID", user.id);

      //const result = await deleteAgentAction(agentId);
      const result = useMutation(deleteAgentAction(agentId));

      if (result.success) {
        toast.success("Agent deleted successfully");
        setOpen(false);
      } else {
        toast.error("Error deleting agent");
      }
    } catch (error) {
      console.error("Error deleting agent", error);
      toast.error("Error deleting agent");
    }
  };
  */
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Agent</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete {agentName}? This action cannot be
            undone.
            <br />
            Please enter <b>{agentName}</b> to confirm.
            <br />
            <Input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type the agent name to confirm"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== agentName || isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
