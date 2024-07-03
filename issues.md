# Broken App Issues

1. When you use .map with an ASYNC function, you need to wait for promises to resolve. The original code didn't wait, so you could end up with either incomplete data and race conditions where you are stuck hoping that the order of operations resolves as expected.
2. I didn't see any specific error handling for individual reqs to the GitHub API. That creates instability where any failed request could crash everything, especially since GitHub has rate limiting sensitivity.
3. To access req.body, you need middleware to parse the JSON body, and the original code didn't have any middleware.
4. The code should use res.json(out) instead of res.send(JSON.stringify(out))

