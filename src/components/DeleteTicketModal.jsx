"use client";

import { Button, Modal } from "@heroui/react";
import { FaTrash } from "react-icons/fa";

export default function DeleteTicketModal({ isOpen, setIsOpen, selectedTicket, handleConfirmDelete }) {
    return (
        <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="sm">
            <Modal.Backdrop className="backdrop-blur-sm">
                <Modal.Container>
                    <Modal.Dialog className="w-[95%] sm:max-w-[400px] bg-slate-950 border border-white/10 rounded-2xl text-white">
                        <Modal.CloseTrigger />

                        <Modal.Header className="flex flex-col gap-1 border-b border-white/5 p-6">
                            <div className="flex items-center gap-2 text-red-400">
                                <FaTrash />
                                <Modal.Heading className="text-xl font-bold text-white">
                                    Delete Ticket
                                </Modal.Heading>
                            </div>
                            <p className="text-xs text-slate-400">
                                This action cannot be undone.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <p className="text-sm text-slate-300">
                                Are you sure you want to delete{" "}
                                <strong className="text-white">{selectedTicket?.title}</strong>?
                            </p>
                        </Modal.Body>

                        <Modal.Footer className="border-t border-white/5 p-6 flex justify-end gap-3">
                            <Button variant="flat" color="default" onPress={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold" onPress={handleConfirmDelete}>
                                Yes, Delete
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}