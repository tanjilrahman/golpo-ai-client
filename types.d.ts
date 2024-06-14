export interface Story {
  id: string;
  chapters: Chapter[];
  images: string[];
  audioUrl: string?;
  isPublic: boolean;
  authorId: string;
  author: Author;
  createdAt: Date;
  language: string;
  storyType: string;
  readerAge: string;
  writingStyle: string;
  isSuperStory: boolean;
}

export interface Chapter {
  title: string;
  story: string[];
}

export interface Author {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
}

export interface SuggestedPlot {
  title: string;
  plot: string;
}

export interface StoryOptions {
  language: string;
  storyType: string;
  readerAge: string;
  writingStyle: string;
  isSuperStory: boolean;
}

export interface Character {
  id: string;
  name: string;
  details: string;
  image: string;
  createdAt: Date;
  authorId: string;
}
