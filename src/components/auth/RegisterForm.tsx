"use client";
import { useActionState } from "react";
import { createUser } from "@/lib/actions/createUser";

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  return (
    <div>
      <form action={formAction}>
        <div>
          <label htmlFor="name">名前</label>
          <input
            className="border"
            id="name"
            type="text"
            name="name"
            required
          />
          {state.errors.name && <p>{state.errors.name.join(",")}</p>}
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            className="border"
            id="email"
            type="email"
            name="email"
            required
          />
          {state.errors.name && <p>{state.errors.email.join(",")}</p>}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            className="border"
            id="password"
            type="password"
            name="password"
            required
          />
          {state.errors.name && <p>{state.errors.name.join(",")}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword">パスワード(確認)</label>
          <input
            className="border"
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            required
          />
          {state.errors.name && <p>{state.errors.name.join(",")}</p>}
        </div>
        <button type="submit"></button>
      </form>
    </div>
  );
}
