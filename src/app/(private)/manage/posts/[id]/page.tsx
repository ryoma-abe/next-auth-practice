import { auth } from "@/auth";
import PostCard from "@/components/post/PostCard";
import { getOwnPost } from "@/lib/ownPost";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ id: string }>;
};
export default async function ShowPage({ params }: Params) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!session?.user?.email || !userId) {
    throw new Error("不正なリクエストです");
  }
  const { id } = await params;
  const post = await getOwnPost(userId, id);

  if (!post) {
    notFound();
  }
  return <PostCard key={post.id} post={post} />;
}
