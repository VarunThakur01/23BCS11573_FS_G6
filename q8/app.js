const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const timeFilter = document.getElementById('time-filter');

const kpiRevenue = document.getElementById('kpi-revenue');
const kpiCustomers = document.getElementById('kpi-customers');
const kpiConversion = document.getElementById('kpi-conversion');
const kpiSessions = document.getElementById('kpi-sessions');

const kpiRevenueTrend = document.getElementById('kpi-revenue-trend');
const kpiCustomersTrend = document.getElementById('kpi-customers-trend');
const kpiConversionTrend = document.getElementById('kpi-conversion-trend');
const kpiSessionsTrend = document.getElementById('kpi-sessions-trend');

const chartBars = document.querySelectorAll('.chart-bar');
const paymentsBody = document.getElementById('payments-body');

const dataSet = {
    '7d': {
        revenue: '$24,890',
        customers: '1,482',
        conversion: '2.84%',
        sessions: '482',
        trends: {
            revenue: '+12.4% vs last week',
            customers: '+8.2% vs last week',
            conversion: '-0.4% vs last week',
            sessions: '+24.1% vs last week'
        },
        chartHeights: ['60%', '75%', '45%', '90%', '80%', '55%', '35%'],
        payments: [
            { name: "Alex Rivera", status: "Success", class: "status-success", amount: "$320.00" },
            { name: "Marcus Chen", status: "Success", class: "status-success", amount: "$1,200.00" },
            { name: "Sarah Vance", status: "Pending", class: "status-pending", amount: "$85.50" },
            { name: "Emily Taylor", status: "Failed", class: "status-failed", amount: "$450.00" }
        ]
    },
    '30d': {
        revenue: '$104,240',
        customers: '6,812',
        conversion: '3.12%',
        sessions: '2,109',
        trends: {
            revenue: '+18.6% vs last month',
            customers: '+14.3% vs last month',
            conversion: '+0.2% vs last month',
            sessions: '+15.4% vs last month'
        },
        chartHeights: ['85%', '90%', '70%', '65%', '88%', '75%', '50%'],
        payments: [
            { name: "Jessica Alba", status: "Success", class: "status-success", amount: "$940.00" },
            { name: "David Miller", status: "Success", class: "status-success", amount: "$510.00" },
            { name: "Marcus Chen", status: "Success", class: "status-success", amount: "$3,100.00" },
            { name: "Sarah Vance", status: "Success", class: "status-success", amount: "$225.00" }
        ]
    },
    'all': {
        revenue: '$912,480',
        customers: '42,190',
        conversion: '2.95%',
        sessions: '14,820',
        trends: {
            revenue: '+45.2% overall',
            customers: '+38.7% overall',
            conversion: '+0.5% overall',
            sessions: '+52.1% overall'
        },
        chartHeights: ['95%', '85%', '90%', '80%', '92%', '88%', '78%'],
        payments: [
            { name: "Marcus Chen", status: "Success", class: "status-success", amount: "$12,400.00" },
            { name: "David Miller", status: "Success", class: "status-success", amount: "$8,500.00" },
            { name: "Jessica Alba", status: "Success", class: "status-success", amount: "$4,200.00" },
            { name: "Alex Rivera", status: "Success", class: "status-success", amount: "$3,800.00" }
        ]
    }
};

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('active') && !sidebar.contains(e.target)) {
        sidebar.classList.remove('active');
    }
});

timeFilter.addEventListener('change', () => {
    const selected = timeFilter.value;
    const data = dataSet[selected];
    
    kpiRevenue.textContent = data.revenue;
    kpiCustomers.textContent = data.customers;
    kpiConversion.textContent = data.conversion;
    kpiSessions.textContent = data.sessions;
    
    kpiRevenueTrend.textContent = data.trends.revenue;
    kpiCustomersTrend.textContent = data.trends.customers;
    kpiConversionTrend.textContent = data.trends.conversion;
    kpiSessionsTrend.textContent = data.trends.sessions;
    
    chartBars.forEach((bar, index) => {
        bar.style.height = data.chartHeights[index];
    });
    
    paymentsBody.innerHTML = '';
    data.payments.forEach(payment => {
        const tr = document.createElement('tr');
        
        const tdName = document.createElement('td');
        tdName.textContent = payment.name;
        
        const tdStatus = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = `badge ${payment.class}`;
        badge.textContent = payment.status;
        tdStatus.appendChild(badge);
        
        const tdAmount = document.createElement('td');
        tdAmount.textContent = payment.amount;
        
        tr.appendChild(tdName);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAmount);
        paymentsBody.appendChild(tr);
    });
});
