import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart-store', {
  state: () => {
    return {
      listCart: [] as any,
      isCartShaking: false
    }
  },
  getters: {
    countQuantity: (state):number => state.listCart.length > 0 ? state.listCart.reduce((total:number, item:any) => total + item.quantity, 0) : 0,
    totalPrice: (state):number => state.listCart.length > 0 ? state.listCart.reduce((totalPrice:number, item:any) => totalPrice + item.quantity * item.unit_price, 0) : 0,
  },
  actions: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.listCart))
    },
    deleteCart() {
      const storedCartData = localStorage.getItem('cart')  
      if (storedCartData) {
        localStorage.removeItem('cart');
        this.listCart = []
      }
    },
    getListCart() {
      const storedCartData = localStorage.getItem('cart')  
      if (storedCartData) {
        this.listCart = JSON.parse(storedCartData)
      }
    },
    addToCart(product: any) {
      const variant = product.selectedVariant;
      const item = {
        product_id: product.id,
        slug_product: product.slug,
        product_variant_id: variant.id,
        name: variant.name,
        slug: variant.slug,
        image: variant.images ? variant.images[0] : product.images[0],
        quantity: 1,
        category: product.category,
        unit_price: variant.unit_price,
      };
    
      if (this.listCart.length > 0) {
        const isHaveItem = this.listCart.some(
          (ele: any) => item.product_variant_id === ele.product_variant_id
        );
    
        if (isHaveItem) {
          const indexItem = this.listCart.findIndex(
            (ele: any) => item.product_variant_id === ele.product_variant_id
          );
          this.listCart[indexItem].quantity += 1;
        } else {
          this.listCart.push(item);
        }
      } else {
        this.listCart.push(item);
      }
      this.saveCart();
    },    
    removeItemFromCart(id:number) {
      this.listCart = this.listCart.filter((item:any) => item.product_variant_id !== id)
      this.saveCart()
    },
    updateCart(id:number, quantity: number) {
      this.listCart.forEach((item:any) => {
        if(item.product_variant_id === id) {
          item.quantity = quantity
        }
      })
      this.saveCart()
    },
    updateMinusPlusQuantityCart(id:number, isMinus:boolean) {
      if(!isMinus) {
        this.listCart.forEach((item:any) => {
          if(item.product_variant_id === id) {
            item.quantity = item.quantity + 1
          }
        })
      } else {
        this.listCart.forEach((item:any) => {
          if(item.product_variant_id === id && item.quantity > 1) {
            item.quantity = item.quantity - 1
          } else {
            return
          }
        })
      }
      this.saveCart()
    },
    triggerCartShake() {
      this.isCartShaking = true;
      setTimeout(() => {
        this.isCartShaking = false;
      }, 500)
    }
  }
})