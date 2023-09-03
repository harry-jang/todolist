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

const passwordValidator = {
    required: "패스워드를 입력해주세요.", 
    minLength: {
        value: 8,
        message: "패스워드가 너무 짧습니다.",
    },
    maxLength:{
        value:20,
        message: "패스워드가 너무 깁니다.",
    }
}

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string;
  }

function ToDoList() {
    const { register, watch, handleSubmit, formState:{errors}, setError } = useForm<IForm>({
        defaultValues: {
            email: "@naver.com"
        }
    });
    console.log(watch());
    const onValid = (data:IForm) => {
        if(data.password !== data.password1) {
            setError("password1", {message:"Password are not the same."}, { shouldFocus : true})
        }
        // setError("extraError", {message: "Server offline"});
    };

    return <div>
             <Form onSubmit={handleSubmit(onValid)}>
                 <input {...register("email", emailValidator)} placeholder="Email" />
                 <span>{errors?.email?.message}</span>
                 <input {...register("firstName", {required: "write here", validate: {
                        noNico : (value) => value.includes("nico")? "no nicos allowed" : true
                    }
                })} placeholder="First Name" />
                 <span>{errors?.firstName?.message}</span>
                 <input {...register("lastName", {required: "write here"})} placeholder="Last Name" />
                 <span>{errors?.lastName?.message}</span>
                 <input {...register("username", {required: "write here", minLength:5})} placeholder="Username" />
                 <span>{errors?.username?.message}</span>
                 <input {...register("password", passwordValidator)} placeholder="Password" />
                 <span>{errors?.password?.message}</span>
                 <input {...register("password1", {required: "패스워드를 입력해주세요.", minLength:8, maxLength:20})} placeholder="Password1" />
                 <span>{errors?.password1?.message}</span>
                 <button>Add</button>
                 <span>{errors?.extraError?.message}</span>
             </Form>
        </div>;
}

export default ToDoList;