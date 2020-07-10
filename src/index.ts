export interface IDecorateStringWithReactProps {
    decorator: (match: string, index: number) => string | JSX.Element;
    pattern: RegExp;
    input: string;
}

export default function regexifyString(props: IDecorateStringWithReactProps): Array<(string | JSX.Element)> {
    const {
        pattern,
        decorator,
        input,
    } = props;
    const output: Array<(string | JSX.Element)> = [];

    let matchIndex = 0;
    let processedInput = input;
    let result = pattern.exec(processedInput);

    while (result !== null) {
        const matchStartAt = result.index;
        const match = result[0];

        const contentBeforeMatch: string = processedInput.substring(0, matchStartAt);
        const decoratedMatch = decorator(match, matchIndex);

        output.push(contentBeforeMatch);
        output.push(decoratedMatch);

        // clear processed content: before match, match
        processedInput = processedInput.substring(matchStartAt + match.length, processedInput.length + 1);

        pattern.lastIndex = 0;

        result = pattern.exec(processedInput);

        ++matchIndex;
    }

    if (processedInput) {
        output.push(processedInput);
    }

    return output;
}
