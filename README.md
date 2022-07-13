![npm bundle size](https://img.shields.io/bundlephobia/min/regexify-string) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/kas-elvirov/regexify-string) <!-- ![npm-donwloads-per-week](https://img.shields.io/npm/dw/regexify-string) --> ![npm-donwloads-per-year](https://img.shields.io/npm/dy/regexify-string)

---

# regexify-string

Strings decorator (by regex) with: React components, HTML tags etc.

> perfectly works with: strings, html tags, react, react-native


## Install

```
$ npm install --save regexify-string
```
or
```
$ yarn add regexify-string
```

## API

### regexifyString({ pattern, decorator, input })

#### pattern

Type: `RegExp`

#### decorator

Type: `(match: string, index: number, result?: RegExpExecArray) => string | JSX.Element`

- `match` string you would like to replace/decorate with something
- `index` index number of the current match
- `result?` RegExpExecArray

**NOTE:** Try do not forget to use keys for React collections if needed

#### input

Type: `string`

## Usage

#### with strings

```js
    const result = regexifyString({
        pattern: /\[.*?\]/gim,
        decorator: (match, index) => {
            return `<${match}>`;
        },
        input: 'some [text] with simple example',
    });

    console.log(result);
    // ['some ', '<[text]>', ' with simple example']
```

#### with index keys

```js
    const result = regexifyString({
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
    });

    console.log(result);
    /*
        [
            'Important text with ',
            '<FIRST [first link]>',
            ' and ',
            '<SECOND [second link]>',
            ' and much more ',
            '<THIRD [links]>',
        ]
    */
```

#### with html

```js
    const result = regexifyString({
        pattern: /\[.*?\]/gim,
        decorator: (match, index) => {
            return <span>{match}</span>;
        },
        input: 'some [text] with simple example',
    });

    console.log(result);
    // ['some ', <span>[text]</span>, ' with simple example']
```

#### with React / React Native components

```js
    regexifyString({
        pattern: /\[.*?\]/gim,
        decorator: (match, index) => {
            return (
                <Link
                    to={SOME_ROUTE}
                    onClick={onClick}
                >
                    {match}
                </Link>
            );
        },
        input: someVariablWithData,
    });
```

```js
    regexifyString({
        pattern: /\[.*?\]/gim,
        decorator: (match, index) => {
            return <React.Fragment>{match}</React.Fragment>;
        },
        input: 'some [text] with simple example',
    });
```

#### with groups

```js
    const result = regexifyString({
        pattern: /\[(?<id>.+)\]\{(?<name>.+)\}/g,
        decorator: (match, index, result) => {
            return (
                <div
                    id={String(result?.[2])}
                    title={result?.[1]}
                />
            );
        },
        input: 'a[b]{c}',
    });

    console.log(result);
    // ['a', <div id='c' title='b' />]
```

## License

MIT © [Kas Elvirov](http://www.kas-elvirov.com/)
