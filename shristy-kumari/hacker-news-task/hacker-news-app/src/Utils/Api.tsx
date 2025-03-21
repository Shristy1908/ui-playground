import { Story } from "./Types";

const base_url="https://hacker-news.firebaseio.com/v0";

export const getNewStories= async (): Promise<number[]> => {
    const response=await fetch(`${base_url}/newstories.json`);
    return response.json();
}

export const getBestStories= async (): Promise<number[]> => {
    const response = await fetch(`${base_url}/beststories.json`);
    return response.json();
}

export const getStories = async (id:number):Promise<Story> => {
    const response=await fetch(`${base_url}/item/${id}.json`);
    return response.json();
}