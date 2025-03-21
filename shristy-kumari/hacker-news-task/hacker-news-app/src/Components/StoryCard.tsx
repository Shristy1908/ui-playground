import { Clock, MessageCircle } from "lucide-react";
import { Story } from "../Utils/Types";
import { getRelativeTime } from "../Utils/Times";

interface storyCardProps{
	story: Story;
}

function StoryCard({story}:storyCardProps) {
	const timeAgo= getRelativeTime(story.time);

	return (
		<>
			<a
				href={story.url}
				target="_blank"
				rel="noopener noreferrer"
				className="story-card"
			>
				<h2 className="story-title">{story.title}</h2>

				<p className="story-description">{ story.text|| "Visit the link to read more..."}</p>

				<div className="story-meta">
					<div className="meta-item">
						<Clock size={16} />
						<span>{timeAgo}</span>
					</div>
					<div className="meta-item">
						<MessageCircle size={16} />
						<span>{story.descendants || 0} comments</span>
					</div>
				</div>
			</a>
		</>
	);
}
export default StoryCard;
