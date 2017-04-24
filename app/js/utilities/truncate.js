/**
 * Truncate string to a specified limit
 *
 * @param  {string} string String to be truncated
 * @param  {int} limit  Length to truncate to
 *
 * @return {string}        Truncated string with HTML encoded ellipsis
 */
export default function(string, limit) {
    if (string.length > limit) {
        return `${string.substr(0, limit)} \u2026`;// eslint-disable-line no-magic-numbers
    }

    return string;
}
