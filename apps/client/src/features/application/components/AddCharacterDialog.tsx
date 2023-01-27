import * as Dialog from "@radix-ui/react-dialog"
import type { FindCharacterDTO } from "@rbp/server"
import Button from "components/Button"
import { IconButton } from "components/IconButton"
import { CloseIcon } from "components/icons/CloseIcon"
import { Combobox } from "features/application/components/fields/Combobox"
import { Select } from "features/application/components/fields/Select"
import { Textfield } from "features/application/components/fields/Textfield"
import { RealmItems, RegionItems } from "features/application/constants"
import type { CharacterDTO } from "features/application/types"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"

type AddCharacterDialogProps = {
  onAdd: (findCharacterDTO: FindCharacterDTO) => void
}

export function AddCharacterDialog({ onAdd: onSubmit }: AddCharacterDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<CharacterDTO>({
    // TODO: Can I use undefined here?
    defaultValues: { region: "us", realm: undefined, name: "" },
  })

  const handleSubmit = () => {
    setOpen(false)
    onSubmit(form.getValues())
    form.setValue("name", "")
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button>Add Character</Button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 cursor-pointer bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.175, ease: "easeInOut" }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ scale: 0.7, translateX: "-50%", translateY: "-50%" }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
                transition={{ duration: 0.175, ease: "easeInOut" }}
                className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] rounded-lg bg-surface shadow-lg"
              >
                <div className="px-6 pt-6">
                  <Dialog.Title className="mb-3 text-xl font-bold">Add Character</Dialog.Title>
                  <Dialog.Description>
                    Only include characters that have relevant raiding experience.
                  </Dialog.Description>
                </div>

                <div className="absolute top-0 right-0 m-3">
                  <IconButton onClick={() => setOpen(false)}>
                    <CloseIcon className="h-7 w-7 hover:opacity-80" />
                  </IconButton>
                </div>

                <div className="grid grid-cols-12 gap-4 p-6">
                  <Select
                    className="col-span-3"
                    id="region"
                    items={RegionItems}
                    label="Region"
                    control={form.control}
                    register={form.register}
                    rules={{ required: "Region is required." }}
                    error={form.formState.errors.region?.message}
                  />

                  <Combobox
                    className="col-span-4"
                    id="realm"
                    items={RealmItems}
                    label="Realm"
                    control={form.control}
                    register={form.register}
                    rules={{
                      required: "Realm is required.",
                    }}
                    error={form.formState.errors.realm?.message}
                  />

                  <Textfield
                    className="col-span-5"
                    id="name"
                    label="Name"
                    register={form.register}
                    rules={{ required: "Name is required." }}
                    error={form.formState.errors.name?.message}
                    inputProps={{ autoComplete: "off" }}
                  />
                </div>

                <div className="inset-y relative flex justify-end bg-surface-700 p-6">
                  <Button onClick={form.handleSubmit(handleSubmit)}>Add</Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
