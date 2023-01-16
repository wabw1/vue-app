"use strict";
if (!String.prototype.padStart) {
  String.prototype.padStart = function(maxLength, fillString = " ") {
    if (Object.prototype.toString.call(fillString) !== "[object String]")
      throw new TypeError(
        "fillString must be String"
      );
    let str = this;
    if (str.length >= maxLength)
      return String(str);
    let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}
function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
  if (!dateTime)
    dateTime = Number(new Date());
  if (dateTime.toString().length == 10)
    dateTime *= 1e3;
  let date = new Date(dateTime);
  let ret;
  let opt = {
    "y+": date.getFullYear().toString(),
    "m+": (date.getMonth() + 1).toString(),
    "d+": date.getDate().toString(),
    "h+": date.getHours().toString(),
    "M+": date.getMinutes().toString(),
    "s+": date.getSeconds().toString()
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    }
  }
  return fmt;
}
exports.timeFormat = timeFormat;
