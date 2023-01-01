import { DocumentCard } from "features/content/components/DocumentCard"
import type { FC } from "react"
import type { Document } from "utils/markdown"

type DocumentGridProps = {
  documents: Document[]
}

export const DocumentGrid: FC<DocumentGridProps> = ({ documents }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {documents.map((document) => (
        <DocumentCard
          key={document.url}
          href={document.url}
          title={document.frontmatter.title}
          caption={document.frontmatter.excerpt || document.frontmatter.description}
          insetSrc={document.frontmatter.images?.inset}
          disabled={document.frontmatter.disabled}
        />
      ))}
    </div>
  )
}
