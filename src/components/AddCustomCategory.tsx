import {useForm} from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categories } from "../atoms";
import { styled } from "styled-components";

const AddCategoryForm = styled.form`
    display: flex;
    align-items: center;
    input {
        flex-grow: 1;
        padding: 5px;
        border: none;
        border-top-left-radius: 15px; 
        border-bottom-left-radius: 15px;
    }
    button {
        border: none;
        background-color: ${(props) => props.theme.textColor};
         
        color: #fff;
        padding: 5px 10px; 
        cursor: pointer;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        &:hover {
            background-color: ${(props) => props.theme.accentColor};
        }
    }
`;

interface IAddCategoryForm {
    newCategory : string;
}

function AddCustomCategory() {
    const [customCategories, setCategories] = useRecoilState(categories);

    const {register, handleSubmit, setValue} = useForm<IAddCategoryForm>();
    const handleValid = ({newCategory}:IAddCategoryForm) => {
        setCategories((prev) => {
            return [
                ...prev, newCategory,
            ];
        });
        setValue('newCategory', '');
    };

    console.log("AddCustomCategory - custom:", customCategories);


    return <AddCategoryForm onSubmit={handleSubmit(handleValid)}>
    <input {...register("newCategory", {
        required: "Please Add a Category",
    })} placeholder="Add a Category" />
    <button>Add</button>
</AddCategoryForm>;

}

export default AddCustomCategory;