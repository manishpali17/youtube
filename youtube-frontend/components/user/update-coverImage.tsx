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
import { selectStatus, updateUserCoverImage } from "@/lib/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CoverImageSchema } from "@/schemas/userSchema";

export default function UpdateCoverImageForm() {
  const form = useForm<z.infer<typeof CoverImageSchema>>({
    resolver: zodResolver(CoverImageSchema),
    defaultValues: {
      coverImage: undefined,
    },
  });

  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  const onSubmit = (values: z.infer<typeof CoverImageSchema>) => {
    dispatch(updateUserCoverImage(values.coverImage));
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Cover Image"
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
