import api from "../services/api.js";

const TodoRepository = {
    async getAll() {
        return await api("/todo");
    },

    // создать новый todo
    async create(values) {
        return await api('/todo', {
            method: 'POST',
            body: JSON.stringify(values)
        });
    },

    //выполнить todo
    async update(id, values) {
        return await api(`/todo/${id}`, {
            method: "PUT",
            body: JSON.stringify(values),
        });
    },

    //удалить todo
    async remove(id) {
        return await api(`/todo/${id}`, {
            method: 'DELETE',
        });
    },
}

export default TodoRepository;