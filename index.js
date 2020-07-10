"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function regexifyString(props) {
    var pattern = props.pattern, decorator = props.decorator, input = props.input;
    var output = [];
    var matchIndex = 0;
    var processedInput = input;
    var result = pattern.exec(processedInput);
    while (result !== null) {
        var matchStartAt = result.index;
        var match = result[0];
        var contentBeforeMatch = processedInput.substring(0, matchStartAt);
        var decoratedMatch = decorator(match, matchIndex);
        output.push(contentBeforeMatch);
        output.push(decoratedMatch);
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
exports.default = regexifyString;
