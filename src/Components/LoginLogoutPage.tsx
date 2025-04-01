import {
  Box,
  Button,
  Card,
  Input,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useLoginUser from "../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";
import useRegisterUser from "../hooks/useRegisterUser";

interface Props {
  text: string;
  type: "login" | "register";
}

const LoginLogoutPage = ({ text, type }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const {
    data: loginTokenResponse,
    fetchLoginUser,
    error,
    isLoading,
  } = useLoginUser();

  const {
    data: registerTokenResponse,
    fetchRegisterUser,
    error: registerError,
  } = useRegisterUser();

  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const navigate = useNavigate();

  const handleOnLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLoginUser(email, password);
    setEmail("");
    setPassword("");
  };

  const handleOnRegister = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRegisterUser(username, email, password);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (loginTokenResponse?.token) {
      localStorage.setItem("jwtToken", loginTokenResponse.token);
      console.log(`Token updated: ${loginTokenResponse.token}`);
      navigate(0);
    }

    if (registerTokenResponse?.token) {
      localStorage.setItem("jwtToken", registerTokenResponse.token);
      console.log(`Token updated: ${registerTokenResponse.token}`);
      navigate(0);
    }
  }, [loginTokenResponse, registerTokenResponse]);

  return (
    <>
      <Box height={"100vh"} display="flex">
        <Card.Root
          padding={"16px"}
          width={"25rem"}
          marginX={"auto"}
          marginY={"auto"}
        >
          <Text fontSize={"4xl"}>{text}</Text>

          <Text
            marginBottom={"16px"}
            fontSize={"14px"}
            marginTop="2px"
            color={"red.500"}
          >
            {(error !== "" ? "Invalid Credentials" : "") ||
              (registerError !== "" ? registerError : "")}
          </Text>

          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={type == "login" ? handleOnLogin : handleOnRegister}
          >
            {type == "register" && (
              <>
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></Input>
              </>
            )}

            <label style={{ marginTop: "20px" }} htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>

            <label style={{ marginTop: "20px" }} htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>

            {isLoading ? (
              <Spinner marginTop={"13px"} marginX="auto" />
            ) : (
              <Text
                marginTop={"12px"}
                color={"gray.400"}
                marginX={"auto"}
                fontSize={"14px"}
              >
                Or {type == "login" ? "sign up" : "log in"}{" "}
                <Link
                  color={"#88b4d8"}
                  variant="underline"
                  href={type == "login" ? "/register" : "login"}
                >
                  here.
                </Link>
              </Text>
            )}

            <Button
              marginTop={"1.2rem"}
              marginLeft="auto"
              variant={"subtle"}
              color={"#333"}
              fontWeight="600"
              backgroundColor={"#88b4d8"}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Card.Root>
      </Box>
    </>
  );
};

export default LoginLogoutPage;
