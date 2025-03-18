import { HStack, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import whiteLogo from "../assets/logo-white.webp";
import darkLogo from "../assets/logo-dark.webp";
import { ColorModeButton, useColorMode } from "./ui/color-mode";

const NavBar = () => {
  const { colorMode } = useColorMode();

  return (
    <HStack justifyContent="space-between" paddingX={8} paddingY={5}>
      <Image width="200px" src={colorMode === "dark" ? whiteLogo : darkLogo} />
      <HStack>
        <SearchInput />
        <ColorModeButton />
      </HStack>
    </HStack>
  );
};

export default NavBar;
