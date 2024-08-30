
function checkPassword(password) {
  console.log('==', password)
  const minLength = 8;
  const uppercasePattern = /[A-Z]/;
  const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-="']/;
  if (
    password.length >= minLength &&
    uppercasePattern.test(password) &&
    specialCharPattern.test(password)
  ) {
    return true;
  } else {
    return false;
  }
}



async function validate(event) {
  event.preventDefault();

  console.log('pp', event);


  let fullname = event.target.fullname.value;
  let email = event.target.email.value;
  let password = event.target.password.value;
  let mobilenumber = event.target.mobilenumber.value;
  let gender = event.target.genderradiooptions.value;
  let usertype = event.target.usertypeoptions.value;

  console.log(fullname, email, password, mobilenumber, gender, usertype);

  let fullnameError = document.getElementById("fullnameerrortext");
  let emailError = document.getElementById("emailerrortext");
  let passwordError = document.getElementById("passworderrortext");
  let mobilenumberError = document.getElementById("mobilenumbererrortext");

  fullnameError.classList.add("diaplayData");
  emailError.classList.add("displayData");
  passwordError.classList.add("displayData");
  mobilenumberError.classList.add("displayData");


  const url = 'http://localhost:4000/user-api/checkuser';
  const data = {
    fullname: fullname,
    email: email,
    password: password,
    mobilenumber: mobilenumber,
    gender: gender,
    usertype: usertype,
    cart: []
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

  let flag = 0;


  if (res.message == "username has already taken") {
    emailError.classList.remove("displayData");
    flag = 1
  }
  if (checkPassword(password) === false) {
    console.log(']]')
    passwordError.classList.remove("displayData");
    flag = 1
  }
  if (mobilenumber.length !== 10) {
    console.log('[[');
    mobilenumberError.classList.remove("displayData");
    flag = 1
  }
  if (flag == 0) {
    const url = 'http://localhost:4000/user-api/adduser';
    const data = {
      fullname: fullname,
      email: email,
      password: password,
      mobilenumber: mobilenumber,
      gender: gender,
      usertype: usertype,
      cart: []
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
    alert("user added suucessfully");
    window.location.href = "/LoginPage/LoginPage.html"

  }
}
