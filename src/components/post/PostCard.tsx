import { PostCardProps } from "@/types/post";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
export default function PostCard({ post }: PostCardProps) {
  return (
    <li className="border p-4">
      <Link href={`/post/${post.id}`}>
        <p>{post.author.name}</p>
        <p>
          <div className="border p-4 prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </p>
      </Link>
    </li>
  );
}
