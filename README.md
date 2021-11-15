# Some Useful Javascript Utility Prototype Functions that I Found Useful.

## Array prototypes

### `Array.arfFilter(comparer)` 
returns the 'indices' of elements for which @comparer returns true. (@comparer: a comparison Function that takes each array element)

Usage:
```{javascript}
[1, 2, 3, 4].argFilter(d => d % 2 == 0);
```
returns `[1, 3]` (indices for 2 and 4, respectively).

### `Array.includesMultiple(array)` 
returns `true`/`false` if the orriginal array includes every element in @array.

Usage:
```{javascript}
[1, 2, 3, 4].includesMultiple([1, 2]); // returns true;
[1, 2, 3, 4].includesMultiple([1, 7]); // returns false;
```

### `Array.includesMultiple(array)` 
returns an array of the unique elements of the union of the original array and @array.

Usage:
```{javascript}
[1, 2, 3, 4].addUnique([1, 2]); // [1, 2, 3, 4]
[1, 2, 3, 4].addUnique([1, 5]); // [1, 2, 3, 4, 5]
```

## String prototypes

### `String.capitalize()`
returns the same string but with the first letter capitalized.

Usage:
```{javascript}
"this is an apple.".capitalize();
```
returns `"This is an apple."`.

### `String.makeTitle(stopword)` 
returns the same string but with the first letter of every word capitalized. If a nonempty Array `stopword` is passed, words in it are not capitalized. Dependency on `String.capitalize`.

Usage:
```{javascript}
"this is an apple.".makeTitle(['is', 'an']);
```
returns `"This is an Apple."`.

```{javascript}
"this is an apple.".makeTitle();
```
returns `"This Is An Apple."`.
