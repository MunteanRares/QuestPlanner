import { HStack, Image } from "@chakra-ui/react";
import SearchInputCities from "./SearchInputCities";
import whiteLogo from "../../assets/logo-white.webp";
import darkLogo from "../../assets/logo-dark.webp";
import { ColorModeButton, useColorMode } from "../ui/color-mode";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <HStack justifyContent="space-between" paddingX={8} paddingY={5}>
      <Image
        onClick={() => navigate("/")}
        cursor="pointer"
        width="200px"
        src={colorMode === "dark" ? whiteLogo : darkLogo}
      />
      <HStack>
        <SearchInputCities />
        <ColorModeButton />
      </HStack>
    </HStack>
  );
};

export default NavBar;
