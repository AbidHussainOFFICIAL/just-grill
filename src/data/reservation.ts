import type { SelectOption } from "@/types";

export const personOptions: SelectOption[] = Array.from({ length: 7 }, (_, i) => ({
  value: `${i + 1}-person`,
  label: `${i + 1} Person`,
}));

/** Same visible labels as the original page (including its "12 : 00 am"). */
export const timeOptions: SelectOption[] = [
  { value: "08:00am", label: "08 : 00 am" },
  { value: "09:00am", label: "09 : 00 am" },
  { value: "10:00am", label: "10 : 00 am" },
  { value: "11:00am", label: "11 : 00 am" },
  { value: "12:00am", label: "12 : 00 am" },
  { value: "01:00pm", label: "01 : 00 pm" },
  { value: "02:00pm", label: "02 : 00 pm" },
  { value: "03:00pm", label: "03 : 00 pm" },
  { value: "04:00pm", label: "04 : 00 pm" },
  { value: "05:00pm", label: "05 : 00 pm" },
  { value: "06:00pm", label: "06 : 00 pm" },
  { value: "07:00pm", label: "07 : 00 pm" },
  { value: "08:00pm", label: "08 : 00 pm" },
  { value: "09:00pm", label: "09 : 00 pm" },
  { value: "10:00pm", label: "10 : 00 pm" },
];
