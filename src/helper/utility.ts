/**
 * Makes a deep copy of an array.
 * @param array 
 */
export const deepCopy = (array: any[]): any[] => {
    return array.map(b => {
        if(Array.isArray(b)) return deepCopy(b);
        return b;
    })
}