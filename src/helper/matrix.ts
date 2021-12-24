export type Matrix = number[][];

/**
 * Multiplies two matrices and returns the result.
 */
export function matrixMultiply(matOne: Matrix, matTwo: Matrix): Matrix {
    validateMatrix(matOne);
    validateMatrix(matTwo);
    
    let mat: Matrix = [];

    for(let rowIndex = 0; rowIndex < matOne.length; rowIndex++) {
        mat.push([]);
        for(let colIndex = 0; colIndex < matTwo[0].length; colIndex++) {
            mat[rowIndex].push(dotProduct(matOne[rowIndex], getMatrixColumn(matTwo, colIndex)))
        }
    }

    return mat;
}

/**
 * Calculates the dot products of two number lists.
 * dot product of [a, b, c] and [d, e, f] is (a\*d + b\*e + c\*f)
 */
export function dotProduct(listOne: number[], listTwo: number[]): number {
    if(listOne.length !== listTwo.length) throw new Error("Dot product lists must have the same length!");

    let sum = 0;
    for(let i = 0; i < listOne.length; i++) 
        sum += listOne[i]*listTwo[i];
    
    return sum;
}

function getMatrixColumn(matrix: Matrix, columnIndex: number): number[] {
    return matrix.map(row => row[columnIndex]);
}

/**
 * Simply validates a matrix.
 */
function validateMatrix(matrix: Matrix): void {
    if(matrix.length === 0) throw new Error("Matrix must have a non-zero amount of rows!");
}