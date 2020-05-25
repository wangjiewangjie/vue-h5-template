/* 时间戳转换 */
const timeFormat = (timeStamp, formats) => {
  formats = formats || "yyyy-MM-dd";
  let date = timeStamp ? new Date(timeStamp) : new Date();
  let year = date.getFullYear();
  let month = formatDigit(date.getMonth() + 1);
  let day = formatDigit(date.getDate());
  let hour = formatDigit(date.getHours());
  let minute = formatDigit(date.getMinutes());
  let second = formatDigit(date.getSeconds());
  return formats.replace(/yyyy|MM|dd|hh|mm|ss/g, function (matches) {
    return {
      yyyy: year,
      MM: month,
      dd: day,
      hh: hour,
      mm: minute,
      ss: second
    } [matches];
  });
  // 小于10补0
  function formatDigit(n) {
    return n.toString().replace(/^(\d)$/, "0$1");
  }
};

/* 页面地址参数获取 */
const getWindonHref = () => {
  let hrefStr = window.location.href;
  let args = hrefStr.split("?");
  if (args[0] === hrefStr) {
    return "";
  }
  let hrefArr = args[1].split("#")[0].split("&");
  let hrefObj = {};
  for (let i = 0; i < hrefArr.length; i++) {
    hrefArr[i] = hrefArr[i].split("=");
    hrefObj[hrefArr[i][0]] = hrefArr[i][1];
  }
  return hrefObj;
};

/* 设置cookie */
const setCookie = (name, value, iDay) => {
  let oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = name + "=" + value + ";expires=" + oDate;
};

/* 读取cookies */
const getCookie = name => {
  let arr = document.cookie.split("; ");
  for (let i = 0; i < arr.length; i++) {
    let arr2 = arr[i].split("=");
    if (arr2[0] == name) {
      return arr2[1];
    }
  }
  return "";
};

/* 删除cookies */
const removeCookie = name => {
  setCookie(name, 1, -1);
};

export {
  timeFormat,
  getWindonHref,
  setCookie,
  getCookie,
  removeCookie
};