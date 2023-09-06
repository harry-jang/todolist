
import {  useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {DefaultCategories, categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import AddCustomCategory from "./AddCustomCategory";
import { styled } from "styled-components";

const Container = styled.div`
    padding: 0px 20px;
    max-width : 720px;
    margin: 0 auto;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const ToDoListPanel = styled.ul`
    margin-top:20px;
`;

const CategoryPanel = styled.div`
    display: flex;
    justify-content: space-between;

    select {
        width: 200px;
        
    }
`;


function ToDoList() {
    const toDos  = useRecoilValue(toDoSelector);
    const [category , setCategory] = useRecoilState(categoryState)
    const customCategories = useRecoilValue(categories)
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    }
    console.log("ToDoList - custom:", customCategories);

    return <Container>
            <Title>ToDos</Title>
            <hr/>
            <CategoryPanel>
                <select value={category} onInput={onInput}>
                    <option value={DefaultCategories.TO_DO}>To Do</option>
                    <option value={DefaultCategories.DOING}>Doing</option>
                    <option value={DefaultCategories.DONE}>Done</option>
                    {customCategories?.map(customCategory =>
                        <option value={customCategory}>{customCategory}</option>
                    )}
                </select>
                <AddCustomCategory />
            </CategoryPanel>
            <CreateToDo />
            <ToDoListPanel>
                {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo}/>)}
            </ToDoListPanel>
        </Container>;
}

export default ToDoList;