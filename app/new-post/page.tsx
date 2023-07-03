export default function NewPost() {
	return (
		<main className="bg-main w-full h-full grid grid-cols-[70%,30%] gap-8 px-16 py-8">
			<div className="flex flex-col gap-8">
				<input className="bg-transparent outline-none h3" placeholder="Title"></input>
				<input className="bg-transparent outline-none" placeholder="Snippet"></input>
			</div>
			<div>
				<input className="bg-transparent outline-none mb-8" placeholder="Add a tag"></input>
				<div className="flex gap-4 flex-wrap">
					<div className="w-24 h-10 bg-slate-400 rounded-md"></div>
					<div className="w-24 h-10 bg-slate-400 rounded-md"></div>
					<div className="w-24 h-10 bg-slate-400 rounded-md"></div>
					<div className="w-24 h-10 bg-slate-400 rounded-md"></div>
				</div>
			</div>
		</main>
	)
}
// add account authentification
// create a CREATE function