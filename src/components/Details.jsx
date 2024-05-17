import axios from "../utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";

const Details = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);
    const [product, setproduct] = useState(null);
    const { id } = useParams();

    // const getSingleProduct = async (id) => {
    //     try {
    //         const { data } = await axios.get(`/products/${id}`);
    //         setproduct(data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    useEffect(() => {
        if (!product) {
            setproduct(products.filter((p) => p.id == id)[0]);
        }
        // getSingleProduct(id);
    }, []);

    const ProductDeleteHandler = (id) => {
        const FilteredProduct = products.filter((p) => p.id != id);
        setProducts(FilteredProduct);
        localStorage.setItem("products", JSON.stringify(FilteredProduct));
        navigate("/");
    };

    return product ? (
        <div className="w-[70%] h-full m-auto p-[10%] flex justify-center items-center gap-10">
            <img
                className="object-contain h-[80%] w-[40%] "
                src={`${product.image}`}
                alt=""
            />

            <div className="content w-[50%]">
                <h1 className="text-4xl">{product.title}</h1>
                <h3 className="text-zinc-400 my-5">{product.category}</h3>
                <h2 className="text-red-300 mb-3">$ {product.price}</h2>
                <p className="mb-5">{product.description}</p>
                <Link to={`/edit/${product.id}`} className="mr-5 py-2 px-5 border rounded border-blue-200 text-blue-300">
                    Edit
                </Link>
                <button
                    onClick={() => ProductDeleteHandler(product.id)}
                    className="py-2 px-5 border rounded border-red-200 text-red-300"
                >
                    Delete
                </button>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default Details;
