import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Setting from "./Setting";
import { auth } from "@/auth"; // 認証情報
export default async function PrivateHeader() {
  const session = await auth(); // サーバーサイドでセッション情報を取得
  if (!session?.user?.email) throw new Error("不正なリクエストです");
  return (
    <header className="bg-amber-200">
      <div className="container mx-auto p-4 flex items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" passHref>
                管理ページ
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
}
