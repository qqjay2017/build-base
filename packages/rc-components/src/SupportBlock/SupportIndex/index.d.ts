import '../common/index.less';
export interface ISupportIndexProps {
    onTitleClick?: (id?: string) => void;
    onMoreClick?: (id?: string) => void;
    onSearch?: (content?: string) => void;
}
export declare function SupportIndex(props: ISupportIndexProps): JSX.Element;
