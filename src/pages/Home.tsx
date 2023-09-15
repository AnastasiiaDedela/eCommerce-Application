import { observer } from 'mobx-react'
import '../index.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import backgroundImageDesktop from '../images/1671769944_kalix-club-p-fon-domashnie.jpg'
import backgroundImageMobile from '../images/1671769944_kalix-club-p-fon-domashnie.jpg'
import SecondHeader from '../components/SecondHeader'
import HomeButton from '../components/HomeButtons'
import AdaptiveButton from '../components/AdaptiveButton'

function Home() {
  const backgroundStyle = {
    minHeight: 'calc(150vh - 70px - 64px)',
    marginTop: '-5px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }

  const desktopBackgroundStyle = {
    ...backgroundStyle,
    backgroundImage: `url(${backgroundImageDesktop})`,
  }

  const mobileBackgroundStyle = {
    ...backgroundStyle,
    backgroundImage: `url(${backgroundImageMobile})`,
  }

  const isMobile = window.matchMedia('(max-width: 768px)').matches

  return (
    <div>
      <Header subcategories={[]} />
      <SecondHeader />
      <HomeButton />
      <AdaptiveButton />
      <div style={isMobile ? mobileBackgroundStyle : desktopBackgroundStyle} className="content"></div>
      <Footer />
    </div>
  )
}

export default observer(Home)
