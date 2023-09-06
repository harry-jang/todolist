import { useRecoilValue, useSetRecoilState } from "recoil";
import { DefaultCategories, IToDo, categories, toDoState } from "../atoms";
import React from "react";



function ToDo({text, category, id}: IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const customCategories = useRecoilValue(categories)

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
       const { currentTarget:{name}} = event;
       setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id)   
            const newToDo = {text, id, category: name as any };
            return [
                ...oldToDos.slice(0, targetIndex), 
                newToDo, 
                ...oldToDos.slice(targetIndex+1),
            ];

       });
    };

    console.log("ToDo - custom:", customCategories);

    return <li>
            <span>{text}</span> 
            {category !== DefaultCategories.DOING && <button name={DefaultCategories.DOING} onClick={onClick}>Doing</button> }
            {category !== DefaultCategories.TO_DO && <button name={DefaultCategories.TO_DO} onClick={onClick}>To Do</button> }
            {category !== DefaultCategories.DONE && <button name={DefaultCategories.DONE} onClick={ onClick}>Done</button> }
            {customCategories?.map(customCategory => category !== customCategory && <button name={customCategory} onClick={onClick}>{customCategory}</button>) }
        </li>;
}

export default ToDo;