import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ProductType } from '../models/ProductType';
import { Product } from '../models/Product';
import { useParams } from 'react-router-dom';

const Products = () => {
  const [listOfProduct, setProducts] = useState<Product[]>([]);

  let params = useParams();
  let productType = params.type;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('http://localhost:3001/get-products-by-category?productType=' + productType);
        const products = response.data.map(item => new Product(productType as ProductType, item.title, item.imageUrl, item.basePrice));
        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [params.type]);

  return (
    <div className="content-container">
      <h2>{productType}</h2>
      <div className='product-item-container'>
        {listOfProduct.map((product, index) => (
          <div className='product-item' key={index}>
            <img src={product.imageUrl} alt={product.title} style={{ width: '100px', height: '100px' }} />
            <h3>{product.title}</h3>
            <p>Price: ${product.getPrice()}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Products;
