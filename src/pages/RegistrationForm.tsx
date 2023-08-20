import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { registerUser } from '../utils/authUtils'
import isoCountries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
// Регистрируем локализацию для английского языка

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [shippingAddress, setShippingAddress] = useState<Address>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    state: '',
  })

  const [billingAddress, setBillingAddress] = useState<Address>({
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
    state: '',
  })
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(false)
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false)
  interface Address {
    streetName: string
    city: string
    postalCode: string
    country: string
    state: string
  }

  isoCountries.registerLocale(enLocale)
  const handleShippingDefaultChange = () => {
    setIsDefaultShippingAddress(!isDefaultShippingAddress) // Инвертируем значение
  }

  // Обработчик для чекбокса адреса платежа
  const handleBillingDefaultChange = () => {
    setIsDefaultBillingAddress(!isDefaultBillingAddress) // Инвертируем значение
  }
  const handleRegistration = async () => {
    try {
      const shippingCountryCode = isoCountries.getAlpha2Code(shippingAddress.country, 'en')
      const billingCountryCode = isoCountries.getAlpha2Code(billingAddress.country, 'en')

      if (shippingCountryCode && billingCountryCode) {
        const isRegistered = await registerUser(
          firstName,
          lastName,
          login,
          password,
          [
            {
              ...shippingAddress,
              country: shippingCountryCode, // Заменяем название страны на код
            },
            {
              ...billingAddress,
              country: billingCountryCode, // Заменяем название страны на код
            },
          ],
          isDefaultShippingAddress,
          isDefaultBillingAddress
        )

        if (isRegistered) {
          navigate('/')
        } else {
          setError('Произошла ошибка при регистрации.')
        }
      } else {
        setError('Неверное название страны.')
      }
    } catch (error) {
      setError('Произошла ошибка при регистрации.')
    }
  }

  return (
    <div>
      <h2>Регистрация нового пользователя</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label htmlFor="firstName">Имя:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="lastName">Фамилия:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="login">Логин:</label>
        <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="password">Пароль:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        {/* Форма для адреса доставки */}
        <h3>Адрес доставки</h3>
        <div>
          <label htmlFor="streetNameShipping">Улица для доставки:</label>
          <input
            type="text"
            id="streetNameShipping"
            value={shippingAddress.streetName}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                streetName: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="cityShipping">Город для доставки:</label>
          <input
            type="text"
            id="cityShipping"
            value={shippingAddress.city}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                city: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="postalCodeShipping">Почтовый индекс для доставки:</label>
          <input
            type="text"
            id="postalCodeShipping"
            value={shippingAddress.postalCode}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                postalCode: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="countryShipping">Страна для доставки:</label>
          <input
            type="text"
            id="countryShipping"
            value={shippingAddress.country}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                country: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="stateShipping">Область/штат для доставки:</label>
          <input
            type="text"
            id="stateShipping"
            value={shippingAddress.state}
            onChange={(e) =>
              setShippingAddress({
                ...shippingAddress,
                state: e.target.value,
              })
            }
            required
          />
        </div>
      </div>
      <div>
        <label>
          <input type="checkbox" checked={isDefaultShippingAddress} onChange={handleShippingDefaultChange} />
          Сделать адрес доставки дефолтным
        </label>
      </div>
      <div>
        {/* Форма для адреса платежа */}
        <h3>Адрес платежа</h3>
        <div>
          <label htmlFor="streetNameBilling">Улица для платежа:</label>
          <input
            type="text"
            id="streetNameBilling"
            value={billingAddress.streetName}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                streetName: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="cityBilling">Город для платежа:</label>
          <input
            type="text"
            id="cityBilling"
            value={billingAddress.city}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                city: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="postalCodeBilling">Почтовый индекс для платежа:</label>
          <input
            type="text"
            id="postalCodeBilling"
            value={billingAddress.postalCode}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                postalCode: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="countryBilling">Страна для платежа:</label>
          <input
            type="text"
            id="countryBilling"
            value={billingAddress.country}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                country: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="stateBilling">Область/штат для платежа:</label>
          <input
            type="text"
            id="stateBilling"
            value={billingAddress.state}
            onChange={(e) =>
              setBillingAddress({
                ...billingAddress,
                state: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label>
            <input type="checkbox" checked={isDefaultBillingAddress} onChange={handleBillingDefaultChange} />
            Сделать адрес платежа дефолтным
          </label>
        </div>
      </div>
      <div>
        <button type="button" onClick={handleRegistration}>
          Зарегистрироваться
        </button>
      </div>
      <div>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>
    </div>
  )
}

export default observer(RegistrationPage)
