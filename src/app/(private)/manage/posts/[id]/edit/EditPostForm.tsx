"use client";
import { useActionState, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import TextareaAutosize from "react-textarea-autosize";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル
import { updatePost } from "@/lib/actions/updatePost";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type EditPostFormProps = {
  post: {
    id: string;
    title: string;
    content: string;
    topImage?: string | null;
    published: boolean;
  };
};
// タ

export default function EditPostForm({ post }: EditPostFormProps) {
  const [contentLength, setContentLength] = useState(0);
  const [preview, setPreview] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [published, setPublished] = useState(post.published);
  const [imagePreview, setImagePreview] = useState(post.topImage);

  const [state, formAction] = useActionState(updatePost, {
    success: false,
    errors: {},
  });
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setContent(value);
    setContentLength(value.length);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview != post.topImage) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, post.topImage]);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {state.errors.title && (
            <p className="text-red-500">{state.errors.title.join(", ")}</p>
          )}
        </div>
        <div>
          <label htmlFor="topImage">トップ画像</label>
          <input
            type="file"
            id="topImage"
            accept="image/*"
            name="topImage"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt={post.title}
              width={200}
              height={200}
              className="object-cover"
            />
          )}
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
        <RadioGroup
          value={published.toString()}
          name="published"
          onValueChange={(value) => setPublished(value === "true")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="published-one" />
            <Label htmlFor="published-one">表示</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="published-two" />
            <Label htmlFor="published-two">非表示</Label>
          </div>
        </RadioGroup>

        <button type="submit">更新する</button>

        <input type="hidden" name="postId" value={post.id} />
        <input type="hidden" name="oldImageUrl" value={post.topImage || ""} />
      </form>
    </div>
  );
}
