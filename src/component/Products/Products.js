import React, {useEffect, useState} from "react";
import axios from "axios";
import {getTokenFromLocalStorage} from "../utility/utils";
import ProductsService from "../../service/ProductsService";
import {useAuthContext} from "../../hooks/useAuthContext";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [loggedIn, setLoggedIn] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        const setAuthTokenHeader = async(token) =>{
            if (token.length > 1) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
            else
                delete axios.defaults.headers.common["Authorization"];
        }

        const fetchData = async () =>{
            setLoading(true);
            try {
                const {data: response} = await ProductsService.getProducts();
                console.log("dohvatio products: " + JSON.stringify(response));
                setProducts(response);
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        getTokenFromLocalStorage().then((token) => {
            if (token && token.length > 1) {
                setLoggedIn(true);
                setAuthTokenHeader(token);
                fetchData();
                setLoading(false);
            } else {
                setLoggedIn(false);
                setLoading(false);
            }
        });
    }, []);
    return (
        <div>
            <h1 className = "text-center">Products</h1>
            {loading && <div>Loading</div>}
            {!loading && (
                <table className = "table table-striped">
                    <thead>
                    <tr>

                        <td> Title </td>
                        <td> Description </td>
                        <td> Sale status </td>
                        <td> Category </td>
                        <td> Price </td>
                        <td> Created by </td>
                        <td> Time created </td>
                        <td> Location </td>
                        <td> Owned Status </td>
                        <td> View count </td>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        products.map(
                            product =>
                                <tr key = {product.id}>
                                    <td> {product.title} </td>
                                    <td> {product.description} </td>
                                    <td> {product.saleStatus} </td>
                                    <td> {product.category} </td>
                                    <td> {product.price} </td>
                                    <td> {product.createdBy} </td>
                                    <td> {product.createdAt} </td>
                                    <td> {product.location} </td>
                                    <td> {product.ownedStatus} </td>
                                    <td> {product.viewCount} </td>
                                </tr>
                        )
                    }

                    </tbody>
                </table>
            )}
            {!user && <div>Please log in to see content!</div>}

        </div>

    )
}

export default Products;
