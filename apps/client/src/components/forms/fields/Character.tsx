import type { RealmSlug, Region } from "@rbp/battle.net";
import type { FindCharacterDTO } from "@rbp/server";
import { useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import { ComboBox } from "components/forms/fields/Combobox";
import Select from "components/forms/fields/Select";
import Textfield from "components/forms/fields/Textfield";
import { ArrowUpRight } from "components/icons/ArrowUpRight";
import { getCharacter } from "lib/blizzard";
import Image from "next/image";
import React from "react";
import { Item } from "react-stately";

export interface CharacterSelectorProps {
  id: string | number;
  initialValues?: FindCharacterDTO[];
}

export interface CharacterLocationPickerProps {
  id: string | number;
}

export default function CharacterSelector(props: CharacterSelectorProps) {
  const { initialValues, ...otherProps } = props;

  const [name, setName] = React.useState<string>("");
  const [region, setRegion] = React.useState<Region | null>("us");
  const [realm, setRealm] = React.useState<RealmSlug | null>(null);
  const [characters, setCharacters] = React.useState<FindCharacterDTO[]>(initialValues ?? []);

  const isFilledOut = Boolean(name?.length && realm && region);

  return (
    <div className="mb-5 overflow-hidden rounded-xl bg-surface-500 shadow-md">
      <div className="p-7">
        <h2 className="mb-2.5 text-2xl font-medium text-yellow">Character Selection</h2>
        <p className="my-2.5 text-gray-200">
          Link the main character you intend to raid with, and optionally any alts with noteworthy progression or logs.
        </p>

        <div className="flex justify-evenly gap-8">
          <div className="w-full">
            <Select
              label="Region"
              items={[
                { id: "us", name: "US" },
                { id: "eu", name: "EU" },
                { id: "kr", name: "KR" },
                { id: "tw", name: "TW" },
              ]}
              selectedKey={region}
              onSelectionChange={(key) => setRegion(key as Region)}
            >
              {(item) => <Select.Item>{item.name}</Select.Item>}
            </Select>
          </div>

          <div className="w-full">
            <ComboBox label="Realm">
              <Item key="area-52">Area 52</Item>
            </ComboBox>
          </div>

          <div className="w-full">
            <Textfield
              id={`character-${props.id}`}
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end bg-surface-600 px-7 py-5">
        <Button disabled={!isFilledOut} onPress={() => console.log("Pressy")}>
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
      <div className="flex:wrap jc:space-between gap:20 p:20 bg:gray-20 r:10 my:15 flex">
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
