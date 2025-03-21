import { useEffect, useState } from "react";
import type { Story } from "../Utils/Types";
import { getBestStories, getNewStories, getStories } from "../Utils/Api";
import StoryCard from "../Components/StoryCard";

function StoryCardsComponent() {
	const [stories, setStories] = useState<Story[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [page, setPage] = useState<number>(1);
	const [acticeTab, setActiveTab] = useState<"new" | "past">("new");

	const loadStories = async (type: "new" | "past") => {
		setLoading(true);
		try {
			let articleIds: number[];
			if (type === "new") {
				articleIds = await getNewStories();
			} else {
				articleIds = await getBestStories();
			}
			const start = (page - 1) * 10;
			const end = start + 10;

			const storyPromises = articleIds
				.slice(start, end)
				.map(async (id) => getStories(id));
			const loadedStories = await Promise.all(storyPromises);
			setStories(loadedStories);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleTabChange = (tab: "new" | "past") => {
		setActiveTab(tab);
		setPage(1);
		loadStories(tab);
	};

	const loadMoreStories = async () => {
		setLoading(true);
		try {
		  const storyIds = acticeTab === 'new' ? await getNewStories() : await getBestStories();
		  const start = page * 10;
		  const end = start + 10;
		  const nextStories = storyIds.slice(start, end);
		  const newStories = await Promise.all(nextStories.map(id => getStories(id)));
		  setStories(prev => [...prev, ...newStories]);
		  setPage(prev => prev + 1);
		} catch (error) {
		  console.error('Failed to load more stories:', error);
		} finally {
		  setLoading(false);
		}
	};

	useEffect(() => {
		loadStories("new");
	}, []);
    
	return (
		<>
			<main className="main">
				<div className="container">
					<div className="tab-container">
						<button
							className={`tab-btn ${acticeTab === "new" ? "active" : ""}`}
							onClick={() => handleTabChange("new")}
						>
							New
						</button>
						<button
							className={`tab-btn ${acticeTab === "past" ? "active" : ""}`}
							onClick={() => handleTabChange("past")}
						>
							Past
						</button>
					</div>

					{loading && stories.length === 0 ? (
						<div className="loading">
							<div className="spinner"></div>
						</div>
					) : (
						<div className="story-container">
							{stories.map((story) => (
								<StoryCard key={story.id} story={story} />
							))}
							<div className="loadmore-btn">
								<button
									className="load-more"
									onClick={loadMoreStories}
									disabled={loading}
								>
									{loading ? "Loading..." : "Load More"}
								</button>
							</div>
						</div>
					)}
				</div>
			</main>
		</>
	);
}

export default StoryCardsComponent;
