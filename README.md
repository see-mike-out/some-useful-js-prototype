# Some Useful Javascript Utility Prototype Functions that I Found Useful.

## Copyright
The codes in this repo can be used (copied, modified, and re-distributed) for any commercial and non-commercial purposes. 
If you want to cite this, comment the below in your code:

```
- Author: Hyeok Kim (hyeok.me)
- GitHub Repo: https://github.com/see-mike-out/some-useful-js-prototype
```
For **students** at any level, if you just copy or slightly modify (e.g., variable names) the below codes, it can still be a case of plagiarism according to your course's policy--always consult with your instructor.

When the below prototype functions have conflicts with other libraries, fix them by adding a prefix to the function names.

## Array prototypes

### `Array.argFilter(comparer)` 
returns the 'indices' of elements for which `@comparer` returns true. 

- `@comparer`: a comparison Function that takes each array element.

Usage:
```javascript
[1, 2, 3, 4].argFilter(d => d % 2 == 0);
```
returns `[1, 3]` (indices for 2 and 4, respectively).

### `Array.includesMultiple(array)` 
returns `true`/`false` if the orriginal array includes every element in `@array`.

- `@array`: an array of elements to check their membership in the original array.

Usage:
```javascript
[1, 2, 3, 4].includesMultiple([1, 2]); // returns true;
[1, 2, 3, 4].includesMultiple([1, 7]); // returns false;
```

### `Array.addUnique(array)` 
returns an array of the unique elements of the union of the original array and `@array`.

- `@array`: an array of elements to add only unique items to the original array.
  
Usage:
```javascript
[1, 2, 3, 4].addUnique([1, 2]); // [1, 2, 3, 4]
[1, 2, 3, 4].addUnique([1, 5]); // [1, 2, 3, 4, 5]
```

### `Array.sum()` / `Array.max()` / `Array.min()`
returns the sum/max/min of the array elements.

Usage:
```javascript
[1, 2, 3, 4, 5].sum() // 15
[1, 2, 3, 4, 5].max() // 5
[1, 2, 3, 4, 5].min() // 1
```

### `Array.mean(ignoreNAN=false,strict=false)` / `Array.stdev(ignoreNAN=false,strict=false,sample=false)`
returns the mean/stdev of the array elements.
  
- `@ignoreNAN` (optional; default: `false`): If set `true`, then it ignores `NAN`; if `false`, `NAN` is considered as `0`.
- `@strict` (default: `false`): If set `true`, returns `null` when there is any `NAN`.
- `@sample` (for `Array.stdev` only; default: `true`): If set `false`, calculates population standard deviation (i.e., the degree of freedom is the length of the array).

When the length of the adjusted array (after `NAN` removed if `ignoreNAN` is `true`) is `0`, then it returns `null`.

Usage:
```javascript
[1, 2, 3, 4, 5].mean() // 3
[1, 2, 3, 4, 5].stdev() // 1.5811388300841898
```

### `Array.argDiff()` / `Array.argAbsDiff()`
returns the differences / absolute differences of consecutive elements.

Usage:
```javascript
[1, 2, 5, 3, 0].argDiff() // [-1, -3, 2, 3]
[1, 2, 5, 3, 0].argDiff() // return [1, 3, 2, 3]
```

### `Array.zeros(n)`
returns a length-`@n` array filled with zeros.

- `@n` (`Number`): the number of zeros to have in the outcome array.

Usage:
```javascript
Array.zeros(6) // [0, 0, 0, 0, 0, 0]
```

### `Array.joinWithAnd(isBritish)` 
returns the string that joins the array elements by comma (,) with the last element joined with 'and'.

- `@isBritish`: if `true`, then the last comma is not inserted.
  
Usage:
```javascript
[].joinWithAnd() // ""
["apple"].joinWithAnd() // "apple"
["apple", "grape"].joinWithAnd() // "apple and grape"
["apple", "grape", "mango"].joinWithAnd() // "apple, grape, and mango"
["apple", "grape", "mango"].joinWithAnd(true) // "apple, grape and mango"
```

## String prototypes

### `String.capitalize()`
returns the same string but with the first letter capitalized.

Usage:
```javascript
"this is an apple.".capitalize();
```
returns `"This is an apple."`.

### `String.makeTitle(stopword)` 
returns the same string but with the first letter of every word capitalized. If a nonempty Array `stopword` is passed, words in it are not capitalized. Dependency on `String.capitalize`.

Usage:
```javascript
"this is an apple.".makeTitle(['is', 'an']);
```
returns `"This is an Apple."`.

```javascript
"this is an apple.".makeTitle();
```
returns `"This Is An Apple."`.

## Window-level functions

### `getType(d)`
Given a variable `d`, returns either one of `"undefined"`, `"null"`, `"NaN"`, `"String`, `"Number"`, `"Object"`, `"Array"`, and `"Function"`.

Usage:
```javascript
getType(undefined); // "undefined"
getType(null); // "null"
getType(34/"a"); // "NaN"
getType("123"); // "String"
getType(123); // "Number"
getType({a: 3}); // "Object"
getType([1,2,3]); // "Array"
getType((a) => a+1); // "Function"
```