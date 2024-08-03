import { Product } from "./product"

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    products: Product[]
}