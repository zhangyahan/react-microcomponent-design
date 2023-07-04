// 数据提供器, 负责对接下层数据到上层视图进行展示.
// 这样的好处是当网络层发生变化的时候, 只需要修改
// 数据适配层即可, 而不用改动展示层的代码逻辑.

import { useCallback, useEffect, useState } from 'react'

import type { MicroProps } from './HelloMicro'
// 在其他项目中只要存在类似接口就可以通过接口进行整合数据进行使用, 并不需要修改展示层逻辑.
import { get } from '@/api/ws/WebSocketProvider'
import { getUserData } from '@/api/http'

type Nullable<T> = T | null

// TODO: 当数据适配层接口和展示组件进行对接后, 其函数名称和返回值就不应再变化.

export const useMicroProps = (): Nullable<MicroProps> => {
  const [result, setResult] = useState<Nullable<MicroProps>>(null)
  useEffect(() => {
    getUserData()
      .then((data) => {
        setResult(data)
      })
  }, [])

  return result
}

export const useUserDataListener = (): Nullable<string> => {
  const [result, setResult] = useState<Nullable<string>>(null)

  const listener = useCallback((value: string) => setResult(value), [])

  useEffect(() => {
    get<string>().addMessageListener(listener)

    return () => {
      get<string>().removeMessageListener(listener)
    }
  }, [listener])

  return result
}
