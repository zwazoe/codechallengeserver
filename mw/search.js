// filter out status that included the items on the array.

const getIncludes = function (data, config = {}, callback) {
  let filter_key = config.filter_key || "status";
  let inc = config.inc || ["Error"];
  let output = data.filter((item) => {
    let product = item[filter_key] && item[filter_key].toLowerCase();
    return inc.includes(product);
  });
  if (callback) {
    output = callback(output);
  }
  return output;
};

// task: add default value to the data
// purpose: Every entry in the JSON file should have a status and a reason, but our data isn't perfect. A missing status should default to "Error", and a missing reason should default to "Server Error".
const defaultValue = function (data, config = {}, callback) {
  let default_dict = config.default_dict || {};
  let keys = Object.keys(default_dict);
  let output = data.map((item, index) => {
    let new_item = { row: index + 1, ...item };
    keys.forEach((element) => {
      if (!new_item[element]) {
        new_item[element] = default_dict[element];
      }
    });
    return new_item;
  });
  if (callback) {
    output = callback(output);
  }
  return output;
};

// task: sort in accordance with sort_by arg
// purpose: Your implementation should allow a user to click on any of the 3 column headers - Row, Status and Reason. This should  cause the entire table to sort by that field

const sortValue = function (data, config = {}, callback) {
  let sort_by = config.sort_by || [];
  let output = data.sort((a, b) => {
    let first = a[sort_by[0]];
    let second = b[sort_by[0]];
    if (Number.isNaN(a[sort_by[0]])) {
      first = first.toLowerCase();
      second = second.toLowerCase();
    }

    if (sort_by[1] === "asc") {
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
