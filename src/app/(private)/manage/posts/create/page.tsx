"use client";
import { useActionState, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { createPost } from "@/lib/actions/createPost";

export default function CreatePage() {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [state, formAction] = useActionState(createPost, {
    success: false,
    errors: {},
  });
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">新規記事投稿（Markdown対応）</h1>
      <form action={formAction}>
        <div>
          <label htmlFor="">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
          />
          {state.errors.title && (
            <p className="text-red-500">{state.errors.title.join(", ")}</p>
          )}
        </div>
        <div>
          <label htmlFor="topImage">トップ画像</label>
          <input type="file" id="topImage" accept="image/*" name="topImage" />
          {state.errors.topImage && (
            <p className="text-red-500">{state.errors.topImage.join(", ")}</p>
          )}
        </div>
        <div>
          <label htmlFor="content">内容（Markdown）</label>
          <TextareaAutosize
            id="content"
            name="content"
            className="w-full border p-2"
            placeholder="Markdown形式で入力してください"
            minRows={8}
            value={content}
            onChange={handleContentChange}
          />
          {state.errors.content && (
            <p className="text-red-500">{state.errors.content.join(", ")}</p>
          )}
        </div>
        <div className="text-right">文字数：{contentLength}</div>
        <div>
          <button type="button" onClick={() => setPreview(!preview)}>
            {preview ? "プレビューを閉じる" : "プレビューを表示"}
          </button>
        </div>
        {preview && (
          <div className="border p-4 bg-gray-50 prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false}
              unwrapDisallowed={true}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
        <button type="submit">投稿する</button>
      </form>
    </div>
  );
}
