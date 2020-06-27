import 'twin.macro'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Avatar = ({ of, ...props }) => {
  // TODO: make a better default avatar
  const user = of
  const avatarSrc =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

  return (
    <div tw='w-6 rounded' {...props}>
      <img tw="rounded" alt={user.username} src={user.picture || avatarSrc} />
    </div>
  )
}

Avatar.propTypes = {
  /**
   * User to create avatar of
   */
  of: PropTypes.shape({
    username: PropTypes.string.isRequired,
    picture: PropTypes.string,
  }),
}

export default Avatar
