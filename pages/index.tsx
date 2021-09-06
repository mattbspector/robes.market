import { RobeInfo, fetchRobes } from './api/0'
import { format as ts } from 'timeago.js'

export async function getStaticProps() {
  const data = await fetchRobes()
  return {
    props: {
      robes: data.robes,
      lastUpdate: data.lastUpdate,
    },
    revalidate: 300,
  }
}

interface Props {
  robes: RobeInfo[]
  lastUpdate: string
}

const Robe = ({ robe }: { robe: RobeInfo }) => {
  return (
    <a href={robe.url} target="_blank">
      <div className="m-auto pb-4 mb-8 flex flex-col justify-center items-center gap-2 p-4 md:m-4 border border-white transform hover:scale-105 transition-all bg-black w-full md:w-96">
        <img src={robe.svg} alt="" width="350" height="350" />
        <div className="text-center">
          <p className="text-lg">#{robe.id}</p>
          <p>{robe.price} ETH</p>
        </div>
      </div>
    </a>
  )
}

const IndexPage = ({ robes, lastUpdate }: Props) => {
  return (
    <div className="relative py-3 md:pb-0 font-mono flex flex-col justify-center items-center gap-4 md:pt-10 md:w-screen">
      <div className="block md:absolute top-2.5 left-2.5 text-xs">
        <div>Donations will be used to sweep the floor 🧹🧹🧹</div>
        <div onClick={() => navigator?.clipboard?.writeText('0x70BFA29ACA546E6cFDc7a8F7Aebf07d9a545Cf52')} className="cursor-pointer">@mattyb: 0x70BFA29ACA546E6cFDc7a8F7Aebf07d9a545Cf52</div>
        <div onClick={() => navigator?.clipboard?.writeText('0x2eD2C431b77A021Dffe03D7e8d8dDE481bb07cCB')} className="cursor-pointer">@vanillagorilla: 0x2eD2C431b77A021Dffe03D7e8d8dDE481bb07cCB</div>

      </div>
      <h1 className="text-lg md:text-3xl">The N Project Market</h1>
      <div className="text-center max-w-screen-md md:leading-loose">
      <h2 className="text-lg mv-4">Special</h2>
                         <p className="md:text-lg pt-2">
                    <a
            href="/club-69"
            className="underline"
          >
           🔥 Club 69 🔥 (101/8888) 
          </a>

        </p>

        <p className="md:text-lg pt-2">
          <a
            href="/bookends"
            className="underline"
          >
           📚 Bookends 📚 (9/8888)
          </a>
          </p>

          <p style={{color: '#ff5c5c'}} className="md:text-lg pt-2">
                    <a
            href="/primes"
            className="underline"
          >
           🔑 Pure Primes 🔑 (9/8888)
          </a>

        </p>
        <h2 className="text-lg pt-3 mv-4">Individuals</h2>

        <p className="md:text-lg pt-2">
          <a
            href="/0"
            className="underline"
          >
           0 (36/8888)
          </a>
          </p>
          <p className="md:text-lg pt-2">
                    <a
            href="/11"
            className="underline"
          >
           11 (1360/8888)
          </a>
          </p>
                  <p className="md:text-lg pt-2">
                    <a
            href="/12"
            className="underline"
          >
           12 (441/8888)
          </a>
          </p>
                  <p className="md:text-lg pt-2">
                    <a
            href="/13"
            className="underline"
          >
           13 (174/8888)
          </a>
          </p>
                  <p className="md:text-lg pt-2">
                    <a
            href="/14"
            className="underline"
          >
           14 (39/8888)
          </a>

        </p>

        <h2 className="text-lg pt-3 mv-4">Sequences</h2>
                         <p className="md:text-lg pt-2">
                    <a
            href="/trips"
            className="underline"
          >
           Trips (391/8888)
          </a>

        </p>

                         <p className="md:text-lg pt-2">
                    <a
            href="/quads"
            className="underline"
          >
           Quads (43/8888)
          </a>

        </p>

                         <p className="md:text-lg pt-2">
                    <a
            href="/quints"
            className="underline"
          >
           Quints (8/8888)
          </a>

        </p>


        <p style={{color: '#ffd700'}} className="md:text-lg pt-2">
                    <a
            href="/golden"
            className="underline"
          >
           Golden Ratio (7/8888)
          </a>

        </p>

        <p style={{color: '#d4b083'}} className="md:text-lg pt-2">
                    <a
            href="/pi"
            className="underline"
          >
           Pi 🥧 (10/8888) 
          </a>

        </p>
                         

        <h2 className="text-lg pt-3 mv-4">Scatter</h2>
                         <p className="md:text-lg pt-2">
                    <a
            href="/scatter-5"
            className="underline"
          >
           Scatter 5x (42/8888)
          </a>

        </p>
        <p className="md:text-lg pt-2">
                    <a
            href="/scatter-6"
            className="underline"
          >
           Scatter 6x (3/8888)
          </a>

        </p>


        

      </div>
    </div>
  )
}

export default IndexPage
