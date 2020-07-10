/// <reference types="react" />
export interface IDecorateStringWithReactProps {
    decorator: (match: string, index: number) => string | JSX.Element;
    pattern: RegExp;
    input: string;
}
export default function regexifyString(props: IDecorateStringWithReactProps): Array<(string | JSX.Element)>;
