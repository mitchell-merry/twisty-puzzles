import { CONSOLE_COL, CUBE_COLOURS } from "../helper/Colours";
import { CyclicPermutation } from "../helper/permute";
import Puzzle from "./Puzzle";

export type RotationMatrix = number[][];
export type FaceCycle = number[];

export interface AxisRotation {
    rotation: RotationMatrix;
    faceCycle: FaceCycle;
}

const X_AXIS: AxisRotation = {
    rotation: [
        [1, 0, 0],
        [0, 0, 1],
        [0, -1, 0]
    ],
    faceCycle: [ 0, 4, 5, 2 ]
}

const Y_AXIS: AxisRotation = {
    rotation: [
        [0, 0, 1],
        [0, 1, 0],
        [-1, 0, 1]
    ],
    faceCycle: [ 1, 4, 3, 2 ]
}

const Z_AXIS: AxisRotation = {
    rotation: [
        [0, 1, 0],
        [-1, 0, 0],
        [0, 0, 1]
    ],
    faceCycle: [ 0, 3, 5, 1 ]
}

/**
 * Generic NxN cube.
 * 
 * @class NByN
 * @extends {Puzzle}
 */
export default class NByN extends Puzzle {
    // number of pieces along each axis, and the number of faces on the puzzle (always 6)
    N: number;
    FACES!: number;

    // x, y, z, face
    cubies!: number[][][][];

    constructor(N: number) {
        super({ N });

        this.N = N;
        
    }

    /**
     * Simulate a slice turn on the 
     * @param axis 
     * @param index 
     */
    turnSlice(axis: RotationMatrix, index: number) {
        
    }

    resetPuzzle(options: Record<string, any>): void {
        const { N } = options;

        this.FACES = 6;
        this.cubies = [];

        // cubies[0][0][0] will be the RUF piece (white green red on solved)
        // with the faces being up, left, front, right, back, down, in that order.

        for(let x = 0; x < N; x++) {
            this.cubies.push([]);
            for(let y = 0; y < N; y++) {
                this.cubies[x].push([]);
                for(let z = 0; z < N; z++) {
                    this.cubies[x][y].push([...Array(this.FACES).keys()]);
                }
            }
        }

        console.log(JSON.stringify(this.cubies, null, 2));
    }

    print(): void {
        const colourAtCoords = (x: number, y: number, z: number, face: number) => `${CONSOLE_COL(CUBE_COLOURS[this.cubies[x][y][z][face]])}`;
        
        // I see potential for de-clutter!
        // Up face - y = 0, face = 0, -x, -z
        for(let x = this.N-1; x >= 0; x--) {
            let toPrint = `${'  '.repeat(this.N)}`;

            for(let z = this.N-1; z >= 0; z--) {
                toPrint += colourAtCoords(x, 0, z, 0);
            }
            console.log(toPrint);
        }

        // Side faces - +y (each row)
        for(let y = 0; y < this.N; y++) {
            let toPrint = ``;

            // Left face - x = N-1, face = 1, -z
            for(let z = this.N-1; z >= 0; z--) {
                toPrint += colourAtCoords(this.N-1, y, z, 1);
            }

            // Front face - z = 0, face = 2, -x
            for(let x = this.N-1; x >= 0; x--) {
                toPrint += colourAtCoords(x, y, 0, 2);
            }

            // Right face - x = 0, face = 3, +z
            for(let z = 0; z < this.N; z++) {
                toPrint += colourAtCoords(0, y, z, 3);
            }

            // Back face - z = 0, face = 4, -x
            for(let x = 0; x < this.N; x++) {
                toPrint += colourAtCoords(x, y, 0, 4);
            }
            
            
            console.log(toPrint);
        }

        // Bottom face - y = N-1, face = 5, -x, +z
        for(let x = this.N-1; x >= 0; x--) {
            let toPrint = `${'  '.repeat(this.N)}`;

            for(let z = 0; z < this.N; z++) {
                toPrint += colourAtCoords(x, this.N-1, z, 5);
            }
            console.log(toPrint);
        }
    }
}