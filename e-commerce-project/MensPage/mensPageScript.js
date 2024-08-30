const main = document.getElementById("thumb");


function productMaker(dataProductData) {
  main.innerHTML = '';
  dataProductData.forEach(dataProduct => {
    const productContainer = document.createElement("div");
    productContainer.className = "col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3 mt-4"
    productContainer.innerHTML = `<div class="product-grid">
        <div class="product-image">
        <a href="#" class="image">
            <img class="pic-1" src="${dataProduct.imageurlone}">
            <img class="pic-2" src="${dataProduct.imageurltwo}">
        </a>
        <span class="product-hot-label">sale</span>
        <ul class="product-links">
            <li><a href="#" data-tip="Add to Wishlist"><i class="far fa-heart"></i></a></li>
            <li><a href="#" data-tip="Compare"><i class="fa fa-random"></i></a></li>
            <li><a href="#" data-tip="Quick View"><i class="fa fa-search"></i></a></li>
        </ul>
    </div>
            <div class="product-content">
                <a class="add-to-cart btn" data-id="${dataProduct._id}" data-productname="${dataProduct.productname}" data-brand="${dataProduct.brandname}" data-price="${dataProduct.saleprice}" data-image="${dataProduct.imageurlone}">
                    <i class="fas fa-plus"></i> Add to cart
                </a>
                <h3 class="title">${dataProduct.productname}</h3>
                <ul class="rating">
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="fas fa-star"></li>
                  <li class="far fa-star"></li>
                  <li class="far fa-star"></li>
              </ul>
                <div class="price">Rs. ${dataProduct.saleprice}</div>
            </div>
        </div>`;

    const addToCartButton = productContainer.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", addToCart);

    main.appendChild(productContainer);
  });
}


function addToCart(event) {
  const id = event.target.getAttribute("data-id");
  const name = event.target.getAttribute("data-productname");
  const brand = event.target.getAttribute("data-brand");
  const price = parseFloat(event.target.getAttribute("data-price"));
  const imageUrl = event.target.getAttribute("data-image");

  let dataState = JSON.parse(localStorage.getItem("cartproductsdata")) || [];

  let flag = 0;

  const Items = dataState.map((product) => {

    if (product.id === (id)) {

      let qaty = parseInt(product.quantity)
      flag = 1;
      return { ...product, quantity: qaty + 1 };
    }
    return product;
  });



  if (flag == 0) {
    console.log(dataState);
    let data = {
      id: id,
      productname: name,
      brandname: brand,
      saleprice: price,
      imageurlone: imageUrl,
      quantity: 1
    }
    dataState.push(data)
    localStorage.setItem("cartproductsdata", JSON.stringify(dataState));
  }
  else {
    localStorage.setItem("cartproductsdata", JSON.stringify(Items));
  }


  alert("added");
}

const loginelement = document.getElementById("login");
const logoutelement = document.getElementById("logout");

async function defaultCondition() {

  let userloginstatus = JSON.parse(localStorage.getItem("userloginstatus")) || [];

  if (userloginstatus == "true") {
    loginelement.classList.add("displayData");
    logoutelement.classList.remove("displayData");
  }


  const url = 'http://localhost:4000/product-api/getproducts/mens';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  let res = await fetch(url, options)
    .then(res => res.json())
    .catch(err => console.log(err));

  const date = res.payload
  console.log('88', date);
  {
    productMaker(date);
    localStorage.setItem("filterData", JSON.stringify(date));
    localStorage.setItem("categoryData", JSON.stringify(date));
  }

}

defaultCondition();



// search section

const searchBar = document.querySelector(".searchBar");

searchBar.addEventListener("input", function () {
  const searchTerm = searchBar.value.toLowerCase();

  let filterData = JSON.parse(localStorage.getItem("filterData")) || [];


  if (searchTerm === "") {
    productMaker(filterData);
  }
  else {
    const filteredItems = filterData.filter(dataProduct => dataProduct.productname.toLowerCase().includes(searchTerm.toLowerCase()));
    productMaker(filteredItems);
  }
});
