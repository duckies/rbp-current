import { readdirSync } from "fs"
import matter from "gray-matter"
import { join } from "path"

export const getMDXDocument = (path: string) => {
  const filePath = `./content/${path}.mdx`
  const {
    data: { date, ...frontmatter },
  } = matter.read(filePath)

  return {
    filePath,
    frontmatter: {
      date: date.toISOString(),
      ...frontmatter,
    },
  }
}

export const findMDXDocuments = (path: string) => {
  const dirPath = join(process.cwd(), `./content/${path}`)

  return readdirSync(dirPath)
    .filter((fn) => fn.endsWith(".mdx"))
    .map((fn) => fn.replace(/\.mdx$/, ""))
}
