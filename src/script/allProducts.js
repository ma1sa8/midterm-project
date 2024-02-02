const API_URL = 'https://fakestoreapi.com/products'
const main = document.getElementById('main')
const addCart = []
const cartData = localStorage.getItem("cartData");
const cart = JSON.parse(cartData)

if(cart!=null){
    console.log(cart)
    addCart.push.apply(addCart, cart)
    console.log(addCart)
    localStorage.setItem("cartData", JSON.stringify(cart))
}else{
    localStorage.setItem("cartData", JSON.stringify(addCart))
}

async function getProducts(url) {
    const res = await fetch(url)
    console.log(res)
    const data = await res.json()
    //console.log(data)
    showProducts(data)
}
getProducts(API_URL)
function showProducts(products) {

    main.innerHTML = ""

    products.forEach((product) => {
        const {title, price, image,category} = product
        const productEl = document.createElement("div")
        productEl.classList.add('products')
        const ratingStars = product.rating.rate;
        productEl.innerHTML = `
            <img src="${image}" alt="${title}">
            <div class="product rounded">
                <div class="overlay">
                    <div class = "items head">
                        <p>${title}</p>
                        <hr>
                    </div>
                    <div class = "items price">
                        <p class="new">$${price}</p>
                        <span id="stars" class="vote">
                            ${getStars(ratingStars)}
                        </span>
                    </div>
                    <button class="items cart btn btn-success mx-auto">
                        <i class="fa fa-shopping-cart"></i>
                        <span>ADD TO CART</span>
                    </button>
                </div>
            </div>
            <p class="text-capitalize mx-auto mb-1 fw-bold">${category}</p>
        `
        
        
        main.appendChild(productEl)
        productEl.addEventListener("click", (e) => {
            e.preventDefault()
            const button = e.target.tagName.toLowerCase()
            if (button== 'button'||button=='span'||button=='i') {
                    
                productEl.classList.toggle("selected")
                if (productEl.classList.contains("selected")) {
                    productEl.classList.add("product_selected")
                    addCart.push(product)
                    localStorage.setItem("cartData", JSON.stringify(addCart))
                    productEl.innerHTML = `
                    <img src="${image}" alt="${title}">
                    <div class="product rounded">
                        <div class="overlay">
                            <div class = "items head">
                                <p>${title}</p>
                                <hr>
                            </div>
                            <div class = "items price">
                                <p>$${price}</p>
                                <p id="stars" class="vote">
                                    ${getStars(ratingStars)}
                                </p>
                            </div>
                            <button class="items cart btn btn-danger mx-auto">
                                <i class="fa fa-shopping-cart"></i>
                                <span>REMOVE</span>
                            </button>
                        </div>
                    </div>
                    <p class="text-capitalize mx-auto mb-1 fw-bold">${category}</p>
                `
                } else {
                    productEl.classList.remove("product_selected")
                    const index = addCart.indexOf(product)
                    addCart.splice(index,1)
                    localStorage.setItem("cartData", JSON.stringify(addCart))
                    productEl.innerHTML = `
                    <img src="${image}" alt="${title}">
                    <div class="product rounded">
                        <div class="overlay">
                            <div class = "items head">
                                <p>${title}</p>
                                <hr>
                            </div>
                            <div class = "items price">
                                <p>$${price}</p>
                                <p id="stars" class="vote">
                                    ${getStars(ratingStars)}
                                </p>
                            </div>
                            <button class="items cart btn btn-success mx-auto">
                                <i class="fa fa-shopping-cart"></i>
                                <span>ADD TO CART</span>
                            </button>
                        </div>
                    </div>
                    <p class="text-capitalize mx-auto mb-1 fw-bold">${category}</p>
                    `
                }
            }else{
                localStorage.setItem("productData", JSON.stringify(product))
                window.location.href = "desc.html"
                console.log("produkti")
            }
            
        })
    })
}
function getStars(rating) {

    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
  
    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
      output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    // If there is a half a star, append it
    if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
      output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    return output.join('');
  
}