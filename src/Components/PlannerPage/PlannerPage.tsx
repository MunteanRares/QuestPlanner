import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../NavBar/NavBar";
import HeaderPage from "../HeaderPage";
import { useParams } from "react-router-dom";
import useCityDetails from "../../hooks/useCityDetails";

const PlannerPage = () => {
  const { city, placeId } = useParams();
  const { data, isLoading } = useCityDetails(placeId);

  return (
    <Grid
      position={"relative"}
      templateAreas={`"nav" "main"`}
      templateRows="100px 1fr"
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem area="main">
        <HeaderPage title={city} image={data[0] && data[0].photoLinks} />
      </GridItem>
    </Grid>
  );
};

export default PlannerPage;
