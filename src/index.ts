import NByN from "./puzzles/NByN";
import * as Console from "./examples/console";

const JPERM = "R U R' F' R U R' U' R' F R2 U' R' U'";
const SUPERFLIP = "U R2 F B R B2 R U2 L B2 R U' D' R2 F R' L B2 U2 F2";
const CHECKERBOARD = "S2 E2 M2";

const ZPERM = "M2 U M2 U M2 F2 M2 F2 U2"

const OLL_PARITY_4x4 = "Rw U2 x Rw U2 Rw U2 Rw' U2 Lw U2 Rw' U2 Rw U2 Rw' U2 Rw'";
const PLL_PARITY_4x4 = "(2R2 U2) . (2R2 Uw2) . (2R2 2U2)";

Console.start(3, "D2 L2 R2 B' U2 B U2 F' R2 F R2 D2 L B' F' U F2 D' L' F U2");
// Console.start(4, "");