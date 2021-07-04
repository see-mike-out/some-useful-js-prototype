# Some Useful Javascript Utility Functions that I Found Useful.

`Array.arfFilter(comparer)` returns the 'indices' of elements for which @comparer returns true. (@comparer: a comparison Function that takes each array element)

Usage:
```{javascript}
[1, 2, 3, 4].argFilter(d => d % 2 == 0);
```
returns `[1, 3]` (indices for 2 and 4, respectively).

----------------------------------------

`String.capitalize()` returns the same string but with the first letter capitalized.

Usage:
```{javascript}
"this is an apple.".capitalize();
```
returns `"This is an apple."`.

----------------------------------------

`String.makeTitle(stopword)` returns the same string but with the first letter of every word capitalized. If a nonempty Array `stopword` is passed, words in it are not capitalized. Dependency on `String.capitalize`.

Usage:
```{javascript}
"this is an apple.".makeTitle(['is', 'an']);
```
returns `"This is an Apple."`.

```{javascript}
"this is an apple.".makeTitle();
```
returns `"This Is An Apple."`.
