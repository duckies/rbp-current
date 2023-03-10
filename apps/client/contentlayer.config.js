import { ExpansionMap, InstanceMap } from "@rbp/battle.net/constants"
import { capitalize } from "@rbp/shared"
import { defineDocumentType, defineNestedType, makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

const Slug = defineNestedType(() => ({
  name: "Slug",
  fields: {
    slug: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
  },
}))

const Images = defineNestedType(() => ({
  name: "Images",
  fields: {
    inset: {
      type: "string",
      required: false,
    },
  },
}))

export const Strategy = defineDocumentType(() => ({
  name: "Strategy",
  filePathPattern: `strategies/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the strategy",
      required: true,
    },
    description: {
      type: "string",
      description: "Description for hero caption.",
      required: true,
    },
    date: {
      type: "date",
      description: "Date of the strategy release.",
      required: true,
    },
    images: {
      type: "nested",
      of: Images,
      required: false,
    },
    draft: {
      type: "boolean",
      default: false,
      description: "Drafts are unpublished and not available in production.",
    },
  },
  computedFields: {
    difficulty: {
      type: "string",
      resolve: (doc) => {
        const difficultySlug = doc._raw.sourceFileDir.split("/")[3]

        return capitalize(difficultySlug)
      },
    },
    basePath: {
      type: "string",
      resolve: (doc) => {
        return `strategies/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`
      },
    },
    path: {
      type: "string",
      resolve: (doc) => {
        const difficulty = doc._raw.sourceFileDir.split("/")[3]
        return `strategies/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}/${difficulty}`
      },
    },
    expansion: {
      type: "nested",
      of: Slug,
      resolve: (doc) => {
        const slug = doc._raw.sourceFileDir.split("/")[1]

        if (slug in ExpansionMap) {
          return {
            slug,
            name: ExpansionMap[slug],
          }
        }
      },
    },
    instance: {
      type: "nested",
      of: Slug,
      resolve: (doc) => {
        const [, expansionSlug, instanceSlug] = doc._raw.sourceFileDir.split("/")

        if (expansionSlug in ExpansionMap && instanceSlug in InstanceMap[expansionSlug]) {
          return {
            slug: instanceSlug,
            name: InstanceMap[expansionSlug][instanceSlug],
          }
        }
      },
    },
  },
}))

export const Announcement = defineDocumentType(() => ({
  name: "Announcement",
  filePathPattern: `announcements/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the strategy",
      required: true,
    },
    description: {
      type: "string",
      description: "Description for hero caption.",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "Excerpt used for announcement listings.",
      required: true,
    },
    date: {
      type: "date",
      description: "Date of the strategy release.",
      required: true,
    },
    images: {
      type: "nested",
      of: Images,
      required: false,
    },
    draft: {
      type: "boolean",
      default: false,
      description: "Drafts are unpublished and not available in production.",
    },
  },
  computedFields: {
    path: {
      type: "string",
      resolve: (doc) => `announcements/${doc._raw.sourceFileName.replace(/\.mdx$/, "")}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Strategy, Announcement],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
