import { useEffect, useState } from "react"
import { productList } from "../../api/domain/product.list"
import type { ProductListDomain } from "../../api/domain/types"
import { FormatHelper } from "../../../../helper/format.helper"
import { useSearchStore } from "../../../../module_store/searchStore"

function ProductCard({ ...props }: ProductListDomain.Model) {
  return (
    <div className="w-full h-full relative flex flex-col items-start">
      <figure className="bg-gray-200 mb-2.5 p-1.5 rounded-lg ">
        <img className="bg-white rounded-md" src={props.thumbnail} alt="" />
      </figure>

      <p className="bg-red-500 flex items-center mb-1.5 rounded-lg text-white px-2 text-sm whitespace-nowrap">
        Oferta % {Math.floor(props.discountPercentage)}
      </p>
      <p className="font-bold text-lg mb-1.5">{props.title}</p>
      <p className="text-green-500 text-3xl font-bold">{FormatHelper.toCurrency(props.price).display}</p>
      <p className="text-gray-400 leading-6 h-[72px] w-full lg:max-w-9/10">{props.description.substring(0, 56)}</p>
    </div>
  )
}

export default function ProductsScreen() {
  const search = useSearchStore((state) => state.search)

  const [productListState, setProductListState] = useState<ProductListDomain.Res>({
    products: [],
    skip: 0,
    limit: 0,
    total: 0,
  })

  useEffect(() => {
    ;(async () => {
      const response = await productList({ skip: 0, limit: 10, search })

      setProductListState(response.data)
    })()
  }, [search])

  return (
    <main>
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 lg:grid-cols-5 max-w-[1280px] mx-auto min-h-screen">
        {productListState.products.map((product) => {
          return <ProductCard key={product.id} {...product} />
        })}
      </section>
    </main>
  )
}
