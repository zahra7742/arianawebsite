import { useEffect, useRef } from 'react'

// Drag a horizontal scroller with the mouse (touch/trackpad scroll natively)
export default function useDragScroll() {
  const ref = useRef(null)

  useEffect(() => {
    const track = ref.current
    if (!track) return

    let down = false, moved = false, startX = 0, startScroll = 0
    const onDown = e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      down = true; moved = false
      startX = e.clientX; startScroll = track.scrollLeft
    }
    const onMove = e => {
      if (!down) return
      const dx = e.clientX - startX
      if (!moved && Math.abs(dx) > 4) { moved = true; track.classList.add('dragging') }
      if (moved) track.scrollLeft = startScroll - dx
    }
    const end = () => {
      if (!down) return
      down = false
      track.classList.remove('dragging')   // re-enables snap so cards settle into place
    }
    // swallow the click that ends a drag so links/cards don't fire
    const onClick = e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false } }
    const onDragStart = e => e.preventDefault()

    track.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', end)
    window.addEventListener('pointercancel', end)
    track.addEventListener('click', onClick, true)
    track.addEventListener('dragstart', onDragStart)

    return () => {
      track.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', end)
      window.removeEventListener('pointercancel', end)
      track.removeEventListener('click', onClick, true)
      track.removeEventListener('dragstart', onDragStart)
      track.classList.remove('dragging')
    }
  }, [])

  return ref
}
