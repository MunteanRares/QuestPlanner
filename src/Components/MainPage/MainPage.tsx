import { Grid, GridItem, HStack } from "@chakra-ui/react";
import NavBar from "../NavBar/NavBar";
import GoogleMaps from "../GoogleMaps";
import ContentMainPage from "./ContentMainPage";
import HeaderPage from "../HeaderPage";
import getLocation from "../../services/GetLocation";
import useValidateToken from "../../hooks/useValidateToken";

const MainPage = () => {
  const { positionCoords, isLoading: locationLoading } = getLocation();

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
          <ContentMainPage position={positionCoords} />
        </HStack>
      </GridItem>

      <GridItem position="fixed" height="100vh" width="50vw" area="map">
        <GoogleMaps position={positionCoords} isLoading={locationLoading} />
      </GridItem>
    </Grid>
  );
};

export default MainPage;
