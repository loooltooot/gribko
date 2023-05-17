import type iProduct from "./product"

interface iCartProduct {
    id: number,
    product: iProduct,
    amount: number
}

export default iCartProduct