const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const fetchButton = document.querySelector("#available-posts button");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhrequest = new XMLHttpRequest();
    xhrequest.open(method, url);

    xhrequest.responseType = "json"; //!with responseType there is no need for JSON.parse

    xhrequest.addEventListener("load", () => {
      if (xhrequest.status >= 200 && xhrequest.status < 300) {
        resolve(xhrequest.response);
      } else {
        reject(new Error("Something in the way"));
      }
    });

    xhrequest.addEventListener("error", () => {
      new Error("failed to send request");
    });
    //?open takes two para. 1=> method 2=> URL
    //!in order to send the request we use send()
    xhrequest.send(JSON.stringify(data));
  });

  return promise;
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts/"
    );

    const info = responseData;
    console.log(info);
    for (let post of info) {
      const postElement = document.importNode(postTemplate.content, true); //! we make a deep clone
      postElement.querySelector("h2").textContent = post.title.toUpperCase();
      postElement.querySelector("p").textContent = post.body;
      postElement.querySelector("li").id = post.id;
      listElement.append(postElement);
    }
  } catch (error) {
    alert(error);
  }
}

// fetchPosts();
fetchButton.addEventListener("click", () => {
  fetchPosts();
});

//!sending Data with POST request

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

// createPost("TEST", "A dummy post!");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //   const enteredTitle = event.currentTarget.querySelector("#title").value;
  let enteredTitle = event.currentTarget.querySelector("#title");
  let enteredContent = event.currentTarget.querySelector("#content");
  createPost(enteredTitle.value, enteredContent.value);

  enteredTitle.value = "";
  enteredContent.value = "";
});

postList.addEventListener("click", (event) => {
  //   if (event.target.classList.contains("btn")) {
  //     console.log("clicked a button");
  //   }
  if ((event.target.tagName = "BUTTON")) {
    const postId = event.target.closest("li").id;

    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    event.target.closest("li").remove();
  }
});
