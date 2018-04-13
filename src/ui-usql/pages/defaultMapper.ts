import {EntitiesMapper} from '../ui';
import {Main} from './main';
import {typeFieldMappers} from './typeFieldMappers';
import {mapperContainer as actionMapperContainer} from './action';
import {mapperContainer as queryMapperContainer} from './query';
import {mapperContainer as sheetMapperContainer} from './sheet';
import {mapperContainer as tuidMapperContainer} from './tuid';
import {mapperContainer as bookMapperContainer} from './book';
import {mapperContainer as historyMapperContainer} from './history';

export const defaultMapper:EntitiesMapper = {
    mainPage: Main,
    caption: '同花默认界面',
    typeFieldMappers: typeFieldMappers,
    tuid: tuidMapperContainer, 
    /*{
        caption: '数据字典',
        mapper: {
            link: EntityLink,
            mainPage: TuidPage,
        }
    },*/
    action: actionMapperContainer,
    /*{
        caption: '操作',
        mapper: {
            link: EntityLink,
            mainPage: undefined,
        }
    },*/
    sheet: sheetMapperContainer, 
    /*{
        caption: '凭单',
        mapper: {
            link: EntityLink,
            mainPage: undefined,
        }
    },*/
    query: queryMapperContainer,
    /*{
        caption: '查询',
        mapper: {
            link: EntityLink,
            mainPage: undefined,
        }
    },*/
    book: bookMapperContainer,
    history: historyMapperContainer,
}
