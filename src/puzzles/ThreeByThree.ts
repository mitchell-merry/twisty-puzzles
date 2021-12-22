import Puzzle, { invertPermutation, Permutation, repeatPermutation } from "./Puzzle";

/**
 * A 3x3 Rubik's Cube.
 * 
 * @class ThreeByThree
 * @extends {Puzzle}
 */

/*
    Net of a cube with each position marked to the corresponding index.
           00 01 02
           03 04 05
           06 07 08
  09 10 11 18 19 20 27 28 29 36 37 38
  12 13 14 21 22 23 30 31 32 39 40 41
  15 16 17 24 25 26 33 34 35 42 43 44
           45 46 47
           48 49 50
           51 52 53
*/
export default class ThreeByThree extends Puzzle {
    U: Permutation = [
        6, 3, 0, 7, 4, 1, 8, 5, 2,
        18, 19, 20, 12, 13, 14, 15, 16, 17,        
        27, 28, 29, 21, 22, 23, 24, 25, 26,        
        36, 37, 38, 30, 31, 32, 33, 34, 35,
        9, 10, 11, 39, 40, 41, 42, 43, 44,
        45, 46, 47, 48, 49, 50, 51, 52, 53
    ];

    R: Permutation = [
        0, 1, 20, 3, 4, 23, 6, 7, 26,
        9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 47, 21, 22, 50, 24, 25, 53,
        33, 30, 27, 34, 31, 28, 35, 32, 29,
        8, 37, 38, 5, 40, 41, 2, 43, 44,
        45, 46, 42, 48, 49, 39, 51, 52, 36
    ];

    constructor() {
        super();

        this.notationSet = { 
            "U": this.U,
            "R": this.R,
        };

        // generate the variants
        for(const [not, perm] of Object.entries(this.notationSet)) {
            this.notationSet[not + "2"] = repeatPermutation(perm, 2);
            this.notationSet[not + "'"] = invertPermutation(perm);
        }
    }

    resetPuzzle(): void {
        this.state = [...Array(6).keys()].map(i => Array.from({length: 9}).map(_ => i+1)).flat();
    }

    // Todo move out
    valueMapToConsoleColour: Record<number, string> = {
        1: "\x1b[47m", // white
        2: "\x1b[43m", // orange (yellow)
        3: "\x1b[102m", // green (bright green)
        4: "\x1b[101m", // red (bright red)
        5: "\x1b[104m", // blue (bright blue)
        6: "\x1b[103m", // yellow (bright yellow)
    }

    // I'm just, so sorry, for what's about to happen...
    print(): void {
        const indexToChar = (index: number) => `${this.valueMapToConsoleColour[this.state[index]]}  \x1b[0m`;
        
        // Top face
        for(let i = 0; i < 3; i++) {
            console.log(`      ${indexToChar(i*3)}${indexToChar(i*3+1)}${indexToChar(i*3+2)}`)
        }

        // Middle faces
        for(let row = 0; row < 3; row++) {
            let toPrint = '';

            for(let face = 0; face < 4; face++) {
                for(let col = 0; col < 3; col++) {
                    let index = 9 + row * 3 + face * 9 + col;
                    toPrint += indexToChar(index);   
                }
            }

            console.log(toPrint);
        }


        // Bottom face
        for(let i = 0; i < 3; i++) {
            console.log(`      ${indexToChar(5*9+i*3)}${indexToChar(5*9+i*3+1)}${indexToChar(5*9+i*3+2)}`)
        }

        console.log();
    }
}