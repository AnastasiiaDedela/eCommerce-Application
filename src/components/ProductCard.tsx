import React, { useEffect, useState } from 'react'
import '../index.css'
import { Product } from '../types/interfaces'
import { Card, CardContent, CardMedia, Typography, Button, Link as MuiLink, Box, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'
import { observer } from 'mobx-react-lite'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import DeleteIcon from '@mui/icons-material/Delete'

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate()
  const currentLocale = 'en-US'
  const { catalogStore, cartStore, headerStore } = useRootStore()
  const [selectedImageIndex] = useState(0)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [catalogStore])

  const handleViewDetails = async () => {
    await catalogStore.getProductById(product.id)
    navigate(`/product/${product.id}`, { state: { productDiscount: product.discount } })
  }

  const handleAddToCart = async (productId: string) => {
    if (!isAddedToCart) {
      const cartItem = JSON.parse(localStorage.getItem('cartItem')!)
      await cartStore.createCart()
      cartStore.addToCart(productId)
      setIsAddedToCart(true)
      if (cartItem === null || !cartItem.some((item: { productId: string }) => item.productId === productId)) {
        headerStore.setCartCount(headerStore.cartCount + 1)
      }
    }
  }

  const handleRemoveFromCart = async (productId: string) => {
    await cartStore.removeFromCart(productId)
    headerStore.decrementCartCount()
    setIsAddedToCart(false)
  }

  const iconStyle = {
    border: '1px solid grey',
    borderRadius: '50%',
    padding: '10px',
    marginLeft: '20px',
    '&:hover': {
      backgroundColor: '#555',
      position: 'absolute',
      boxShadow: '0 2px 60px #0000003d',
      border: '1px solid #eaeaea',
    },
  }

  const mediaStyle: React.CSSProperties = {
    width: '40%',
    alignSelf: 'center',
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', position: 'relative' }}>
      <Card
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          width: '300px',
          height: '400px',
          margin: '0 auto',
          padding: '15px',
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #eaeaea',
          overflow: 'hidden',
          transition: 'all .5s ease',
          '&:hover': {
            position: 'absolute',
            left: '9%',
            boxShadow: '0 2px 60px #0000003d',
            border: '1px solid #eaeaea',
            zIndex: '10000',
            overflow: 'auto',
            overflowY: 'hidden',
            height: 'auto',
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardMedia component="div" sx={mediaStyle}>
          <Carousel selectedItem={selectedImageIndex} showThumbs={false} dynamicHeight>
            {product.imageUrl &&
              product.imageUrl.map((imageUrl, index) => (
                <div key={index}>
                  <img src={imageUrl} alt={`Product Image ${index}`} className="product" />
                </div>
              ))}
          </Carousel>
        </CardMedia>
        <CardContent sx={{ padding: '1rem', textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={'bold'} fontSize={'15px'}>
            {product.name[currentLocale]}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ marginTop: '0.5rem' }}>
            <Typography variant="body2" fontSize="12px" fontWeight={'bold'}>
              Price:{' '}
            </Typography>
            {product.discount === null ? (
              <Typography variant="body2" fontSize="12px">
                {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD{' '}
                <IconButton
                  color="inherit"
                  style={iconStyle}
                  onClick={() => handleAddToCart(product.id)}
                  disabled={isAddedToCart}
                >
                  <ShoppingCartIcon sx={{ color: '#333' }} />
                </IconButton>
                {isAddedToCart && (
                  <IconButton color="error" style={iconStyle} onClick={() => handleRemoveFromCart(product.id)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </Typography>
            ) : (
              <>
                <Typography variant="body2" fontSize="12px" className="text-decoration">
                  {product.price.map((price) => (price / 100).toFixed(2)).join(', ')} USD
                </Typography>
                <Typography variant="body2" fontSize="12px" color={'red'} marginLeft={'5px'}>
                  {product.discount !== null ? (product.discount! / 100).toFixed(2) : ''} USD{' '}
                  <IconButton
                    color="inherit"
                    style={iconStyle}
                    onClick={() => handleAddToCart(product.id)}
                    disabled={isAddedToCart}
                  >
                    <ShoppingCartIcon sx={{ color: '#333' }} />
                  </IconButton>
                  {isAddedToCart && (
                    <IconButton color="error" style={iconStyle} onClick={() => handleRemoveFromCart(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Typography>
              </>
            )}
          </Box>
          <MuiLink component={Button} color="primary" sx={{ margin: '0.9rem' }} onClick={handleViewDetails}>
            View Details
          </MuiLink>
          <Typography variant="body2" fontSize={'10px'}>
            {isHovered ? product.description[currentLocale] : `${product.description[currentLocale].slice(0, 70)}...`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default observer(ProductCard)
