const CardHero = () => {
  return (
	<div className="px-8 py-4 bg-gradient-to-r from-[#262D2D] to-[#171C1C] rounded-md">
		<div className="flex flex-row gap-4 items-center">
      <div className="
        h-10 w-10 rounded-full bg-gradient-to-bl from-lime-400 to-yellow-300 text-white
        text-2xl justify-center items-center flex">
        A
      </div>
      <h3 className="whitespace-nowrap">Meaningful Title</h3>
    </div>
    <pre>
      {`
import React from "react";

const Lorem = ({ ipsum }) => {
console.log("dolor sit amet");
};
      `}
    </pre>
	</div>
  )
}

export default CardHero