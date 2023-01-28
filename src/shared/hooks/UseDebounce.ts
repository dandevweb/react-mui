import { useCallback, useRef } from 'react'

export function useDebounce(delay = 300, notdelayInFisrtTime = true) {
  const isFirstTime = useRef(notdelayInFisrtTime)
  const debouncing = useRef<NodeJS.Timeout>()

  const debounce = useCallback((func: () => void) => {
    if (isFirstTime.current) {
      isFirstTime.current = false
      func()
    } else {
      if (debouncing.current) {
        clearTimeout(debouncing.current)
      }

      debouncing.current = setTimeout(() => {
        func()
      }, delay)
    }
  }, [delay])

  return { debounce }
}