import { CyclicPermutation, cyclicToRegular, invertPermutation, Permutation, repeatPermutation } from "../permutations/permute";
import Puzzle, { NotationSet } from "./Puzzle";

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
    /* TODO GENERATE THESE */
    Moves: Record<string, CyclicPermutation> = {
        // RUF = xyz

        // x-axis
        "R": [
            [27, 29, 35, 33], [28, 32, 34, 30], // face to turn
            [2, 42, 47, 20], [5, 39, 50, 23], [8, 36, 53, 26] // band around
            // [2, 5, 8, 42, 39, 36, 47, 50, 53, 20, 23, 36]
            // 2 (+3) -> 42 (-3) -> 47 (+3) -> 20 (+3)
        ],

        "M": [
            // no face turn
            [1, 19, 46, 43], [4, 22, 49, 40], [7, 25, 52, 37]
            // [1, 4, 7, 19, 22, 25, 46, 49, 52, 43, 40, 37]
            // 1 (+3) -> 19 (+3) -> 46 (+3) -> 43 (-3)
        ],

        "L": [
            [9, 11, 17, 15], [10, 14, 16, 12],
            [0, 18, 45, 44], [3, 21, 48, 41], [6, 24, 51, 38]
            // [0, 3, 6, 18, 21, 24, 45, 48, 51, 44, 41, 38]
            // 0 (+3) -> 18 (+3) -> 45 (+3) -> 44 (-3)
        ],

        // y-axis
        "U": [
            [0, 2, 8, 6], [1, 5, 7, 3],
            [9, 36, 27, 18], [10, 37, 28, 19], [11, 38, 29, 20]
            // [38, 37, 36, 29, 28, 27, 20, 19, 18, 11, 10, 9]
            // 38 (-1) -> 29 (-1) -> 20 (-1) -> 11 (-1)
        ],

        "D": [
            [45, 47, 53, 51], [46, 50, 52, 48],
            [15, 24, 33, 42], [16, 25, 34, 43], [17, 26, 35, 44]
            // [15, 16, 17, 24, 25, 26, 33, 34, 35, 42, 43, 44]
            // 15 (+1) -> 24 (+1) -> 33 (+1) -> 42 (+1)
        ],

        "I": [
            [12, 21, 30, 39], [13, 22, 31, 40], [14, 23, 32, 41],
        ],

        // z-axis
        "F": [
            [18, 20, 26, 24], [19, 23, 25, 21],
            [6, 27, 47, 17], [7, 30, 46, 14], [8, 33, 45, 11]
            // [6, 7, 8, 27, 30, 33, 47, 46, 45, 17, 14, 11]
            // 6 (+1) -> 27 (+3) -> 57 (-1) -> 17 (-3)
        ],

        "B": [
            [36, 38, 44, 42], [37, 41, 43, 39],
            [0, 15, 53, 29], [1, 12, 52, 32], [2, 9, 51, 35]
            // [0, 1, 2, 15, 12, 9, 53, 52, 51, 29, 32, 35]
            // 0 (+1) -> 15 (-3) -> 53 (-1) -> 29 (+3)
        ],
        
        "S": [
            [3, 28, 50, 16], [4, 31, 49, 13], [5, 34, 48, 10]
        ]
    }

    constructor(scramble: string = "") {
        super();

        // Convert moves into permutation form
        this.notationSet = Object.fromEntries(
            Object.entries(this.Moves).map(([k, cyclicPerm]) => [k, cyclicToRegular(cyclicPerm, this.state.length)])
        );

        // generate the variants
        for(const [not, perm] of Object.entries(this.notationSet)) {
            this.notationSet[not + "2"] = repeatPermutation(perm, 2);
            this.notationSet[not + "'"] = invertPermutation(perm);
        }

        this.doNotation(scramble);
    }

    resetPuzzle(): void {
        this.state = [...Array(6).keys()].map(i => Array.from({length: 9}).map(_ => i+1)).flat();
    }

    // Todo move out
    valueMapToConsoleColour: Record<number, string> = {
        1: "\x1b[107m", // white (bright white)
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