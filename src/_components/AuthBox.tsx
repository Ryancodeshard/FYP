"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface FormFields {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

const GAuthButton = () => {
  const { data } = useSession();

  return (
    <>
      {!data?.user ? (
        <button type="button" onClick={() => signIn("google")}>
          Sign in with Google
        </button>
      ) : (
        <div>
          <div>Signed in as {data?.user?.name}</div>
          <button type="button" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export { GAuthButton };
