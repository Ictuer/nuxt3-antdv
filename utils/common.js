import { stringify } from 'qs'

export const getRaw = (value) => (isRef(value) ? unref(value) : isReactive(value) ? toRaw(value) : value)

const baseURL = `${location.protocol}//api.${location.hostname.split(/\./).slice(-2).join('.')}/v1`

/**
 * @type {typeof $fetch}
 */
export const $api = (key, opts, ...rest) =>
  $fetch(
    key,
    {
      credentials: 'include',
      baseURL,
      onRequest(params) {
        const route = useRoute()
        const router = useRouter()
        const meta = router.resolve(route.fullPath).meta
        if (meta.role) {
          const roles = Object.fromEntries([meta.role].flat(Infinity).map((role) => [role, true]))
          params.options.query = {
            ...params.options.query,
            ...roles,
          }
        }
        if (params.options.query) {
          params.request +=
            (params.request.includes('?') ? '&' : '?') +
            stringify(params.options.query, {
              allowDots: true,
            })
          delete params.options.query
        }
      },
      ...opts,
    },
    ...rest,
  )
