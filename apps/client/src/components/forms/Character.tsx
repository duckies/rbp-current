import React, { useEffect } from 'react';
import type { CharacterDTO, RealmSlug, RegionSlug } from '@rbp/server';
import Select from 'components/forms/Select';
import Textfield from 'components/forms/Textfield';
import { shadow } from 'styles/theme';
import Button from 'components/Button';
import { getCharacter } from 'lib/blizzard';

export interface CharacterSelectorProps {
  id: string | number
  initialValues?: CharacterDTO
}

export default function CharacterSelector({
  initialValues,
  ...props
}: CharacterSelectorProps) {
  const [name, setName] = React.useState<string>(initialValues?.name ?? '');
  const [realm, setRealm] = React.useState<RealmSlug | null>(
    initialValues?.realm ?? null,
  );
  const [region, setRegion] = React.useState<RegionSlug | null>(
    initialValues?.region ?? null,
  );
  const [characters, setCharacters] = React.useState<CharacterDTO[]>([]);

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
          onSelectionChange={key => setRegion(key as RegionSlug)}
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
  character: CharacterDTO
}

export function CharacterPreview({ character }: CharacterPreviewProps) {
  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCharacter(character);
      setData(data);
    };

    fetchData();
  }, [character]);

  return (
    <div className="p:10 flex ai:center ji:center">
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
