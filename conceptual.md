### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
    Promises, Async and await, and callbacks

- What is a Promise?
    Promises are objects that represent the exentual completion of an async operation and its value.

- What are the differences between an async function and a regular function?
    Async - uses ASYNC keyword, returns a promise, can also use AWAIT keyword.
    Regular - doesn't use ASYNC keyword, doesn't return a promise, doesn't use AWAIT keyword.

- What is the difference between Node.js and Express.js?
    Node - a JavaScript runtime built on Chrome V8. Used for server-side apps
    Express - Web app framework for Node, providing a set of features for building web apps and APIs

- What is the error-first callback pattern?
    The first argument to a callback function is an error object, and the second argument is the return of the function.

- What is middleware?
    A function that runs between the req and res in a web app. It performs authentication, logging, and/or data manipulation.

- What does the `next` function do?
    Indicates to the framework (in Express) that the current middleware should pass control to the next middleware in the callstack.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
  Three separate requests to the GitHub API is slow. The code combines three async operations into one function which is difficult to read and maintain. Also, the variable names could be more indicative of what they mean, but this isn't a huge issue. On huge issue that does exist though is that there isn't any error-first callback or any error handling at all.
