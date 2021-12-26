import NByN from "../puzzles/NByN";
const prompt = require('prompt');

prompt.start();

export const start = async (N?: number, scramble?: string) => {
    if(!N) N = parseInt((await prompt.get(['N']))['N'], 10);
    if(!scramble) scramble = (await prompt.get(['scramble']))['scramble'];

    let cube = new NByN(N!);
    cube.doNotation(scramble!);
    cube.print();
    let solution = "";

    let startTime = (new Date().getTime());
    let n = (await prompt.get(['notation']))['notation'];
    while(n !== 'close' && n !== 'done' && !cube.isSolved()) {
        try {
            cube.doNotation(n);
            solution += n + ' ';
        } catch(error) {
            console.error(error);
        }
        cube.print();

        n = (await prompt.get(['notation']))['notation'];
    }
    console.log(solution);
    if(n === 'close') process.exit(0);

    let endTime = (new Date().getTime());
    console.log((endTime - startTime)/1000);
}


