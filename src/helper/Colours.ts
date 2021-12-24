export const ANSI_ = (code: string) => `\x1b[${code}m`;
export const CONSOLE_COL = (code: string) => `${ANSI_(code)}  \x1b[0m`;

const WHITE = '107'; // bright white
const ORANGE = '43'; // yellow
const GREEN = '102'; // bright green
const RED = '101'; // bright red
const BLUE = '104'; // bright blue
const YELLOW = '103'; // bright yellow

export const CUBE_COLOURS: string[] = [
    WHITE, ORANGE, GREEN, RED, BLUE, YELLOW
];