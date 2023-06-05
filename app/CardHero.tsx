const CardHero = () => {
  return (
	<div className="mx-8 my-4">
		<div className="flex flex-row gap-4">
      <div className="
        h-12 w-12 rounded-full bg-gradient-to-bl from-lime-400 to-yellow-300 text-white
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