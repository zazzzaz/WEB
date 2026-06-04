import { Catalog } from "./src/components/catalog.js"

const createPostCard = (item) => `
    <a
        href="posts.html?id=${item.id}"
        class="post-item"
    >
        <span class="post-item__title">
            ${item.title}
        </span>

        <span class="post-item__body">
            ${item.body}
        </span>
    </a>
`

const fetchPosts = async ({ limit, page }) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    )

    if (!response.ok) {
        throw new Error('Ошибка загрузки постов')
    }

    const total = +response.headers.get('x-total-count')
    const items = await response.json()

    return { items, total }
}

const createPhotoCard = (item) => `
    <a
        href="photos/${item.id}"
        class="photo-item"
    >
        <span class="photo-item__title">
            ${item.title}
        </span>

        <img
            src=${item.url}
            class="photo-item__image"
        >
    </a>
`

const fetchPhotos = async ({ limit, page }) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
    )

    if (!response.ok) {
        throw new Error('Ошибка загрузки фото')
    }

    const total = +response.headers.get('x-total-count')
    const items = await response.json()

    return { items, total }
}

const bootstrapCatalog = () => {
    const catalogEl = document.getElementById('catalog')

    new Catalog(catalogEl, {
        renderItem: createPostCard,
        getItems: fetchPosts,
    }).init()
}

document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', bootstrapCatalog)
    : bootstrapCatalog()
