import { Value } from "../Components/PlannerPage/CalendarMenu";

const getDateRange = (startDate: Value, endDate: Value): Date[] => {
  let start: Date | null = null;
  let end: Date | null = null;

  start = startDate as Date;
  end = endDate as Date;

  if (!start || !end) return [];

  const dates: Date[] = [];
  let currentDate = new Date(start);
  currentDate.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  while (currentDate.getTime() <= end.getTime()) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export default getDateRange;
