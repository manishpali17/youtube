"use client";

import { logout } from "@/lib/user/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { selectStatus } from "@/lib/user/userSlice";

export default function LogoutButton({
  buttonText,
  className,
}: {
  buttonText: string;
  className: string;
}) {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const onClick = () => {
    dispatch(logout(""));
  };

  return (
    <Button
      className={className}
      onClick={onClick}
      disabled={status === "loading"}
    >
      {buttonText}
    </Button>
  );
}
