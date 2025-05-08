"use client";
import { useActionState } from "react";
import { authenticate } from "@/lib/actions/authenticate";
import { useSearchParams } from "next/navigation";
import { createUser } from "@/lib/actions/createUser";

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  return;
}
