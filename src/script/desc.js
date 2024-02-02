const main = document.getElementById('main')
const data = localStorage.getItem("productData");
const product = JSON.parse(data);
const addCart = []
const cartData = localStorage.getItem("cartData");
const cart = JSON.parse(cartData)

if(cart!=null){
    //console.log(cart)
    addCart.push.apply(addCart, cart)
    //console.log(addCart)
    localStorage.setItem("cartData", JSON.stringify(cart))
}else{
    localStorage.setItem("cartData", JSON.stringify(addCart))
}
let similar = []
if(product.category=="jewelery"){
    const category = localStorage.getItem("catJewelery")
    similar = JSON.parse(category)
}else if(product.category=="electronics"){
    const category = localStorage.getItem("catTech")
    similar = JSON.parse(category)
}else if(product.category=="men's clothing"){
    const category = localStorage.getItem("catMen")
    similar = JSON.parse(category)
}else if(product.category=="women's clothing"){
    const category = localStorage.getItem("catWomen")
    similar = JSON.parse(category)
}
console.log(similar)
const productDescription = document.getElementById("description");
productDescription.innerHTML = ""
const productEl = document.createElement("div")
productEl.classList.add("productInfo")
productEl.innerHTML = `
<div class="row justify-content-center align-items-center mt-5">
    <div class="col-5 row justify-content-center">
        <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="col-5">
            <div>
                <h3>${product.title}</h3>
                <p>
                    ${product.description}
                </p>
                <span id="stars" class="vote">
                    ${getStars(product.rating.rate)}
                </span>
                <h3 class="fw-bold">
                    $${product.price}
                </h3>
                
            </div>
            <button type="button" class="btn btn-success">
                <i class="fa fa-shopping-cart"></i>
                <span>ADD TO CART</span>
            </button>
    </div>
</div>
`
productDescription.appendChild(productEl)
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
            <div class="row justify-content-center align-items-center mt-5">
            <div class="col-5 row justify-content-center">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="col-5">
                    <div>
                        <h3>${product.title}</h3>
                        <p>
                            ${product.description}
                        </p>
                        <span id="stars" class="vote">
                            ${getStars(product.rating.rate)}
                        </span>
                        <h3 class="fw-bold">
                            $${product.price}
                        </h3>
                    </div>
                    <button type="button" class="btn btn-danger">
                        <i class="fa fa-shopping-cart"></i>
                        <span>REMOVE</span>
                    </button>
                </div>
            </div>
            `
        } else {
            productEl.classList.remove("product_selected")
            const index = addCart.indexOf(product)
            addCart.splice(index,1)
            localStorage.setItem("cartData", JSON.stringify(addCart))
            productEl.innerHTML = `
            <div class="row justify-content-center align-items-center mt-5">
            <div class="col-5 row justify-content-center">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="col-5">
                    <div>
                        <h3>${product.title}</h3>
                        <p>
                            ${product.description}
                        </p>
                        <span id="stars" class="vote">
                            ${getStars(product.rating.rate)}
                        </span>
                        <h3 class="fw-bold">
                            $${product.price}
                        </h3>
                    </div>
                    <button type="button" class="btn btn-success">
                        <i class="fa fa-shopping-cart"></i>
                        <span>ADD TO CART</span>
                    </button>
                </div>
            </div>
            `
        }
    }else{
        
    }
})
similar.forEach((product) => {
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
            </div>
        </div>
        <p class="text-capitalize mx-auto mb-1 fw-bold">${category}</p>
    `
    productEl.addEventListener("click", (e) => {
        e.preventDefault()
        localStorage.setItem("productData", JSON.stringify(product))
        window.location.href = "desc.html"
        console.log("produkti")
    })
    
    main.appendChild(productEl)
});
function getStars(rating) {

    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
  
    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
      output.push('<p class="fa fa-star" aria-hidden="true" style="color: gold;"></p>&nbsp;');
  
    // If there is a half a star, append it
    if (i == .5) output.push('<p class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></p>&nbsp;');
  
    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
      output.push('<p class="fa fa-star-o" aria-hidden="true" style="color: gold;"></p>&nbsp;');
  
    return output.join('');
  
}