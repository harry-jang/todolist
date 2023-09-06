
import {  useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import {DefaultCategories, categories, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import AddCustomCategory from "./AddCustomCategory";

function ToDoList() {
    const toDos  = useRecoilValue(toDoSelector);
    const [category , setCategory] = useRecoilState(categoryState)
    const customCategories = useRecoilValue(categories)
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    }
    console.log("ToDoList - custom:", customCategories);

    return <div>
            <h1>ToDos</h1>
            <hr/>
            <AddCustomCategory />
            <select value={category} onInput={onInput}>
                <option value={DefaultCategories.TO_DO}>To Do</option>
                <option value={DefaultCategories.DOING}>Doing</option>
                <option value={DefaultCategories.DONE}>Done</option>
                {customCategories?.map(customCategory =>
                    <option value={customCategory}>{customCategory}</option>
                )}
            </select>
            <CreateToDo />
            {toDos?.map(toDo => <ToDo key={toDo.id} {...toDo}/>)}
        </div>;
}

export default ToDoList;