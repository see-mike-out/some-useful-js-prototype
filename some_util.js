// ************************ some_util.js ************************
// Author: Hyeok Kim (@see-mike-out @ Github)
// http://hyeok.me
// First commit: July 4, 2021
// Last update: May 23, 2022

Object.defineProperty(Array.prototype, "argFilter", {
  // @comparer:  a comparison Function that takes each array element
  // returns the 'indices' of elements for which @comparer returns true.
  // usage: [1, 2, 3, 4].argFilter(d => d % 2 == 0)
  // returns [1, 3] (indices for 2 and 4, respectively).
  enumerable: false,
  value: function (comparer) {
    return this.map((d, i) => (comparer(d) ? i : undefined)).filter((d) => d !== undefined);
  }
});

Object.defineProperty(Array.prototype, "includesMultiple", {
  // @array:  an array of elements to check the membership
  // returns boolean
  // usage 1: [1, 2, 3, 4].includesMultiple([1, 2])
  // returns true
  // usage 2: [1, 2, 3, 4].includesMultiple([1, 7])
  // returns false
  enumerable: false,
  value: function (array) {
    let self = this;
    let diff = array.filter(d => !self.includes(d))
    return diff.length == 0;
  }
});

Object.defineProperty(Array.prototype, "addUnique", {
  // @array: an array of elements to add
  // returns elements of @array that are unique to the original array.
  // does not change the original array
  // usage: let a = [1, 2, 3, 4];
  // a.addUnique([1, 2]); // [1, 2, 3, 4]
  // a.addUnique([1, 5]); // [1, 2, 3, 4, 5]
  // console.log(a) // [1, 2, 3, 4, 5]
  enumerable: false,
  value: function (array) {
    this.push(...array);
    return Array.from(new Set(this));
  }
});

Object.defineProperty(Array.prototype, "sum", {
  // returns the sum of elements
  // [1, 2, 3, 4, 5].sum() // 15
  enumerable: false,
  value: function () {
    if (this.length == 0) return 0;
    return this.reduce((a, c) => a + c, 0);
  }
});

Object.defineProperty(Array.prototype, "max", {
  // returns the max of elements
  // [1, 2, 3, 4, 5].max() // 5
  enumerable: false,
  value: function () {
    return Math.max(...this);
  }
});

Object.defineProperty(Array.prototype, "min", {
  // returns the max of elements
  // [1, 2, 3, 4, 5].min() // 1
  enumerable: false,
  value: function () {
    return Math.min(...this);
  }
});

Object.defineProperty(Array.prototype, "mean", {
  // returns the mean of elements
  // [1, 2, 3, 4, 5].mean() // 3
  // @ignoreNAN (optional; default: false): if set true, then it ignores NAN; if false, NAN considered as 0.
  // @strict (default: false): if set true, returns null when there is any NAN.
  // When the length of the adjusted array (NAN removed if ignoreNAN is true) is 0, then it returns null.
  enumerable: false,
  value: function (ignoreNAN = false, strict = false) {
    if (this.length == 0) return null;
    let b;
    if (!ignoreNAN && strict && this.some(d => isNaN(d))) return null;
    if (ignoreNAN) b = this.filter(d => !isNaN(d)).map(d => parseFloat(d));
    else b = this.filter(d => d !== null && d !== undefined ? parseFloat(d) : 0);
    if (b.length == 0) return null;
    return b.reduce((a, c) => a + c, 0) / b.length;
  }
});

Object.defineProperty(Array.prototype, "stdev", {
  // returns the standard deviation of elements
  // [1, 2, 3, 4, 5].stdev() // 3
  // @ignoreNAN (optional; default: false): if set true, then it ignores NAN; if false, NAN considered as 0.
  // @strict (default: false): if set true, returns null when there is any NAN.
  // @sample (default: true): if set false, calculates population standard deviation (degree of freedom == the length of the array).
  // When the length of the adjusted array (NAN removed if ignoreNAN is true) is 0, then it returns null.
  enumerable: false,
  value: function (ignoreNAN = false, strict = false, sample = true) {
    if (this.length == 0) return null;
    let b;
    if (!ignoreNAN && strict && this.some(d => isNaN(d))) return null;
    if (ignoreNAN) b = this.filter(d => !isNaN(d)).map(d => parseFloat(d));
    else b = this.filter(d => d !== null && d !== undefined ? parseFloat(d) : 0);
    if (b.length == 0) return null;
    else if (b.length == 1 && sample) return null;
    else if (b.length == 1 && !sample) return 0;
    let m = b.reduce((a, c) => a + c, 0) / b.length;
    if (m == null) return null;
    let v = b.map(d => (d - m) ** 2).reduce((a, c) => a + c, 0) / (sample ? b.length - 1 : b.length);
    return Math.sqrt(v);
  }
});

