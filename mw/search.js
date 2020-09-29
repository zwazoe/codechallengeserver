const getIncludes = function (data, config = {}, callback) {
  // filter key maybe status or reason or rows. default to status
  let filter_key = config.filter_key || "status";
  // inc maybe error, failure, success (if sstatus) or 1 to ... if row, etc.
  let inc = config.inc || ["error", "failure"];
  // filter based data accordingly
  let output = data.filter((item) => {
    // if filter key availabble
    //   get the value and lowercase
    let product = item[filter_key] && item[filter_key].toLowerCase();
    // return only if product is included in acc. to config.inc
    return inc.includes(product);
  });
  // callback func. allows to mutate output prior to return.
  if (callback) {
    return callback(output);
  }
  return output;
};

// task: add default value to the data
// purpose: Every entry in the JSON file should have a status and a reason, but our data isn't perfect. A missing status should default to "Error", and a missing reason should default to "Server Error".
const defaultValue = function (data, config = {}, callback) {
  // default key / val will be use if  original data value is absent.
  let default_dict = config.default_dict || {};
  // get the keys of dict.
  let keys = Object.keys(default_dict);
  // map data instead of forEach because it returns data.
  let output = data.map((item, index) => {
    // create a rows by adding +1 to index.
    let new_item = { row: index + 1, ...item };
    keys.forEach((element) => {
      // if their isn't a value, apply default value (use default_dict.)
      if (!new_item[element]) {
        new_item[element] = default_dict[element];
      }
    });
    return new_item;
  });
  if (callback) {
    return callback(output);
  }
  return output;
};

// task: sort in accordance with sort_by arg
// purpose: Your implementation should allow a user to click on any of the 3 column headers - Row, Status and Reason. This should  cause the entire table to sort by that field

const sortValue = function (data, config = {}, callback) {
  // use of arrays allow for addition sorts if or when necessary.
  let sort_by = config.sort_by || [];
  // config may inc compare to control nomenclature instead of hard coded value.
  let compare = config.compare || "asc";
  let output = data.sort((a, b) => {
    // get  value for comparison
    let first = a[sort_by[0]];
    let second = b[sort_by[0]];
    // if val is not a num, lowercase the val.
    // Reminder: lowercase number will throw error
    if (Number.isNaN(a[sort_by[0]])) {
      first = first.toLowerCase();
      second = second.toLowerCase();
    }

    // compare both values.in accordance to config.compare
    if (sort_by[1] === compare) {
      if (first < second) return -1;
      return 1;
    }
    if (first > second) return -1;
    return 1;
  });
  if (callback) {
    return callback(output);
  }
  return output;
};

module.exports = {
  getIncludes,
  defaultValue,
  sortValue,
};
