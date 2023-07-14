"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect} from "react";

interface PostData {
	title: string;
	content: string;
	tags: string[];
	date: string;
	likes: number;
}[];

export default function NewPost() {

	const [postData, setPostData] = useState<PostData>({} as PostData);
	const user = useSearchParams().get('user');
	const post = useSearchParams().get('post');
	useEffect(() => { getResponse()}, [user, post]);

	const getResponse = async () => {
		try {
			const response = await fetch(`/api/post?user=${user}&post=${post}`, {
				method: "GET"
			});
			const data = await response.json();
			setPostData(data);
		} catch(err) {
			console.log("Error fetching search results:", err)
		};
	};

	return (
		<main className="bg-main grid grid-cols-[70%,30%] gap-8 px-16 py-8">
			<div className="flex flex-col gap-8">
				<h3>{postData.title}</h3>
				<p>{postData.content}</p>
			</div>
			<div className="flex flex-col items-center gap-4 flex-wrap">
				{postData.tags.map((tag, index) => (
					<div key={index} className="w-fit h-fit flex items-center gap-2 py-2 px-2 rounded-md text-black bg-violet-200 hover:bg-violet-300 transition-all duration-300">
						{tag}
					</div>
				))}
			</div>
		</main>
	)
}