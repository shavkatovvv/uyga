const url = "https://fakestoreapi.com/products/categories";
const url_2 = "https://fakestoreapi.com/products/category";
const url_3 = "https://fakestoreapi.com/products"


export const getTab = async () => {
    try {
        const res = await fetch(`${url}`)
        const data = await res.json()

        return data
    } catch (error) {
        return error.message        
    }
}




export const getdataContent = async (item) => {
    try {
        const res = await fetch(`${url_2}/${item}`)
        const data = await res.json()

        return data
    } catch (error) {
        return error.message        
    }
}

export const getdata = async (item) => {
    try {
        const res = await fetch(`${url_3}/${item}`)
        const data = await res.json()

        return data 
    } catch (error) {
        return error.message
    }
}
