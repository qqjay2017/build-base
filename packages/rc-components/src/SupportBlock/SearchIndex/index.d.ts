import { ISupportIndexProps } from '../SupportIndex';
import '../common/index.less';
export interface ISearchIndexProps extends ISupportIndexProps {
    content: string;
}
export declare function SearchIndex({ content, onTitleClick }: ISearchIndexProps): JSX.Element;
