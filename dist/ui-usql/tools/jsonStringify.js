function replacer(key, value) {
    if (key.startsWith('$'))
        return undefined;
    return value;
}
export function jsonStringify(value) {
    return JSON.stringify(value, replacer, ' ');
}
//# sourceMappingURL=jsonStringify.js.map