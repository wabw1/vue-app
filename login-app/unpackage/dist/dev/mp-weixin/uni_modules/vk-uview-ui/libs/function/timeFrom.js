"use strict";
const uni_modules_vkUviewUi_libs_function_timeFormat = require("./timeFormat.js");
function timeFrom(dateTime = null, format = "yyyy-mm-dd") {
  if (!dateTime)
    dateTime = Number(new Date());
  if (dateTime.toString().length == 10)
    dateTime *= 1e3;
  let timestamp = +new Date(Number(dateTime));
  let timer = (Number(new Date()) - timestamp) / 1e3;
  let tips = "";
  switch (true) {
    case timer < 300:
      tips = "\u521A\u521A";
      break;
    case (timer >= 300 && timer < 3600):
      tips = parseInt(timer / 60) + "\u5206\u949F\u524D";
      break;
    case (timer >= 3600 && timer < 86400):
      tips = parseInt(timer / 3600) + "\u5C0F\u65F6\u524D";
      break;
    case (timer >= 86400 && timer < 2592e3):
      tips = parseInt(timer / 86400) + "\u5929\u524D";
      break;
    default:
      if (format === false) {
        if (timer >= 2592e3 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + "\u4E2A\u6708\u524D";
        } else {
          tips = parseInt(timer / (86400 * 365)) + "\u5E74\u524D";
        }
      } else {
        tips = uni_modules_vkUviewUi_libs_function_timeFormat.timeFormat(timestamp, format);
      }
  }
  return tips;
}
exports.timeFrom = timeFrom;
