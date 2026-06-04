const postId = new URLSearchParams(window.location.search).get('id')

const renderComment = (comment) => `
    <div class="comment">
        <h4>${comment.name}</h4>
        <p><strong>${comment.email}</strong></p>
        <p>${comment.body}</p>
    </div>
`

async function fetchAndDisplayPost() {
    try {
        const postResponse = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
        )

        if (!postResponse.ok) {
            throw new Error('Ошибка загрузки поста')
        }

        const post = await postResponse.json()

        document.getElementById('post-title').textContent = post.title
        document.getElementById('post-body').textContent = post.body

        const commentsResponse = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        )

        if (!commentsResponse.ok) {
            throw new Error('Ошибка загрузки комментариев')
        }

        const comments = await commentsResponse.json()

        document.getElementById('comments').innerHTML = comments
            .map(renderComment)
            .join('')

    } catch (error) {
        document.body.innerHTML = 'Ошибка загрузки поста'
        console.log(error)
    }
}

fetchAndDisplayPost()
