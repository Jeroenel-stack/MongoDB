import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../../services/productService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loading from '../../components/Loading';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll({ search: searchTerm });
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productService.delete(id);
        fetchProducts();
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="product-list">
      <div className="page-header">
        <h1>Products</h1>
        <Button onClick={() => navigate('/products/new')}>
          Add New Product
        </Button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchProducts()}
        />
        <Button onClick={fetchProducts}>Search</Button>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Card key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <p className="product-sku">SKU: {product.sku}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-quantity">
              Stock: <span className={product.quantity < 10 ? 'low-stock' : ''}>
                {product.quantity}
              </span>
            </p>
            <div className="product-actions">
              <Button
                variant="secondary"
                onClick={() => navigate(`/products/${product._id}`)}
              >
                View
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`/products/${product._id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <p className="no-data">No products found</p>
      )}
    </div>
  );
};

export default ProductList;