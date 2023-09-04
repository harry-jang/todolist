import { useForm } from "react-hook-form";
import styled from "styled-components";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface IForm {
    toDo : string;
}

interface ITodo {
    text:string;
    id: number;
    category:"TO_DO" | "DOING" |"DONE";
}

const toDoState = atom<ITodo[]>({
    key:"toDo",
    default:[],
})

function ToDoList() {
    const [toDos, setTodos] = useRecoilState(toDoState);

    const { register, handleSubmit, setValue } = useForm<IForm>();
    
    const handleValid = ({toDo}:IForm) => {
        setTodos( (oldToDos) => [{ text: toDo, id:Date.now(),category:"TO_DO"}, ...oldToDos,]);
        setValue("toDo", "");
    };
    console.log(toDos);

    return <div>
            <h1>ToDos</h1>
            <hr/>
            <form onSubmit={handleSubmit(handleValid)}>
                <input {...register("toDo", {
                    required: "Please write a To Do",
                })} placeholder="Write a to do" />
                <button>Add</button>
            </form>
             <ul>
                {toDos.map(toDo => <li key={toDo.id}>{toDo.text}</li>)}
             </ul>
        </div>;
}

export default ToDoList;