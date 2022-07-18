import { ISupportIndexProps } from '../SupportIndex';
export interface ISearchBlockProps extends ISupportIndexProps {
    content?: string;
}
declare function SearchBlock({ onSearch, content }: ISearchBlockProps): JSX.Element;
export default SearchBlock;
