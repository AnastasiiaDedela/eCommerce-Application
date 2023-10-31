import '../index.css'
import React, { useState, useEffect, CSSProperties } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { observer } from 'mobx-react-lite'
import CategoryList from '../components/CategoriesList'
import { Category } from '../types/interfaces'
import { fetchCategoriesWithHierarchy } from '../utils/commercetoolsApi'
import { Container, Grid, Paper, Typography, Divider, useTheme } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'
import { useRootStore } from '../App'
import Breadcrumb from '../components/Breadcrumb'

function CategoriesPage() {
  const theme = useTheme()
  const [categories, setCategories] = useState<Category[]>([])
  const { catalogStore } = useRootStore()

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { subCategories } = await fetchCategoriesWithHierarchy()
        setCategories(subCategories)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    catalogStore.fetchProducts()
  }, [])

  interface CategoryPaperStyle extends CSSProperties {
    '&:hover': {
      position: string
      left: string
      boxShadow: string
      border: string
    }
  }

  const categoryPaperStyle: CategoryPaperStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '370px',
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
    },
  }

  const backButtonStyle: React.CSSProperties = {
    marginTop: '30px',
    paddingLeft: '25px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#555',
    marginBottom: '1rem',
  }
  const pageStyle: React.CSSProperties = {
    background: 'white',
    minHeight: 'calc(100vh - 70px - 64px)',
    paddingTop: '10px',
  }

  const categoryLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    marginTop: '60px',
    marginLeft: '100px',
    textDecorationLine: 'underline',
    display: 'block',
    color: theme.palette.text.primary,
  }
  const dividerStyle: React.CSSProperties = {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
  const backButtonIconStyle: React.CSSProperties = {
    marginRight: '0.5rem',
  }

  return (
    <div>
      <Header subcategories={[]} />
      <div style={pageStyle}>
        <Breadcrumb categories={[]} isSearchPage={false} />
        <Link to="/" style={backButtonStyle}>
          <ArrowBackIcon style={backButtonIconStyle} /> Back to main page
        </Link>
        <Divider sx={dividerStyle} />
        <Link to="/catalog" style={categoryLinkStyle}>
          <Typography variant="body1">View All Products</Typography>
        </Link>
        <Container style={{ marginTop: '22px' }}>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item key={category.id} xs={12} sm={6} md={4} lg={4}>
                <Paper elevation={3} style={categoryPaperStyle}>
                  <CategoryList categories={[category]} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
        <div style={{ minHeight: 'calc(100vh - 70px - 64px)', marginTop: '64px' }} className="content"></div>
        <Footer />
      </div>
    </div>
  )
}

export default observer(CategoriesPage)
