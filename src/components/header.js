import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignedOut, UserButton } from "@clerk/nextjs";

export default async function Header() {
  const { userId } = auth();

  return (
    <div className="bg-green-500 text-neutral-100">
      <div className="container mx-auto flex items-center justify-between py-5 text-black text-bold">
        <Link href="/">
            <div className="text-bold text-black text-xl">Home</div>
        </Link>
        <div>
          {userId ? (
            <div className="flex gap-4 items-center">
                <Link href="/about">About</Link>
              <UserButton afterSignOutUrl="/"/>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/signup">Sign up</Link>
              <Link href="/signin">Sign in</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
