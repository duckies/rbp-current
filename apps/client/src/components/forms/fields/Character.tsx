import { DevTool } from "@hookform/devtools";
import { RealmMap, RealmSlug, Region, Regions } from "@rbp/battle.net/dist/constants";
import Button from "components/Button";
import { Combobox } from "components/forms/fields/Combobox";
import { Select } from "components/forms/fields/Select";
import { Textfield } from "components/forms/fields/Textfield";
import { characterResolver } from "features/Application/validators";
import { useForm } from "react-hook-form";

export const RegionItems = Regions.map((r) => ({ text: r.toUpperCase(), value: r }));

export const Realms = Object.entries(RealmMap)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([text, value]) => ({
    text,
    value,
  }));

export type CharacterSelectorProps = {
  id: string | number;
};

export type CharacterSelectorSchema = {
  region: Region;
  realm: RealmSlug;
  name: string;
};

export default function CharacterSelector({ id }: CharacterSelectorProps) {
  const subForm = useForm<CharacterSelectorSchema>({
    resolver: characterResolver,
    defaultValues: {
      region: "us",
      realm: null as never,
      name: "",
    },
  });

  const onSubmit = (data: Record<string, any>) => {
    console.log(subForm.getValues());
  };

  return (
    <div className="mb-5 rounded-xl bg-surface-500 shadow-md">
      <div className="p-7">
        <h2 className="mb-2.5 text-2xl font-medium text-yellow">Character Selection</h2>
        <p className="my-2.5 text-gray-200">
          Link the main character you intend to raid with, and optionally any alts with noteworthy
          progression or logs.
        </p>

        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <Select label="Region" items={RegionItems} name="region" form={subForm} />
          <Combobox label="Realm" items={Realms} name="realm" form={subForm} />
          <Textfield id={`${id}.name`} label="Name" name="name" form={subForm} />
        </div>
      </div>

      <DevTool control={subForm.control} />

      <div className="flex justify-end bg-surface-600 px-7 py-5">
        <Button type="button" onClick={subForm.handleSubmit(onSubmit)}>
          Add Character
        </Button>
      </div>
    </div>
  );
}
