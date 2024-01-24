import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom'

const ProductList=()=>{
    const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
    const[products,setProducts]=useState([]);
    const navigate=useNavigate();
    useEffect(() => {
    getProduct();
    }, []);
    const getProduct=async()=>{
        let result=await fetch("http://localhost:5000/products",{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        result=await result.json();
        setProducts(result);
    }

// const deleteproduct=async(id)=>{
//     console.warn(id);
//     let result= await fetch(`http://localhost:8000/product/${id}`,{
//         method:"Delete",
//         headers:{
//             authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
//         }
//     });
//     result=await result.json();
//     if(result){
//         getProduct();
//     }
    
// }
// const searchhandle = async (event) => {
    
//       let key = event.target.value;
//       if(key){
//         let result = await fetch(`http://localhost:8000/search/${key}`,{
//             headers:{
//                 authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
//             }
//         });
//         result = await result.json();
//         if (result) {
//           setProducts(result);
//         }
//       }
   
//       else{
//         getProduct();
//       }
  
//   };
  
return (
    <>
      <div className="product-list">
        <h3>Projects</h3>
        <input type="text" className="search" placeholder="Search product"></input>

        <div className="card-container">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item._id} className="card">
                <div className="card-content">
                  <h2 className="card-title">Title:{item.title}</h2>
                  <p className="card-description">Description:{item.description}</p>
                  <p className="card-description">Name:{item.name}</p>
                  <p className="card-description">Url:{item.url}</p>
                </div>
              </div>
            ))
          ) : (
            <h1>No results found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
