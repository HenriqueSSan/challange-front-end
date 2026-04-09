import { http } from "../../../../infra/http"
import type { ProductListDomain } from "./types"

export const productList: ProductListDomain.AsyncFn = async (params: ProductListDomain.Req) => {
  if (params.search)
    return http({ url: `/products/search`, params: { skip: params.skip, limit: params.limit, q: params.search } })

  return http({ url: `/products`, params })
}
