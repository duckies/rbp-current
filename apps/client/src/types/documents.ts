export interface Document {
  title: string
  date: string
  description: string
}

export interface PostDocument extends Document {
  excerpt: string
}
