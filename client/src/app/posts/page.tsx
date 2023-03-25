import Link from "next/link";
import { LikeButton } from "./components/LikeButton";

// Este es un componente que se carga desde el servidor por  lo que los hook no funcionan aca
const fetchPosts = () => {
  // getStaticProps
  //   return fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
  //     res.json()
  //   );

  // getServerSideProps
  //   return fetch("https://jsonplaceholder.typicode.com/posts", {
  //     cache: "no-store", // Esto es para que sea dinamica, sino los datos serian estaticos
  //                           y se cargarian solo la ves que hacemos build
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
    <div className="container-lg">
      <div className="row justify-content-center center w-100 gap-lg-4 gap-md-3 gap-sm-1">
        {posts.map((post: any) => {
          return (
            <div
              className="card p-2 col-xl-3 col-lg-4 col-md-6 col-sm-12 well"
              key={post.id}
            >
              <Link href="/posts/[id]" as={`/posts/${post.id}`}>
                <h1 className="card-header">{post.title}</h1>
                <p className="card-body">{post.body}</p>
                <LikeButton />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
