import * as React from 'react';

import expect from 'expect';
import each from 'jest-each';
import regexifyString, { IDecorateStringWithReactProps } from '../index';

type IData = Record<
    string,
    Array<[IDecorateStringWithReactProps, ReturnType<typeof regexifyString>]>
>;

const data: IData = {
    strings: [
        [
            {
                pattern: /\[.*?\]/gim,
                decorator: (match, index) => {
                    return `<${match}>`;
                },
                input: 'some [text] with simple example',
            },
            ['some ', '<[text]>', ' with simple example'],
        ],
        [
            {
                pattern: /\[.*?\]/gim,
                decorator: (match, index) => {
                    switch (index) {
                        case 0: return `<FIRST ${match}>`;
                        case 1: return `<SECOND ${match}>`;
                        case 2: return `<THIRD ${match}>`;
                        default: return match;
                    }
                },
                input: 'Important text with [first link] and [second link] and much more [links]',
            },
            [
                'Important text with ',
                '<FIRST [first link]>',
                ' and ',
                '<SECOND [second link]>',
                ' and much more ',
                '<THIRD [links]>',
            ],
        ],
    ],
    tags: [
        [
            {
                pattern: /\[.*?\]/gim,
                decorator: (match, index) => {
                    return <span>{match}</span>;
                },
                input: 'some [text] with simple example',
            },
            ['some ', <span>[text]</span>, ' with simple example'],
        ],
    ],
    react: [
        [
            {
                pattern: /\[.*?\]/gim,
                decorator: (match, index) => {
                    return <React.Fragment>{match}</React.Fragment>;
                },
                input: 'some [text] with simple example',
            },
            ['some ', <React.Fragment>[text]</React.Fragment>, ' with simple example'],
        ],
    ],
};

describe('regexifyString', () => {
    each(data.strings).test(
        'should handle string decoration with next params %o and gives us %s',
        (input, expected) => {
            expect(regexifyString(input)).toEqual(expected);
        },
    );

    each(data.tags).test(
        'should handle decoration with HTML tags with next params %o and gives us %s',
        (input, expected) => {
            expect(regexifyString(input)).toEqual(expected);
        },
    );

    each(data.react).test(
        'should handle decoration with REACT components with next params %o and gives us %s',
        (input, expected) => {
            expect(regexifyString(input)).toMatchObject(expected);
        },
    );
});
