import { Box, Button, Card, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useLoginUser from "../hooks/useLoginUser";
import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
}

const LoginLogoutPage = ({ text }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data: tokenResponse, fetchLoginUser, error } = useLoginUser();
  const [token, setToken] = useState(localStorage.getItem("jwtToken") || "");
  const navigate = useNavigate();

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLoginUser(email, password);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (tokenResponse?.token && token !== tokenResponse.token) {
      setToken(tokenResponse.token);
      localStorage.setItem("jwtToken", tokenResponse.token);
      console.log(`Token updated: ${tokenResponse.token}`);
      navigate(0);
    }
  }, [tokenResponse, token]);

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
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleOnSubmit}
          >
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Input>

            <label style={{ marginTop: "25px" }} htmlFor="password">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>

            <Text marginTop="10px" color={"red.500"}>
              {error !== "" ? "Invalid Credentials" : ""}
            </Text>

            <Button
              marginTop={"1.2rem"}
              marginLeft="auto"
              variant={"subtle"}
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
