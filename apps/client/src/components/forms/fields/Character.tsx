import type { RealmSlug, Region } from "@rbp/battle.net/dist/constants";
import { RealmMap, Regions } from "@rbp/battle.net/dist/constants";
import type { FindCharacterDTO } from "@rbp/server";
import { useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import { ComboBox } from "components/forms/fields/Combobox";
import { Select } from "components/forms/fields/Select";
import Textfield from "components/forms/fields/Textfield";
import { ArrowUpRight } from "components/icons/ArrowUpRight";
import { getCharacter } from "lib/blizzard";
import Image from "next/image";
import { useState } from "react";
import { Item } from "react-stately";

type CharacterSelectorProps = {
  id: string | number;
  initialValues?: FindCharacterDTO[];
};

export interface CharacterLocationPickerProps {
  id: string | number;
}

export const RegionItems = Regions.map((r) => ({ text: r.toUpperCase(), value: r }));

export const Realms = Object.entries(RealmMap)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([text, value]) => ({
    text,
    value,
  }));

export default function CharacterSelector(props: CharacterSelectorProps) {
  const { initialValues } = props;

  const [name, setName] = useState<string>("");
  const [region, setRegion] = useState<Region | null>("us");
  const [realm, setRealm] = useState<RealmSlug | null>(null);
  const [characters, setCharacters] = useState<FindCharacterDTO[]>(initialValues ?? []);

  const [error, setError] = useState<string | null>(null);

  return (
    <div className="mb-5 rounded-xl bg-surface-500 shadow-md">
      <div className="p-7">
        <h2 className="mb-2.5 text-2xl font-medium text-yellow">Character Selection</h2>
        <p className="my-2.5 text-gray-200">
          Link the main character you intend to raid with, and optionally any alts with noteworthy progression or logs.
        </p>

        <div className="flex justify-evenly gap-4 md:gap-8">
          <div className="w-full">
            <Select label="Region">
              {RegionItems.map((r) => (
                <Item key={r.value}>{r.text}</Item>
              ))}
            </Select>
          </div>

          <div className="w-full">
            <ComboBox label="Realm" menuTrigger="focus">
              {Realms.map(({ text, value }) => (
                <Item key={value}>{text}</Item>
              ))}
            </ComboBox>
          </div>

          <div className="w-full">
            <Textfield label="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="flex justify-end bg-surface-600 px-7 py-5">
        <Button
          onPress={() => {
            if (error) {
              setError(null);
            } else {
              setError("Realm is invalid");
            }
          }}
        >
          Add character
        </Button>
      </div>
    </div>
  );
}

export interface CharacterPreviewProps {
  character: FindCharacterDTO;
}

export function CharacterPreview({ character }: CharacterPreviewProps) {
  const { isLoading, error, data } = useQuery(["character", character], () => getCharacter(character));

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2>Oops lmfao</h2>
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="flex:wrap jc:space-between gap:10 p:20 bg:gray-20 r:10 my:15 flex md:gap-20">
        <div>
          <div className="js:center r:100% bg:gray-30 h:80 w:80 flex" />
        </div>

        <div className="flex:wrap flex:row gap:10 ji:space-between flex ">
          <div className="h:15 bg:gray-30 r:5 h:10 w:100" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:80%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:90%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:95%" />
        </div>

        <div className="flex:wrap flex:row gap:10 ji:space-between flex ">
          <div className="h:15 bg:gray-30 r:5 h:10 w:100" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:80%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:90%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:95%" />
        </div>

        <div className="flex:wrap flex:row gap:10 ji:space-between flex ">
          <div className="h:15 bg:gray-30 r:5 h:10 w:100" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:80%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:90%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:95%" />
        </div>
      </div>
    );
  }

  const CharacterBasics = data.summary ? (
    <div>
      <h3 className={`bg:$(class-color-${data.summary.class.id})`}>{data.name}</h3>
      <p>{data.realm}</p>
      <p>
        {data.summary.spec ? `${data.summary.spec.name} ` : ""}
        {data.summary.class.name}
      </p>
    </div>
  ) : (
    <div>
      <h3>{data.name}</h3>
      <p>{data.realm}</p>
      <p>Unknown</p>
    </div>
  );

  const CharacterProgression = data.progression?.summary ? (
    <div>
      <h3>
        Progression <ArrowUpRight className="h:100% w:auto inline-flex" />
      </h3>
      {Object.entries(data.progression.summary).map(([raid, difficulties]) => (
        <div key={raid}>
          {raid} {difficulties.toString()}
        </div>
      ))}
      {/* <p>{data.progression.summary.map(raid => raid.name).join(', ')}</p> */}
    </div>
  ) : (
    <div>
      <h3>No Progression Data</h3>
    </div>
  );

  return (
    <>
      <div className="p:20 gap:20 ji:center r:10 bg:gray-20 flex">
        <Image className="r:100% as:center flex" src={data.avatar} width="84" height="84" alt="Character Avatar" />
        {CharacterBasics}
        {CharacterProgression}
      </div>

      <pre className="p:10 mt:20 r:10 bg:gray-30">{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}
