"use strict";
const sendResponse = (res, statusCode, data) =>
  res.status(statusCode).send(data);

const ok = res => data => {
  const statusCode = !data || (Array.isArray(data) && !data.length) ? 204 : 200;
  sendResponse(res, statusCode, data);
};

const created = res => data => sendResponse(res, 201, data);
const accepted = res => data => sendResponse(res, 202, data);
const nodata = res => data => sendResponse(res, 204, data);
const badRequest = res => data => sendResponse(res, 400, data);
const unAuthorized = res => error => sendResponse(res, 401, error);
const notFound = res => data => sendResponse(res, 404, data);
const conflict = res => message =>
  reportEmail("Conflict", message, () => sendResponse(res, 409, message));
const fail = res => error => sendResponse(res, 500, error);
const notImplemented = res => (data = "") => sendResponse(res, 501, data);

const response = res => async route => {
  try {
    const resp = await route();
    ok(res)(resp);
  } catch (error) {
    fail(res)(error);
  }
};
module.exports = {
  ok,
  created,
  accepted,
  nodata,
  badRequest,
  conflict,
  notFound,
  fail,
  unAuthorized,
  notImplemented,
  response
};
