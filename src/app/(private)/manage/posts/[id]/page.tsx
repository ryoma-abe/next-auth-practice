import { auth } from "@/auth";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOwnPost } from "@/lib/ownPost";
import Image from "next/image";
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
  return (
    <div>
      <Card>
        {post.topImage && (
          <div className="relative">
            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              priority
            />
          </div>
        )}
        <CardHeader>
          <div>
            <p>投稿者：{post.author.name}</p>
            <time>
              {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                locale: ja,
              })}
            </time>
          </div>
        </CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardContent>{post.content}</CardContent>
      </Card>
    </div>
  );
}
