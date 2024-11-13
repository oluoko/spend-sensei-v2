import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge class names
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function to add commas to a number
export function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to format date and time
export function formatDate(date, format) {
  var dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
  var day = date.getDate();
  var month = date.toLocaleString("en-US", { month: "long" });
  var year = date.getFullYear();

  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  var dayWithSuffix = day + getOrdinalSuffix(day);

  // Format time in 12-hour format with AM/PM
  var time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // 12-hour format with AM/PM
  });

  if (format === "date") {
    // Return the formatted date
    return dayOfWeek + ", " + dayWithSuffix + " " + month + ", " + year;
  } else if (format === "time") {
    // Return the formatted time
    return time;
  }

  // Default to returning the full date if format is not specified
  return (
    dayOfWeek + ", " + dayWithSuffix + " " + month + ", " + year + " at " + time
  );
}
