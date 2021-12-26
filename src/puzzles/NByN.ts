import { CONSOLE_COL, CUBE_COLOURS, WHITE } from "../helper/Colours";
import { Matrix, matrixMultiply } from "../helper/matrix";
import { CyclicPermutation, cyclicPermute } from "../helper/permute";
import Puzzle, { NotationSet } from "./Puzzle";

export type FaceCycle = CyclicPermutation;

export interface AxisRotation {
    rotation: Matrix;
    faceCycle: FaceCycle;
    axis: string; // denoting which axis to constrain in slice turning
}

export const X_AXIS: AxisRotation = {
    rotation: [
        [1, 0, 0],
        [0, 0, 1],
        [0, -1, 0]
    ],
    faceCycle: [[ 0, 4, 5, 2 ]],
    axis: 'x'
    
}

export const Y_AXIS: AxisRotation = {
    rotation: [
        [0, 0, -1],
        [0, 1, 0],
        [1, 0, 0]
    ],
    faceCycle: [[ 1, 4, 3, 2 ]],
    axis: 'y'
}

export const Z_AXIS: AxisRotation = {
    rotation: [
        [0, 1, 0],
        [-1, 0, 0],
        [0, 0, 1]
    ],
    faceCycle: [[ 0, 3, 5, 1 ]],
    axis: 'z'
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
    notationSet: NotationSet<Turn>;

    constructor(N: number) {
        super({ N });

        this.N = N;
        
        // cube rotations - standard on every nxn
        this.notationSet = {
            "x": { axis: X_AXIS, indexStart: 0, indexEnd: N-1, direction: true},
            "y": { axis: Y_AXIS, indexStart: 0, indexEnd: N-1, direction: true},
            "z": { axis: Z_AXIS, indexStart: 0, indexEnd: N-1, direction: true},
        };

        let faceTurns: NotationSet<Turn> = {
            "R": { axis: X_AXIS, indexStart: 0, direction: true },
            "U": { axis: Y_AXIS, indexStart: 0, direction: true },
            "F": { axis: Z_AXIS, indexStart: 0, direction: true },
            "L": { axis: X_AXIS, indexStart: N-1, direction: false },
            "D": { axis: Y_AXIS, indexStart: N-1, direction: false },
            "B": { axis: Z_AXIS, indexStart: N-1, direction: false }
        };

        // Slice moves on 3x3
        if (N === 3) {
            faceTurns["M"] = { ...faceTurns["L"], indexStart: 1 };
            faceTurns["E"] = { ...faceTurns["D"], indexStart: 1 };
            faceTurns["S"] = { ...faceTurns["F"], indexStart: 1 };
        }

        for(const not in faceTurns) {
            const curTurn = faceTurns[not];
            this.notationSet[not] = curTurn; // copy base face turns to notation

            // wide moves and slice moves
            if(N > 2) {
                // one in from the side
                const wide = { ...curTurn };

                if(wide.indexStart === 0) wide.indexEnd = wide.indexStart + 1;
                else {
                    wide.indexStart = wide.indexStart - 1;
                    wide.indexEnd = N-1;
                }

                this.notationSet[not + "w"] = { ...wide }

                // Rw = r on 3x3
                if(N === 3) this.notationSet[not.toLowerCase()] = { ...wide };

                // Rw = Rr on 4x4
                // https://www.kewbz.co.uk/blogs/notations/4x4-cube-notations-guide-wca-official
                if(N === 4) this.notationSet[not + not.toLowerCase()] = { ...wide };

                // if(N > 4) {
                //     // slice turns first
                //     const sliceTurns: NotationSet<Turn> = {};
                //     for(let i = 2; i <= N-1; i++) {
                //         let slice = { ...curTurn };

                //         if(slice.indexStart === 0) slice = { ...slice, indexStart: slice.indexStart + (i-1) };
                //         else wide.indexStart = wide.indexStart - 1;

                //         sliceTurns[`${i}${not}`] = slice;
                //     }
                // }
            }
        }

        // Applying final counter-clockwise and halfturn variants
        for(const not in this.notationSet) {
            const curTurn = this.notationSet[not];
            this.notationSet[not + '\''] = { ...curTurn, direction: !curTurn.direction };
            this.notationSet[not + '2'] = { ...curTurn, count: 2 }
            this.notationSet[not + '3'] = { ...curTurn, count: 3 } // I have seen this before, to specify a finger trick
        }
    }

    doNotation(notation: string, _printEachStep: boolean = false): void { 
        for(const not of notation.split(" ")) {
            let turn: Turn = this.notationSet[not];
            if(!turn) throw new Error(`Invalid notation detected! '${not}'`)

            this.turnSlices(turn.axis, 
                turn.indexStart, 
                turn.indexEnd ? turn.indexEnd : turn.indexStart, 
                turn.direction,
                turn.count ? turn.count : 1,
            );

            if(_printEachStep) this.print();
        }
    }

    turnSlices(axis: AxisRotation, indexStart: number, indexEnd: number, direction = true, count = 1) {
        if(indexStart < 0 || indexEnd >= this.N) throw new Error(`Index out of bounds. ${indexStart} - ${indexEnd}`);
        for(let index = indexStart; index <= indexEnd; index++) {
            this.turnSliceDirection(axis, index, direction, count);
        }
    }

    turnSliceDirection(axis: AxisRotation, index: number, direction = true, count = 1) {
        for(let c = 0; c < count; c++) {
            this.turnSlice(axis, index);

            // U' = U3
            if(!direction) {
                this.turnSlice(axis, index);
                this.turnSlice(axis, index);
            }
        }
    }

    /**
     * Simulate a (number of parallel) slice turn(s) on the cube.
     * @param axis An AxisRotation defining how the cubies in the slices will move. Use one of X_AXIS, Y_AXIS, or Z_AXIS.
     * @param index The slice to turn, counting from the RUF faces.
     */
    turnSlice(axis: AxisRotation, index: number) {
        if(index >= this.N) throw new Error("Index too large!");

        // deep copy a 4d array lol
        let newCubies = this.cubies.map(a => a.map(b => b.map(c => c.map(d => d))));

        // offset so the matrix rotation works
        let o = (this.N - 1)/2;

        for(let i = 0; i < this.N; i++) {
            for(let j = 0; j < this.N; j++) {
                let coordinate;
                if(axis.axis === 'x') coordinate = { x: index, y: i, z: j };
                else if(axis.axis === 'y') coordinate = { x: i, y: index, z: j };
                else if(axis.axis === 'z') coordinate = { x: i, y: j, z: index };
                else throw new Error(`Unknown axis detected! '${axis.axis}'`);
                
                let rotatedCoord = matrixMultiply(axis.rotation, [ [coordinate.x-o], [coordinate.y-o], [coordinate.z-o] ]);
                let c = { x: rotatedCoord[0][0]+o, y: rotatedCoord[1][0]+o, z: rotatedCoord[2][0]+o };
                
                newCubies[c.x][c.y][c.z] = this.cycleFaces(this.cubies[coordinate.x][coordinate.y][coordinate.z], axis.faceCycle);
            }
        }

        this.cubies = newCubies;
    }

    cycleFaces(faces: number[], faceCycle: FaceCycle): number[] {
        return cyclicPermute(faces, faceCycle);
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
                    this.cubies[x][y].push([...Array(this.FACES).keys()].map(c => 0));
                }
            }
        }

        for(let z = N-1; z >= 0; z--) {
            for(let x = N-1; x >= 0; x--) {
                this.cubies[x][0][z][0] = 1;
            }
        }

        for(let y = 0; y < N; y++) {
            for(let z = N-1; z >= 0; z--) {
                this.cubies[N-1][y][z][1] = 2;
            }

            for(let x = N-1; x >= 0; x--) {
                this.cubies[x][y][0][2] = 3;
            }

            // Right face - x = 0, face = 3, +z
            for(let z = 0; z < N; z++) {
                this.cubies[0][y][z][3] = 4;
            }

            // Back face - z = N-1, face = 4, -x
            for(let x = 0; x < N; x++) {
                this.cubies[x][y][N-1][4] = 5;
            }
        }

        for(let z = 0; z < N; z++) {
            for(let x = N-1; x >= 0; x--) {
                this.cubies[x][N-1][z][5] = 6;
            }
        }
    }

    print(): void {
        const colourAtCoords = (x: number, y: number, z: number, face: number) => `${CONSOLE_COL(CUBE_COLOURS[this.cubies[x][y][z][face]])}`;
        
        // I see potential for de-clutter!
        // Up face - y = 0, face = 0, -x, -z
        for(let z = this.N-1; z >= 0; z--) {
            let toPrint = '  '.repeat(this.N);

            for(let x = this.N-1; x >= 0; x--) {
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

            // Back face - z = N-1, face = 4, -x
            for(let x = 0; x < this.N; x++) {
                toPrint += colourAtCoords(x, y, this.N-1, 4);
            }
            
            
            console.log(toPrint);
        }

        // Bottom face - y = N-1, face = 5, -x, +z
        for(let z = 0; z < this.N; z++) {
            let toPrint = '  '.repeat(this.N);
            for(let x = this.N-1; x >= 0; x--) {
                toPrint += colourAtCoords(x, this.N-1, z, 5);
            }
            console.log(toPrint);
        }

        console.log();
    }
}

interface Turn {
    axis: AxisRotation;
    indexStart: number;
    indexEnd?: number;
    direction: boolean;
    count?: number;
}