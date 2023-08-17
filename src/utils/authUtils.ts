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
  address: Address
): Promise<CustomerResponseData> => {
  const apiUrl = `/${commercetoolsConfig.projectKey}/customers`

  const requestData: CustomerData = {
    firstName,
    lastName,
    email,
    password,
    addresses: [address],
  }

  try {
    const response: AxiosResponse<CustomerResponseData> = await apiClient.post(apiUrl, requestData)
    return response.data
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
    throw error
  }
}
