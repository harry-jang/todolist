import { error } from "console";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const emailValidator = {
    required : {
        value : true,
        message : "이메일은 반드시 작성해야 합니다.",
    },
    pattern : {
        value : /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        message : "이메일 형식이 유효하지 않습니다."
    }
}

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
  }

function ToDoList() {
    const { register, watch, handleSubmit, formState:{errors} } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    console.log(watch());
    const onValid = (data:IForm) => {
        console.log("sumbit :", data);
    };

    return <div>
             <Form onSubmit={handleSubmit(onValid)}>
                 <input {...register("email", emailValidator)} placeholder="Email" /><span>{errors?.email?.message}</span>
                 <input {...register("firstName", {required: "write here"})} placeholder="First Name" />
                 <input {...register("lastName", {required: "write here"})} placeholder="Last Name" />
                 <input {...register("username", {required: "write here", minLength:10})} placeholder="Username" />
                 <input {...register("password", {required: "write here", minLength:8, maxLength:20})} placeholder="Password" />
                 <input {...register("password1", {required: "Password is required", minLength:8, maxLength:20})} placeholder="Password1" />
                 <button>Add</button>
             </Form>
        </div>;
}

export default ToDoList;