"use client";

import {
  Modal,
  Input,
  Button,
  Form,
} from "@heroui/react";

export default function UpdateModal({
  isOpen,
  setIsOpen,
  handleSubmit,
  onUpdateSubmit,
  register,
  errors,
  TRANSPORT_TYPES,
  PERKS,
}) {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Backdrop className="backdrop-blur-sm" />

      <Modal.Container>
        <Modal.Dialog className="w-[95%] md:w-[800px] max-h-[90vh] overflow-y-auto bg-slate-950 border border-white/10 rounded-2xl text-white">

          <Form onSubmit={handleSubmit(onUpdateSubmit)} className="w-full">

            {/* Header */}
            <Modal.Header className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">Update Ticket</h2>
              <p className="text-xs text-slate-400">
                Edit your ticket details below
              </p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="p-6 space-y-4">

              {/* Title */}
              <Input
                label="Ticket Title"
                labelPlacement="outside"
                placeholder="e.g. Dhaka to Cox's Bazar Express"
                variant="bordered"
                {...register("title", { required: "Title is required" })}
                classNames={{
                  inputWrapper:
                    "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500",
                }}
              />
              {errors.title && (
                <p className="text-red-500 text-xs">{errors.title.message}</p>
              )}

              {/* From + To */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="From (Location)"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("fromLocation", {
                    required: "From location is required",
                  })}
                  classNames={{
                    inputWrapper:
                      "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500",
                  }}
                />

                <Input
                  label="To (Location)"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("toLocation", {
                    required: "To location is required",
                  })}
                  classNames={{
                    inputWrapper:
                      "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500",
                  }}
                />
              </div>

              {/* Transport Type */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-200">
                  Transport Type
                </label>

                <select
                  {...register("transportType", {
                    required: "Transport type is required",
                  })}
                  className="w-full bg-slate-900/50 border border-white/10 p-3 rounded-xl text-slate-200"
                >
                  <option value="">Select type</option>
                  {TRANSPORT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>

                {errors.transportType && (
                  <p className="text-red-500 text-xs">
                    {errors.transportType.message}
                  </p>
                )}
              </div>

              {/* Price + Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Price"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("price", {
                    required: "Price is required",
                  })}
                  classNames={{
                    inputWrapper:
                      "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500",
                  }}
                />

                <Input
                  type="number"
                  label="Quantity"
                  labelPlacement="outside"
                  variant="bordered"
                  {...register("quantity", {
                    required: "Quantity is required",
                  })}
                  classNames={{
                    inputWrapper:
                      "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500",
                  }}
                />
              </div>

              {/* Date */}
              <Input
                type="datetime-local"
                label="Departure Date & Time"
                labelPlacement="outside"
                variant="bordered"
                {...register("departureDateTime", {
                  required: "Date required",
                })}
                classNames={{
                  inputWrapper:
                    "bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500",
                }}
              />

              {/* Perks */}
              <div>
                <span className="text-sm text-slate-200">Perks</span>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {PERKS.map((perk) => (
                    <label
                      key={perk}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <input
                        type="checkbox"
                        value={perk}
                        {...register("perks")}
                        className="accent-pink-500"
                      />
                      {perk}
                    </label>
                  ))}
                </div>
              </div>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="p-6 border-t border-white/10 flex justify-end gap-3">
              <Button
                variant="flat"
                color="danger"
                onPress={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold"
              >
                Update Ticket
              </Button>
            </Modal.Footer>

          </Form>

          <Modal.CloseTrigger />

        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}