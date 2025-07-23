const json_stringify = JSON.stringify;
function ensureLastSubString(str, subStr, matchCase = true) {
  if (!isString(str) || !isString(subStr)) {
    throwError(["c79e853f-72b6-49ca-9c11-322b160f2173", str, subStr]);
  }
  let exists = false;
  let subStringLength = subStr.length;
  if (subStringLength === 0) {
    return str;
  }
  str = str.trim();
  if (matchCase) {
    exists = str.slice(-subStringLength) === subStr;
  } else {
    exists = str.slice(-subStringLength).toLowerCase() === subStr.toLowerCase();
  }
  if (exists) {
    return str;
  }
  return str + subStr;
}
function ensureFirstSubString(str, subStr, matchCase = true) {
  if (!isString(str) || !isString(subStr)) {
    throwError(["c79e853f-72b6-49ca-9c11-322b160f2173", str, subStr]);
  }
  let exists = false;
  let subStringLength = subStr.length;
  if (subStringLength === 0) {
    return str;
  }
  str = str.trim();
  if (matchCase) {
    exists = str.slice(0, subStringLength) === subStr;
  } else {
    exists =
      str.slice(0, subStringLength).toLowerCase() === subStr.toLowerCase();
  }
  if (exists) {
    return str;
  }
  return subStr + str;
}
function isDateTimeInHMS(time) {
  return (
    isString(time) &&
    !!time.match(/^[\d]{4}-[\d]{2}-[\d]{2} [\d]{2}:[\d]{2}:[\d]{2}$/)
  );
}
function getTimeInHMS({
  local = true,
  timestampMs,
  timestampS,
  dateTimeArgs,
  timeInHMS,
  isUTC,
  nativeDate,
  prependZero = true,
  format = "y-mm-d h:mins:ss",
} = {}) {
  if (!isString(format)) {
    throwError([format, "267ba1a9-6857-5ffb-ad3d-abbabdfd1e8e"]);
  }
  if (dateTimeArgs && !isArrayFull(dateTimeArgs)) {
    throwError(["698ead3f-89c4-5725-bcd7-3341b995e268", dateTimeArgs]);
  } else if (timestampMs && !isTimestampMsValid(timestampMs)) {
    throwError(["c58611c6-b46c-5242-b66e-7e329375fd42", timestampMs]);
  } else if (timestampS && !isTimestampMsValid(timestampS * 1000)) {
    throwError(["11b7af58-27d6-56fd-973b-e4b35a410a88", timestampS]);
  } else if (timeInHMS && !isDateTimeInHMS(timeInHMS)) {
    throwError(["1d164080-6a74-58e8-82db-3dd1af3a6942", timeInHMS]);
  } else if (nativeDate) {
    try {
      new Date(nativeDate);
    } catch (e) {
      throwError(["1fac154c-71f8-4b4c-b526-d4270b0dd744", nativeDate]);
    }
  }
  let d;
  let ap = "";
  try {
    if (timestampMs) {
      timestampMs = parseInt(timestampMs);
      d = new Date(timestampMs);
    } else if (timestampS) {
      timestampS = parseInt(timestampS);
      d = new Date(timestampS * 1000);
    } else if (isArrayFull(dateTimeArgs)) {
      if (dateTimeArgs.length > 1) {
        dateTimeArgs[1] = parseInt(dateTimeArgs[1]) - 1;
      }
      dateTimeArgs = dateTimeArgs.map((s) => "" + s);
      if (isUTC) {
        d = new Date(Date.UTC(...dateTimeArgs));
      } else {
        d = new Date(...dateTimeArgs);
      }
    } else if (isDateTimeInHMS(timeInHMS)) {
      if (isUTC) {
        timeInHMS += "Z";
      }
      d = new Date(timeInHMS);
    } else if (nativeDate) {
      d = new Date(nativeDate);
    } else {
      d = new Date();
    }
  } catch (e) {
    throwError(["05b09945-5040-51c4-97fc-b041d60d5a6e", e]);
  }
  if (format.includes("y")) {
    let year = local ? d.getFullYear() : d.getUTCFullYear();
    year = year.toString();
    format = format.split("y").join(year);
  }
  if (format.includes("mm")) {
    let month = local ? d.getMonth() + 1 : d.getUTCMonth() + 1;
    month = month.toString();
    if (prependZero && month.length === 1) month = "0" + month;
    format = format.split("mm").join(month);
  }
  if (format.includes("d")) {
    let day = local ? d.getDate() : d.getUTCDate();
    day = day.toString();
    if (prependZero && day.length === 1) day = "0" + day;
    format = format.split("d").join(day);
  }
  if (format.includes("h")) {
    let hours = local ? d.getHours() : d.getUTCHours();
    if (stringIncludesNoCase(format, "ap")) {
      ap = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12;
      if (format.includes("ap")) {
        format = format.split("ap").join(ap);
      } else if (format.includes("AP")) {
        format = format.split("AP").join(ap.toUpperCase());
      }
    }
    hours = hours.toString();
    if (prependZero && hours.length === 1) {
      hours = "0" + hours;
    }
    format = format.split("h").join(hours);
  }
  if (format.includes("mins")) {
    let minutes = local ? d.getMinutes() : d.getUTCMinutes();
    minutes = minutes.toString();
    if (prependZero && minutes.length === 1) {
      minutes = "0" + minutes;
    }
    format = format.split("mins").join(minutes);
  }
  if (format.includes("ss")) {
    let seconds = local ? d.getSeconds() : d.getUTCSeconds();
    seconds = seconds.toString();
    if (prependZero && seconds.length === 1) {
      seconds = "0" + seconds;
    }
    format = format.split("ss").join(seconds);
  }
  return format;
}
function isObject(value) {
  return typeof value === "object" && value !== null;
}
function isObjectFull(obj) {
  if (!isObject(obj)) {
    return false;
  }
  for (let s in obj) {
    if (hasOwnProp(obj, s)) {
      return true;
    }
  }
  return false;
}
function isArray(arr) {
  return Array.isArray(arr);
}
function isArrayFull(arr) {
  return isArray(arr) && arr.length > 0;
}
function isNumber(
  value,
  { checkInteger = true, parse = false, negative = false } = {}
) {
  if (parse && isString(value)) {
    value = value.trim();
    if (value.match(/^-?\d+(\.\d+)?$/)) {
      value = parseFloat(value);
    }
  }
  if (typeof value === "number" && !isNaN(value)) {
    if (!negative && value < 0) {
      return false;
    }
    if (checkInteger) {
      if (Number.isInteger(value)) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
  return false;
}
function isFloat(value, { parse = false, negative = false } = {}) {
  if (parse && isString(value)) {
    value = value.trim();
    if (value.match(/^-?\d+(\.\d+)?$/)) {
      value = parseFloat(value);
    }
  }
  if (typeof value === "number" && !isNaN(value)) {
    if (!negative && value < 0) {
      return false;
    }
    return true;
  }
  return false;
}
function sleepPromise(seconds) {
  if (seconds < 0) {
    seconds = 0.001;
  }
  return new Promise((resolve) => {
    setTimeout(resolve, Math.round(seconds * 1000));
  });
}
function indexOfNoCase(arr, val) {
  return arr.findIndex((item) => {
    if (isString(val) && isString(item)) {
      return val.toLowerCase() === item.toLowerCase();
    }
    return val === item;
  });
}
function stringIndexOfNoCase(str, subStr) {
  return str.toLowerCase().indexOf(subStr.toLowerCase());
}
function stringIncludesNoCase(str, subStr) {
  return stringIndexOfNoCase(str, subStr) !== -1;
}
function getUniqueElements(arr, ignoreCase) {
  if (!isArray(arr)) {
    throwError(["10d97e53-455f-44cb-80e4-0f23e36786d0", arr]);
  }
  {
    return arr.filter((v, i, a) => indexOfNoCase(a, v) === i);
  }
}
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
function isStringFull(value) {
  return isString(value) && value.length > 0;
}
function isStringEqual(str1, str2, matchCase = true) {
  if (!isString(str1) || !isString(str2) || matchCase) {
    return str1 === str2;
  }
  return str1.toLowerCase() === str2.toLowerCase();
}
function hasOwnProp(obj, propName) {
  if (!(isStringFull(propName) || isFloat(propName)) || !isObject(obj)) {
    throwError(["01231b1a-77fc-41fa-ac08-a5bab19e6c0f", propName, obj]);
  }
  return Object.hasOwn(obj, propName);
}
function isStringOrFloat(val) {
  return isString(val) || isFloat(val);
}
function arrayHasAny(arr, values) {
  if (!isArray(arr) || !isArray(values)) {
    throwError(["3ff46e34-8d05-4649-96b0-e6187c4e178f", arr, values]);
  }
  return values.findIndex((s) => arr.includes(s)) !== -1;
}
function isError(s) {
  return (s && s?.stack) || s instanceof Error;
}
function isGUID(str) {
  return isString(str) && str.match(/[\w]{8}-[\w]{4}-[\w]{4}-[\w]{4}-[\w]{12}/);
}
function throwError(errorInfo, ...args) {
  let error = {
    time: new Date().toLocaleString(),
  };
  if (isArrayFull(args)) {
    errorInfo = concatArrays(errorInfo, args);
  }
  if (isArray(errorInfo)) {
    error.message = error.errCode =
      errorInfo.find((s) => isGUID(s)) ||
      errorInfo.find((s) => isString(s)) ||
      "";
    let newErrorInfo = [...errorInfo.filter((s) => !isError(s))];
    const findNestedErrors = function (infoData) {
      let found = infoData.find((s) => isError(s));
      if (found) {
        newErrorInfo.push("--", found);
        if (isArray(found.info)) {
          findNestedErrors(found.info);
        }
      }
    };
    findNestedErrors(errorInfo);
    errorInfo = newErrorInfo;
  } else if (isString(errorInfo) || isFloat(errorInfo)) {
    error.message = error.errCode = errorInfo;
  }
  error.info = errorInfo;
  let errorObj = new Error();
  Object.assign(errorObj, error);
  throw errorObj;
}
function isArrayOfStrings(arr, { emptyStringAllowed = true } = {}) {
  return (
    isArray(arr) &&
    arr.every((s) => {
      if (isString(s) && !emptyStringAllowed && s.length === 0) {
        return false;
      }
      return isString(s);
    })
  );
}
function ensureInSubstring(str, subStr, matchCase = true) {
  if (!isString(str) || !isString(subStr)) {
    throwError([str, subStr, "75aed006-652c-5412-bcb8-d735046c1a52"]);
  }
  str = ensureFirstSubString(str, subStr, matchCase);
  str = ensureLastSubString(str, subStr, matchCase);
  return str;
}
function removeQuotes(stringValue, ensureBoth = true) {
  if (!isStringFull(stringValue)) {
    return stringValue;
  }
  stringValue = stringValue.trim();
  let allQuotes = ['"', "'"];
  if (ensureBoth) {
    if (
      allQuotes.includes(stringValue.charAt(0)) &&
      allQuotes.includes(stringValue.charAt(stringValue.length - 1))
    ) {
      stringValue = stringValue.slice(1);
      stringValue = stringValue.slice(0, stringValue.length - 1);
    }
    return stringValue;
  }
  if (allQuotes.includes(stringValue.charAt(0))) {
    stringValue = stringValue.slice(1);
  }
  if (allQuotes.includes(stringValue.charAt(stringValue.length - 1))) {
    stringValue = stringValue.slice(0, stringValue.length - 1);
  }
  return stringValue;
}
function isTimestampMsValid(timestampMs) {
  if (!isNumber(timestampMs, { checkInteger: false, parse: true })) {
    return false;
  }
  timestampMs = parseInt(timestampMs);
  let minTimestampMs = new Date("1971").getTime();
  let maxTimestampMs = new Date(
    "" + (new Date().getUTCFullYear() + 100)
  ).getTime();
  return timestampMs > minTimestampMs && timestampMs < maxTimestampMs;
}
function stringifyObj(obj, keysToSkip) {
  if (!isObject(obj)) {
    return json_stringify(obj);
  }
  if (isStringOrFloat(keysToSkip)) {
    keysToSkip = [keysToSkip];
  }
  let skipKeys = isArrayFull(keysToSkip);
  try {
    return JSON.stringify(obj, function (k, v) {
      if (skipKeys && keysToSkip.includes(k)) {
        return undefined;
      }
      return v;
    });
  } catch (e) {
    throwError(["46d91a05-d21b-5ebc-88ac-40f5e79d67d1", e]);
  }
}
function stringifyCopyObj(obj, keysToSkip) {
  if (!isObject(obj)) {
    return obj;
  }
  try {
    return JSON.parse(stringifyObj(obj, keysToSkip));
  } catch (e) {
    throwError(["746a0a52-37d8-5477-b4b6-10ed37d36332", e]);
  }
}
function stringIncludesAny(str, words, matchCase = true) {
  if (isString(words)) {
    words = [words];
  }
  if (!isString(str) || !isArray(words)) {
    throwError(["d17ff8b7-5bb9-4983-ae9b-a1c5fc3e42c1", str, words]);
  }
  return (
    words.findIndex((w) => {
      if (!matchCase) {
        return stringIncludesNoCase(str, w);
      }
      return str.includes(w);
    }) !== -1
  );
}
function stringIncludesAll(str, words, matchCase = true) {
  if (isString(words)) {
    words = [words];
  }
  if (!isString(str) || !isArray(words)) {
    throwError(["a2f13891-5a48-58b6-b0a7-9ef012dcc0f2", str, words]);
  }
  return words.every((w) => {
    if (!matchCase) {
      return stringIncludesNoCase(str, w);
    }
    return str.includes(w);
  });
}
function concatArrays(...args) {
  return [].concat(...args);
}
function hideText(str, hideChar = "*") {
  if (!isString(str)) {
    return str;
  }
  return str
    .split("")
    .map(() => hideChar)
    .join("");
}

export { arrayHasAny, concatArrays, ensureFirstSubString, ensureInSubstring, ensureLastSubString, getTimeInHMS, getUniqueElements, hasOwnProp, hideText, indexOfNoCase, isArray, isArrayFull, isArrayOfStrings, isDateTimeInHMS, isError, isFloat, isGUID, isNumber, isObject, isObjectFull, isString, isStringEqual, isStringFull, isStringOrFloat, isTimestampMsValid, json_stringify, removeQuotes, sleepPromise, stringIncludesAll, stringIncludesAny, stringIncludesNoCase, stringIndexOfNoCase, stringifyCopyObj, stringifyObj, throwError };
