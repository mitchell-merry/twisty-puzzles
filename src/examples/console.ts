import NByN from "../puzzles/NByN";
const prompt = require('prompt');

prompt.start();

export const start = async (N?: number, scramble?: string) => {
    if(!N) N = parseInt((await prompt.get(['N']))['N'], 10);
    if(!scramble) scramble = (await prompt.get(['scramble']))['scramble'];

    let cube = new NByN(N!);
    cube.doNotation(scramble!);
    cube.print();

    let n = (await prompt.get(['notation']))['notation'];
    while(n !== 'close') {
        cube.doNotation(n);
        cube.print();

        n = (await prompt.get(['notation']))['notation'];
    }
}

