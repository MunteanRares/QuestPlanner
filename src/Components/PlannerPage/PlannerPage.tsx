import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Separator,
    Text,
} from "@chakra-ui/react";
import NavBar from "../NavBar/NavBar";
import HeaderPage from "../HeaderPage";
import { useParams } from "react-router-dom";
import useCityDetails, { DetailedCityModel } from "../../hooks/useCityDetails";
import DateRange from "./DateRange";
import { useEffect, useRef, useState } from "react";
import { Value } from "./CalendarMenu";
import ActivityDate from "./ActivityDate";
import getDateRange from "../../services/getDateRange";
import useSaveItinerary from "../../hooks/useSaveItinerary";
import { useNavigate } from "react-router-dom";

export interface activityDataModel {
    date: Date;
    places: DetailedCityModel[];
}

export interface itineraryModel {
    title: string | undefined;
    startDate: Date;
    days: {
        date: Date;
        activities: {
            location: string;
            imageUrl: string;
        }[];
    }[];
}

const PlannerPage = () => {
    const { city, placeId } = useParams();
    const { data, isLoading } = useCityDetails(placeId);
    const [startDate, setStartDate] = useState<Value>(new Date());
    const [endDate, setEndDate] = useState<Value>(new Date());
    const [dateList, setDateList] = useState<Date[] | null>(null);
    const [activityData, setActivityData] = useState<activityDataModel[]>([]);
    const { saveItinerary } = useSaveItinerary();
    const selectActivitiesSection = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const handleStartDateChange = (date: Value) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date: Value) => {
        setEndDate(date);
    };

    const scrollToBottom = () => {
        selectActivitiesSection.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleOnConfirmDates = () => {
        setDateList(getDateRange(startDate, endDate));
        scrollToBottom();
    };

    const handleActivityChange = (date: Date, places: DetailedCityModel[]) => {
        setActivityData((prevData) => {
            const existingEntryIndex = prevData.findIndex(
                (entry) => entry.date.toDateString() === date.toDateString()
            );

            if (existingEntryIndex !== -1) {
                const updatedData = [...prevData];
                updatedData[existingEntryIndex] = { date, places };
                return updatedData;
            } else {
                return [...prevData, { date, places }];
            }
        });
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);

    const handleOnSaveItinerary = () => {
        activityData.map((map) => console.log(map));
        const itinerary = {
            title: city && city,
            startDate: new Date(activityData[0].date),
            days: activityData.map((day) => ({
                date: day.date,
                activities: day.places.map((activity) => ({
                    location: activity.formattedAddress,
                    imageUrl: activity.photoLinks,
                })),
            })),
        };
        console.log(activityData);
        saveItinerary(itinerary);
        // navigate("/profile");
        // navigate(0);
    };

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
                <Box className="section choose-dates-section" spaceY={5}>
                    <HeaderPage
                        title={city}
                        isLoading={isLoading}
                        image={data[0] && data[0].photoLinks}
                    />

                    <Text className="section-title">Choose Dates</Text>
                    <DateRange
                        onStartDateChange={handleStartDateChange}
                        onEndDateChange={handleEndDateChange}
                    />
                    <Button
                        color={"white"}
                        onClick={handleOnConfirmDates}
                        background={"blue.solid"}
                        marginLeft={"auto"}
                        variant={"surface"}
                    >
                        Confirm Dates
                    </Button>
                    <Separator marginBottom="1rem" />
                </Box>

                <Box
                    ref={selectActivitiesSection}
                    minHeight="20rem"
                    className="section section-middle"
                    spaceY={5}
                >
                    <Text className="section-title">Select Activities</Text>
                    <Box>
                        {dateList
                            ? dateList?.map((date, index) => (
                                  <>
                                      <ActivityDate
                                          lng={data[0].location.longitude}
                                          lat={data[0].location.latitude}
                                          key={index}
                                          date={date}
                                          onSelectedPlaces={
                                              handleActivityChange
                                          }
                                      />
                                  </>
                              ))
                            : "Please choose the desired dates"}
                    </Box>
                </Box>

                <Box
                    spaceY={5}
                    className="section section-confirm"
                    marginBottom="2rem"
                >
                    <Button
                        onClick={handleOnSaveItinerary}
                        disabled={dateList ? false : true}
                        background={"blue.solid"}
                        variant={"solid"}
                    >
                        Save Itinerary
                    </Button>
                </Box>
            </GridItem>
        </Grid>
    );
};

export default PlannerPage;
