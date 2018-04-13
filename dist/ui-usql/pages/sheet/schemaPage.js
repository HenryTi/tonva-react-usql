import * as React from 'react';
import { Page } from 'tonva-tools';
export class SchemaPage extends React.Component {
    render() {
        let { name, schema } = this.props.ui.entity;
        return React.createElement(Page, { header: name + "模板" },
            React.createElement("pre", { className: "mx-3 my-2" }, JSON.stringify(schema, undefined, ' ')));
    }
}
//# sourceMappingURL=schemaPage.js.map