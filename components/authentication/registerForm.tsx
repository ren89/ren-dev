"use client";

import { signup } from "@/app/auth/actions";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export function RegisterForm() {
  const [state, formAction] = useFormState(signup, null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    if (state?.success) {
      redirect("/");
    }
  }, [state]);

  return (
    <div className={"h-screen flex items-center justify-center"}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email and password to create a new account.
            {state?.error && <p className="text-red-500">{state.error}</p>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} onSubmit={() => setLoading(true)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="ren-dev@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button className="w-full" disabled={isLoading}>
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/auth/signin" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
