import { isStringFull, isString, throwError, isNumber, isArrayFull, sleepPromise, hideText } from './common-utils/js-utils.mjs';
import { getProcessArgs, httpRequest, showErrorOrNotification } from './common-utils/node-utils.mjs';
import { EOL } from 'os';

let {
  ip,
  ipAddress,
  pwd,
  password,
  p,
  user,
  username,
  u,
  url,
  tries,
  t,
  wait,
  w,
  timeout,
  tout,
} = getProcessArgs();
pwd = pwd || password || p;
ip = ip || ipAddress;
user = user || username || u;
tries = tries || t;
wait = wait || w;
timeout = timeout || tout;
if (!isStringFull(user)) {
  user = "admin";
}
if (!isStringFull(ip) || !isString(pwd)) {
  throwError([
    "90ca0991-d497-490d-9f25-d15b31da4df2",
    ip,
    pwd,
    "IP or Password not given!",
  ]);
}
if (!isStringFull(url)) {
  url = `http://${ip}/platform.cgi`;
}
tries = parseInt(tries);
wait = parseInt(wait);
timeout = parseInt(timeout);
if (!isNumber(tries) || tries < 1) {
  tries = 1;
}
if (!isNumber(wait) || wait < 1) {
  wait = 1;
}
if (!isNumber(timeout) || timeout < 1) {
  timeout = 60;
}
let tokenReqHeader = {
  "Content-Type": "application/x-www-form-urlencoded",
  Referer: `http://${ip}/`,
};
let tokenReqPayload = {
  thispage: "index.html",
  "users.username": user,
  "users.password": pwd,
  "button.login.users.dashboard": "Login",
};
let rebootReqHeader = {
  "Content-Type": "application/x-www-form-urlencoded",
  Referer: `http://${ip}/`,
};
let rebootReqPayload = {
  thispage: "factoryDefault.html",
  token: "",
  "button.reboot.statusPage": "Reboot",
};
let tried = 0;
let success = false;
let res;
(async () => {
  while (!success) {
    if (tried >= tries) {
      break;
    }
    tried++;
    if (!rebootReqPayload.token) {
      try {
        res = await httpRequest(url, {
          method: "POST",
          body: tokenReqPayload,
          headers: tokenReqHeader,
          timeoutS: timeout,
        });
      } catch (e) {
        continue;
      }
    }
    let { data } = res;
    let matched = data.match(/name=\"token\"\s*value=\"(\w+)/);
    if (!isArrayFull(matched) || !isArrayFull(res.headers["set-cookie"])) {
      continue;
    }
    rebootReqPayload.token = matched[1];
    rebootReqHeader.Cookie = res.headers["set-cookie"][0];
    try {
      data = (
        await httpRequest(url, {
          method: "POST",
          body: rebootReqPayload,
          headers: rebootReqHeader,
          timeoutS: timeout,
        })
      ).data;
    } catch (e) {
      continue;
    }
    success = /Router will be up in/g.test(data);
    if (!success) {
      await sleepPromise(wait);
    }
  }
  if (success) {
    showErrorOrNotification([
      `Jio Fiber Router at ${ip} restarted successfully!`,
      `Total tries: ${tries}`,
    ]);
  } else {
    let notify = [
      "Error restarting Jio Router!",
      `Tries: ${tries}`,
      `Timeout: ${timeout} seconds`,
      `Wait between tries: ${wait} seconds.`,
      `Ip: ${ip}. Username: ${user}`,
      `URL: ${url}`,
    ];
    notify.push("", "Token Request Headers:");
    for (let s in tokenReqHeader) {
      notify.push(`${s}: ${tokenReqHeader[s]}`);
    }
    notify.push("", "Token Request Payload:");
    for (let s in tokenReqPayload) {
      if (s === "users.password") {
        notify.push(`${s}: ${hideText(tokenReqPayload[s])}`);
      } else {
        notify.push(`${s}: ${tokenReqPayload[s]}`);
      }
    }
    notify.push("", "Reboot Request Headers:");
    for (let s in rebootReqPayload) {
      notify.push(`${s}: ${rebootReqPayload[s]}`);
    }
    showErrorOrNotification(notify);
  }
  console.log(EOL);
})();
