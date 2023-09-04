import { useSetRecoilState } from "recoil";
import { ITodo, toDoState } from "../atoms";

function ToDo({text, category, id}: ITodo) {
    const setToDos = useSetRecoilState(toDoState);
    
    const onClick = (newCategory: ITodo["category"]) => {
        console.log("i wanna to ", newCategory);
    };

    return <li>
            <span>{text}</span> 
            {category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button> }
            {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>To Do</button> }
            {category !== "DONE" && <button onClick={() => onClick("DONE")}>Done</button> }
        </li>;
}

export default ToDo;