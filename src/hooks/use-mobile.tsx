import * as React from "react"

const MOBILE_BREAKPOINT = 768
const RESIZE_DELAY = 150 // Debounce delay in ms

export function useIsMobile(): boolean {
  // Initialize with a default value based on SSR considerations
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false // SSR default
    return window.innerWidth < MOBILE_BREAKPOINT
  })

  React.useEffect(() => {
    // Create the media query list
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    // Create a debounced handler for resize events
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }, RESIZE_DELAY)
    }

    // Handle changes to the media query
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    // Add both listeners
    window.addEventListener('resize', handleResize)
    
    // Use the correct event listener method based on browser support
    if (mql.addEventListener) {
      mql.addEventListener('change', handleMediaQueryChange)
    } else {
      // Fallback for older browsers
      mql.addListener(handleMediaQueryChange)
    }

    // Initial check
    setIsMobile(mql.matches)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
      
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleMediaQueryChange)
      } else {
        // Fallback cleanup for older browsers
        mql.removeListener(handleMediaQueryChange)
      }
    }
  }, []) // Empty dependency array as we don't have any dependencies

  return isMobile
}
