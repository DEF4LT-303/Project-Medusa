"use client";

import Link from "next/link";

import { signUp } from "@/app/actions/user-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";

export function RegisterForm() {
  const [message, formAction] = useFormState(signUp, null);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-160px)]">
      <Card className="mx-auto max-w-sm my-3">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="w-full" action={formAction}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name*</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name*</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="123-456-7890"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password*</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="******"
                />
              </div>
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
