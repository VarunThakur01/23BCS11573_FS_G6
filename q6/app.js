const listContainer = document.getElementById('list-container');
const itemsCount = document.getElementById('items-count');

const totalItems = 1200;
let currentCount = totalItems;

function initList() {
    const fragment = document.createDocumentFragment();
    
    for (let i = 1; i <= totalItems; i++) {
        const item = document.createElement('div');
        item.className = 'list-item';
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'item-title';
        titleSpan.textContent = `Notification Feed Item #${i}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        
        item.appendChild(titleSpan);
        item.appendChild(deleteBtn);
        fragment.appendChild(item);
    }
    
    listContainer.appendChild(fragment);
    updateCountDisplay();
}

function updateCountDisplay() {
    itemsCount.textContent = currentCount;
}

listContainer.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('.delete-btn');
    if (!targetBtn) return;
    
    const listItem = targetBtn.closest('.list-item');
    if (listItem) {
        listItem.remove();
        currentCount--;
        updateCountDisplay();
    }
});

initList();
