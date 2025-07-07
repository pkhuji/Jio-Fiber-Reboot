import http from 'http';
import https from 'https';
import 'dns';
export { access as fs_access, appendFile as fs_appendFile, copyFile as fs_copyFile, lstat as fs_lstat, mkdir as fs_mkdir, readFile as fs_readFile, readdir as fs_readdir, rename as fs_rename, rm as fs_rm, unlink as fs_unlink, writeFile as fs_writeFile } from 'fs/promises';
export { createHash as crypto_createHash, getHashes as crypto_getHashes } from 'crypto';
export { EOL } from 'os';
import { execSync, exec } from 'child_process';
export { exec as child_process_exec, execSync as child_process_execSync, spawn as child_process_spawn, spawnSync as child_process_spawnSync } from 'child_process';
export { appendFileSync as fs_appendFileSync, constants as fs_constants, copyFileSync as fs_copyFileSync, createReadStream as fs_createReadStream, createWriteStream as fs_createWriteStream, readFileSync as fs_readFileSync, readdirSync as fs_readdirSync, writeFileSync as fs_writeFileSync, lstat as fsc_lstat, rename as fsc_rename } from 'fs';
import { URL } from 'url';
export { URL as url_URL, fileURLToPath as url_fileURLToPath, pathToFileURL as url_pathToFileURL } from 'url';
import { stringify } from 'querystring';
export { decode as qs_decode, encode as qs_encode, escape as qs_escape, parse as qs_parse, unescape as qs_unescape } from 'querystring';
export { basename as path_basename, dirname as path_dirname, extname as path_extname, isAbsolute as path_isAbsolute, join as path_join, parse as path_parse, relative as path_relative, resolve as path_resolve, sep as path_sep } from 'path';
export { isIPv4, isIPv6 } from 'net';
import 'zlib';
export { pipeline as stream_pipeline } from 'stream/promises';
import { stringIncludesAny, isStringFull, isArrayOfStrings, throwError, ensureInSubstring, isString, isArrayFull, stringIncludesAll, removeQuotes, isFloat, isObject, stringifyCopyObj, isObjectFull, getUniqueElements, arrayHasAny, isStringEqual, ensureLastSubString, getTimeInHMS, isArray } from './js-utils.mjs';

function execute(cmd, sync) {
  return new Promise((res, rej) => {
    exec(cmd, function (error, stdout, stderr) {
      if (error) {
        return rej(error);
      }
      res({
        stdout,
        stderr,
      });
    });
  });
}
const isOSWinGlobal = stringIncludesAny(
  process.platform,
  ["win32", "win64"],
  false
);
function isOSWindows() {
  return isOSWinGlobal;
}
!isOSWindows() &&
  isCmdOk("rsync", {
    args: "--help",
    cmdInQuotes: false,
    sync: true,
    outputIncludes: "Copyright",
  });
