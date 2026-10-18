import { useEffect, useState } from 'react'

// Live boolean for a CSS media query
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches)

  useEffect(() => {
    const mq = matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
