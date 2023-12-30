"use client";

import { useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { Box, Button, Modal } from "@mui/material";

interface FormFields {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

const GAuthButton = () => {
  return (
    <button type="button" onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  );
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

const LoginModal = () => {
  const { data } = useSession();

  const [open, setOpen] = useState(false);

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
          <button onClick={() => setOpen(true)}>Log in</button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
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
                <button type="submit">Sign in</button>
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
        <div>
          Signed in as {data?.user?.name}
          <button type="button" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export { GAuthButton, LoginModal };
