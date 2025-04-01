import { HStack, Image, Link } from "@chakra-ui/react";
import SearchInputCities from "./SearchInputCities";
import whiteLogo from "../../assets/logo-white.webp";
import darkLogo from "../../assets/logo-dark.webp";
import { ColorModeButton, useColorMode } from "../ui/color-mode";
import { useNavigate } from "react-router-dom";
import useGetProfile from "../../hooks/useGetProfile";
import Capitalize from "../../services/Capitalize";

const NavBar = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { data: userProfile, error: userProfileError } = useGetProfile();

  const handleOnLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate(0);
  };

  return (
    <HStack justifyContent="space-between" paddingX={8} paddingY={5}>
      <Image
        onClick={() => navigate("/")}
        cursor="pointer"
        width="200px"
        src={colorMode === "dark" ? whiteLogo : darkLogo}
      />
      <HStack>
        <Link onClick={handleOnLogout} marginRight={"10px"}>
          Logout
        </Link>
        <Link marginRight={"20px"} variant="plain" href="/profile">
          {Capitalize(userProfile?.username)}
        </Link>

        <SearchInputCities />
        <ColorModeButton />
      </HStack>
    </HStack>
  );
};

export default NavBar;
