
export default defineNuxtRouteMiddleware( (to) => {
    const cookie = useValedCookie()

    if(cookie.value){
        return '/'
    }
})
