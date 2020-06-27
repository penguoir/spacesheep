import { css } from 'twin.macro'
import firebase from 'util/firebase'
import Link from 'next/link'

const Mission = ({ mission }) => (
  <Link href="/mission/[mid]" as={`/mission/${mission.id}`}>
    <a>
      <div tw="p-5 border shadow hover:shadow-lg transition duration-300">
        <h3 tw="text-xl">{mission.title}</h3>
      </div>
    </a>
  </Link>
)

const MissionsPage = () => {
  const [missions, setMissions] = React.useState([])

  React.useEffect(() => {
    firebase
      .firestore()
      .collection('missions')
      .get()
      .then((collection) => {
        setMissions(collection.docs.map((x) => ({ id: x.id, ...x.data() })))
        console.log(collection.docs)
      })
  }, [])

  return (
    <div tw="container-sm p-3 mx-auto md:mt-16 mt-5">
      <h1 tw="text-xl">Dashboard</h1>
    </div>
  )
}

export default MissionsPage
