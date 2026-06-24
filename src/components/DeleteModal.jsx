"use client";

import {
  Modal,
  Button
} from "@heroui/react";

export default function DeleteModal({
  isOpen,
  setIsOpen,
  selectedTicket,
  handleConfirmDelete
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal.Backdrop className="backdrop-blur-sm" />

      <Modal.Container>
        <Modal.Dialog className="sm:max-w-[420px] bg-slate-900 border border-white/10 text-white rounded-2xl">

          <Modal.CloseTrigger />

          {/* Header */}
          <Modal.Header>
            <Modal.Heading className="text-lg font-semibold text-white">
              Delete Ticket
            </Modal.Heading>
          </Modal.Header>

          {/* Body */}
          <Modal.Body>
            <p className="text-sm text-slate-300">
              Are you sure you want to delete{" "}
              <span className="text-amber-400 font-bold">
                "{selectedTicket?.title}"
              </span>
              ? This action cannot be undone.
            </p>
          </Modal.Body>

          {/* Footer */}
          <Modal.Footer className="flex justify-end gap-3">
            <Button
              variant="secondary"
              className="bg-white/5 text-slate-300"
              onPress={() => setIsOpen(false)}
            >
              Keep Ticket
            </Button>

            <Button
              color="danger"
              className="font-bold"
              onPress={handleConfirmDelete}
            >
              Yes, Delete
            </Button>
          </Modal.Footer>

        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}