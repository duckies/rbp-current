import type { FindCharacterDTO } from "@rbp/server";
import { ArrowUpRight } from "components/icons/ArrowUpRight";
import { useCharacterLookup } from "features/Characters/queries";
import Image from "next/image";

export type CharacterPreviewProps = {
  character: FindCharacterDTO;
};

export function CharacterPreview({ character }: CharacterPreviewProps) {
  const { data, status, error } = useCharacterLookup(character);

  if (status === "error" && !data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2>Oops lmfao</h2>
      </div>
    );
  }

  if (status === "loading" && !data) {
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
