import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookie = new Cookies();

export function translateToString(string) {
  string = string
    ?.toLowerCase()
    ?.replace(/[^\w\s]/gi, "-")
    ?.replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return string;
}

export const kFormatter = (num) => {
  if (num < 1e3) return num;
  if (num >= 1e3 && num < 1e6)
    return +(num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  if (num >= 1e6 && num < 1e9)
    return +(num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1e9 && num < 1e12)
    return +(num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  if (num >= 1e12) return +(num / 1e12).toFixed(1).replace(/\.0$/, "") + "T";
};

export const getShortContent = (str = "", num = 150) => {
  let str_len = str?.length;
  if (str_len > num) {
    return str?.substring(0, num) + "...";
  }
  return str;
};

// object to query string
export const objectToQueryString = (obj) => {
  let str = [];
  for (let data in obj)
    if (obj.hasOwnProperty(data)) {
      if (obj[data] !== "" && obj[data] !== null) {
        str.push(
          encodeURIComponent(data) + "=" + encodeURIComponent(obj[data])
        );
      }
    }
  return str.join("&");
};
export const writeCookie = (days) => {
  var date = new Date();
  days = days || 365;
  date.setTime(+date + days * 86400000); //24 * 60 * 60 * 1000
  return date;
};

export const translate = (keyword) => {
  return keyword;
  const [safeDate, setSafeDate] = useState();
  useEffect(() => {
    setSafeDate(JSON.parse(localStorage.getItem("langData")));
  }, [typeof document !== "undefined" && localStorage.getItem("langData")]);
  let lang_data;
  if (safeDate) {
    if (safeDate[keyword]) {
      lang_data = safeDate[keyword];
    } else {
      lang_data = keyword;
    }
  } else {
    lang_data = keyword;
  }
  return lang_data;
};

export const removeHTML = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
};

export const removeAuthCookie = (res) => {
  res.setHeader('Set-Cookie', ['user_info=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT', 'user_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT']);
};
