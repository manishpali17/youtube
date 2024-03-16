"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CardWrapperProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
  headerLabel: string;
  buttonLabel: string;
  href: string;
}

export default function CardWrapper({
  children,
  headerLabel,
  buttonLabel,
  href,
  className,
  ...props
}: CardWrapperProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="text-4xl">
        <CardTitle>{headerLabel}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button variant="link" size="sm" asChild className="font-normal w-full">
          <Link href={href}>
            <CardDescription>{buttonLabel}</CardDescription>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
