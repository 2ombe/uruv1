import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import Photo from './Icya.PNG';
import { Store } from '../Store';
import { Row } from 'react-bootstrap';

function Product(props) {
  const { product } = props;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Taken by owner');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
    navigate('/cart');
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          {product &&
          (product.category === 'Indangamuntu' ||
            product.category === 'Uruhushya rwo gutwara' ||
            product.category === 'Passport' ||
            product.category === "Icyangombwa cy'ubutakaka") ? (
            <Link to={`/product/${product.slug}`}>
              <img
                className="img-large"
                style={{ width: '150px' }}
                src={Photo}
                alt={product.name}
              />
            </Link>
          ) : (
            <Link to={`/product/${product.slug}`}>
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
              />
            </Link>
          )}
        </Row>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.category}</Card.Title>
        </Link>

        <Card.Text>RWF{product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Nyirabyo yabonetse
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>Kurikirana</Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default Product;
