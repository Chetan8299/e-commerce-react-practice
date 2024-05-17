import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import axios from "../utils/axios";

const Home = () => {
    const [products] = useContext(ProductContext);
    const { search } = useLocation();
    const category = decodeURIComponent(search.split("=")[1]);
    const [filteredProducts, setFilteredProducts] = useState(null);

    const getProductsCategory = async () => {
        try {
            const { data } = await axios.get(`/products/category/${category}`);
            setFilteredProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (category != "undefined") {
            // getProductsCategory();
            setFilteredProducts(products.filter((p) => p.category == category));
        } else if (category == "undefined" || !filteredProducts)
            setFilteredProducts(products);
    }, [category, products]);
    return products ? (
        <>
            <Nav />
            <div className="h-full w-[85%] p-5 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto">
                {filteredProducts &&
                    filteredProducts.map((p) => {
                        return (
                            <Link
                                key={p.id}
                                to={`/details/${p.id}`}
                                className="card mr-3 mb-3 p-5 border shadow rounded w-[18%] h-[40vh] flex justify-center items-center flex-col"
                            >
                                <div
                                    className="hover:scale-110 h-[80%] w-full bg-contain bg-no-repeat bg-center mb-3"
                                    style={{
                                        backgroundImage: `url(${p.image})`,
                                    }}
                                ></div>
                                <h1 className="hover:text-blue-300 h-[20%]">
                                    {p.title.length > 35
                                        ? p.title.substring(0, 35) + "..."
                                        : p.title}
                                </h1>
                            </Link>
                        );
                    })}
            </div>
        </>
    ) : (
        <Loading />
    );
};

export default Home;
