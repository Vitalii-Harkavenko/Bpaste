"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect} from "react";
import Image from "next/image";
import { returnUser } from "../utils";

interface PostData {
	title: string;
	content: string;
	tags: string[];
	date: string;
	likes: number;
	owner: string
};

export default function NewPost() {

	const [postData, setPostData] = useState<PostData | undefined>(undefined);
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

	const handleLike = async () => {
    	try {
    		const user = await returnUser();
    		const response = await fetch(`/api/likepost`, {
    	    	body: JSON.stringify({user: user.name, post: {owner: postData!.owner, post: postData!.title}}),
    	  	});
    	    const updatedLikes = await response.json();
     		setPostData(prevData => ({
        		...prevData!,
        		likes: updatedLikes,
      		}));
        } catch (err) {
    		console.log("Error liking the post:", err);
    	}
  	};

	return (
		<>
			<main className="grid grid-cols-[60%,40%] gap-8 pl-32 py-8">
				{ postData &&
					<>
						<div className="flex flex-col gap-4">
							<h2>{postData.title}</h2>
							<pre className="ml-4">{postData.content}</pre>
						</div>
						<div className="post-info">
							<div className="flex flex-col gap-4 flex-wrap">
								<h3>{postData.owner}</h3>
								<div className="flex gap-4 items-center">
									<p>{postData.date.split('T')[0].replace(/-/g, '.')}</p>
									<button onClick={handleLike} className="flex gap-2 rounded-md w-fit p-2 hover:bg-[#2e2932]">
										<div className="relative h-6 w-6">
											<Image src="assets/like.svg" alt="like" fill />
										</div>
										{postData.likes}
									</button>
								</div>
								{postData.tags[0] !== '' && postData.tags.map((tag, index) => (
									<div key={index} className="w-fit h-fit flex items-center gap-2 py-2 px-2 rounded-md text-black bg-violet-200 hover:bg-violet-300 transition-all duration-300">
										{tag}
									</div>
								))}
							</div>
						</div>
					</>
				}
			</main>
			<div className="gradient"></div>
		</>
	)
}