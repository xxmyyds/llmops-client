import { baseUrl, httpCode } from '@/config'
import { Message } from '@arco-design/web-vue'

export const TIME_OUT = 10000

const baseFetchOptions = {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: new Headers({
    'Content-Type': 'application/json',
  }),
  redirect: 'follow',
}

type FetchOptionType = Omit<RequestInit, 'body'> & {
  params?: Record<string, any>
  body?: BodyInit | Record<string, any> | null
}

const baseFetch = <T>(url: string, fetchOptions: FetchOptionType): Promise<T> => {
  const options: typeof baseFetchOptions & FetchOptionType = Object.assign(
    {},
    baseFetchOptions,
    fetchOptions,
  )

  let urlWithPrefix = `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`

  const { method, params, body } = options

  if (method === 'GET' && params) {
    const paramsArr: string[] = []
    Object.keys(params).forEach((key: string) => {
      paramsArr.push(`${key}=${encodeURIComponent(params[key])}`)
    })

    if (urlWithPrefix.search(/\?/) === -1) {
      urlWithPrefix += `?${paramsArr.join('&')}`
    } else {
      urlWithPrefix += `&${paramsArr.join('&')}`
    }

    delete options.params
  }

  if (body) {
    options.body = JSON.stringify(body)
  }

  return Promise.race([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('接口已经超时')
      }, TIME_OUT)
    }),
    new Promise((resolve, reject) => {
      globalThis
        .fetch(urlWithPrefix, options as RequestInit)
        .then(async (res) => {
          const json = await res.json()
          if (json.code === httpCode.success) {
            resolve(json)
          } else {
            Message.error(json.message)
            reject(new Error(json.message))
          }
        })
        .catch((err) => {
          Message.error(err.message)
          reject(err)
        })
    }),
  ]) as Promise<T>
}

export const request = <T>(url: string, options = {}) => {
  return baseFetch<T>(url, options)
}

export const get = <T>(url: string, options = {}) => {
  return request<T>(url, Object.assign({}, options, { method: 'GET' }))
}

export const post = <T>(url: string, options = {}) => {
  return request<T>(url, Object.assign({}, options, { method: 'POST' }))
}
