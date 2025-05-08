import Link from "next/link";
import { Button } from "../ui/button";

export default function PublicHeader() {
  return (
    <header className="bg-sky-200 py-6">
      <div className="flex justify-between container mx-auto px-4">
        <h1 className="text-3xl font-bold">ロゴ</h1>
        <div className="space-x-2">
          <Button asChild>
            <Link href="/register">登録</Link>
          </Button>
          <Button asChild>
            <Link href="/login">ログイン</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