function showErrorOrNotification(infoArray = [], toExit = false, exitCode = 1) {
  if (!isArray(infoArray)) {
    infoArray = [infoArray];
  }
  if (infoArray.length === 1 && isString(infoArray[0])) {
    console.log(getTimeInHMS() + " " + infoArray[0]);
  } else {
    console.log("-- " + getTimeInHMS());
    for (let s of infoArray) {
      console.log(s);
    }
    console.log("--");
  }
  if (toExit) {
    process.exit(exitCode);
  }
}
async function httpRequest(
  url,
  {
    method = "GET",
    body,
    timeoutS = 5,
    headers = {},
    rejectUnauthorized = false,
    query,
    params,
    querySlash,
    jsonResponse = false,
    agent,
  } = {}
) {
  if (!isStringFull(url) || !isObject(headers) || !isFloat(timeoutS)) {
    throwError([
      "1e7f9925-530d-4c76-9f08-bac736d94c63",
      url,
      headers,
      timeoutS,
    ]);
  }
  if (query && params) {
    throwError(["b49dcbc0-cf53-4e35-94d4-21fe54a7cedd", query, params]);
  }
  timeoutS = timeoutS * 1000;
  headers = stringifyCopyObj(headers);
  if (isObjectFull(body)) {
    let keys = getUniqueElements(Object.keys(headers));
    if (!arrayHasAny(keys, ["Content-Type", "content-type"])) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    let contentTypeValue = headers["Content-Type"] || headers["content-type"];
    if (isStringEqual(contentTypeValue, "application/json", false)) {
      body = JSON.stringify(body);
    } else {
      body = stringify(body);
    }
    if (!arrayHasAny(keys, ["Content-Length", "content-length"])) {
      headers["Content-Length"] = body.length;
    }
  } else if (isStringFull(body) || isFloat(body)) {
    body = body + "";
  }
  let hasBody = isStringFull(body);
  query = query || params;
  let { protocol, hostname, pathname, port, searchParams } = new URL(url);
  if (query instanceof URLSearchParams) {
    searchParams = new URLSearchParams([...searchParams, ...query]);
  } else if (isObjectFull(query)) {
    for (let k in query) {
      searchParams.append(k, query[k]);
    }
  }
  searchParams = searchParams.toString();
  if (isStringFull(searchParams)) {
    if (querySlash) {
      pathname = ensureLastSubString(pathname, "/");
    }
    pathname += "?" + searchParams;
  }
  let httpx = http;
  if (protocol.includes("https")) {
    httpx = https;
  }
  let res = {
    data: "",
    status: null,
    headers: null,
    statusMessage: "",
    statusCode: null,
    error: null,
    ok: true,
    pathname,
    protocol,
    hostname,
    port,
    reqHeaders: headers,
  };
  await new Promise((resolve) => {
    let req = httpx.request(
      {
        rejectUnauthorized,
        hostname,
        port: port || 80,
        path: pathname,
        method,
        headers,
        timeout: timeoutS,
        agent,
      },
      (r) => {
        res.headers = r.headers;
        res.status = r.statusCode;
        res.statusCode = r.statusCode;
        res.statusMessage = r.statusMessage;
        r.on("data", (chunk) => {
          res.data += chunk;
        });
        r.on("end", () => {
          resolve(res);
        });
        r.on("error", (e) => {
          r.destroy();
          res.error = e;
          resolve(res);
        });
      }
    );
    req.on("error", (e) => {
      res.error = e;
      req.destroy();
      resolve(res);
    });
    req.on("timeout", (e) => {
      res.error = e;
      req.destroy();
      resolve(res);
    });
    if (hasBody) {
      req.write(body);
    }
    req.end();
  });
  if (jsonResponse && isStringFull(res.data)) {
    try {
      res.data = JSON.parse(res.data);
    } catch (e) {
      res.error = e;
    }
  }
  res.ok = !res.error;
  let { statusCode } = res;
  if (statusCode >= 400 && statusCode < 600) {
    res.ok = false;
    res.error = true;
  }
  return res;
}
function isCmdOk(
  cmd,
  {
    args,
    outputIncludes,
    matchCase = false,
    matchAll = true,
    cmdInQuotes = true,
    sync = false,
  } = {}
) {
  let output = "";
  if (isString(args)) {
    args = [args];
  }
  if (isString(outputIncludes)) {
    outputIncludes = [outputIncludes];
  }
  if (
    !isStringFull(cmd) ||
    !isArrayOfStrings(args, { emptyStringAllowed: false }) ||
    !isArrayOfStrings(outputIncludes, { emptyStringAllowed: false })
  ) {
    throwError([
      "20c6703e-072b-4955-b827-3937bb7c6436",
      cmd,
      args,
      outputIncludes,
    ]);
  }
  if (cmdInQuotes) {
    cmd = ensureInSubstring(cmd, '"');
  }
  args.unshift(cmd);
  let checkOutput = function (output) {
    if (isArrayFull(outputIncludes)) {
      if (!isStringFull(output?.stdout)) {
        return false;
      }
      output = output.stdout;
      if (matchAll) {
        if (!stringIncludesAll(output, outputIncludes, matchCase)) {
          return false;
        }
      } else {
        if (!stringIncludesAny(output, outputIncludes, matchCase)) {
          return false;
        }
      }
    }
    return true;
  };
  if (sync) {
    try {
      output = execSync(args.join(" "));
    } catch (e) {
      return false;
    }
    return checkOutput(output);
  }
  return (async () => {
    try {
      output = await execute(args.join(" "));
    } catch (e) {
      return false;
    }
    return checkOutput(output);
  })();
}
function getProcessArgs({ raw = false } = {}) {
  let args = process.argv.slice(2);
  if (raw) {
    return args;
  }
  let obj = {};
  let otherParams = [];
  for (let s of args) {
    if (/^([\-]+)/.test(s)) {
      s = s.replace(/^\-+/, "");
      let split1 = s.split("=");
      let key = split1.shift();
      let val = true;
      if (isArrayFull(split1)) {
        val = removeQuotes(split1.join("="));
        if (val === "true") {
          val = true;
        } else if (val === "false") {
          val = false;
        } else if (isFloat(val, { parse: true, negative: true })) {
          val = parseFloat(val);
        }
      }
      obj[key] = val;
    } else {
      otherParams.push(s);
    }
  }
  let i = 0;
  for (let s of otherParams) {
    obj[i] = s;
    i++;
  }
  return obj;
}

export { execute, getProcessArgs, httpRequest, isCmdOk, isOSWindows, showErrorOrNotification };
