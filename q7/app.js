const cards = document.querySelectorAll('.task-card');
const columns = document.querySelectorAll('.kanban-column');

cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
        card.classList.add('dragging');
        e.dataTransfer.setData('text/plain', card.id);
    });

    card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
    });
});

columns.forEach(column => {
    const cardsContainer = column.querySelector('.column-cards');

    column.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    column.addEventListener('dragenter', (e) => {
        e.preventDefault();
        column.classList.add('drag-over');
    });

    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });

    column.addEventListener('drop', (e) => {
        e.preventDefault();
        const cardId = e.dataTransfer.getData('text/plain');
        const card = document.getElementById(cardId);
        if (card && cardsContainer) {
            cardsContainer.appendChild(card);
        }
        column.classList.remove('drag-over');
    });
});
