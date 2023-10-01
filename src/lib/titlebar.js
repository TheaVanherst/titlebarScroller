
import { writable } from "svelte/store";

const
    websiteTag =                   "𝕸𝖞 𝖂𝖊𝖇𝖘𝖎𝖙𝖊",   // WEBSITE NAME
    pageName =      writable("𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚝𝚘"),  // INITIAL PAGE LOAD
    loadingIco =                   "Loading ⏳",  // LOADING ANIMATION
    pageTitlebar =  writable("𝖁𝖆𝖓𝖍.𝖆𝖗𝖙 ⏳"); // START UP TEXT

export { websiteTag, pageName, loadingIco, pageTitlebar }

let headerArray = [],
    headerString = "",
    offsetArray = [];

// TODO: Misc

let timeout;

const
    unicodeArrFragmenter = (str) => {
        let returnArray = [];
        let rawParse = str.split('');

        let unicodeLoop = 0,
            trueLength = 0;

        for (let i = 0; i < rawParse.length; i++) {
            let parsedUnicode = rawParse[i].charCodeAt(0).toString(16).toUpperCase();
                console.log(parsedUnicode)
            if (parsedUnicode.length > 2 && unicodeLoop < 1){
                returnArray[trueLength] = 2;
                unicodeLoop++
            } else {
                if (unicodeLoop !== 1) {
                    returnArray[trueLength] = 1;}
                trueLength++
                unicodeLoop = 0;}}

        return returnArray;
    },

    titlebarScroller = (pageName) => {
        clearTimeout(timeout);

        headerArray = pageName;
        headerString = pageName;
        offsetArray = unicodeArrFragmenter(`${headerArray}`);
        pageTitlebar.set(headerString);

        timeout = setTimeout(() => {
            printUpdate();
        },250);
    },

    offsetShift = (a) => {
        let o = a[0]
        a.shift();
        a.push(o);
    },

    printUpdate = () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            if (offsetArray[0] === 1){
                offsetShift(offsetArray);
                offsetShift(headerArray);}
            else {
                offsetShift(offsetArray);
                offsetShift(headerArray);
                offsetShift(headerArray);}

            headerString = headerArray.join("");
            pageTitlebar.set(headerString);
            printUpdate();
        },500);
    };

export { titlebarScroller };