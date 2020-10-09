/// <reference types="react-scripts" />

export type skillParameter = "beg" | "int" | "exp";
export type followersParameter = 5 | 10 | 50 | 100 | 500 | Infinity;
export type ageParameter = 3 | 6 | 12 | 60;

export interface searchParameters {
  topic: string;
  language: string;
  skill: skillLevelParameter;
  followers: followersParameter;
  age: ageParameter;
}
