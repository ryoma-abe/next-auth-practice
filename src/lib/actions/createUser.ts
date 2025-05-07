"use server";

type ActionState = { success: boolean; errors: Record<string, string[]> };

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームからの情報を取得

  // バリデーション

  // DBにメールアドレスが存在しているか

  // DBに登録

  // ダッシュボードにリダイレクト
  return {};
}
