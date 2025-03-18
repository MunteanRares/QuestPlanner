import { useState } from "react";
import "./App.css";
import { Grid, GridItem } from "@chakra-ui/react";
import GoogleMaps from "./Components/GoogleMaps";
import NavBar from "./Components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Grid
      templateAreas={`"nav map" "aside map"`}
      templateRows="100px 1fr"
      templateColumns="1fr 1fr"
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem paddingY={5} paddingX={10} area="aside">
        sdf
      </GridItem>

      <GridItem height="100vh" area="map">
        <GoogleMaps />
      </GridItem>
    </Grid>
  );
}

export default App;
