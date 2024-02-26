export default function rfc3339(date: Date) {
  function pad(n: number) {
    return n < 10 ? '0' + n : n.toString()
  }

  function timezoneOffset(offset: number) {
    if (offset === 0) {
      return 'Z'
    }

    const sign = offset < 0 ? '+' : '-'
    offset = Math.abs(offset)

    return sign + pad(Math.floor(offset / 60)) + ':' + pad(offset % 60)
  }

  const timezoneOffsetStr = timezoneOffset(-date.getTimezoneOffset())

  return (
    date.getFullYear() +
    '-' +
    pad(date.getMonth() + 1) +
    '-' +
    pad(date.getDate()) +
    'T' +
    pad(date.getHours()) +
    ':' +
    pad(date.getMinutes()) +
    ':' +
    pad(date.getSeconds()) +
    timezoneOffsetStr
  )
}
