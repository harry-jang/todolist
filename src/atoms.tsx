import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();
    
export interface IToDo {
    text:string;
    id: number;
    category:string;
}

export enum DefaultCategories  {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export const categories = atom<string[]>( {
    key : "customCategory",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
    key: "category",
    "default":"TO_DO",
})

export const toDoState = atom<IToDo[]>({
    key:"toDo",
    default:[],
    effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
    key:"toDoSelector", 
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        
        return toDos.filter((toDo => toDo.category === category));
    },
})

