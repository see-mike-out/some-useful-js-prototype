// ************************ some_util.js ************************
// Author: Hyeok Kim (@see-mike-out @ Github)
// http://hyeok.me
// First commit: July 4, 2021
// Last update: Nov 17, 2021

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
  value: function (array) {
    return this.reduce((a, c) => a + c, 0);
  }
});

Object.defineProperty(Array.prototype, "max", {
  // returns the max of elements
  // [1, 2, 3, 4, 5].max() // 5
  enumerable: false,
  value: function (array) {
    return Math.max(...this);
  }
});

Object.defineProperty(Array.prototype, "min", {
  // returns the max of elements
  // [1, 2, 3, 4, 5].min() // 1
  enumerable: false,
  value: function (array) {
    return Math.min(...this);
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
