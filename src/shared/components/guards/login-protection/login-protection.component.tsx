import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProtectionProps {
  children: React.ReactNode;
}

const LoginProtection = (props: LoginProtectionProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(window.location.href);

    if (
      !token &&
      !window.location.href.includes("login") &&
      window.location.href != "/"
    ) {
      navigate("/login", {
        state: {
          showMessage: true,
        },
      });
    }
  }, []);

  return <>{props.children}</>;
};

export default LoginProtection;
