import { CyclicPermutation, Permutation, permute } from "../helper/permute";

/**
 * A twisty puzzle. Abstract class - should not be initialised.
 * 
 * @class Puzzle
 */
export default class Puzzle {
    constructor(options: Record<string, any> = {}) {
        this.resetPuzzle(options);
    }

    /**
     * Sets the state of the puzzle back to the default. Used for initialising the puzzle.
     */
    resetPuzzle(options: Record<string, any>): void { throw new Error("resetPuzzle must be initialised."); }

    /**
     * Prints the state of the puzzle to the console. Mostly used for debugging.
     */
    print(): void { throw new Error("print must be initialised.") }

    /**
     * Performs the algorithm from the notation string. To be implemented by subclasses.
     * 
     * @param notation The notation string to be performed.
     */
    doNotation(notation: string = "", _printEachStep: boolean = false): void { }

    /**
     * Performs a check to see if the puzzle is solved, and returns the result.
     */
    isSolved(): boolean {
        throw new Error("isSolved must be initialized.");
    }
}

/**
 * Defines a set of notation for interpretation.
 */
export type NotationSet<T> = Record<string, T>;