const xhrequest = new XMLHttpRequest();

xhrequest.open("GET", "https://jsonplaceholder.typicode.com/posts");

// xhrequest.onload = function () {
//   //   console.log(xhrequest.response);
//   const info = JSON.parse(xhrequest.response);
//   console.log(info);
// };
xhrequest.addEventListener("load", () => {
  const info = JSON.parse(xhrequest.response);
  console.log(info);
});

//?open takes two para. 1=> method 2=> URL
//!in order to send the request we use send()
xhrequest.send();
