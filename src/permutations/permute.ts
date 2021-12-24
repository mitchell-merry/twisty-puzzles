/* Generic Permutation Code */

/**
 * Permutation on a puzzle. Example - turning the face of a 3x3 cube.
 */
export type Permutation = number[];

/**
 * Canonical Cyclic Permutation notation. A list of cycles.
 */
export type CyclicPermutation = number[][];

/**
 * Convert a cyclic permutation to a regular permutation
 * 
 * @param P Cyclic perm to convert to a permutation
 * @returns The regular permutation form of P.
 */
export function cyclicToRegular(P: CyclicPermutation, length: number): Permutation {
    return cyclicPermute([...Array.from({ length }).keys()], P) as Permutation;
}

/**
 * Performs a cyclic permutation.
 */
export function cyclicPermute(state: any[], P: CyclicPermutation): any[] {
    return state.map((stateValue, stateIndex) => {
        P.forEach(cycle => {
            const cycleIndex = cycle.indexOf(stateIndex);
            if(cycleIndex !== -1) stateValue = state[cycle[(cycleIndex + cycle.length - 1) % cycle.length]];
        });
        return stateValue;
    });
}

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