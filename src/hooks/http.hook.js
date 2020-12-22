import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method = 'GET', headers = {}) => {
        setLoading(true)
        try {

            // if (body) {
            //     body = JSON.stringify(body)
            //     headers['Content-Type'] = 'application/json'
            // }

            const body = null

            const response = await fetch(url, { method, body, headers })
            const data = await response.json()

            console.log('reg',data)

            if (!response.ok) {
                throw new Error(response.text || 'Something went wrong during http request')
            }

            setLoading(false)

            return data
        } catch (e) {
            setLoading(false)
            setError('Не удалось')
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}
