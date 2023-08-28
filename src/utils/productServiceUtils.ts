import apiProduct from '../api/axios';
import { commercetoolsConfig } from '../commercetoolsConfig';
import { Product, RawProduct } from '../types/interfaces';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const apiUrl = 'https://api.europe-west1.gcp.commercetools.com';
    const response = await apiProduct.get<{ results: RawProduct[]}>(
      `${apiUrl}/${commercetoolsConfig.projectKey}/products`
    );

    return response.data.results.map((rawProduct) => ({
      id: rawProduct.id,
      name: rawProduct.masterData.current.name,
      description: rawProduct.masterData.staged.description || 'No description available',
      imageUrl: rawProduct.masterData.current.masterVariant.images.map(image => image.url),
    }));

  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}