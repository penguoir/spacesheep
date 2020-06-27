import ReactDOM from 'react-dom'
import tw, { css } from 'twin.macro'
import { motion, AnimatePresence } from 'framer-motion'

const Toast = ({ shown, onClose, children, ...props }) => {
  if (typeof window !== 'object') {
    return null
  }

  React.useEffect(() => {
    function handleKeyDown(e) {
      if (shown && e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return ReactDOM.createPortal(
    <AnimatePresence>
      {shown && (
        <div
          css={[
            tw`absolute z-20 mt-8 text-center absolute`,
            css`
              left: 50%;
              transform: translateX(-50%);
            `,
          ]}
          {...props}
        >
          <motion.div
            onClick={() => onClose()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            tw="bg-green-700 mx-auto text-white py-2 px-3 cursor-pointer rounded inline-flex items-center"
          >
            {/* Check icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              width="18px"
              height="18px"
              tw="fill-current"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span tw="ml-2">{children}</span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('modal-container')
  )
}

export default Toast
