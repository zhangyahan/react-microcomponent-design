import type { UserData } from '@api-models/UserData'

export const getUserData = () => {
  return new Promise<UserData>((resolve) => {
    setTimeout(() => {
      resolve({ name: 'ZhangYahan', age: 19 })
    }, 2000)
  })
}
