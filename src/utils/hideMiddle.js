export function hideMiddle(string, prefixLength, suffixLength) {
  let re = new RegExp("^(\\+?\\d{" + prefixLength + "})(\\d+)(\\d{" + suffixLength + "})$")

  return string.replace(re, function (match, prefix, middle, suffix) {
    return prefix + "*".repeat(middle.length) + suffix
  })
}
