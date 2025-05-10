import { PostCardProps } from "@/types/post";
import Link from "next/link";

export default function PostCard({ post }: PostCardProps) {
  return (
    <li className="border p-4">
      <Link href={`/post/${post.id}`}>
        <p>{post.author.name}</p>
        <p>{post.content}</p>
      </Link>
    </li>
  );
}
