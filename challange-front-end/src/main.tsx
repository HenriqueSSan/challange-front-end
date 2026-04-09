import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"

import { BrowserRouter, Route, Routes } from "react-router"
import ProductsPage from "./app/+page.tsx"
import ProductsIdPage from "./app/product/[productId]/+page.tsx"
import { ProductsLayout } from "./layout/products.layout.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":productId" element={<ProductsIdPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
