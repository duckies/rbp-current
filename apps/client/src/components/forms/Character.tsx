import React, { useEffect } from 'react';
import Select from 'components/forms/Select';
import Textfield from 'components/forms/Textfield';
import { shadow } from 'styles/theme';
import Button from 'components/Button';
import type { CharacterProfileSummary, RealmSlug, Region } from '@rbp/battle.net';
import type { FindCharacterDTO } from '@rbp/server';
import { getCharacter } from 'lib/blizzard';
import { Avatar } from 'components/Avatar';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

export interface CharacterSelectorProps {
  id: string | number
  initialValues?: FindCharacterDTO[]
}

export default function CharacterSelector({
  initialValues,
  ...props
}: CharacterSelectorProps) {
  const [name, setName] = React.useState<string>('');
  const [region, setRegion] = React.useState<Region | null>('us');
  const [realm, setRealm] = React.useState<RealmSlug | null>(null);
  const [characters, setCharacters] = React.useState<FindCharacterDTO[]>(initialValues ?? []);

  useEffect(() => {}, [characters]);

  function addCharacter() {
    if (!name?.length || !realm || !region) {
      return;
    }

    setCharacters(prev => [...prev, { name, realm, region }]);
  }

  const isFilledOut = Boolean(name?.length && realm && region);

  return (
    <div className={`p:30 bg:gray-10 r:10 ${shadow.md}`}>
      <h2 className="mb:10">Character Selection</h2>
      <p className="my:10">
        Link the main character you intend to raid with, and optionally any alts
        with noteworthy progression or logs.
      </p>

      <div className="grid grid-template-columns:1fr|1fr|2fr|max-content gap:10 ai:flex-end">
        <Select
          label="Region"
          items={[
            { id: 'us', name: 'US' },
            { id: 'eu', name: 'EU' },
            { id: 'kr', name: 'KR' },
            { id: 'tw', name: 'TW' },
          ]}
          selectedKey={region}
          onSelectionChange={key => setRegion(key as Region)}
          className=""
        >
          {item => <Select.Item>{item.name}</Select.Item>}
        </Select>

        <Select
          label="Realm"
          selectedKey={realm}
          onSelectionChange={key => setRealm(key as RealmSlug)}
        >
          <Select.Item key="area-52">Area 52</Select.Item>
        </Select>

        <Textfield
          id={`character-${props.id}`}
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div>
          <Button
            disabled={!isFilledOut}
            className="px:10! py:8! b:2px|solid|transparent"
            onPress={addCharacter}
          >
            Add character
          </Button>
        </div>
      </div>

      <div className="my:10">
        {characters.map(character =>
          <CharacterPreview key={character.toString()} character={character} />,
        )}
      </div>
    </div>
  );
}

export interface CharacterPreviewProps {
  character: FindCharacterDTO
}

export function CharacterPreview({ character }: CharacterPreviewProps) {
  const { isLoading, error, data } = useQuery(['character', character], () => getCharacter(character));

  if (isLoading) {
    return (
      <div className="flex flex:wrap jc:space-between gap:20 p:20 bg:gray-20 r:10 my:15">
        <div>
          <div className="flex js:center r:100% bg:gray-30 h:80 w:80" />
        </div>

        <div className="flex flex:wrap flex:row gap:10 ji:space-between ">
          <div className="h:15 bg:gray-30 r:5 h:10 w:100" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:80%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:90%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:95%" />
        </div>

        <div className="flex flex:wrap flex:row gap:10 ji:space-between ">
          <div className="h:15 bg:gray-30 r:5 h:10 w:100" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:80%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:90%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:95%" />
        </div>

        <div className="flex flex:wrap flex:row gap:10 ji:space-between ">
          <div className="h:15 bg:gray-30 r:5 h:10 w:100" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:80%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:90%" />
          <div className="h:15 bg:gray-30 r:5 h:10 w:95%" />
        </div>
      </div>
    );
  }

  return (
    <div className="p:10 flex ai:center ji:center">
      <Image src={data} />
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
