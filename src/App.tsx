import "./App.css";
import { Grid, GridItem, HStack } from "@chakra-ui/react";
import GoogleMaps from "./Components/GoogleMaps";
import NavBar from "./Components/NavBar";
import HeaderPage from "./Components/MainPage/HeaderPage";
import ContentMainPage from "./Components/MainPage/ContentMainPage";
import getLocation from "./services/GetLocation";
import { HiDivide } from "react-icons/hi2";

function App() {
  const { position, isLoading } = getLocation();

  return (
    <Grid
      position={"relative"}
      templateAreas={`"nav map" "aside map"`}
      templateRows="100px 1fr"
      templateColumns="49vw 50vw"
      height="100vh"
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem paddingY={7} paddingX={10} area="aside">
        <HStack display="flex" flexFlow="column" spaceY={10}>
          <HeaderPage />
          <ContentMainPage position={position} />
        </HStack>
      </GridItem>

      <GridItem position="fixed" height="100vh" width="50vw" area="map">
        <GoogleMaps position={position} isLoading={isLoading} />
      </GridItem>
    </Grid>
  );
}

export default App;
