import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { BiIdCard } from 'react-icons/bi';
import Photo from './Icya.PNG';
import { Store } from '../Store';
import { Row } from 'react-bootstrap';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          {product && product.category === 'Indangamuntu' ? (
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
