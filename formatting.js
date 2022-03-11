function convertUTCToDate(utc) {
  return new Date(utc * 1000);
}

function formatDate(date) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatWeekday(date) {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function formatTime(time) {
  const options = { hour: "2-digit", minute: "2-digit" };
  let timeString = time.toLocaleTimeString("en-US", options);
  if (timeString[0] === "0") {
    timeString = timeString.substring(1);
  }
  return timeString;
}

function capitalizeEachWord(sentence) {
  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(" ");
}

export default {
  convertUTCToDate,
  formatDate,
  formatWeekday,
  formatTime,
  capitalizeEachWord,
};
