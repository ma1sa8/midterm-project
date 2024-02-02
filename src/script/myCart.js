const cartData = localStorage.getItem("cartData");
const cart = JSON.parse(cartData)
const addCart = cart
console.log(addCart)
const cartItems = document.getElementById("cartItems")
cartItems.innerHTML=""
let totalPrice=0
function addPrice(item){
    totalPrice+=Math.round(item.price * 100) / 100
}
function minusPrice(item){
    totalPrice-=Math.round(item.price * 100) / 100
}
function addItem(item){
    addCart.push(item)
    localStorage.setItem("cartData", JSON.stringify(addCart))
}
function removeItem(item){
    const index = addCart.indexOf(item)
    addCart.splice(index,1)
    localStorage.setItem("cartData", JSON.stringify(addCart))
}

if(addCart === null || addCart.length == 0){
    const cartEl = document.createElement("div")
        cartEl.classList.add("cartList")
    cartEl.innerHTML = `
        <div class="row justify-content-center align-items-center mt-5 mx-auto">
            <h1>No items selected</h1>
        <hr>
    `
    cartItems.appendChild(cartEl)
}
else{
    const cartItemsArray = [];
    addCart.forEach((item)=>{
        const existingItem = cartItemsArray.find((cartItem) => cartItem.id === item.id);
        
        const cartEl = document.createElement("div")
        cartEl.classList.add("cartList")
        totalPrice += item.price
        let quantity=1
        cartEl.innerHTML = `
            <div class="row align-items-center mt-4">
                <div class="col-3 row justify-content-center">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="col-5">
                        <div>
                            <h3>${item.title}</h3>
                            <p>
                                ${item.description}
                            </p>
                            <h3 class="fw-bold">
                                $${item.price}
                            </h3>
                        </div>
                        <button type="button" class="btn btn-danger">
                            <i class="fa fa-shopping-cart"></i>
                            <span>REMOVE</span>
                        </button>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center mb-4 col-3 gap-4">
                    <p id="removeItem" class="fa fa-minus"
                    onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    </p>
                    <input id="form1" min="0" name="quantity" value="${quantity}" type="number"
                        class="form-control form-control-sm w-25" disabled/>
                        
                    
                    <p id="addItem" class="fa fa-plus"
                    onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    </p>
                    <label for="form1">  </label>
                </div>
            </div>
            <hr>
        `
    
        cartItems.appendChild(cartEl)
        cartEl.addEventListener("click", (e) => {
            e.preventDefault()
            const button = e.target.tagName.toLowerCase()
            if (button == 'button'||button=='span'||button=='i') {
                removeItem(item)
                window.location.href = "myCart.html"
            }else if(e.target.id == 'addItem'){
                addPrice(item)
                addItem(item)
                updateTotal(totalPrice)
            }else if(e.target.id == 'removeItem'){
                removeItem(item)
                minusPrice(item)
                updateTotal(totalPrice)
            }
        })
    })
    const pay = document.getElementById("checkout")
    const summary = document.createElement("div")
    summary.classList.add("col-lg-4","col-xl-3")
    function updateTotal(value) {
        total = value
        summary.innerHTML=`
            <div class="d-flex justify-content-between fw-bold"">
                <p class="mb-2">Subtotal</p>
                <p class="mb-2">$${totalPrice.toFixed(2)}</p>
            </div>

            <div class="d-flex justify-content-between fw-bold"">
                <p class="mb-0">Shipping</p>
                <p class="mb-0">$7.99</p>
            </div>
            <hr class="my-4">
            <div class="d-flex justify-content-between mb-4 fw-bold"">
                <p class="mb-2">Total (tax included)</p>
                <p class="mb-2">$${(7.99+totalPrice).toFixed(2)}</p>
            </div>
            <button type="button" class="btn btn-success btn-block btn-lg">
                <div class="d-flex justify-content-between">
                    <span>Pay</span>
                </div>
            </button>
        `
        localStorage.setItem("totalPrice", total)
    }
    pay.appendChild(summary)
    const input = document.getElementById("typeName")
    summary.addEventListener("click",(e)=>{
        const button = e.target.tagName.toLowerCase()
        if (button == 'button'||button=='span') {
            const success = input.value
            if (success && success[0] !== " " ) {
                alert("Payment processed successfully!")
                
            } else {
                alert("Payment form is empty")
            }
        }
    })
}
updateTotal(totalPrice)
console.log(totalPrice)