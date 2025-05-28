import { defineStore } from 'pinia'
import { EncryptStorage } from 'encrypt-storage'

const SECRET_KEY_STORAGE = 'my secret key'

const encryptStorage = new EncryptStorage(SECRET_KEY_STORAGE, {})

const CryptStorage = {
  setItem(key, state) {
    return encryptStorage.setItem(key, state)
  },
  getItem(key) {
    return JSON.stringify(encryptStorage.getItem(key))
  },
}

/**
 * Conf User
 */

export const useConfigStoreRef = defineStore('conf', {
  state: () => ({ conf: {}, author: 'Marlon Zayro Arias Vargas', token: '' }),
  getters: {
    getPermissions: (state) => state?.conf?.permissions || {},
    getMenu: (state) => state?.conf?.menu || {},
    getInformation: (state) => state?.conf?.information || {},
    getToken: (state) => state?.token || null,
  },
  actions: {
    setConfig(data) {
      // this.conf = { ...this.conf, data }
      this.conf = data
    },
    setToken(value) {
      this.token = value
    },

    resetAll() {
      this.conf = {}
      this.token = null
    },
  },
  persist: {
    enabled: true,
    strategies: [
      { storage: CryptStorage, paths: ['conf'] },
      { key: 'accessToken', storage: localStorage, paths: ['token'] },
      { key: 'author', storage: sessionStorage, paths: ['author'] },
    ],
    // strategies: [{ storage: localStorage, paths: ['conf', 'author',  'token'] }]
  },
})

/**
 * Conf App
 */

const SETTINGS_LOCAL_STORAGE_KEY = 'app'

const settings = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY)

const AppDefault = settings
  ? JSON.parse(settings)
  : {
      themeColor: 'blue',
      themeSurfaces: 'zinc',
    }

export const useAppStoreRef = defineStore(SETTINGS_LOCAL_STORAGE_KEY, {
  state: () => ({ themeSurfaces: AppDefault.themeSurfaces, themeColor: AppDefault.themeColor }),
  getters: {
    getThemeSurfaces: (state) => state.themeSurfaces || '',
    getThemeColor: (state) => state.themeColor || '',
  },
  actions: {
    setThemeSurfaces(value) {
      this.themeSurfaces = value
    },
    setThemeColor(value) {
      this.themeColor = value
    },
    resetUserConfig() {
      this.themeSurfaces = AppDefault.themeSurfaces
      this.themeColor = AppDefault.themeColor
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
})
