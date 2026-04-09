import { useEffect, useState } from "react"
import { productList } from "../../api/domain/product.list"
import type { CategoryListDomain, ProductListDomain } from "../../api/domain/types"
import { FormatHelper } from "../../../../helper/format.helper"
import { useSearchStore } from "../../../../module_store/searchStore"
import { categoryList } from "../../api/domain/category.list"

function ProductCard({ ...props }: ProductListDomain.Model) {
  return (
    <div className="w-full h-full relative flex flex-col items-start">
      <figure className="bg-gray-200 mb-2.5 p-1.5 rounded-lg ">
        <img className="bg-white rounded-md" src={props.thumbnail} alt="" />
      </figure>

      <p className="bg-red-500 flex items-center mb-1.5 rounded-lg text-white px-2 text-sm whitespace-nowrap">
        Oferta % {Math.floor(props.discountPercentage)}
      </p>
      <p className="font-bold text-lg w-8/10 truncate mb-1.5">{props.title}</p>
      <p className="text-green-500 text-3xl h-[50px] font-bold">{FormatHelper.toCurrency(props.price).display}</p>
      <p className="text-gray-400 leading-6 h-[80px] w-full lg:max-w-9/10">{props.description.substring(0, 56)}</p>

      <button className="bg-black w-full text-center hover:bg-gray-800 transition-all text-white py-1.5 px-4 rounded-sm">
        Adicionar ao carrinho
      </button>
    </div>
  )
}

function CategoryTag({ ...props }: CategoryListDomain.Model) {
  return (
    <div>
      <a className="flex p-1.5 text-sm hover:bg-gray-200 rounded-sm" href="/">
        {props.name}
      </a>
    </div>
  )
}

export default function ProductsScreen() {
  const search = useSearchStore((state) => state.search)

  const [productListState, setProductListState] = useState<ProductListDomain.Res>({
    skip: 0,
    limit: 0,
    total: 0,
    products: [],
  })

  const [categoryListState, setCategoryListState] = useState<CategoryListDomain.Res>([])

  useEffect(() => {
    ;(async () => {
      const response = await productList({ skip: 0, limit: 10, search })

      setProductListState(response.data)
    })()
  }, [search])

  useEffect(() => {
    ;(async () => {
      const response = await categoryList()

      setCategoryListState(response.data)
    })()
  }, [])

  return (
    <div>
      <div className="flex items-start gap-8 max-w-[1280px] mx-auto">
        <div className="min-h-[20vh] w-full mb-4.5">
          <figure>
            <img className="rounded-lg" src="/banner.webp" alt="" />
          </figure>
        </div>
      </div>

      <div className="flex items-start gap-8 max-w-[1280px] mx-auto min-h-screen">
        <aside className="shrink-0 min-w-[196px]">
          <h2 className="font-bold text-lg mb-3">Categorias</h2>

          <nav className="border border-gray-300 rounded-lg p-1.5">
            <ul>
              {categoryListState.map((category) => {
                return (
                  <li key={category.slug}>
                    <CategoryTag {...category} />
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>
        <main>
          <section className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 lg:grid-cols-4">
            {productListState.products.map((product) => {
              return <ProductCard key={product.id} {...product} />
            })}
          </section>
        </main>
      </div>
    </div>
  )
}
