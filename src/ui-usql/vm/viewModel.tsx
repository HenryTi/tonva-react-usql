import * as React from 'react';
import { observer } from 'mobx-react';

export type TypeView = React.StatelessComponent<{vm: ViewModel}>;
export type TypeContent = React.StatelessComponent<any>;

export abstract class ViewModel {
    async load():Promise<void> {}
    protected view: TypeView;
    renderView():JSX.Element {
        if (this.view === undefined) return <div>??? viewModel 必须定义 view ???</div>
        return React.createElement(this.view, {vm: this});
    }
}

export const JSONContent = observer(
    (values) => <>content: {JSON.stringify(values)}</>
);
export const RowContent = (values) => 
    <div className="px-3 py-2">Row: {JSON.stringify(values)}</div>;
