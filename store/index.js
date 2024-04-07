import products from "../data/products.json";

export const state = () => ({
    products: products,
    cart: [],
    wishlist: [],
    searchProduct: [],
    isSearch: false
})

// your root getters
export const getters = {
    getProducts(state) {
        return state.products
    },
    isSearch(state) {
        return state.isSearch
    },
    getCart: state => {
        return state.cart
    },
    wishlistItemCount: state => {
        return state.wishlist.length
    },
    getWishlist: state => {
        return state.wishlist
    },
    cartItemCount: state => {
        return state.cart.length
    },
    getTotal: state => {
        let total = 0;
        state.products.forEach(element => {
            let price = element.discount ? element.price - (element.price * (element.discount/100)) : element.price;
            total += price * element.cartQuantity;
        });

        return total;
    },
    getTotalCart: state => {
        let total = 0;
        state.cart.forEach(element => {
            let price = element.discount ? element.price - (element.price * (element.discount/100)) : element.price;
            total += price * element.cartQuantity;
        });

        return total;
    },
    categoryList: state => {
        return [...new Set(state.products.map((list) => list.category).flat())]
    },
    sizeList: state => {
        return [...new Set(state.products.map((list) => list.variation?.sizes).flat())].filter(Boolean)
    },
    priceList: state => {
        return [...new Set(state.products.map((el) => el.price - (el.price * el.discount) / 100))]
    }
}

// contains your mutations
export const mutations = {
    ADD_TO_WISHLIST(state, product) {
        const item = state.wishlist.find(el => product.id === el.id)
        if(item) {
            return
        } {
            state.wishlist.push(product)
        }
    },
    UPDATE_CART(state, payload) {
        const item = state.cart.find(el => payload.id === el.id)
        if (item) {
            const price = item.discount ? item.price - (item.price *(item.discount)/100) : item.price;
            item.cartQuantity = item.cartQuantity + payload.cartQuantity
            item.total = item.cartQuantity * price
        } else {
            const price = payload.discount ? payload.price - (payload.price *(payload.discount)/100) : payload.price;
            state.cart.push({...payload, cartQuantity: payload.cartQuantity, total: price })
        }
    },
    REMOVE_PRODUCT_FROM_CART(state, product) {
        state.cart = state.cart.filter(item => {
            return product.id !== item.id
        });
    },

    REMOVE_PRODUCT_FROM_WISHLIST(state, product) {
        state.wishlist = state.wishlist.filter(item => {
            return product.id !== item.id
        });
    },
    DECREASE_PRODUCT(state, payload) {
        const found = state.cart.find(el => payload.id === el.id)
        const price = found.discount ? found.price - (found.price *(found.discount)/100) : found.price;
        found.cartQuantity = found.cartQuantity - payload.cartQuantity
        found.total = found.cartQuantity * price
    },
    SEARCH_PRODUCTS(state, payload) {
        payload = payload.toLowerCase()
        state.searchProduct = []
        if (payload.length > 1) {
            state.products.filter((product) => {
                if (product.title.toLowerCase().includes(payload)) {
                    state.searchProduct.push(product)
                }
            })
        }
      },
    CLEAR_CART(state) {
        state.cart = []
    },
    UPDATE_SEARCH(state, payload) {
        state.isSearch = payload
    },
}

// contains your actions
export const actions = {
    decreaseProduct({ commit }, product) {
        commit('DECREASE_PRODUCT', product)
    },
    addToCartItem({commit}, payload) {
        commit('UPDATE_CART', payload)
    },
    removeProductFromCart({commit}, product) {
        commit('REMOVE_PRODUCT_FROM_CART', product)
    },
    addToWishlist({commit}, payload) {
        commit('ADD_TO_WISHLIST', payload)
    },
    searchProduct: ({commit}, payload) => {
        commit('SEARCH_PRODUCTS', payload)
    },
    removeProductFromWishlist({commit}, product) {
        commit('REMOVE_PRODUCT_FROM_WISHLIST', product)
    },
}