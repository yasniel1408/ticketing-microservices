import styles from "./page.module.css";

const fetchComments = async ({ id }: { id: number }) => {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  // Incremental staic regeneration
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
};

const Post = async ({ params }: { params: any }) => {
  const { id } = params;

  const comments = await fetchComments({ id });
  return (
    <ul className={styles.ul}>
      {comments.map((comment: any) => {
        return (
          <li key={comment.id}>
            <h1>Name: {comment.name}</h1>
            <p>Comment: {comment.body}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Post;
