import '@testing-library/jest-dom/extend-expect'

let localStorageItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    localStorageItems[key] = item
  },
  getItem: (key) => localStorageItems[key],
  clear: () => localStorageItems = {}
}

Object.defineProperty(window, 'localstorage', { value: localStorageMock })
