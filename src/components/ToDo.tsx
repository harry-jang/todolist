import { useRecoilValue, useSetRecoilState } from "recoil";
import { DefaultCategories, IToDo, categories, toDoState } from "../atoms";
import React from "react";
import { styled } from "styled-components";
 
const ToDoPanel = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    color: ${(props) => props.theme.textColor};
    
    border-radius: 15px;
    margin-bottom: 10px;

    span {
        margin-left : 10px;
    }
    
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor}
        }
    }
`;

const ButtonPanel = styled.div`
    margin : 5px;
    button {
        padding: 5px 5px;
        margin : 1px;
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.textColor};
        border: none; 
        border-radius: 5px; 
        cursor: pointer;
        font-size: 16px; 
        transition: background-color 0.3s ease;

        &:hover {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

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

    return <ToDoPanel>
                <span>{text}</span>     
                <ButtonPanel>
                    {category !== DefaultCategories.DOING && <button name={DefaultCategories.DOING} onClick={onClick}>Doing</button> }
                    {category !== DefaultCategories.TO_DO && <button name={DefaultCategories.TO_DO} onClick={onClick}>To Do</button> }
                    {category !== DefaultCategories.DONE && <button name={DefaultCategories.DONE} onClick={ onClick}>Done</button> }
                    {customCategories?.map(customCategory => category !== customCategory && <button name={customCategory} onClick={onClick}>{customCategory}</button>) }
                </ButtonPanel>
        </ToDoPanel>;
}

export default ToDo;