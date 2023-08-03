const CardHero = ({post}: any) => {
  return (
    <div className="p-8 w-[40vw] h-[100vh] bg-gradient-to-br from-[#192234] to-[#10151F] rounded-md card-shadow">
      {
        post &&
        <>
          <div className="flex flex-row gap-4 items-center mb-4">
            <div className="
              h-10 w-10 rounded-full bg-gradient-to-bl from-blue-500 to-purple-300 text-white
              text-xl justify-center items-center flex">
              {post.owner[0]}
            </div>
            <h3>{post.title}</h3>
          </div>
          <pre>
            {post.content}
          </pre>
        </>
      }
    </div>
  )
}

export default CardHero