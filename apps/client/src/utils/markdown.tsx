import { readdirSync } from "fs"
import matter from "gray-matter"
import { join } from "path"

export interface Category {
  title: string
  caption: string
  url: string
  categories: Category[]
  documents: Document[]
}

export interface Document<T = any> {
  filePath: string
  url: string
  frontmatter: T
}

const CategoryMeta = {
  announcements: {
    title: "Guild Announcements",
    caption: "Important, often long-winded, news for the guildies.",
  },
  strategies: {
    title: "Strategies",
    caption: "Boss notes and scribbles, mostly for my own benefit.",
  },
  vault: {
    title: "Vault of the Incarnates",
    caption: "A collection of guides for the Vault of the Incarnates raid.",
  },
} as const

const RootPath = join(process.cwd(), "./content")

const getDocumentMeta = (filePath: string): Omit<Document, "url"> => {
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

const getCategoryMeta = (name: string) => {
  const meta = CategoryMeta[name as keyof typeof CategoryMeta]

  return meta || { title: "Unknown Category", caption: "Category metadata is missing." }
}

export const getDocumentStructure = () => {
  const structure = new Map<string[], Category | Document>()

  const explore = (
    path: string,
    params: string[],
    categories: Category[] = [],
    documents: Document[] = []
  ) => {
    const dirents = readdirSync(path, { withFileTypes: true })

    for (const dirent of dirents) {
      const direntPath = join(path, dirent.name)

      if (dirent.isDirectory()) {
        const categoryParams = [...params, dirent.name]
        const category = {
          ...getCategoryMeta(dirent.name),
          url: categoryParams.join("/"),
          ...explore(direntPath, categoryParams),
        }

        categories.push(category)
        structure.set(categoryParams, category)
      } else if (dirent.name.endsWith(".mdx")) {
        const slug = dirent.name.toLowerCase().replace(/\.mdx$/, "")
        const docParams = [...params, slug]
        const document = { ...getDocumentMeta(direntPath), url: docParams.join("/") }

        documents.push(document)
        structure.set(docParams, document)
      }
    }

    return {
      categories,
      documents: documents.sort(
        (a, b) => new Date(a.frontmatter.date).getTime() - new Date(b.frontmatter.date).getTime()
      ),
    }
  }

  explore(RootPath, [])

  return structure
}
