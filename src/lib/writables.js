
import {writable} from "svelte/store";

const deviceType = writable(undefined);
const pageLoaded = writable(false);
const transitioning = writable(false);

export { deviceType, pageLoaded, transitioning };