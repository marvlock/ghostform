export const useAuth = () => {
  const user = useState<any>('auth.user', () => null)
  const loading = useState<boolean>('auth.loading', () => true)
  const checkAuthPromise = useState<Promise<void> | null>('auth.checkPromise', () => null)

  async function checkAuth(force = false) {
    if (!force && user.value && !checkAuthPromise.value) {
      if (loading.value) {
        loading.value = false
      }
      return Promise.resolve()
    }

    if (checkAuthPromise.value) {
      return checkAuthPromise.value
    }

    const promise = (async () => {
      if (!user.value) {
        loading.value = true
      }
      try {
        const options: any = {
          credentials: 'include'
        }
        
        if (process.server) {
          try {
            const requestHeaders = useRequestHeaders(['cookie'])
            if (requestHeaders.cookie) {
              options.headers = { cookie: requestHeaders.cookie }
            }
          } catch {
          }
        }
        
        const response = await $fetch('/api/auth/me', options)
        if (response && response.user) {
          user.value = response.user
        } else {
          user.value = null
        }
      } catch (error) {
        user.value = null
      } finally {
        loading.value = false
        checkAuthPromise.value = null
      }
    })()

    checkAuthPromise.value = promise
    return promise
  }
  

  async function logout() {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
      user.value = null
      checkAuthPromise.value = null
      await navigateTo('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (process.client && user.value && loading.value) {
    loading.value = false
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    checkAuth,
    logout,
    isAuthenticated: computed(() => !!user.value)
  }
}

