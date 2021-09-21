const IndexPage = () => {
  return (
    <div className="relative py-3 md:pb-0 font-mono flex flex-col justify-center items-center gap-4 md:pt-10 md:w-screen">
      <div className="block md:absolute top-2.5 left-2.5 text-xs">
        <div>Donations will be used to sweep the floor 🧹🧹🧹</div>
        <div onClick={() => navigator?.clipboard?.writeText('0x70BFA29ACA546E6cFDc7a8F7Aebf07d9a545Cf52')} className="cursor-pointer">@mattyb: 0x70BFA29ACA546E6cFDc7a8F7Aebf07d9a545Cf52</div>
        <div onClick={() => navigator?.clipboard?.writeText('0x2eD2C431b77A021Dffe03D7e8d8dDE481bb07cCB')} className="cursor-pointer">@vanillagorilla: 0x2eD2C431b77A021Dffe03D7e8d8dDE481bb07cCB</div>

      </div>
      <h1 className="text-lg md:text-3xl"><strong>n</strong> is just numbers</h1>
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
      </div>
    </div>
  )
}

export default IndexPage
