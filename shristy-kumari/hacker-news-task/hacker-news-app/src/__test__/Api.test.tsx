import { describe, it, expect, vi, afterEach } from "vitest";
import * as Api from "../Utils/Api"; // adjust path if needed
global.fetch = vi.fn();

const mockFetch = fetch as jest.Mock;

describe("API functions", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("getNewStories should fetch newstories.json and return story IDs", async () => {
    const mockIds = [1, 2, 3];
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockIds),
    });

    const result = await Api.getNewStories();
    expect(mockFetch).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/newstories.json");
    expect(result).toEqual(mockIds);
  });

  it("getBestStories should fetch beststories.json and return story IDs", async () => {
    const mockIds = [4, 5, 6];
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockIds),
    });

    const result = await Api.getBestStories();
    expect(mockFetch).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/beststories.json");
    expect(result).toEqual(mockIds);
  });

  it("getStories should fetch a story by ID and return story data", async () => {
    const mockStory = {
      id: 123,
      title: "Test Story",
      url: "https://example.com",
      time: Date.now(),
      descendants: 5,
    };
    
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockStory),
    });

    const result = await Api.getStories(123);
    expect(mockFetch).toHaveBeenCalledWith("https://hacker-news.firebaseio.com/v0/item/123.json");
    expect(result).toEqual(mockStory);
  });
});