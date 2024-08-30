async function validate(event) {
  event.preventDefault();

  console.log('pp', event);



  let email = event.target.username.value;
  let password = event.target.password.value;

  console.log(email, password);

  const url = 'http://localhost:4000/user-api/login';
  const data = {
    email: email,
    password: password
  }

  const loginelement = document.getElementById("login");
  const logoutelement = document.getElementById("logout");
  const cartlogoutelement = document.getElementById("logoutcart");
  const admintype = document.getElementById("admintype");


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

  let emailEl = document.getElementById("emailerrortext");
  let passEl = document.getElementById("passerrortext");

  if (res.message == "success") {
    emailEl.classList.add("displayData");
    passEl.classList.add("displayData");
    loginelement.classList.add("displayData");
    logoutelement.classList.remove("displayData");
    cartlogoutelement.classList.remove("displayData");
    console.log(userlogindata.usertype);
    if (res.payload.usertype === "admin") {
      admintype.classList.remove("displayData");
    }

    localStorage.setItem("userloginstatus", JSON.stringify("true"));
    localStorage.setItem("cartproductsdata", JSON.stringify(res.payload.cart));
    localStorage.setItem("userlogindata", JSON.stringify(res.payload));

    alert("success");

    window.location.href = "/MensPage/mensPage.html";
  }
  else if (res.message === 'Invalid Username') {
    // User not found handling
    emailEl.classList.remove("displayData");
    passEl.classList.remove("displayData");
  }
  else {
    // Incorrect password handling
    emailEl.classList.add("displayData");
    passEl.classList.remove("displayData");
  }
}
