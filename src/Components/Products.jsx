import { useEffect,useState } from "react";
import Product from "./Product";

const Products = () => {
    const [products, setproducts] = useState([]);

    useEffect(async ()=>{
        const res=await fetch("../../data/db.json")
        const data=await res.json()
        
        setproducts(data["honey"])

    },[setproducts])



    return ( <div>
        {products && products.map(product =>    <Product title={product.title} description={product.description} weight={product.weight} price={product.price} key={product.id} /> ) }
    </div> );
}
 
export default Products;