import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");

    const AddProductHandler = (e) => {
        e.preventDefault();

        if (
            title.trim() < 5 ||
            image.trim() < 5 ||
            category.trim().length < 5 ||
            price.trim().length < 1 ||
            description.trim().length < 5
        ) {
            alert("Every field must have atleast 5 characters");
            return;
        }
        const product = {
            id: nanoid(),
            title,
            image,
            category,
            price,
            description,
        };
        setProducts([...products, product]);
        localStorage.setItem("products", JSON.stringify([...products, product]));
        navigate("/");
        toast.success("Added Product Successfully");
    };
    return (
        <form
            onSubmit={AddProductHandler}
            className="flex flex-col items-center p-[5%] w-screen h-screen"
        >
            <h1 className="mb-5 text-3xl w-1/2">Add new Product</h1>
            <input
                type="url"
                placeholder="image link"
                className="mb-3 text-base bg-zinc-100 rounded p-3 w-1/2"
                onChange={(e) => setImage(e.target.value)}
                value={image}
            />
            <input
                type="text"
                placeholder="title"
                className="mb-3 text-base bg-zinc-100 rounded p-3 w-1/2"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            <div className="w-1/2 flex justify-between">
                <input
                    type="text"
                    placeholder="category"
                    className="mb-3 text-base bg-zinc-100 rounded p-3 w-[49%]"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                />
                <input
                    type="number"
                    placeholder="price"
                    className="mb-3 text-base bg-zinc-100 rounded p-3 w-[49%]"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />
            </div>
            <textarea
                placeholder="Enter Product Description Here..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="text-base bg-zinc-100 rounded p-3 w-1/2 mb-3"
                rows="10"
            ></textarea>
            <div className="w-1/2">
                <button
                    className="py-2 px-5 border rounded border-blue-200 text-blue-300"
                    href="/create"
                >
                    Add new Product
                </button>
            </div>
        </form>
    );
};

export default Create;
