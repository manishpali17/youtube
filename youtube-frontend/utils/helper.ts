import moment from "moment";

export function getVideoAge(dateString: string) {
  const objectDate = moment(dateString);
  const currentDate = moment();

  const years = currentDate.diff(objectDate, "years");
  const months = currentDate.diff(objectDate, "months");
  const days = currentDate.diff(objectDate, "days");
  const hours = currentDate.diff(objectDate, "hours");
  const minutes = currentDate.diff(objectDate, "minutes");
  const seconds = currentDate.diff(objectDate, "seconds");

  if (years > 0) {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  }
}

export function getVideoDuration(time:number){
  return moment()?.startOf("day")?.seconds(time)?.format("H:mm:ss");
}