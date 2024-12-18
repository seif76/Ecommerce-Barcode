import axios from "axios";

// Base URL for your backend API (replace with your backend URL)
const API_BASE_URL = "http://192.168.1.11:8081/api/products";
//http://localhost:8081/api/products/

// Function to get product details by barcode
export const getProductByBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${barcode}`,{
    headers: {
        "Content-Type": "application/json", // Ensures JSON communication
        "Accept": "application/json", // Ensures the server sends JSON responses
        
      },
     
      timeout: 10000, // Optional timeout (10 seconds)
      
    });
    console.log(response.status);

    return response.data; // Return the product details
  } catch (error) {
    console.log("Error fetching product by barcode:", error);
    if (error.response.status === 404) {
        console.log("Product not found (404).");
    }else{
    throw error; // Re-throw the error to handle it in your component
    }  
}
};

// Other APIs you might need
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/addProduct`, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getAllProducts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

export const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };
