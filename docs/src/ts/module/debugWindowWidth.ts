export default function (): void {
  const $target: Element = document.querySelector('[data-debug-window-width]')
  function calcWindowWidth(): void {
    $target.innerHTML = `${window.innerWidth}px`
  }
  window.addEventListener('load', calcWindowWidth, false)
  window.addEventListener('resize', calcWindowWidth, false)
}
