import { Box } from "@chakra-ui/react";
import CalendarMenu, { Value } from "./CalendarMenu";
import { LuArrowRight } from "react-icons/lu";

interface Props {
  onStartDateChange: (date: Value) => void;
  onEndDateChange: (date: Value) => void;
}

const DateRange = ({ onStartDateChange, onEndDateChange }: Props) => {
  return (
    <Box gap={20} display="flex" justifyContent="center">
      <CalendarMenu text="Start Date:" onDateChange={onStartDateChange} />
      <LuArrowRight style={{ alignSelf: "center" }} />
      <CalendarMenu text="End Date:" onDateChange={onEndDateChange} />
    </Box>
  );
};

export default DateRange;
