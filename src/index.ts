import NByN from "./puzzles/NByN";
import * as Console from "./examples/console";

const JPERM = "R U R' F' R U R' U' R' F R2 U' R' U'";
const SUPERFLIP = "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2";
const CHECKERBOARD = "S2 I2 M2";

const ZPERM = "M2 U M2 U M2 F2 M2 F2 U2"

const OLL_PARITY_4x4 = "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'";

Console.start(3, "D2 L2 R2 B' U2 B U2 F' R2 F R2 D2 L B' F' U F2 D' L' F U2");
// Console.start(4, "U2 F2 D R2 D' F2 U' L2 D R2 F2 R F' L2 D2 F D B2 L' U F Uw2 B2 F Rw2 R' Uw2 L Uw2 B D2 F' L' Fw2 Uw Rw2 L2 B Fw Rw Uw' L' U' R2 Fw'");