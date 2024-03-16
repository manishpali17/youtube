import { useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { selectStatus, updateUserAvatar} from "@/lib/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AvatarSchema } from "@/schemas/userSchema";

export default function UpdateAvatarForm() {
  const form = useForm<z.infer<typeof AvatarSchema>>({
    resolver: zodResolver(AvatarSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const onSubmit = (values: z.infer<typeof AvatarSchema>) => {
    console.log(values);
    dispatch(updateUserAvatar(values.avatar));
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Avatar"
                    {...field}
                    type="file"
                    value={value?.fileName}
                    accept="image/png, image/jpeg"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (event.target.files && event.target.files[0]) {
                        onChange(event.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={status === "loading"} type="submit" className="">
            Update
          </Button>
        </form>
      </Form>
    </>
  );
}
