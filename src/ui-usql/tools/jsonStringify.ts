function replacer(key:string, value:any) {
    if (key.startsWith('$')) return undefined;
    return value;
}

export function jsonStringify(value:any) {
    return JSON.stringify(value, replacer, ' ');
}
