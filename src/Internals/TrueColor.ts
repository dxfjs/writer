export default class TrueColor {
  static fromHex(hex: string) {
    if (hex.startsWith('#')) hex = hex.replace('#', '')
    return parseInt(hex, 16)
  }

  static fromRGB(r: number, g: number, b: number) {
    const hex = [r, g, b].reduce((acc, c) => {
      const h = c.toString(16)
      return `${acc}${h.length === 1 ? '0' + h : h}`
    }, '0x00')
    return TrueColor.fromHex(hex)
  }
}
