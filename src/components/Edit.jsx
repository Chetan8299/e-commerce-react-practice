import { nanoid } from "nanoid";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const [products, setProducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        title: "",
        image: "",
        category: "",
        price: null,
        description: "",
    });

    const ChangeHandler = (e) => {
        // console.log(e.target.name, e.target.value);
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        setProduct(products.filter((p) => p.id == id)[0]);
    }, [id]);

    const AddProductHandler = (e) => {
        e.preventDefault();

        if (
            product.title.trim() < 5 ||
            product.image.trim() < 5 ||
            product.category.trim().length < 5 ||
            product.price.toString().trim().length < 1 ||
            product.description.trim().length < 5
        ) {
            alert("Every field must have atleast 5 characters");
            return;
        }
        const pi = products.findIndex((p) => p.id == id);
        const copyData = [...products];
        copyData[pi] = { ...products[pi], ...product };
        setProducts(copyData);

        localStorage.setItem("products", JSON.stringify(copyData));
        navigate(-1);
    };
    return (
        <form
            onSubmit={AddProductHandler}
            className="flex flex-col items-center p-[5%] w-screen h-screen"
        >
            <h1 className="mb-5 text-3xl w-1/2">Edit Product</h1>
            <input
                type="url"
                placeholder="image link"
                className="mb-3 text-base bg-zinc-100 rounded p-3 w-1/2"
                name="image"
                onChange={ChangeHandler}
                value={product && product.image}
            />
            <input
                type="text"
                placeholder="title"
                className="mb-3 text-base bg-zinc-100 rounded p-3 w-1/2"
                name="title"
                onChange={ChangeHandler}
                value={product && product.title}
            />
            <div className="w-1/2 flex justify-between">
                <input
                    type="text"
                    placeholder="category"
                    className="mb-3 text-base bg-zinc-100 rounded p-3 w-[49%]"
                    name="category"
                    onChange={ChangeHandler}
                    value={product && product.category}
                />
                <input
                    type="number"
                    placeholder="price"
                    className="mb-3 text-base bg-zinc-100 rounded p-3 w-[49%]"
                    name="price"
                    onChange={ChangeHandler}
                    value={product && product.price}
                />
            </div>
            <textarea
                placeholder="Enter Product Description Here..."
                name="decription"
                onChange={ChangeHandler}
                value={product && product.description}
                className="text-base bg-zinc-100 rounded p-3 w-1/2 mb-3"
                rows="10"
            ></textarea>
            <div className="w-1/2">
                <button
                    className="py-2 px-5 border rounded border-blue-200 text-blue-300"
                    href="/create"
                >
                    Edit Product
                </button>
            </div>
        </form>
    );
};

export default Edit;
