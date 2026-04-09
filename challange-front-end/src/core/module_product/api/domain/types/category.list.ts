import type { HttpResponse } from "../../../../../infra/http.interface"

type Model = {
  slug: string
  name: string
  url: string
}

type Res = Model[]

type Error = { error_message: string }

type AsyncFn = () => Promise<HttpResponse<Res>>

export type { AsyncFn, Error, Model, Res }
