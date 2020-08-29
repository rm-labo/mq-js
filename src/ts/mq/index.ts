type BreakpointsKeys = string
interface MqOption {
  breakpoints?: {
    [key in BreakpointsKeys]: number
  }
}
type CallbackType = () => void

export default class Mq {
  private option: MqOption
  private matchHandlers: unknown

  constructor(option?: MqOption) {
    this.option = {
      breakpoints: {
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1800
      },
      ...option
    }
    this.matchHandlers = {}
  }

  public destroy(): void {
    Object.keys(this.matchHandlers).forEach((key) => {
      this.matchHandlers[key]['mediaQueryList'].removeListener(this.matchHandlers[key]['event'])
    })
  }

  private isbreakpointKeyName(bp: BreakpointsKeys): boolean {
    return Object.keys(this.option.breakpoints).includes(bp)
  }

  private getBreakPointSize(bp: BreakpointsKeys): number {
    if (this.isbreakpointKeyName(bp)) {
      return this.option.breakpoints[bp]
    } else {
      throw new Error('A breakpoint is not specified or an invalid value is specified.')
    }
  }

  private initMatchFunction(
    bpKeyName: BreakpointsKeys,
    media: string,
    matchHandler: CallbackType,
    unmatchHandler?: CallbackType
  ): void {
    const mql = window.matchMedia(media)
    const fn = function (event: MediaQueryList | MediaQueryListEvent): void {
      if (event.matches) {
        matchHandler()
      } else if (unmatchHandler) {
        unmatchHandler()
      }
    }
    this.matchHandlers[bpKeyName] = {
      mediaQueryList: mql,
      event: fn
    }
    fn(mql)
    mql.addListener(fn)
  }

  private createMediaName(
    type: 'up' | 'down' | 'between',
    direction: 'width' | 'height',
    bp1: BreakpointsKeys,
    bp2?: BreakpointsKeys
  ): string {
    let media = ''
    switch (type) {
      case 'between': {
        let bpName1 = bp1
        let bpName2 = bp2
        let size1 = this.getBreakPointSize(bp1)
        let size2 = this.getBreakPointSize(bp2)
        if (size1 >= size2) {
          // eslint-disable-next-line no-extra-semi
          ;[size1, size2] = [size2, size1]
          ;[bpName1, bpName2] = [bpName2, bpName1]
        }
        size1 = size1 <= 0 ? 1 : size1
        size2 = size2 <= 0 ? 1 : size2
        media = `(min-${direction}: ${size1 - 1}px) and (max-${direction}: ${size2}px)`
        break
      }

      case 'down': {
        media = `(max-${direction}: ${this.getBreakPointSize(bp1) - 1}px)`
        break
      }

      case 'up':
      default: {
        media = `(min-${direction}: ${this.getBreakPointSize(bp1)}px)`
        break
      }
    }
    return media
  }

  public widthUp(bp: BreakpointsKeys, matchHandler: CallbackType, unmatchHandler?: CallbackType): this {
    const media = this.createMediaName('up', 'width', bp)
    this.initMatchFunction(bp, media, matchHandler, unmatchHandler)
    return this
  }

  public widthDown(bp: BreakpointsKeys, matchHandler: CallbackType, unmatchHandler?: CallbackType): this {
    const media = this.createMediaName('down', 'width', bp)
    this.initMatchFunction(bp, media, matchHandler, unmatchHandler)
    return this
  }

  public widthBetween(
    bp1: BreakpointsKeys,
    bp2: BreakpointsKeys,
    matchHandler: CallbackType,
    unmatchHandler?: CallbackType
  ): this {
    const media = this.createMediaName('between', 'width', bp1, bp2)
    this.initMatchFunction(`${bp1}-${bp2}`, media, matchHandler, unmatchHandler)
    return this
  }

  public heightUp(bp: BreakpointsKeys, matchHandler: CallbackType, unmatchHandler?: CallbackType): this {
    const media = this.createMediaName('up', 'height', bp)
    this.initMatchFunction(bp, media, matchHandler, unmatchHandler)
    return this
  }

  public heightDown(bp: BreakpointsKeys, matchHandler: CallbackType, unmatchHandler?: CallbackType): this {
    const media = this.createMediaName('down', 'height', bp)
    this.initMatchFunction(bp, media, matchHandler, unmatchHandler)
    return this
  }

  public heightBetween(
    bp1: BreakpointsKeys,
    bp2: BreakpointsKeys,
    matchHandler: CallbackType,
    unmatchHandler?: CallbackType
  ): this {
    const media = this.createMediaName('between', 'height', bp1, bp2)
    this.initMatchFunction(`${bp1}-${bp2}`, media, matchHandler, unmatchHandler)
    return this
  }

  public up(bp: BreakpointsKeys, matchHandler: CallbackType, unmatchHandler?: CallbackType): this {
    this.widthUp(bp, matchHandler, unmatchHandler)
    return this
  }

  public down(bp: BreakpointsKeys, matchHandler: CallbackType, unmatchHandler?: CallbackType): this {
    this.widthDown(bp, matchHandler, unmatchHandler)
    return this
  }

  public between(
    bp1: BreakpointsKeys,
    bp2: BreakpointsKeys,
    matchHandler: CallbackType,
    unmatchHandler?: CallbackType
  ): this {
    this.widthBetween(bp1, bp2, matchHandler, unmatchHandler)
    return this
  }
}
