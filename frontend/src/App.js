import React, { useEffect, useState } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Cart from './components/Cart'; // Ensure you have this component in the specified path

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [categoryId, setCategoryId] = useState(null); // Declare categoryId here
  const history = useHistory(); // Get the useHistory hook

  const CounterI = (productId) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    ));
  }; 
  
  const CounterD = (productId) => {
    setProducts(products.map(product => 
      product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
    ));
  };

const addToCart = (selectedProduct) => {
  setCart(currentCart => {
    // Find if the product is already in the cart
    const cartItemIndex = currentCart.findIndex(item => item.id === selectedProduct.id);
    
    if (cartItemIndex !== -1) {
      // Product found in cart, update quantity
      return currentCart.map((item, index) => 
        index === cartItemIndex ? { ...item, quantity: item.quantity + selectedProduct.quantity } : item
      );
    } else {
      // Product not in cart, add it
      return [...currentCart, selectedProduct];
    }
  });
  toast.success(`${selectedProduct.name} added to cart!`);
};

const goToCart = () => {
  history.push('/cart');
};

const removeFromCart = (productId) => {
  setCart(currentCart => currentCart.filter(item => item.id !== productId));
  toast.error(`Item removed from cart!`);
};

const filterProductsByCategory = (categoryId) => {
  fetch(`http://localhost:8000/api/products/?category_id=${categoryId}`)
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      setCategoryId(categoryId);
    });
};

useEffect(() => {
  fetch('http://localhost:8000/products/products/')
    .then(response => response.json())
    .then(data => {
      const productsWithQuantity = data.map(product => ({ ...product, quantity: 1 }));
      setProducts(productsWithQuantity);
    });
}, []);

useEffect(() => {
  fetch('http://localhost:8000/products/categories/')
    .then(response => response.json())
    .then(data => {
      console.log("Fetched categories:", data); // Log fetched categories
      setCategories(data);
    });
}, []);

useEffect(() => {
  const categoryQuery = categoryId ? `?category_id=${categoryId}` : '';
  fetch(`http://localhost:8000/api/products/${categoryQuery}`)
    .then(response => response.json())
    .then(data => {
      const productsWithQuantity = data.map(product => ({
        ...product,
        quantity: product.quantity || 1 // Ensure quantity is initialized correctly
      }));
      setProducts(productsWithQuantity);
    });
}, [categoryId]); // Re-fetch when categoryId changes

return (
  <Router>
    <div className="App">
      <ToastContainer />
      <nav>
        <div className="nav-content"> 
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Logo" className="logo"/>
          <div className="cart-icon" onClick={goToCart}>
            🛒 <span className="cart-count">{cart.length}</span>
          </div>
        </div>
      </nav>
      <div className="container">
        <aside className="sidebar">
            <ul>
              {categories.map(category => (
                <li key={category.id} onClick={() => filterProductsByCategory(category.id)}>
                <img src={category.image} alt={category.name} style={{ width: '50px', marginRight: '10px' }} />
                {category.name}
                </li>
              ))}
            </ul>
        </aside>
        <main className="content">
          <Switch>
            <Route path="/" exact>
              <header className="App-header">
                <h1>Προιόντα</h1>
                <div className="product-grid">
                  {Array.isArray(products) && products.map(product => (
                    <div className="product-item" key={product.id}>
                      <h2 className="product-name">{product.name}</h2>
                      {product.image && <img src={product.image} alt={product.name} className="product-image" />}
                      <p className="product-description">{product.description}</p>
                      <div className="product-amount d-flex">
                        <button onClick={() => CounterD(product.id)} className="btn fs-3 bg-light text-dark me-2 d-flex align-items-center justify-content-center">-</button>
                        <div className="value text-dark d-flex align-items-center justify-content-center fw-bold">{product.quantity}</div>
                        <button onClick={() => CounterI(product.id)} className="btn fs-3 bg-light text-dark ms-2 d-flex align-items-center justify-content-center">+</button>
                    </div>
                      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                  ))}
                </div>
              </header>
            </Route>
            <Route path="/cart">
              <Cart cartItems={cart} removeFromCart={removeFromCart}/>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  </Router>
);

}

export default App;
