import NByN, { X_AXIS, Y_AXIS, Z_AXIS } from "./puzzles/NByN";
import ThreeByThree from "./puzzles/ThreeByThree"

const JPERM = "R U R' F' R U R' U' R' F R2 U' R' U'";
const SUPERFLIP = "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2";
const CHECKERBOARD = "S2 I2 M2";

const ZPERM = "M2 U M2 U M2 F2 M2 F2 U2"

// const cube = new ThreeByThree("L2 B2 D F2 D2 R2 F2 D2 L2 U B' L2 R F' D' U2 B2 D R");
// cube.print();

const nbyn = new NByN(5);
nbyn.print();
nbyn.turnSlice(X_AXIS, 3);
nbyn.turnSlice(Y_AXIS, 3);
nbyn.turnSlice(X_AXIS, 3);
nbyn.turnSlice(X_AXIS, 3);
nbyn.turnSlice(X_AXIS, 3);
nbyn.turnSlice(Y_AXIS, 3);
nbyn.turnSlice(Y_AXIS, 3);
nbyn.turnSlice(Y_AXIS, 3);

// nbyn.turnSlice(Z_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Z_AXIS, 0);
// nbyn.turnSlice(Z_AXIS, 0);
// nbyn.turnSlice(Z_AXIS, 0);

// nbyn.turnSlice(X_AXIS, 0);
// nbyn.print();
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.print();
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.print();
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.print();
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.print();
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.turnSlice(Y_AXIS, 0);
// nbyn.print();
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
// nbyn.turnSlice(X_AXIS, 0);
nbyn.print();