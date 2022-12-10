import { Link } from "components/Link"
import css from "./post.module.scss"

export type BlogPostProps = {
  link: string
  title: string
  description: string
}

export function BlogPost({ title, link, description }: BlogPostProps) {
  return (
    <div className={css.post}>
      <Link to={link}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>{description}</p>
      </Link>
    </div>
  )
}
