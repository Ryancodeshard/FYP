"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useSearchParams, redirect, useRouter } from "next/navigation";
import { CalendarUserType } from "@/app/interfaces/Calendar";
import { User } from "@/app/interfaces/User";

interface FormFields {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

const GAuthButton = () => {
  return <Button onClick={() => signIn("google")}>Sign in with Google</Button>;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const fetch_user = async (email: string): Promise<User> => {
  const res = await fetch("/api/user/get_by_email", {
    method: "POST",
    body: JSON.stringify(email),
  });
  return await res.json();
};

const create_new_user = async (email: string) => {
  await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify(email),
  });
};

const fetch_user_or_create = async (email: string) => {
  let cur_user = fetch_user(email);
  if (!cur_user) {
    create_new_user(email);
    cur_user = fetch_user(email);
  }
};

const add_new_calendar_user = async (
  id: number,
  user_type: string,
  calendar_id: number
) => {
  await fetch("/api/calendar/new_user", {
    method: "POST",
    body: JSON.stringify({
      user_type:
        user_type === "parent"
          ? CalendarUserType.parent
          : CalendarUserType.child,
      user_id: id,
      calendar_id: calendar_id,
    }),
  });
};

const invite_flow = async (
  email: string,
  invite_code: string | null,
  push: any
) => {
  console.log("invite flow triggered");
  await fetch_user_or_create(email);
  if (!invite_code) return;
  const [user_type, calendar_id] = invite_code
    ? atob(invite_code).split("_")
    : [];
  const userData = await fetch_user(email);
  if (userData)
    add_new_calendar_user(Number(userData.id), user_type, Number(calendar_id));
  push(`/calendar/${calendar_id}`);
};

const LoginModal = () => {
  const { data } = useSession();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const invite_code = searchParams.get("invite_code");

  useEffect(() => {
    if (!data && invite_code) setOpen(true);
    if (data?.user?.email) invite_flow(data.user.email, invite_code, push);
  }, [data, invite_code, push]);

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
      {!data?.user ? (
        <>
          <Button
            variant="outlined"
            sx={{ color: "white" }}
            onClick={() => setOpen(true)}
          >
            Log in
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
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
                <Button type="submit">Sign in</Button>
                <p>
                  Don’t have an account yet? <a href="#">Sign up</a>
                </p>
              </form>
              or
              <GAuthButton />
            </Box>
          </Modal>
        </>
      ) : (
        <>
          <Typography sx={{ color: "white", padding: "10px" }}>
            Signed in as {data?.user?.name}
          </Typography>
          <Button
            variant="outlined"
            sx={{ color: "white", backgroundColor: "orange" }}
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </>
      )}
    </>
  );
};

export { GAuthButton, LoginModal };
