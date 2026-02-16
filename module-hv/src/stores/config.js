import { defineStore } from 'pinia'

/**
 * Conf User
 */

const SETTINGS_LOCAL_STORAGE_KEY_CONF = 'conf'

const settings_conf = localStorage.getItem(SETTINGS_LOCAL_STORAGE_KEY_CONF)

const ConfDefault = settings_conf
  ? JSON.parse(settings_conf)
  : {
      conf: {},
      author: 'Marlon Zayro Arias Vargas',
      token: '',
      user: {},
    }

export const useConfigStoreRef = defineStore('conf', {
  state: () => ({
    conf: ConfDefault.conf,
    author: ConfDefault.author,
    token: ConfDefault.token,
    user: ConfDefault.user,
  }),
  getters: {
    getPermissions: (state) => state?.conf?.permissions || {},
    getMenu: (state) => state?.conf?.menu || {},
    getInformation: (state) => state?.conf?.information || {},
    getToken: (state) => state?.token || null,
    getUser: (state) => state?.user || {},
    getAuthor: (state) => state?.author,
  },
  actions: {
    setConfig(data) {
      // this.conf = { ...this.conf, data }
      this.conf = data
    },
    setToken(value) {
      this.token = value
    },
    setUser(value) {
      this.user = { ...this.user, value }
    },
    resetAll() {
      this.conf = {}
      this.token = null
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
      themeDark: false,
    }

export const useAppStoreRef = defineStore(SETTINGS_LOCAL_STORAGE_KEY, {
  state: () => ({
    themeSurfaces: AppDefault.themeSurfaces,
    themeColor: AppDefault.themeColor,
    themeDark: AppDefault.themeDark,
  }),
  getters: {
    getThemeSurfaces: (state) => state.themeSurfaces || '',
    getThemeColor: (state) => state.themeColor || '',
    getThemeDark: (state) => state.themeDark || false,
  },
  actions: {
    setThemeSurfaces(value) {
      this.themeSurfaces = value
    },
    setThemeColor(value) {
      this.themeColor = value
    },
    setThemeDark(value) {
      this.themeDark = value
    },
    resetUserConfig() {
      this.themeSurfaces = AppDefault.themeSurfaces
      this.themeColor = AppDefault.themeColor
      this.themeDark = AppDefault.themeDark
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
