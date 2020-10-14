function timezoneDate(ts, timezone) {
  const dt = new Date(ts);
  const secDiff = dt.getTimezoneOffset() * 60 + timezone;
  dt.setSeconds(dt.getSeconds() + secDiff);
  return dt;
}

export default timezoneDate;
