import { format } from "date-fns";

export const formatToHumanReadableDate = (date: string) =>
  format(date, "MMMM dd, yyyy");
