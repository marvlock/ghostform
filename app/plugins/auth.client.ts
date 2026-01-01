export default defineNuxtPlugin({
  name: 'auth-check',
  parallel: true,
  async setup() {
    const { checkAuth, user, loading } = useAuth()
    
    if (!user.value && !loading.value) {
      await checkAuth()
    }
  }
})
