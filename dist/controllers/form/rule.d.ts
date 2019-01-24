export declare abstract class Rule {
    abstract check(defy: string[], value: any): any;
}
export declare class RuleRequired extends Rule {
    check(defy: string[], value: any): void;
}
export declare class RuleNum extends Rule {
    check(defy: string[], value: any): void;
}
export declare class RuleInt extends Rule {
    check(defy: string[], value: any): void;
}
export declare class RuleMin extends RuleNum {
    constructor(min: number);
    min: number;
    check(defy: string[], value: any): void;
}
export declare class RuleMax extends RuleNum {
    constructor(max: number);
    max: number;
    check(defy: string[], value: any): void;
}
