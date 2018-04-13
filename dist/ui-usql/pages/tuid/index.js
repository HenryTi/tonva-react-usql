import { MainPage } from './mainPage';
import { EditPage } from './editPage';
import { ListPage } from './listPage';
import { GeneralTuidInput } from './input';
import { EntityLink } from '../entityLink';
export * from './input';
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
        }
    }
};
//# sourceMappingURL=index.js.map