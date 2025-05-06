import { PostCardProps } from "@/types/post";

export default function PostCard({ post }: PostCardProps) {
  return (
    <li className="border p-4">
      <p>{post.author.name}</p>
      <p>{post.content}</p>
    </li>
  );
}
