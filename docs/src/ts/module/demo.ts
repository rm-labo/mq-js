import { Mq } from '@rm-labo/mq-js'

export default function (): void {
  const mq = new Mq()

  function boxStyle(target: HTMLElement, color: string) {
    return () => (target.style.backgroundColor = color)
  }

  const boxMqUp = document.getElementById('box-mq-up')
  mq.up('sm', boxStyle(boxMqUp, 'red'), boxStyle(boxMqUp, 'blue'))

  const boxMqDown = document.getElementById('box-mq-down')
  mq.down('md', boxStyle(boxMqDown, 'red')).up('md', boxStyle(boxMqDown, 'blue'))

  const boxMqBetween = document.getElementById('box-mq-between')
  mq.between('md', 'lg', boxStyle(boxMqBetween, 'red'), boxStyle(boxMqBetween, 'blue'))

  const boxMqAllRange = document.getElementById('box-mq-all-range')
  mq.widthDown('sm', boxStyle(boxMqAllRange, 'red'))
    .widthBetween('sm', 'md', boxStyle(boxMqAllRange, 'orange'))
    .widthBetween('md', 'lg', boxStyle(boxMqAllRange, 'green'))
    .widthBetween('lg', 'xl', boxStyle(boxMqAllRange, 'blue'))
    .widthUp('xl', boxStyle(boxMqAllRange, 'purple'))

  const boxMqHeightUp = document.getElementById('box-mq-height-up')
  mq.heightUp('sm', boxStyle(boxMqHeightUp, 'red'), boxStyle(boxMqHeightUp, 'blue'))

  const boxMqHeightDown = document.getElementById('box-mq-height-down')
  mq.heightDown('md', boxStyle(boxMqHeightDown, 'red')).heightUp('md', boxStyle(boxMqHeightDown, 'blue'))

  const boxMqHeightBetween = document.getElementById('box-mq-height-between')
  mq.heightBetween('md', 'lg', boxStyle(boxMqHeightBetween, 'red'), boxStyle(boxMqHeightBetween, 'blue'))

  const boxMqHeightAllRange = document.getElementById('box-mq-height-all-range')
  mq.heightDown('sm', boxStyle(boxMqHeightAllRange, 'red'))
    .heightBetween('sm', 'md', boxStyle(boxMqHeightAllRange, 'orange'))
    .heightBetween('md', 'lg', boxStyle(boxMqHeightAllRange, 'green'))
    .heightBetween('lg', 'xl', boxStyle(boxMqHeightAllRange, 'blue'))
    .heightUp('xl', boxStyle(boxMqHeightAllRange, 'purple'))
}
