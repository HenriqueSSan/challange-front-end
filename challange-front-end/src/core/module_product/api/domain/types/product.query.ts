import type { HttpResponse } from "../../../../../infra/http.interface"

// prettier-ignore
type Model = {
  products: Array<{
    id: string
    sku: string
    title: string
    price: string
    stock: number
    brand: string
    rating: number
    tags: string[]
    weight: number
    category: string
    images: string[]
    thumbnail: string
    description: string
    returnPolicy: string
    discountPercentage: string
    availabilityStatus: string
    warrantyInformation: string
    shippingInformation: string
    minimumOrderQuantity: number
    dimensions: { width: number; height: number; depth: number }
    meta: { createdAt: string; updatedAt: string; barcode: string; qrCode: string }
    reviews: Array<{ rating: number; comment: string; date: string; reviewerName: string; reviewerEmail: string }>
  }>
  skip: number
  total: number
  limit: number
}

type Req = { productId: string }

type Res = Model

type Error = { error_message: string }

type AsyncFn = (body: Req) => Promise<HttpResponse<Res>>

export type { AsyncFn, Error, Model, Req, Res }
