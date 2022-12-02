import { defineDocumentType, makeSource } from "contentlayer/source-files"
import { getPathExpansion, getPathInstance } from "./src/lib/mdx"

export const Strategy = defineDocumentType(() => ({
  name: "Strategy",
  filePathPattern: `strategies/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "Fight title",
      required: true,
    },
    date: {
      type: "date",
      description: "Date of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/strategies/${doc._raw.flattenedPath}`,
    },
    expansion: {
      type: "string",
      resolve: (doc) => getPathExpansion(doc._raw.flattenedPath),
    },
    instance: {
      type: "string",
      resolve: (doc) => getPathInstance(doc._raw.flattenedPath),
    },
  },
}))

export default makeSource({
  contentDirPath: "./src/content",
  documentTypes: [Strategy],
})
