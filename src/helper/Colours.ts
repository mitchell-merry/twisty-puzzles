export const ANSI_ = (code: string) => `\x1b[${code}m`;
export const CONSOLE_COL = (code: string) => `${ANSI_(code)}  \x1b[0m`;

export const WHITE = '107'; // bright white
export const ORANGE = '43'; // yellow
export const GREEN = '102'; // bright green
export const RED = '101'; // bright red
export const BLUE = '104'; // bright blue
export const YELLOW = '103'; // bright yellow
export const BLACK = '0'; 

export const CUBE_COLOURS: string[] = [
    BLACK, WHITE, ORANGE, GREEN, RED, BLUE, YELLOW
];