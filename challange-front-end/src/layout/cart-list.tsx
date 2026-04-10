import { useEffect } from "react"
import { FormatHelper } from "../helper/format.helper"
import { useCartStore } from "../module_store/cartStore"

export function CartList({ show, close }: { show: boolean; close(): void }) {
  const products = useCartStore((state) => state.products)
  const removedProductInCart = useCartStore((state) => state.removeProductInCart)

  const productsValue = Object.values(products)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [show])

  if (show)
    return (
      <div>
        <div className="bg-black/5 fixed left-0 w-full h-screen z-15" onClick={() => close()}></div>

        <aside className="fixed z-20 right-0 top-0 h-screen bg-white w-[23%] border-l border-gray-200 py-6">
          <h2 className="font-bold text-2xl px-8 mb-2.5">Seu Carrinho</h2>

          {productsValue.length > 0 ? (
            <>
              <nav className="overflow-auto h-[88vh] py-6 px-8">
                <ul className="space-y-6">
                  {productsValue.map((p) => {
                    return (
                      <li key={p.id} className="w-full h-full relative flex items-start gap-6">
                        <figure className="bg-gray-200 mb-2.5 p-1.5 rounded-lg ">
                          <img className="bg-white w-[128px] object-cover rounded-md" src={p.thumbnail} alt="" />
                        </figure>

                        <div>
                          <p className="font-bold text-lg w-8/10 truncate mb-1.5">{p.title}</p>

                          <p className="text-green-500 text-3xl h-[50px] font-bold">
                            {FormatHelper.toCurrency(p.price).display}
                          </p>

                          <p className="text-gray-400 leading-6 h-[80px] w-full lg:max-w-9/10">
                            {p.description.substring(0, 56)}
                          </p>

                          <button
                            onClick={() => removedProductInCart(p)}
                            className="bg-black w-full text-center hover:bg-gray-800 transition-all text-white py-1.5 px-4 rounded-sm"
                          >
                            Remover
                          </button>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </nav>
              <div className="px-8">
                <button className="bg-black w-full text-center hover:bg-gray-800 transition-all text-white py-1.5 px-4 rounded-sm">
                  Finalizar compra
                </button>
              </div>
            </>
          ) : (
            <div className="px-8">
              <p>Você não possui itens no carrinho.</p>
            </div>
          )}
        </aside>
      </div>
    )

  return <></>
}
