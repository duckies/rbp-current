import type { DocumentTypes } from "content"
import { DocumentCard } from "features/content/components/DocumentCard"
import type { FC } from "react"

type DocumentGridProps = {
  documents: DocumentTypes[]
}

export const DocumentGrid: FC<DocumentGridProps> = ({ documents }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {documents.map((document) => (
        <DocumentCard
          key={document._id}
          href={document.path}
          title={document.title}
          caption={document.description}
          insetSrc={document.images?.inset}
          disabled={document.draft}
        />
      ))}
    </div>
  )
}
