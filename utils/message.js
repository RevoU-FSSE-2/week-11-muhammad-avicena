const { format } = require("date-fns");

function formatMessage(username, text) {
  const newDate = new Date();
  const createdDate = format(newDate, "h:mm a");
  return {
    username,
    text,
    time: createdDate,
  };
}

module.exports = formatMessage;
