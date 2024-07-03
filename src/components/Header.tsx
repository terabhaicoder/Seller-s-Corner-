'use client';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header({ session }: { session: Session | null }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <header className="border-b border-gray-700 p-4 flex items-center justify-between h-16 bg-gray-900">
      <Link
        className="text-purple-500 font-extrabold text-2xl"
        href="/">
        Seller's Corner
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/new" className="border border-purple-500 text-purple-500 inline-flex gap-1 items-center py-1 px-4 mr-4 hover:bg-purple-500 hover:text-white transition">
          <FontAwesomeIcon icon={faPlus} className="h-4"/>
          <span>Post an ad</span>
        </Link>
        <span className="border-r border-gray-600 h-8"></span>
        {!session?.user && (
          <>
            <button className="text-gray-400 hover:text-white transition">Sign up</button>
            <button
              onClick={() => signIn('google')}
              className="bg-purple-600 text-white border-0 px-6 py-1 ml-4 hover:bg-purple-700 transition">
              Login
            </button>
          </>
        )}
        {session?.user && (
          <>
            <div className="relative flex items-center">
              <button onClick={() => setShowDropdown(prev => !prev)}>
                <Image
                  src={session.user.image as string} alt={'avatar'} width={36} height={36}
                  className={"rounded-full border-2 border-purple-500 "+(showDropdown?'z-50':'')}
                />
              </button>
              {showDropdown && (
                <>
                  <div
                    onClick={() => setShowDropdown(false)}
                    className="bg-black/80 fixed inset-0 z-40"></div>
                  <div className="absolute z-50 right-0 top-12 bg-gray-800 rounded-md w-28 border border-gray-700 shadow-lg">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        router.push('/my-ads');
                      }}
                      className="p-2 block text-center w-full text-gray-300 hover:bg-gray-700 hover:text-white transition">My ads</button>
                    <button className="p-2 block w-full text-gray-300 hover:bg-gray-700 hover:text-white transition" onClick={() => signOut()}>Logout</button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
