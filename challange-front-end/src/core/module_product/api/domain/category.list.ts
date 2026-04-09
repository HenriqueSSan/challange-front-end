import { http } from "../../../../infra/http"
import type { CategoryListDomain } from "./types"

export const categoryList: CategoryListDomain.AsyncFn = async () => {
  return http({ url: `/products/categories` })
}
