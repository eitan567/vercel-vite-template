export interface Question {
    q: string;
    a: string;
    value: number;
  }
  
  export interface Team {
    name: string;
    score: number;
  }
  
  export interface GameData {
    categories: string[];
    questions: Question[][];
  }