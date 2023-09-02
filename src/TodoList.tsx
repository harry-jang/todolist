import { useForm } from "react-hook-form";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const emailValidator = {
    required : {
        value : true,
        message : "이메일은 반드시 작성해야 합니다."
    }
}

function ToDoList() {
    const { register, watch, handleSubmit, formState } = useForm();
    console.log(watch());
    const onValid = (data:any) => {
        console.log("sumbit :", data);
    };

    console.log(formState.errors);

    return <div>
             <Form onSubmit={handleSubmit(onValid)}>
                 <input {...register("Email", emailValidator)} placeholder="Email" />
                 <input {...register("firstName", {required: true})} placeholder="First Name" />
                 <input {...register("lastName", {required: true})} placeholder="Last Name" />
                 <input {...register("username", {required: true, minLength:10})} placeholder="Username" />
                 <input {...register("password", {required: true, minLength:8, maxLength:20})} placeholder="Password" />
                 <input {...register("password1", {required: true, minLength:8, maxLength:20})} placeholder="Password1" />
                 <button>Add</button>
             </Form>
        </div>;
}

export default ToDoList;