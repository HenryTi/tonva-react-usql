export * from './entities';
export * from './vm';
export * from './res';
export * from './centerApi';

export function converUIKeyToLowercase(obj: any) {
    for (let i in obj) {
        let v = obj[i];
        obj[i.toLowerCase()] = v;
        if (typeof v === 'object') {
          if (Array.isArray(v) === true) {
              for (let i of (v as any[])) {
                  converUIKeyToLowercase(i);
              }
          }
          else {
              converUIKeyToLowercase(v);
          }
      }
  }
}
