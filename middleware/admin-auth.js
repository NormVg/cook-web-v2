export default defineNuxtRouteMiddleware((to, from) => {
  // Only run on client side
  if (process.client) {
    const token = localStorage.getItem('admin_token');

    if (!token) {
      return navigateTo('/admin');
    }
  }
});
