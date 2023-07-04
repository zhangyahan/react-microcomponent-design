type WebSocketMessageListener<T = any> = (message: T) => void

class WebSocketMessenger<T = any> {
  private listeners: WebSocketMessageListener<T>[] = []

  constructor(private url: string) {
    setInterval(() => {
      this.listeners.forEach(listener => listener(Date.now().toString() as unknown as T))
    }, 1000)
  }

  addMessageListener(listener: WebSocketMessageListener<T>) {
    this.listeners.push(listener)
  }

  removeMessageListener(listener: WebSocketMessageListener<T>) {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }
}

class WebSocketProvider {
  private static instances = new Map<string, WebSocketMessenger>()

  static create<T>(url: string): WebSocketMessenger<T> {
    const has = this.instances.has(url)
    if (!has) {
      this.instances.set(url, new WebSocketMessenger<T>(url))
    }

    return this.instances.get(url)! as WebSocketMessenger<T>
  }
}

export const get = <T>() => {
  return WebSocketProvider.create<T>('')
}
