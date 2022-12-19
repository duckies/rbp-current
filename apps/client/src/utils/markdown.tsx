import { readdirSync } from "fs"
import matter from "gray-matter"
import { join } from "path"
// import type { Document } from "types/documents"

export interface DocumentProps<T = any> {
  frontmatter: T
  filePath: string
}

// export type DocumentMeta = {
//   path: string
//   params: string[]
//   frontmatter: any
// }

// export type Category = { documents: DocumentMeta[]; subCategories: Record<string, Category> }

export const Categories = new Map<string[], Category>()

const RootPath = join(process.cwd(), "./content")

export const getCategories = (path?: string) => {
  const dirPath = path ? join(RootPath, path) : RootPath

  return readdirSync(dirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
}

export const getDocumentFrontmatter = (filePath: string): DocumentProps<any> => {
  // Temporary patch till upgraded
  if (!filePath.endsWith(".mdx")) {
    filePath = `./content/${filePath}.mdx`
  }

  const {
    data: { date, ...frontmatter },
  } = matter.read(filePath)

  return {
    filePath,
    frontmatter: {
      date: date?.toISOString() || new Date().toISOString(),
      ...frontmatter,
    } as any,
  }
}

type Category = { documents: DocumentProps[] }
type Document = DocumentProps<any>

export const getDocumentStructure = () => {
  const structure = new Map<string[], Category | Document>()

  const explore = (path: string, params: string[], documents: DocumentProps[] = []) => {
    const dirents = readdirSync(path, { withFileTypes: true })

    for (const dirent of dirents) {
      const direntPath = join(path, dirent.name)

      if (dirent.isDirectory()) {
        structure.set([...params, dirent.name], {
          documents: explore(direntPath, [...params, dirent.name]),
        })
      } else if (dirent.name.endsWith(".mdx")) {
        const slug = dirent.name.toLowerCase().replace(/\.mdx$/, "")
        const document = getDocumentFrontmatter(direntPath)
        documents.push(document)
        structure.set([...params, slug], document)
      }
    }

    return documents
  }

  explore(RootPath, [])

  // console.log(JSON.stringify([...structure.entries()], null, 2))

  return structure
}

export const getMDXDocument = <T extends Document>(filePath: string): DocumentProps<T> => {
  // Temporary patch till upgraded
  if (!filePath.endsWith(".mdx")) {
    filePath = `./content/${filePath}.mdx`
  }

  const {
    data: { date, ...frontmatter },
  } = matter.read(filePath)

  return {
    filePath,
    frontmatter: {
      date: date?.toISOString() || new Date().toISOString(),
      ...frontmatter,
    } as any,
  }
}

export const findMDXDocuments = (path: string) => {
  const dirPath = join(process.cwd(), `./content/${path}`)

  return readdirSync(dirPath)
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fn) => fn.replace(/\.mdx$/, ""))
}

export const getCategoryDocuments = (category: string) => {
  return findMDXDocuments(category)
}
