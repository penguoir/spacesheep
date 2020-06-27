import 'twin.macro'

// NOTE: this hasn't been tested for anything other than the navbar dropdown
const Popover = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const node = React.useRef()

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  React.useEffect(() => {
    function handleClick(e) {
      if (!e.path.includes(node.current)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <details
      ref={node}
      open={isOpen}
      onToggle={(e) => setIsOpen(e.target.open)}
    >
      <summary tw="flex items-center">
        {props.children}{' '}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          width="18px"
          height="18px"
        >
          <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
          <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
        </svg>
      </summary>

      <div
        className="popover"
        style={{ right: '1rem' }}
        tw="absolute z-10 rounded shadow-lg mt-2 w-40 py-2 bg-white"
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: {
            opacity: '1',
          },
          closed: {
            opacity: '0',
          },
        }}
      >
        {props.body}
      </div>

      <style>{`
         details summary::-webkit-details-marker {
           display:none;
          }
      `}</style>
    </details>
  )
}

export const PopoverItem = ({ children }) => (
  <a tw="p-2 block hover:bg-gray-400">{children}</a>
)

export default Popover
