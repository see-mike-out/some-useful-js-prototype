// some_util.js
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
    if (this.length >= 1)  {
      if (stopword === undefined || stopword.constructor.name !== 'Array') stopword = [];
      return this.split(" ").map((word) => (stopword.includes(word) ? word : word.capitalize())).join(" ");
    } else return "";
  }
});