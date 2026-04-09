import { Outlet } from "react-router"

import { useRef, type ChangeEvent } from "react"
import { useSearchStore } from "../module_store/searchStore"

export function ProductsLayout() {
  const setSearchGlobal = useSearchStore((state) => state.setSearch)

  const searchRef = useRef<HTMLInputElement | null>(null)

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    setSearchGlobal(searchRef.current.value)
  }

  return (
    <>
      <header className="fixed z-10 top-0 left-0 w-full bg-white">
        <div className="px-10 lg:px-0 lg:max-w-[1280px] mx-auto border-gray-200 border-b">
          <div className="flex justify-between gap-6 h-18 items-center">
            <div className="shrink-0 lg:shrink max-w-[190px]">
              <span className="font-extrabold text-2xl lg:text-2xl">oh</span>
            </div>

            <form onSubmit={onSubmit} className="lg:block w-full lg:w-4/10">
              <fieldset>
                <label className="sr-only" htmlFor="search">
                  Buscar por produtos, marcas e muito mais...
                </label>
                <input
                  className="border w-full text-sm lg:text-lg border-gray-300 placeholder:text-gray-300 px-4 h-10 py-1.5 rounded-lg"
                  id="search"
                  type="text"
                  name="search"
                  ref={searchRef}
                  placeholder="Buscar por produtos, marcas e muito mais..."
                />
              </fieldset>
            </form>

            <div className="lg:max-w-[190px] lg:w-full flex justify-end gap-6">
              <button>
                <span className="fi fi-sr-shopping-cart leading-0 text-2xl"></span>
                <span className="sr-only">Abrir carinho</span>
              </button>

              <button className="lg:hidden">
                <span className="fi fi-rr-bars-staggered leading-0 text-2xl"></span>
                <span className="sr-only">Abrir carinho</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-[96px] lg:pt-24 px-10 lg:px-0">
        <Outlet />
      </div>

      <footer className="bg-black min-h-[10vh] w-full mt-28"></footer>
    </>
  )
}
