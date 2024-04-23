"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpSchema } from "../../../types";
import { signUp } from "../../../actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    const res = await signUp(values);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Account created successfully",
      });

      router.push("/");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800 sm:p-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Signup
        </h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Create a username" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Create a password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p>
          By creating an account, you are agreeing to the{" "}
          <Link href="#">Terms of Service</Link> and you are acknowledging the{" "}
          <Link href="">Privacy Policy</Link>
        </p>
        <Button type="submit">Sign up</Button>
        <p>
          Have an account? <Link href="login">Log in</Link>
        </p>
      </form>
    </Form>
  );
}
