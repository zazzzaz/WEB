export class Catalog {
    #root = null
    #paginationEl = null
    #itemsEl = null
    #currentPage = null
    #totalItems = null
    #renderItem = null
    #fetchItems = null

    static PAGE_SIZE = 12

    constructor(el, options) {
        const { renderItem, getItems } = options
        this.#root = el
        this.#currentPage = this.readPageFromUrl()
        this.#paginationEl = el.querySelector('[data-catalog-pagination]')
        this.#itemsEl = el.querySelector('[data-catalog-items]')
        this.#renderItem = renderItem
        this.#fetchItems = getItems
    }

    get limit() {
        return Catalog.PAGE_SIZE
    }

    get pageCount() {
        return Math.ceil(this.#totalItems / this.limit)
    }

    init() {
        window.onpopstate = () => {
            const pageFromUrl = this.readPageFromUrl()

            if (pageFromUrl !== this.#currentPage) {
                this.#currentPage = pageFromUrl
                this.loadItems()
            }
        }

        this.#paginationEl.addEventListener('click', (event) => {
            const target = event.target.closest('[data-catalog-pagination-page]')

            if (!target) {
                return
            }

            this.#currentPage = +target.dataset.catalogPaginationPage
            this.updateUrl()
            this.loadItems()
        })

        this.loadItems()
    }

    readPageFromUrl() {
        const pageParam = new URL(window.location.href).searchParams.get('page')
        return Number(pageParam) || 1
    }

    updateUrl() {
        const url = new URL(window.location.href)
        url.searchParams.set('page', this.#currentPage)
        window.history.pushState({}, '', url)
    }

    async loadItems() {
        try {
            const { items, total } = await this.#fetchItems({
                limit: this.limit,
                page: this.#currentPage,
            })

            this.#totalItems = total
            this.renderItems(items)
            this.renderPagination()
        } catch (error) {
            this.#itemsEl.innerHTML = 'Ошибка загрузки'
            this.#paginationEl.innerHTML = ''
        }
    }

    renderItems(items) {
        this.#itemsEl.innerHTML = items.map(this.#renderItem).join('')
    }

    renderPagination() {
        const buttons = Array.from({ length: this.pageCount }, (_, index) => {
            const pageNumber = index + 1
            const isActive = pageNumber === this.#currentPage
            const className = isActive
                ? 'catalog__pagination-item catalog__pagination-item_active'
                : 'catalog__pagination-item'

            return `
                <button
                    class="${className}"
                    data-catalog-pagination-page="${pageNumber}"
                >
                    ${pageNumber}
                </button>
            `
        })

        this.#paginationEl.innerHTML = buttons.join('')
    }
}
