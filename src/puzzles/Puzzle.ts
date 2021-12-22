/**
 * A twisty puzzle. Abstract class - should not be initialised.
 * 
 * @class Puzzle
 */
export default class Puzzle {
    state!: PuzzleState;
    notationSet?: NotationSet;

    constructor() {
        this.resetPuzzle();
    }

    /**
     * Sets the state of the puzzle back to the default. Used for initialising the puzzle.
     */
    resetPuzzle(): void { throw new Error("resetPuzzle must be initialised."); }

    /**
     * Prints the state of the puzzle to the console. Mostly used for debugging.
     */
    print(): void { throw new Error("printPuzzle must be initialised.") }

    /**
     * Performs the algorithm from the notation string directly. Utility function.
     * 
     * @param notation The notation string to be performed.
     */
    doNotation(notation: string): void {
        this.doAlgorithm(this.notationToAlgorithm(notation));
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
    doAlgorithm(alg: Algorithm): void {
        for(const P of alg) {
            this.permute(P);
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
 * Permutation on a puzzle. Example - turning the face of a 3x3 cube.
 */
export type Permutation = number[];

/**
 * Algorithm, i.e. a series of permutations.
 */
export type Algorithm = Permutation[];

/**
 * Defines a set of notation for interpretation.
 */
export type NotationSet = Record<string, Permutation>;

/* Generic Permutation Code */

/**
 * Given a permutation, return the inverse permutation. I.e. P P' will do nothing.
 * 
 * @param P The permutation to invert.
 */
export function invertPermutation(P: Permutation): Permutation {
    return [...P.keys()].map(i => P.indexOf(i));
}

/**
 * Repeats a permutation multiple times and returns the permutation that results. (e.g. instead of doing U -> U, do (U, 2))
 * 
 * @param P The permutation to repeat.
 */
export function repeatPermutation(P: Permutation, timesToRepeat: number): Permutation {
    let perm = [...P.keys()];

    for(let i = 0; i < timesToRepeat; i++) perm = permute(perm, P);

    return perm;
}

/**
 * Performs a permutation on an ordered list.
 * 
 * @param state List to perform the permutation on
 * @param P Permutation to perform
 * @returns Resulting permutation
 */
export function permute(state: number[], P: Permutation): number[] {
    return state.map((_, i) => state[P[i]]);
}