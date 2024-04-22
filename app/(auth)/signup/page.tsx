import { SignUpForm } from "@/app/(auth)/signup/form"
import { validateRequest } from "@/lib/lucia"
import { redirect } from "next/navigation"

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup',
  description: '',
};

export default async function SignUpPage() {
  const { user } = await validateRequest()

  if (user) {
    return redirect("/")
  }

  return (
      <SignUpForm />
  )
}