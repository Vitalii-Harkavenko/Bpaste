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
	const router = useRouter();

    const handleAddTag = () => {
		if (tags.length >= 7 || tag.trim().length > 20) {
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
		if (title === "" || content === "") return;
		const response = await fetch('/api/create-post', {
			method: 'POST',
			body: JSON.stringify({title, content, tags, returnUser}),
		});
		const result = await response.json();
		console.log(result);
		setTitle('');
		setContent('');
		setTag('');
		setTags([]);``
		navigateToBaseUrl(router);
	}

	return (
		<main className="bg-main grid grid-cols-[70%,30%] gap-8 px-16 py-8">
			<div className="flex flex-col gap-8">
				<input
					className="h3"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					placeholder="Snippet"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>
			<div className="flex flex-col items-center gap-8">
				<div className="flex gap-4 items-center">
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
				<button className="filled-button mt-auto w-1/2" onClick={handleCreatePost}>Create snippet</button>
			</div>
		</main>
	)
}