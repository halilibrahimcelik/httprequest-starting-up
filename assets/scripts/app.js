const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const xhrequest = new XMLHttpRequest();

xhrequest.open("GET", "https://jsonplaceholder.typicode.com/posts");

xhrequest.responseType = "json"; //!with responseType there is no need for JSON.parse
// xhrequest.onload = function () {
//   //   console.log(xhrequest.response);
//   const info = JSON.parse(xhrequest.response);
//   console.log(info);
// };
xhrequest.addEventListener("load", () => {
  const info = xhrequest.response;
  console.log(info);
  for (let post of info) {
    const postElement = document.importNode(postTemplate.content, true); //! we make a deep clone
    postElement.querySelector("h2").textContent = post.title.toUpperCase();
    postElement.querySelector("p").textContent = post.body;
    listElement.append(postElement);
  }
});

//?open takes two para. 1=> method 2=> URL
//!in order to send the request we use send()
xhrequest.send();

//!adding Json data to the DOM
