import { CyclicPermutation, Permutation, permute } from "../helper/permute";

/**
 * A twisty puzzle. Abstract class - should not be initialised.
 * 
 * @class Puzzle
 */
export default class Puzzle {
    state!: PuzzleState;
    notationSet?: NotationSet;

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
     * Performs the algorithm from the notation string directly. Utility function.
     * 
     * @param notation The notation string to be performed.
     */
    doNotation(notation: string, _printEachStep: boolean = false): void {
        this.doAlgorithm(this.notationToAlgorithm(notation), _printEachStep);
    }

    /**
     * Converts a notation string (e.g. "R U R' U'") to an algorithm form based off of notationSet.
     * 
     * @param notation The notation string.
     * @returns The algorithm formed by the notation.
     */
    notationToAlgorithm(notation: string): Algorithm {
        let alg: Algorithm = [];

        for(const not of notation.split(" ")) {
            if(!this.notationSet?.[not]) throw new Error(`Invalid notation detected! ${not}`);
            
            alg.push(this.notationSet[not]);
        }

        return alg;
    }

    /**
     * Performs the given algorithm on the puzzle, modifying its state.
     * 
     * @param alg The algorithm to perform.
     */
    doAlgorithm(alg: Algorithm, _printEachStep: boolean = false): void {
        for(const P of alg) {
            this.permute(P);
            if(_printEachStep) this.print();
        }
    }

    /**
     * Applies a permutation to the puzzle, reordering the elements of it.
     * 
     * @param P The permutation to apply to the puzzle.
     */
    permute(P: Permutation): void {
        this.state = permute(this.state, P) as PuzzleState;
    }
}

/**
 * State of a puzzle. Dependent on the puzzle.
 * An ordered list representing the permutation of the elements on the puzzle.
 */
export type PuzzleState = number[];

/**
 * Algorithm, i.e. a series of permutations.
 */
export type Algorithm = Permutation[];

/**
 * Defines a set of notation for interpretation.
 */
export type NotationSet = Record<string, Permutation>;