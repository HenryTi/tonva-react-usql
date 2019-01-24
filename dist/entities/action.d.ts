import { Entity } from './entity';
export declare class Action extends Entity {
    readonly typeName: string;
    submit(data: object): Promise<any>;
}
