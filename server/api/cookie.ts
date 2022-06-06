import { useQuery, sendRedirect, setCookie } from 'h3'

export default async (req,res) => {
    const { token } = useQuery(req)

    if (!token) {
        return sendRedirect(res, '/')
    }

    setCookie(res, 'valed_token', token, { path: '/' })

    return sendRedirect(res, '/')
}
