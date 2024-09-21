const url = "https://fakestoreapi.com/products"


export const getTab = async () => {
    try {
    const res = await fetch(`${url}/categories`)
    const data = await res.json()
    return data 
    } catch (error) {
        
    }
}




export const getdataContent = async (item) => {
    try {
    const res = await fetch(`${url}/category/${item}`);
    const data = await res.json()
    return data
    } catch (error) {
        
    }
}