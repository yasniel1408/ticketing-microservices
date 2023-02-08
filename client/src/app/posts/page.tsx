import Link from "next/link";
import { LikeButton } from "./components/LikeButton";
import styles from "./page.module.css";

// Este es un componente que se carga desde el servidor por  lo que los hook no funcionan aca
const fetchPosts = () => {
  // getStaticProps
  //   return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
  //     res.json()
  //   );

  // getServerSideProps
  //   return fetch("https://jsonplaceholder.typicode.com/posts", {
  //     cache: "no-store", // Esto es para que sea dinamica, sino los datos serian estaticos y se cargarian solo la ves que hacemos build
  //   }).then((res) => res.json());

  // Incremental staic regeneration
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());
};

const Posts = async () => {
  const posts = await fetchPosts();

  return (
    <div>
      {posts.map((post: any) => {
        return (
          <div className={styles.post} key={post.id}>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <LikeButton />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
