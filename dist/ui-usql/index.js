export * from './entities';
export * from './controllers';
export * from './res';
export * from './centerApi';
export function converUIKeyToLowercase(obj) {
    for (let i in obj) {
        let v = obj[i];
        obj[i.toLowerCase()] = v;
        if (typeof v === 'object') {
            if (Array.isArray(v) === true) {
                for (let i of v) {
                    converUIKeyToLowercase(i);
                }
            }
            else {
                converUIKeyToLowercase(v);
            }
        }
    }
}
//# sourceMappingURL=index.js.map