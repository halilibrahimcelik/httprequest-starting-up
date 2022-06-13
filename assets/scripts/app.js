const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");

function sendHtttpRequest(method, url) {
  const promise = new Promise((resolve, reject) => {
    const xhrequest = new XMLHttpRequest();
    xhrequest.open(method, url);

    xhrequest.responseType = "json"; //!with responseType there is no need for JSON.parse

    xhrequest.addEventListener("load", () => {
      resolve(xhrequest.response);
    });

    //?open takes two para. 1=> method 2=> URL
    //!in order to send the request we use send()
    xhrequest.send();
  });

  return promise;
}

async function fetchPosts() {
  const responseData = await sendHtttpRequest(
    "GET",
    "https://jsonplaceholder.typicode.com/posts"
  );

  const info = responseData;
  console.log(info);
  for (let post of info) {
    const postElement = document.importNode(postTemplate.content, true); //! we make a deep clone
    postElement.querySelector("h2").textContent = post.title.toUpperCase();
    postElement.querySelector("p").textContent = post.body;
    listElement.append(postElement);
  }
}

fetchPosts();

//!sending Data with POST request
