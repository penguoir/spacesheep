import React from 'react'

export default function useIsMobile() {
  // In case we're running on the server (e.g. testing)
  const isClient = typeof window === 'object'

  /**
   * getIsMobile
   * @returns {Boolean} Is the current screen a mobile device
   */
  function getIsMobile() {
    if (isClient) {
      // Check window width
      let width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      // If width is less than 1024px, return true
      return width < 1024
    } else {
      // Default for tests is mobile
      return null
    }
  }

  // Lazy-load the value of isMobile
  const [isMobile, setIsMobile] = React.useState(getIsMobile)

  // Add event listener to resize on mount
  React.useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setIsMobile(getIsMobile())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}
