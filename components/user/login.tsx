"use client";
import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import CardWrapper from "@/components/cardwrapper";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/user/userSlice";
import { selectStatus } from "@/lib/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { LoginSchema } from "@/schemas/userSchema";

export default function LoginForm() {
  const status = useAppSelector(selectStatus);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    dispatch(login(values));
  };
  return (
    <>
      <CardWrapper
        headerLabel="Login"
        href="/signup"
        buttonLabel="Don't have an account?"
        className="md:w-1/3 h-1/3"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center mt-3">
              <Button
                disabled={status === "loading"}
                type="submit"
                className=""
              >
                Login
              </Button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
}
