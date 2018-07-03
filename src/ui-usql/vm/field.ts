export interface Field {
    name: string;
    type: 'tinyint' | 'smallint' | 'int' | 'bigint' | 'dec' | 'char' | 'text',
    tuid?: string;
    null?: boolean;
    size?: number;
}

export interface Arr {
    name: string;
    fields: Field[];
}
