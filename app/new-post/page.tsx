"use client"
import { useState } from 'react';

export default function NewPost() {
  	const [title, setTitle] = useState('');
  	const [snippet, setSnippet] = useState('');
  	const [tag, setTag] = useState('');
  	const [tags, setTags] = useState<string[]>([]);
	const [tagErrorMessage, setTagErrorMessage] = useState(false);

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
					value={snippet}
					onChange={(e) => setSnippet(e.target.value)}
				/>
			</div>
			<div>
				<div className="flex gap-4 justify-center items-center mb-8">
					<input
						className="w-32 h-6"
						placeholder="Add a tag"
						value={tag}
						onChange={(e) => setTag(e.target.value)}
					/>
					<button
						className="filled-button"
						onClick={handleAddTag}
					>
						Add Tag
					</button>
				</div>
				<div className="flex gap-4 flex-wrap">
					{tags.map((tag, index) => (
						<div key={index} className="w-fit h-fit py-2 px-2 rounded-md text-black bg-violet-200">
							{tag}
						</div>
					))}
				</div>
				{tagErrorMessage && (
          			<p className="text-red-400">7 tags, 20 characters each is the maximum</p>
        		)}
			</div>
		</main>
	)
}