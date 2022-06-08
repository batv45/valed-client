import {sendRedirect} from "h3";
export const useValedCookie = (opt=null) => useCookie('valed_token',opt)

export const valedFetch = (url: string, fetchOptions: any = {}) => {
    const { VALED_BASE_URL } = useRuntimeConfig()
    return $fetch(url, {
        baseURL: VALED_BASE_URL,
        ...fetchOptions,
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${useValedCookie().value}`,
            ...fetchOptions.headers,
        },
    })
}
export const valedApiFetch = (url: string, fetchOptions: any = {}) => {
    const { VALED_BASE_URL,VALED_API_ENDPOINT } = useRuntimeConfig()
    return $fetch(url, {
        baseURL: VALED_BASE_URL+VALED_API_ENDPOINT,
        ...fetchOptions,
        headers: {
            Accept: 'application/vnd.api+json',
            Authorization: `Bearer ${useValedCookie().value}`,
            ...fetchOptions.headers,
        },
    })
}
export const useValedUser = async () => {
    const cookie = useValedCookie()
    const user = useState('valed_user')

    if (cookie.value && !user.value) {
        user.value = await valedFetch('/me')
            .catch((error) => {
            if (error.response && error.response.status == 401) {
                cookie.value = null
            }
        })
    }

    return user
}

export const valedLogin = (email,password) => {
    if (process.client) {
        const cookie = useValedCookie()
        return valedFetch('/login', {
            method:'POST',
            body:{
                'email': email,
                'password': password
            }
        }).then(response => {
            if( response && response.hasOwnProperty('token') ){
                // @ts-ignore
                cookie.value = response.token
                window.location.replace('/')
                // window.location.replace(
                //     `/api/cookie?token=${response.token}`
                // )
            }
        })
    }
}

export const valedRegister = (name,email,password) => {
    if (process.client) {
        const cookie = useValedCookie()
        return valedFetch('/register', {
            method:'POST',
            body:{
                'name': name,
                'email': email,
                'password': password
            }
        }).then(response => {
            console.log(response,'REGİSTER RESON')
            if( response && response.hasOwnProperty('token') ){
                // @ts-ignore
                cookie.value = response.token
                window.location.replace('/')
                // window.location.replace(
                //     `/api/cookie?token=${response.token}`
                // )
            }
        })
    }
}

export const valedLogout = async () => {
    useValedCookie().value = null
    useState('valed_user').value = null
    return navigateTo('/auth/login')
}

