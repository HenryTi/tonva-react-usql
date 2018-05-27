import { MainPage } from './mainPage';
import { EditPage } from './editPage';
import { ListPage } from './listPage';
import { GeneralTuidInput } from './input';
import { EntityLink } from '../entityLink';
import { SlaveInput } from './slaveInput';
export * from './input';
export * from './dropDown';
export * from './radio';
export const mapperContainer = {
    caption: '数据字典',
    icon: 'book',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
        editPage: EditPage,
        listPage: ListPage,
        input: {
            component: GeneralTuidInput,
        },
        slaveInput: SlaveInput,
    }
};
//# sourceMappingURL=index.js.map