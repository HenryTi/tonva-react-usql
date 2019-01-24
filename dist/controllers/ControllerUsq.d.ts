import { Controller } from "tonva-tools";
import { CUsq } from "./usq";
export declare abstract class ControllerUsq extends Controller {
    constructor(cUsq: CUsq, res: any);
    cUsq: CUsq;
}
