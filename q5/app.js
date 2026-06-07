const tabList = document.querySelector('.tab-list');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabList.addEventListener('click', (e) => {
    const targetBtn = e.target.closest('.tab-btn');
    if (!targetBtn) return;
    
    const targetTab = targetBtn.getAttribute('data-tab');
    
    tabButtons.forEach(btn => {
        if (btn === targetBtn) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    tabPanels.forEach(panel => {
        if (panel.id === `tab-${targetTab}`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
});
