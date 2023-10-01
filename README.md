# titleScroller.js
Everything you need to build a Svelte project with a scrolling titlebar animation.

This project is a demonstration of string parser that is compatible with 2-part unicode characters
which scrolls around it's entirety on the page tab at the top of the browser.

#### NOTE:
Please be assured this functionality does not require Svelte to function, but is used for a use case
to help with displaying reactivity to page changes and loading.

## How to launch:
Run this like any other kit;
Open the directory via `cd /d {parentRoot}/titleScroller.js`
install the required libs; `npm run install`
and run via the development build; `npm run dev`

## How to use:
On route change, set the writable `$pageName` to the new directory name. 
I would advise building a pre-designed object array with all the page names, url and button title for 
the simplest back-end implementation.

You can preview the functionality with my website www.vanh.art.

## How it works
Every time a page is transitioned, this will be the steps we go through to generate the timing required
to scroll;
- every 250ms it starts the function clearing out the currently stored timer.
- two variables are created, an array to be used to create the offsets `headerArray` and `headerString`.
- Once we have the two reference points of the same value, we then push to the `unicodeArrFragmenter`.
  - the string is parsed and is now a raw unicode value, it's put into a loop each character of the array
    is then checked. If the string is longer than 2, we know it's not a generic keyboard character.
  - The length will be put aside in an array of timings to be used parallel to our regular string, and
    will determine if we should skip 1 or 2 characters, depending on the length of the next character.
    This retains the entire character as one singular symbol.
- We quickly parse the string to an array so we can then shift it later when the function is called.
- A timer is then set to call the function again after the set timeout.

The new string can then be parsed properly from resulting variables.
What we now have is an array of offsets depending on if the unicode character in the string is 2 or
1 characters long, and the string we want to offset.
Every 250s, a new "frame" of the scroll animation will be done, which we then use the parallel offset to.

Eg. A character such as "𝕸" has two unicode characters; `d835`, `de86`. To keep the integrity of the letter
when shifting the character array, you shift it twice, whereas a letter like "M" is a single character.

```js
let parsedUnicode = rawParse[i].charCodeAt(0).toString(16).toUpperCase();
if (parsedUnicode.length > 2){
    // characters that are not typical 1 character long unicodes.
}
```

The main functionality of the code is in `titlebarScroller.js`. However you call the functionality is 
upto you.