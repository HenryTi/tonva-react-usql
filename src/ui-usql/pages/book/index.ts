import {MapperContainer, BookMapper} from '../../ui';
import {Book} from '../../entities';
import {EntityUI, BookUI} from '../../ui';
import {MainPage} from './mainPage';
import {EntityLink} from '../entityLink';

export const mapperContainer:MapperContainer<Book, BookUI, BookMapper> = {
    caption: '账本查询 - 仅开发时使用',
    icon: 'hand-o-right',
    mapper: {
        link: EntityLink,
        mainPage: MainPage,
    }
}
