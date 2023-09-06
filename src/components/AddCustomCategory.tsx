import {useForm} from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { categories } from "../atoms";


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


    return <form onSubmit={handleSubmit(handleValid)}>
    <input {...register("newCategory", {
        required: "Please Add a Category",
    })} placeholder="Add a Category" />
    <button>Add</button>
</form>;

}

export default AddCustomCategory;