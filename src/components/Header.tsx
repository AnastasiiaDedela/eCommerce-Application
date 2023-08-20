import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PetsIcon from '@mui/icons-material/Pets'
import React, { useState } from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useRootStore } from '../App'

const Header: React.FC = () => {
  const rootStore = useRootStore()
  const { authStore } = rootStore
  const [isLoggedIn, setIsLoggedIn] = useState(authStore.isAuthenticated)
  const navigate = useNavigate()

  const handleLogin = () => {
    authStore.isAuthenticated = true
    setIsLoggedIn(true)
    navigate('/login')
    const authData = JSON.parse(localStorage.getItem('authData')!)
    authStore.login(authData.accessToken)
  }
  const handleLogout = () => {
    authStore.logout()
    setIsLoggedIn(false)
    navigate('/')
  }

  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, width: '100%' }}>
      <Toolbar>
        <PetsIcon sx={{ fontSize: 32, marginRight: 10 }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Animal Kingdom Market
        </Typography>
        {!isLoggedIn && (
          <Button color="inherit" component={Link} to="/registrations">
            Регистрация
          </Button>
        )}
        {isLoggedIn ? (
          <>
            <Button color="inherit" onClick={handleLogout}>
              Выход
            </Button>
            <Button color="inherit" startIcon={<ShoppingCartIcon />}>
              Корзина
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Вход
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
