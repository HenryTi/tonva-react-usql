import React from 'react';
import { jsonStringify } from 'src/ui-usql/tools';
export const DefaultRow = (values) => React.createElement("div", { className: "px-3 py-2" }, jsonStringify(values));
//# sourceMappingURL=defaultRow.js.map