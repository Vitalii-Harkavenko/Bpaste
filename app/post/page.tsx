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
	const user = useSearchParams().get('user') || '';
	const post = useSearchParams().get('post') || '';
	useEffect(() => { getResponse()}, [user, post]);

	const getResponse = async () => {
		try {
			const response = await fetch(`/api/post?user=${user}&post=${post.replace(/%20|\+/g, ' ')}`, {
				method: "GET"
			});
			setPostData(await response.json());
		} catch(err) {
			console.log("Error fetching search results:", err)
		};
	};
	return (
		<>
			<main className="grid grid-cols-[60%,40%] gap-8 pl-32 py-8">
				<div className="flex flex-col gap-8">
					<h3>{postData.title}</h3>
					<pre>{postData.content}{postData.content}</pre>
				</div>
				<div className="post-info">
					<div className="flex gap-4">
						<p className="py-2">Tags</p>
						<div className="flex gap-4 flex-wrap">
							{postData.tags && postData.tags[0] !== '' && postData.tags.map((tag, index) => (
								<div key={index} className="w-fit h-fit flex items-center gap-2 py-2 px-2 rounded-md text-black bg-violet-200 hover:bg-violet-300 transition-all duration-300">
									{tag}
								</div>
							))}
						</div>
					</div>
					<div className="flex gap-4">
						<p>Likes</p>
						<p>{postData.likes}</p>
					</div>
				</div>
			</main>
			<div className="gradient"></div>
		</>
	)
}