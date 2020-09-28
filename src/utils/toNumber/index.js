export default function toNumber (string) {
  return Number(string.replace(/,[^,]+$/, "").replace(/.[^0-9.-]+/g, '').replace('.', ''))
}