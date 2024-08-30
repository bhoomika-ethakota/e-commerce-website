const main = document.getElementById("cartdata");
const tamount = document.getElementById("totalamount");

let dataState = JSON.parse(localStorage.getItem("data")) || [];

let sum = 0


async function defaultCondition() {
    sum = 0;
    tamount.innerHTML = ""
    main.innerHTML = ""
    let dataState = JSON.parse(localStorage.getItem("cartproductsdata")) || [];
    dataState.forEach(element => {
        let totalValue = element.quantity * element.saleprice;
        sum = sum + totalValue;
        const productContainer = document.createElement("tr");
        //     productContainer.className = "d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
        //     productContainer.innerHTML = `<div class="mr-1"><img class="rounded" src="https://assets.ajio.com/medias/sys_master/root/20230703/YxKm/64a2f7b8eebac147fc48ac99/-1117Wx1400H-466325670-purple-MODEL2.jpg" width="70"></div>
        //     <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">${element.name}</span>
        //         <div class="d-flex flex-row product-desc">
        //             <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
        //             <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
        //         </div>
        //     </div>
        //     <div class="d-flex flex-row align-items-center qty"><i class="fa fa-minus text-danger"></i>
        //         <h5 class="text-grey mt-1 mr-1 ml-1">${element.quantity}</h5><i class="fa fa-plus text-success"></i></div>
        //     <div>
        //         <h5 class="text-grey">$20.00</h5>
        //     </div>
        //     <div class="d-flex align-items-center"><i class="fa fa-trash mb-1 text-danger"></i></div>
        // `
        productContainer.className = "border rounded"
        productContainer.innerHTML = `<td>
        <figure class="itemside align-items-center">
            <div class="aside "><img src="${element.imageurlone}" class="img-sm"></div>
            <figcaption class="info d-none d-md-block"> <a href="#" class="title text-dark" data-abc="true">${element.productname}</a>
                <p class="small text-muted text-lowercase">Brand: ${element.brandname}</p>
            </figcaption>
        </figure>
        </td >
        <td> <a class="decrementCount btn text-dark fs-5" data-id="${element.id}" data-quantity="${element.quantity}" >-</a><a class="fs-6 text-dark"  >${element.quantity}</a><a class="incrementCount btn fs-5 text-dark" data-id="${element.id}" data-quantity="${element.quantity}">+</a>
        </td>
        <td>
            <div class="price-wrap"> <var class="price">Rs.${totalValue}</var> <small class="text-muted"><i>Rs. ${element.saleprice} each<i></small> </div>
        </td>
        <td class="text-right"> <a class="delete-item btn btn-light border" data-id="${element.id}"  >x</a></td>`

        const deleteFromCart = productContainer.querySelector(".delete-item")
        deleteFromCart.addEventListener("click", deleteItemFromCart);

        const decrementCountCart = productContainer.querySelector(".decrementCount");
        decrementCountCart.addEventListener("click", decrementQuantity);

        const incrementCountCart = productContainer.querySelector(".incrementCount");
        incrementCountCart.addEventListener("click", incrementQuantity);
        main.appendChild(productContainer);
    });
    tamount.innerHTML += `${sum}`;



    let dataCart = JSON.parse(localStorage.getItem("cartproductsdata")) || [];
    let userData = JSON.parse(localStorage.getItem("userlogindata")) || [];


    const url = 'http://localhost:4000/user-api/updateuser';
    const data = { ...userData, cart: dataCart }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    let res = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.log(err));

    console.log(res);

}

defaultCondition();


function decrementQuantity(event) {
    const id = event.target.getAttribute("data-id");
    const qty = event.target.getAttribute("data-quantity");
    const qaty = parseInt(qty);

    let dataState = JSON.parse(localStorage.getItem("cartproductsdata")) || [];
    if (qaty == 1) {

        const Items = dataState.filter(dataProduct => dataProduct.id !== (id));
        localStorage.setItem("cartproductsdata", JSON.stringify(Items));
    }
    else {
        const Items = dataState.map((product) => {

            if (product.id === (id)) {

                return { ...product, quantity: qaty - 1 };
            }
            return product;
        });
        localStorage.setItem("cartproductsdata", JSON.stringify(Items));
    }


    defaultCondition();

}

function incrementQuantity(event) {
    const id = event.target.getAttribute("data-id");
    const qty = event.target.getAttribute("data-quantity");
    const qaty = parseInt(qty);
    console.log('ii', id);

    let dataState = JSON.parse(localStorage.getItem("cartproductsdata")) || [];
    const Items = dataState.map((product) => {
        console.log('3232', product.id, (id))
        if (product.id === (id)) {

            return { ...product, quantity: qaty + 1 };
        }
        return product;
    });

    localStorage.setItem("cartproductsdata", JSON.stringify(Items));

    defaultCondition();

}



function deleteItemFromCart(event) {
    const id = event.target.getAttribute("data-id");
    console.log('pp', id);


    let dataState = JSON.parse(localStorage.getItem("cartproductsdata")) || [];

    const Items = dataState.filter(dataProduct => dataProduct.id !== (id));

    console.log(Items, id);

    localStorage.setItem("cartproductsdata", JSON.stringify(Items));

    defaultCondition();

}

let payment = document.getElementById("payment");

payment.addEventListener("click", async function () {

    let userData = JSON.parse(localStorage.getItem("userlogindata")) || [];


    const url = 'http://localhost:4000/user-api/updateuser';
    const data = { ...userData, cart: [] }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    let res = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.log(err));

    localStorage.setItem("cartproductsdata", JSON.stringify([]));

    alert("payment successful");

    defaultCondition();
});

