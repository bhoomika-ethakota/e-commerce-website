

async function addproduct(event) {
    event.preventDefault();

    console.log('pp', event);


    let productname = event.target.productname.value;
    let brandname = event.target.brandname.value;
    let category = event.target.category.value;
    let quantity = event.target.quantity.value;
    let originalprice = event.target.originalprice.value;
    let saleprice = event.target.saleprice.value;
    let rating = event.target.rating.value;
    let special = event.target.special.value;
    let imageurlone = event.target.imageurlone.value;
    let imageurltwo = event.target.imageurltwo.value;
    let description = event.target.description.value;




    console.log('99', productname, brandname, category, quantity, originalprice, saleprice, rating, special, imageurlone, imageurltwo, description);



    const url = 'http://localhost:4000/product-api/addproduct';
    const data = {
        productname: productname,
        brandname: brandname,
        category: category,
        quantity: quantity,
        originalprice: originalprice,
        saleprice: saleprice,
        rating: rating,
        special: special,
        imageurlone: imageurlone,
        imageurltwo: imageurltwo,
        description: description,
        reviews: ["Stylish men's wear with great fit and quality.",
            "Comfortable and trendy options for modern gentlemen.",
            "Elevate your style with these top-notch men's fashion choices.",
            "Exceptional men's clothing that balances style and comfort.",
            "Upgrade your wardrobe with these fashion-forward men's pieces."]
    }

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

    if (res.message == "product added successfully") {
        alert("product added successfully");
    }

}
