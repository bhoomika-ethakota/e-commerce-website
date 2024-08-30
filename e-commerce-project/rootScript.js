const loginelement = document.getElementById("login");
const logoutelement = document.getElementById("logout");
const cartlogoutelement = document.getElementById("logoutcart");
const admintype = document.getElementById("admintype");


let userloginstatus = JSON.parse(localStorage.getItem("userloginstatus")) || [];
let userlogindata = JSON.parse(localStorage.getItem("userlogindata")) || [];

if (userloginstatus == "true") {
    loginelement.classList.add("displayData");
    logoutelement.classList.remove("displayData");
    cartlogoutelement.classList.remove("displayData");
    if (userlogindata.usertype === "admin") {
        console.log("))");
        admintype.classList.remove("displayData");
    }
}
else {
    loginelement.classList.remove("displayData");
    logoutelement.classList.add("displayData");
    admintype.classList.add("displayData");
    cartlogoutelement.classList.add("displayData");
    admintype.classList.add("displayData");
}

logoutelement.addEventListener("click", async function () {

    console.log("logout");

    loginelement.classList.remove("displayData");
    logoutelement.classList.add("displayData");
    admintype.classList.add("displayData");
    cartlogoutelement.classList.add("displayData");
    admintype.classList.add("displayData");

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



    localStorage.setItem("userloginstatus", JSON.stringify("false"));
    localStorage.setItem("cartproductsdata", JSON.stringify([]));
    localStorage.setItem("userlogindata", JSON.stringify([]));
    console.log("Logout button clicked");


    window.location.href = "/MensPage/mensPage.html";
});
