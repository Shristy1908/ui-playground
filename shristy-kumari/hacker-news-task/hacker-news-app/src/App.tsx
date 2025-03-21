import "./App.css";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import StoryCardsContainer from "./Components/StoryCardsComponent";

function App() {
	return (
		<>
			<div className="app-container">
				<Header/>
				<StoryCardsContainer/>
				<Footer/>	
			</div>
		</>
	);
}

export default App;
