import { atom, selector } from 'recoil';

const storageStr = localStorage.getItem('todos') as string;
const storages = JSON.parse(storageStr) as ITodo[];

export enum Category {
  // "TO_DO1" = "TO_DO", // 따로 지정하고자 하는 값으로 변경할 수 있다. (단, 나마지도 변경해야 한다. - 일관성)
  "TO_DO",
  "DOING",
  "DONE"
}

export interface ITodo {
  text: string;
  id: number;
  category: Category;
}

export const toDoCategory = atom<Category>({
  key: 'category',
  default: Category.TO_DO
});

export const toDoState = atom<ITodo[]>({
  key: 'todo',
  default: storages
});

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(toDoCategory);
    return toDos.filter((toDo) => toDo.category === category);
  }
});

// enum은 코드를 손쉽게 사용할 수 있도록 도와주는 도구이다.
/*
export enum Category {
  "TO_DO",
  "DOING",
  "DONE"
}

- Category["TO_DO"] = 0
- Category["DOING"] = 1
- Category["DONE"] = 2
*/
// --------------------
/*
export enum Category {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE"
}

- Category["TO_DO"] = "TO_DO"
- Category["DOING"] = "DOING"
- Category["DONE"] = "DONE"
*/
