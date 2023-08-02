const CardHero = ({post}: any) => {
  return (
    <div className="px-8 w-[25vw] h-[25vw] py-4 bg-gradient-to-r from-[#1d1e2a] to-[#181923] rounded-md">
      <div className="flex flex-row gap-4 items-center">
        <div className="
          h-10 w-10 rounded-full bg-gradient-to-bl from-lime-400 to-yellow-300 text-white
          text-2xl justify-center items-center flex">
          A
        </div>
        <h3>{post.title}</h3>
      </div>
      <pre>
        {post.content}
      </pre>
    </div>
  )
}

export default CardHero