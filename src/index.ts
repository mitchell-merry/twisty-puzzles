import ThreeByThree from "./puzzles/ThreeByThree"

const cube = new ThreeByThree();
cube.print();

// Sexy move
cube.doNotation("R U R' U'");
cube.print();