Object.defineProperty(Array.prototype, "argDiff", {
  // returns the differences of consecutive elements
  // [1, 2, 5, 3, 0].argDiff()
  // return [-1, -3, 2, 3]
  enumerable: false,
  value: function () {
    return Array.zeros(this.length - 1).map((d, i) => this[i] - this[i + 1]);
  }
});

Object.defineProperty(Array.prototype, "argAbsDiff", {
  // returns the absolute differences of consecutive elements
  // [1, 2, 5, 3, 0].argDiff()
  // return [1, 3, 2, 3]
  enumerable: false,
  value: function () {
    return Array.zeros(this.length - 1).map((d, i) => Math.abs(this[i] - this[i + 1]));
  }
});

Array.zeros = function (n) {
  // returns a length-n array filled with zeros.
  // Array.zeros(6) // [0, 0, 0, 0, 0, 0]
  let a = [];
  for (let i = 0; i < n; i++) a[i] = 0;
  return a;
}

Object.defineProperty(Array.prototype, "joinWithAnd", {
  // returns the string that joins the array elements by comma (,) with the last element joined with 'and'
  // @isBritish (boolean): if `true`, then the last comma is not inserted.
  // [].joinWithAnd() // ""
  // ["apple"].joinWithAnd() // "apple"
  // ["apple", "grape"].joinWithAnd() // "apple and grape"
  // ["apple", "grape", "mango"].joinWithAnd() // "apple, grape, and mango"
  // ["apple", "grape", "mango"].joinWithAnd(true) // "apple, grape and mango"
  // [[1,2,3]].joinWithAnd() // ""
  enumerable: false,
  value: function (isBritish) {
    if (!this.every((d) => d.constructor.name === "String")) return "";
    if (this.length == 0) return "";
    if (this.length == 1) return this[0];
    if (this.length == 2) return this.join(" and ");
    else {
      return this.slice(0, this.length - 1).join(", ") + (!isBritish ? "," : "") + " and " + this[this.length - 1];
    }
  }
});

Object.defineProperty(String.prototype, "capitalize", {
  // no argumemt
  // returns the same string but with the first letter capitalized
  // usage: "this is an apple.".capitalize()
  // returns "This is an apple."
  enumerable: false,
  value: function () {
    if (this.length >= 1) return this[0].toUpperCase() + this.slice(1);
    else return "";
  }
});

Object.defineProperty(String.prototype, "makeTitle", {
  // dependency: String.capitalize (the above)
  // @stopword: words in @stopword is not capitalized
  // returns the same string but with the first letter of every word capitalized
  // usage: "this is an apple.".makeTitle(['is', 'an'])
  // returns "This is an Apple."
  enumerable: false,
  value: function (stopword) {
    if (this.length >= 1) {
      if (stopword === undefined || stopword.constructor.name !== 'Array') stopword = [];
      return this.split(" ").map((word) => (stopword.includes(word) ? word : word.capitalize())).join(" ");
    } else return "";
  }
});

window.getType = function (d) {
  // no dependency;
  // given a variable @d, returns "undefined"; "null"; "NaN"; "String"; "Number"; "Object"; "Array"; "Function"
  if (d === undefined) return "undefined";
  else if (d === null) return "null";
  else if (d.constructor.name === "Number" && isNaN(d)) return "NaN";
  return d?.constructor.name;
}

Object.defineProperty(Object.prototype, "plant", {
  // @obj: an object to plant into *this*
  // no return value
  // usage: { a: 3, b: { c: 3 } }.plant({ b: { d: 5 } })
  // outcome: { a: 3, b: { c: 3, d: 5 } }
  // to skip an array item, just empty it! (if undefined / null is given, then they are replaced)
  // usage2: { a: 2, b: [ 1, 2, 3 ] }.plant({ b: [,8] })
  // outcome2: { a: 2, b: [ 1, 8, 3 ] }
  // usage3: { a: 2, b: [ 1, 2, 3 ] }.plant({ b: [undefined,8] })
  // outcome3: { a: 2, b: [ undefined, 8, 3 ] }
  enumerable: false,
  value: function (obj) {
    _plantObjectAB(this, obj);
  }
});

window.plantObjectAB = _plantObjectAB;

function _plantObjectAB(A, B) {
  Object.keys(B).forEach((key) => {
    if (A[key].constructor.name !== B[key].constructor.name) {
      A[key] = JSON.parse(JSON.stringify(B[key]));
    } else if (B[key].constructor.name === "Array") {
      if (A[key] === undefined) A[key] = [];
      B[key].forEach((b, i) => {
        if (b === undefined || b === null || b) {
          if (A[key][i].constructor.name === "Array" || A[key][i].constructor.name === "Object") {
            A[key][i] = _plantObjectAB(A[key][i], b);
          } else {
            A[key][i] = b;
          }
        }
      });
    } else if (B[key].constructor.name === "Object") {
      if (A[key] === undefined) A[key] = {};
      A[key] = _plantObjectAB(A[key], B[key]);
    } else {
      A[key] = B[key];
    }
  })
  return A;
}