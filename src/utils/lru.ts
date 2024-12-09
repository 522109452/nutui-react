export default class MiniLru {
  private cache: Map<string, any>

  private capacity: number

  constructor(capacity: number) {
    this.cache = new Map()
    this.capacity = capacity
  }

  get(key: string): any | null {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, value)
      return value
    }
    return null
  }

  set(key: string, value: any): void {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value as string)
    }
    this.cache.set(key, value)
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }
}
