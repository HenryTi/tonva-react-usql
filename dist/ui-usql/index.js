import * as React from 'react';
import { CApp } from './controllers';
export * from './entities';
export * from './controllers';
export * from './centerApi';
function convertUIKeyToLowercase(obj) {
    for (let i in obj) {
        let v = obj[i];
        obj[i.toLowerCase()] = v;
        if (typeof v !== 'object')
            continue;
        if (React.isValidElement(v))
            continue;
        if (Array.isArray(v) !== true) {
            convertUIKeyToLowercase(v);
            continue;
        }
        for (let i of v) {
            convertUIKeyToLowercase(i);
        }
    }
}
// const appName = 'JKDev/jkOrder';
export async function startApp(appName, ui) {
    convertUIKeyToLowercase(ui);
    let cApp = new CApp(appName, ui || { usqs: {} });
    await cApp.start();
}
//# sourceMappingURL=index.js.map