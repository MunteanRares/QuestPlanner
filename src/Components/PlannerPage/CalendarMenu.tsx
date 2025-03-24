import { Box, Button, Menu, Portal } from "@chakra-ui/react";
import { bg } from "date-fns/locale";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";

type ValueType = Date | null;
export type Value = ValueType | [ValueType, ValueType];

interface Props {
  text: string;
  onDateChange: (date: Value) => void;
}

const CalendarMenu = ({ text, onDateChange }: Props) => {
  const [dateValue, setDateValue] = useState<Value>(new Date());
  const [opened, setOpened] = useState(false);
  const minDate = new Date();

  const handleOnChange = (newDate: Value) => {
    setDateValue(newDate);
    onDateChange(newDate);
    setOpened(false);
  };

  return (
    <>
      <Box position={"relative"}>
        <Menu.Root positioning={{ placement: "bottom" }} open={opened}>
          <Menu.Trigger
            onClick={() => setOpened(opened === true ? false : true)}
          >
            <Button borderColor={"blue.solid"} variant="outline">
              {text} {dateValue?.toLocaleString().split(",")[0]}
            </Button>
          </Menu.Trigger>
          <Menu.Content
            position="absolute"
            top="120%"
            left="-50%"
            minHeight={"unset"}
            borderRadius="10px"
            padding={0}
            width="fit-content"
            background="transparent"
          >
            <Box
              css={{
                "--background-color": "colors.bg.subtle",
                "--background-color-disabled": "colors.bg.emphasized",
              }}
            >
              <Calendar
                minDate={minDate}
                onChange={handleOnChange}
                value={dateValue}
              />
            </Box>
          </Menu.Content>
        </Menu.Root>
      </Box>
    </>
  );
};

export default CalendarMenu;
