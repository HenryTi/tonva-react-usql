import {TonvaForm, List, FormRow, SubmitResult} from 'tonva-react-form';
import {SheetUIComponent} from '../../ui';

export interface Detail {
    name: string;
    label?: string;
    fields: FormRow[];
    renderRow: SheetUIComponent;
}
export interface MainDetails {
    main: FormRow[];
    details?: Detail[];
}
