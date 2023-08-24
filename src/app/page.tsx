// import Image from 'next/image'
import Clock from './components/clock';
export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <label>By Matt on Mattbook pro</label>
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Sign in
        </p>
      </div>

      {/* <div className="relative text-9xl 
      flex place-items-center 
      before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 
      before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] 
      after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
      after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] 
      before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 
      after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 
      before:lg:h-[360px]
      ">

        <Clock></Clock>
      </div> */}

      <div className="p-2 text-center text-5xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-600">
        <label>Time is the most valuable thing a man can spend.</label>
      </div>
      <Clock></Clock>

      <div className="mb-32 grid text-center lg:mb-0">
        Regret for wasted time is more wasted time. –– Mason Cooley
        <a href='./demo' className='hover:border-gray-300 hover:bg-gray-100 group rounded-lg p-2'>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Visualize yours
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-lg text-sm opacity-50`}>
            No sign in needed!
          </p>
        </a>


        {/* <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a> */}
      </div>
    </main>
  )
}
