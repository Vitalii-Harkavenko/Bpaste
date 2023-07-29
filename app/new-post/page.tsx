"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import { navigateToBaseUrl, returnUser } from "@/app/utils";

export default function NewPost() {
  	const [title, setTitle] = useState('');
  	const [content, setContent] = useState('');
  	const [tag, setTag] = useState('');
  	const [tags, setTags] = useState<string[]>([]);
	const [tagErrorMessage, setTagErrorMessage] = useState(false);
	const [postErrorMessage, setPostErrorMessage] = useState(false);
	const router = useRouter();

    const handleAddTag = () => {
		if (tags.length >= 10 || tag.trim().length > 20) {
			setTagErrorMessage(true);
			const timeout = setTimeout(() => {setTagErrorMessage(false)}, 3000);
      		return () => clearTimeout(timeout);
  		}
		if (tag.trim() !== '') {
			setTags((prevTags) => [...prevTags, tag]);
			setTag('');
		}
  	};
	
	const handleDeleteTag = (tagToDelete: string) => {
		setTags((prevTags) => {
			const updatedTags = prevTags.filter((tag) => tag !== tagToDelete);
			return updatedTags;
		});
	};

	const handleCreatePost = async () => {
		if (title === "" || content === "" || content.length < 50 || content.length > 7000) {
			setPostErrorMessage(true);
			const timeout = setTimeout(() => {setPostErrorMessage(false)}, 3000);
      		return () => clearTimeout(timeout);
		};
		const user = returnUser();
		const existingPost = await fetch(`/api/post?user=${user.name}&post=${title}`, {
			method: "GET"
		});
		const retreivedPost = await existingPost.json();
		if (retreivedPost) {
			setPostErrorMessage(true);
			const timeout = setTimeout(() => {setPostErrorMessage(false)}, 3000);
      		return () => clearTimeout(timeout);
		};
		await fetch('/api/create-post', {
			method: 'POST',
			body: JSON.stringify({title, content, tags, user}),
		});
		navigateToBaseUrl(router);
	};

	return (
		<>
			<main className="grid grid-cols-[60%,40%] gap-8 pl-32 py-8 overflow-hidden">
				<div className="flex flex-col gap-8">
					<input
						className="h3"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{postErrorMessage && <p className="text-red-400">The title/content is empty or you already have a post with that name</p>}
					<textarea
						placeholder="Snippet"
						value={content}
						onChange={(e) => setContent(e.target.value)}
						className="w-full h-full resize-none"
					/>
				</div>
				<div className="flex flex-col gap-16">
					<div className="post-info">
						<div className="flex gap-4 items-center justify-center">
							<input
								className="w-32 h-6"
								placeholder="Name a tag"
								value={tag}
								onChange={(e) => setTag(e.target.value)}
								onKeyDown={(e) => { if (e.key === "Enter") handleAddTag() }}
							/>
							<button
								className="empty-button"
								onClick={handleAddTag}
							>
								Add Tag
							</button>
						</div>
						<div className="flex gap-4 flex-wrap w-full">
							{tags.map((tag, index) => (
								<div key={index} className="w-fit h-fit flex items-center gap-2 py-2 px-2 rounded-md text-black bg-violet-200 hover:bg-violet-300 transition-all duration-300">
									{tag}
									<button className="relative w-4 h-4" onClick={() => handleDeleteTag(tag)}><Image src="/assets/delete.svg" alt="delete" fill/></button>
								</div>
							))}
						</div>
						{tagErrorMessage && (
							<p className="text-red-400">7 tags, 20 characters each is the maximum</p>
						)}
					</div>
					<button className="filled-button mx-auto w-1/2" onClick={handleCreatePost}>Create snippet</button>
				</div>
			</main>
			<div className="gradient"></div>
		</>
	)
}