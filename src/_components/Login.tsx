"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface FormFields {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

export default function LoginBox() {
  const { data } = useSession();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = e.currentTarget
      .elements as typeof e.currentTarget.elements & FormFields;

    signIn("credentials", {
      username: formData.username.value,
      password: formData.password.value,
      callbackUrl: "/secretstuff",
    });
  };

  return (
    <>
      {!data?.user && (
        <>
          <h1 style={{ color: "black" }}>Sign in to your account</h1>
          <form onSubmit={onSubmit}>
            <div>
              <label>Your username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Sign in</button>
            <p>
              Don’t have an account yet? <a href="#">Sign up</a>
            </p>
          </form>
          or
          <div>
            <button type="button" onClick={() => signIn("google")}>
              Sign in with Google
            </button>
          </div>
        </>
      )}
      {data?.user && (
        <div>
          <h1>Signed in as {data?.user?.name}</h1>
          <button type="button" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      )}
    </>
  );
}
