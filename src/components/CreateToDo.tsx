import {useForm} from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { styled } from "styled-components";


const CreateForm = styled.form`
    margin-top : 20px;
    display: flex;
    align-items: center;
    input {
        flex-grow: 1;
        padding: 10px;
        border: none;
        border-top-left-radius: 15px; 
        border-bottom-left-radius: 15px;
    }
    button {
        border: none;
        background-color: ${(props) => props.theme.textColor};
         
        color: #fff;
        padding: 10px 20px; 
        cursor: pointer;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        &:hover {
            background-color: ${(props) => props.theme.accentColor};
        }
    }
`;

interface IForm {
    toDo : string;
}

function CreateToDo() {
    const setTodos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();
    const handleValid = ({toDo}:IForm) => {
        setTodos( (oldToDos) => [{ text: toDo, id:Date.now(),category}, ...oldToDos,]);
        setValue("toDo", "");
    };
    return <CreateForm onSubmit={handleSubmit(handleValid)}>
    <input {...register("toDo", {
        required: "Please write a To Do",
    })} placeholder="Write a to do" />
    <button>Add</button>
</CreateForm>;

}

export default CreateToDo;