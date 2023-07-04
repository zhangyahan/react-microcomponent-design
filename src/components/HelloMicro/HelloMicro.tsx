import { useMicroProps, useUserDataListener } from './dataProvider'

// 数据提供者必须提供符合该数据类型的返回值
export interface MicroProps {
  name: string
  age: number
}

/**
 * 内部管理数据微组件演示
 */
export function HelloMicro() {
  const data = useMicroProps()
  const message = useUserDataListener()

  return (
    <div>
      <p>姓名: {data?.name}</p>
      <p>年龄: {data?.age}</p>
      <p>信息: {message}</p>
    </div>
  )
}
