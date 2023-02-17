export const imageLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const tableCustomStyles = {
  headCells: {
    style: {
      backgroundColor: '#F3F4F6',
      color: '#0F172A',
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  // cells: {
  //   style: {
  //     // border: '1px solid red',
  //     // paddingLeft: '16px',
  //     // paddingRight: '16px',
  //     wordBreak: 'break-word',
  //   },
  //   draggingStyle: {},
  // },
};

/// Convert Query String
export const convertQueryString = (params) => {
  const searchParams = new URLSearchParams(params);
  return searchParams;
};

export const cleanObj = (obj) => {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName];
    }
  }
  return obj;
};

export const uniqId = () => {
  const id = Math.floor(Math.random() * Date.now());
  return id;
};

export const convertToMilliseconds = (x) => {
  let milliseconds = x;
  let hr = 0;
  let min = 0;
  let sec = 0;
  let day = 0;
  while (milliseconds >= 1000) {
    milliseconds = milliseconds - 1000;
    sec = sec + 1;
    if (sec >= 60) min = min + 1;
    if (sec === 60) sec = 0;
    if (min >= 60) hr = hr + 1;
    if (min === 60) min = 0;
    if (hr >= 24) {
      hr = hr - 24;
      day = day + 1;
    }
  }

  const time = {
    millisecond: x,
    second: sec,
    minute: min,
    hour: hr,
    day,
  };
  return time;
};

export const dayCalculate = (startDate, EndDate) => {
  let x = Date.parse(EndDate) - Date.parse(startDate);
  console.log(x);
  let milliseconds = x;
  let hr = 0;
  let min = 0;
  let sec = 0;
  let day = 0;
  while (milliseconds >= 1000) {
    milliseconds = milliseconds - 1000;
    sec = sec + 1;
    if (sec >= 60) min = min + 1;
    if (sec === 60) sec = 0;
    if (min >= 60) hr = hr + 1;
    if (min === 60) min = 0;
    if (hr >= 24) {
      hr = hr - 24;
      day = day + 1;
    }
  }

  return day;
};
