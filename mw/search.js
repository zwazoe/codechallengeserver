const getIncludes = function (data, arr, callback) {
  let output = data.filter((item) => {
    let product = item.status && item.status.toLowerCase();
    return arr.includes(product);
  });
  if (callback) {
    output = callback(output);
  }
  return output;
};

const defaultValue = function (data, obj, callback) {
  let keys = Object.keys(obj);
  let output = data.map((item, index) => {
    let new_item = { row: index + 1, ...item };
    keys.forEach((element) => {
      if (!new_item[element]) {
        new_item[element] = obj[element];
      }
    });
    return new_item;
  });
  if (callback) {
    output = callback(output);
  }
  return output;
};

const sortValue = function (data, sort_by, callback) {
  let output = data.sort((a, b) => {
    let first = a[sort_by[0]];
    let second = b[sort_by[0]];
    if (Number.isNaN(a[sort_by[0]])) {
      first = first.toLowerCase();
      second = second.toLowerCase();
    }

    if (sort_by[1] == "asc") {
      if (first < second) return -1;
      return 1;
    }
    if (first > second) return -1;
    return 1;
  });
  if (callback) {
    output = callback(output);
  }
  return output;
};

module.exports = {
  getIncludes,
  defaultValue,
  sortValue,
};
