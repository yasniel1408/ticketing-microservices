import Link from "next/link";
import { ReactNode } from "react";
import styles from "./page.module.css";

const fetchPost = ({ id }: { id: number }) => {
  // Incremental staic regeneration
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
};

const PostLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) => {
  const { id } = params;

  const post = await fetchPost({ id });

  return (
    <article className={styles.card}>
      <h2>Post ID: {id}</h2>
      <h1>Title: {post.title}</h1>
      <p>Body: {post.body}</p>
      <Link href={`/posts/${id}/comments`}>Ver Commentarios</Link>
      {children}
    </article>
  );
};

export default PostLayout;
