import { z } from "zod";

const isValidImageType = (file: File) => {
  const acceptedImageTypes = ["image/png", "image/jpeg"];
  return acceptedImageTypes.includes(file.type);
};

// Custom validation function for file size
const isValidImageSize = (file: File) => {
  const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
  return file.size <= maxSizeInBytes;
};

export const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Please provide at least 2 character" })
    .max(50, { message: "You can only enter 50 char" }),
  password: z
    .string()
    .min(6, { message: "Password should be 6 char long" })
    .max(50, { message: "keep it under 50 character" }),
  email: z.string().email(),
  username: z.string().min(2).max(20),
  avatar: z.any().refine(
    (value) => {
      const file = value as File;
      return isValidImageType(file) && isValidImageSize(file);
    },
    {
      message:
        "Avatar must be a valid image (PNG or JPEG) and less than 2MB in size.",
    }
  ),
  coverImage: z.optional(
    z.any().refine(
      (value) => {
        const file = value as File;
        return isValidImageType(file) && isValidImageSize(file);
      },
      {
        message:
          "Cover image must be a valid image (PNG or JPEG) and less than 2MB in size.",
      }
    )
  ),
});

export const LoginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Please provide at least 2 character" })
    .max(50, { message: "You can only enter 50 char" }),
  password: z
    .string()
    .min(6, { message: "Password should be 6 char long" })
    .max(50, { message: "keep it under 50 character" }),
});
export const CoverImageSchema = z.object({
  coverImage: z.any().refine(
    (value) => {
      const file = value as File;
      return isValidImageType(file) && isValidImageSize(file);
    },
    {
      message:
        "Avatar must be a valid image (PNG or JPEG) and less than 5MB in size.",
    }
  ),
});
export const AvatarSchema = z.object({
  avatar: z.any().refine(
    (value) => {
      const file = value as File;
      return isValidImageType(file) && isValidImageSize(file);
    },
    {
      message:
        "Avatar must be a valid image (PNG or JPEG) and less than 5MB in size.",
    }
  ),
});
export const changePasswordSchema = z.object({
  oldPassword: z.string().refine((value) => {}, {
    message: "You Password mismatch ",
  }),
  newPassword:z.string(),
});
