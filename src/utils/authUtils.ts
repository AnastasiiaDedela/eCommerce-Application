import { AxiosResponse } from 'axios'
import { commercetoolsConfig } from '../commercetoolsConfig'
import apiClient from '../api/axios'
import { useNavigate } from 'react-router-dom'

interface AuthResponseData {
  token: string
  user: string
}

export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<AuthResponseData> = await apiClient.post(`/${commercetoolsConfig.projectKey}/login`, {
      email,
      password,
    })

    if (response.status === 200) {
      const navigate = useNavigate()
      navigate('/')
      const token = response.data.token
      const user = response.data.user
      console.log('результат', token, user)
      // Сохранение токена и данных пользователя в состоянии/хранилище//.

      return true
    } else {
      return false
    }
  } catch (error) {
    throw error
  }
}
interface Address {
  streetName: string
  city: string
  postalCode: string
  country: string
  state: string
}
interface CustomerData {
  firstName: string
  lastName: string
  email: string
  password: string
  addresses: Address[]
  defaultShippingAddress?: number
  defaultBillingAddress?: number
  shippingAddresses: number[] // Добавляем опциональное поле для индекса
  billingAddresses: number[]
}

interface CustomerResponseData {
  id: string
  email: string
}

export const registerUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  addresses: Address[],
  shippingDefault: boolean,
  billingDefault: boolean
): Promise<CustomerResponseData> => {
  const apiUrl = `/${commercetoolsConfig.projectKey}/customers`

  const requestData: CustomerData = {
    firstName,
    lastName,
    email,
    password,
    addresses,
    shippingAddresses: [0], // Устанавливаем индекс адреса как шипинг адрес
    billingAddresses: [1],
  }
  if (shippingDefault) {
    requestData.defaultShippingAddress = 0 // Указываем индекс адреса доставки как 0
  }
  if (billingDefault) {
    requestData.defaultBillingAddress = 1 // Указываем индекс адреса платежа как 0
  }

  try {
    const response: AxiosResponse<CustomerResponseData> = await apiClient.post(apiUrl, requestData)
    return response.data
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
    throw error
  }
}
