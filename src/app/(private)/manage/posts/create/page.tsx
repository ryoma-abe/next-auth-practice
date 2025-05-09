"use client";
import { useState, useActionState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル

export default function CreatePage() {
  const [content, setContent] = useState("");
  const [contentLength, setContentLength] = useState(0);
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">新規記事投稿（Markdown対応）</h1>
      <form>
        <div>
          <label htmlFor="">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="タイトルを入力してください"
          />
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
        </div>
        <div className="text-right">文字数：{contentLength}</div>
      </form>
    </div>
  );
}
