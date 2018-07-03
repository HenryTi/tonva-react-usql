import { Sheet } from '../../entities';
import { VmEntity } from '../entity';
import { VmApi } from '../vmApi';
export declare abstract class VmSheet extends VmEntity {
    constructor(vmApi: VmApi, sheet: Sheet);
    entity: Sheet;
    readonly icon: JSX.Element;
    protected typeFlowRow: (item: any) => JSX.Element;
    flowRow: (item: any, index: number) => JSX.Element;
    className: string;
    sheetState: string;
    data: any;
    flows: any[];
    typeSheetView: ({ vm }: {
        vm: VmSheet;
    }) => JSX.Element;
}
