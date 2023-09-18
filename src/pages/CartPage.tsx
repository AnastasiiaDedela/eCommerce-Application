import { observer } from 'mobx-react-lite'
import Header from '../components/Header'
import '../index.css'
import { useRootStore } from '../App'
import { Product, CartItem } from '../types/interfaces'
import { Container, Card, CardContent, CardActions, Typography, IconButton, Grid, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Carousel } from 'react-responsive-carousel'
import { Link } from 'react-router-dom'
import CartStore from '../stores/CartStore'
import { useState } from 'react'

const CartPage = ({ cartStore }: { cartStore: CartStore }) => {
  const { catalogStore } = useRootStore()
  const [promoCodeInput, setPromoCodeInput] = useState('')
  const items = localStorage.getItem('cartItem')!
  const cartItemsLocal: CartItem[] = JSON.parse(items)
  const DataPromoCode = localStorage.getItem('promoCode')
  const promoCode = JSON.parse(DataPromoCode!)
  const [activePromoCodes, setActivePromoCodes] = useState<string[]>(promoCode)
  console.log(setActivePromoCodes)
  const handleApplyPromoCode = () => {
    if (promoCodeInput && activePromoCodes.includes(promoCodeInput)) {
      cartStore.applyPromoCode(promoCodeInput)
      setPromoCodeInput('')
    } else {
      alert('Недействительный промокод')
    }
  }

  const calculateTotalPrice = () => {
    let total = 0
    cartItemsLocal.forEach((item) => {
      const product: Product | undefined = catalogStore.getProductById(item.productId)
      if (product) {
        total += (product.price[0] * item.quantity) / 100
      }
    })
    return total
  }
  const hasItemsInCart = cartItemsLocal!.some((item) => item !== null)

  const cartItems = cartItemsLocal.map((item) => {
    const product: Product | undefined = catalogStore.getProductById(item.productId)
    if (product) {
      return (
        <>
          <Card key={item.productId} className="cart-item">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <Carousel showThumbs={false} dynamicHeight>
                    {product.imageUrl.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index}`}
                        className="product-image"
                        style={{ width: '100%', maxWidth: '300px', height: '150px' }}
                      />
                    ))}
                  </Carousel>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Typography variant="h6" gutterBottom>
                    {product.name['en-US']}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Price per unit: ${(item.price / 100).toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Total Price: ${(item.totalPrice / 100).toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <IconButton aria-label="Remove" color="error" onClick={() => cartStore.removeFromCart(item.productId)}>
                <DeleteIcon />
              </IconButton>
              <IconButton
                aria-label="Increase Quantity"
                onClick={() => cartStore.updateCartItemQuantity(item.productId, item.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
              <IconButton
                aria-label="Decrease Quantity"
                onClick={() => cartStore.updateCartItemQuantity(item.productId, item.quantity - 1)}
              >
                <RemoveIcon />
              </IconButton>
            </CardActions>
          </Card>
        </>
      )
    } else {
      return null
    }
  })
  return (
    <Container>
      <Header subcategories={[]} />
      <Grid container spacing={2} className="cart-container">
        {cartItems}
      </Grid>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', alignItems: 'center' }}>
        <div style={{ padding: '20px 40px' }}>
          <Button variant="outlined" color="primary">
            <Link to="/catalog">CONTINUE SHOPPING</Link>
          </Button>
          <div>
            <input
              type="text"
              placeholder="Enter promotional code"
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              className="cart-input"
            />
            <button onClick={handleApplyPromoCode}>Apply</button>
          </div>
        </div>
        {hasItemsInCart && (
          <div className="cart-buttons">
            <div>Total Price: ${calculateTotalPrice().toFixed(2)}</div>
            <Button variant="contained" color="primary">
              Сheckout
            </Button>
          </div>
        )}
      </div>
      <div style={{ position: 'fixed', bottom: '0', left: '0', width: '100%' }}></div>
    </Container>
  )
}

export default observer(CartPage)
