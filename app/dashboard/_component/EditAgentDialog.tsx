"use client";
import EditAgentForm from "@/components/Agents/EditAgentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditAgentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  agentId: string;
}

export default function EditAgentDialog({
  open,
  setOpen,
  agentId,
}: EditAgentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Agent</DialogTitle>
        </DialogHeader>
        <EditAgentForm agentId={agentId} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
