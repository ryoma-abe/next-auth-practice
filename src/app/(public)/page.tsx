import PostCard from "@/components/post/PostCard";
import { getPosts } from "@/lib/post";

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <div className="container mx-auto">
        <ul>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      </div>
    </>
  );
}
