"use server";

import { registerSchema } from "@/validations/user";

type ActionState = { success: boolean; errors: Record<string, string[]> };

// バリデーションエラー処理
function handleValidationError(error: any): ActionState {
  const { fieldErrors, formErrors } = error.flatten();
  // zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
  // formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, confirmPassword: formErrors },
    };
  }
  return { success: false, errors: fieldErrors };
}
// カスタムエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}

export async function createUser(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  // フォームからの情報を取得
  const rowFormDate = Object.fromEntries(
    ["name", "email", "password", "confirmPassword"].map((field) => [
      field,
      formData.get(field) as string,
    ])
  ) as Record<string, string>;
  // バリデーション
  const validationResult = registerSchema.safeParse(rowFormDate);
  if (!validationResult.success) {
    return;
  }
  // DBにメールアドレスが存在しているか

  // DBに登録

  // ダッシュボードにリダイレクト
  return {};
}
