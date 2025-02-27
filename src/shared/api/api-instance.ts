export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError:' + response.status);
  }
}

export const apiInstance = async <T>(url: string, init?: RequestInit) => {
  const result = await fetch(`${BASE_URL}${url}`, { ...init });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = await result.json();
  return data as Promise<T>;
};
