// Global variables
const targetWomen = 11000;
const currentProgress = 850;
const yearlyTarget2025 = 1100;

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    updateProgressBar();
    initializeCharts();
});

// Update current date
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
}

// Update progress bar
function updateProgressBar() {
    const progressPercentage = (currentProgress / targetWomen) * 100;
    const progressFill = document.getElementById('progressFill');
    const progressPercentageText = document.getElementById('progressPercentage');
    
    // Animate progress bar
    setTimeout(() => {
        progressFill.style.width = `${progressPercentage}%`;
        progressPercentageText.textContent = `${progressPercentage.toFixed(1)}%`;
    }, 500);
}

// Initialize all charts
function initializeCharts() {
    createRegionalChart();
    createProgressChart();
    createCategoriesChart();
    createSupplyChainChart();
}

// Regional Distribution Doughnut Chart
function createRegionalChart() {
    const ctx = document.getElementById('regionalChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Kwale County', 'Shimoni', 'Vanga', 'Mombasa County'],
            datasets: [{
                data: [320, 245, 180, 105],
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#f093fb',
                    '#f5576c'
                ],
                borderWidth: 3,
                borderColor: '#fff',
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value} women (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%',
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Yearly Progress Line Chart
function createProgressChart() {
    const ctx = document.getElementById('progressChart').getContext('2d');
    
    // Calculate projected data
    const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];
    const actualData = [350, 850, null, null, null, null, null];
    const projectedData = [350, 850, 2750, 4650, 6550, 8450, 11000];
    const targetData = [2200, 4400, 6600, 8800, 11000, 11000, 11000];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Actual Progress',
                    data: actualData,
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#27ae60',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    fill: true
                },
                {
                    label: 'Projected Progress',
                    data: projectedData,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    borderDash: [5, 5],
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    fill: false
                },
                {
                    label: 'Original Target',
                    data: targetData,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 2,
                    borderDash: [10, 5],
                    pointRadius: 3,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#e74c3c',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y || 'N/A'} women`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 12000,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Empowerment Categories Doughnut Chart
function createCategoriesChart() {
    const ctx = document.getElementById('categoriesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Direct Fishing',
                'Fish Processing',
                'Cold Chain Management', 
                'Market Trading',
                'Equipment Support'
            ],
            datasets: [{
                data: [320, 180, 150, 130, 70],
                backgroundColor: [
                    '#4ecdc4',
                    '#45b7d1',
                    '#96ceb4',
                    '#ffeaa7',
                    '#fab1a0'
                ],
                borderWidth: 3,
                borderColor: '#fff',
                hoverBorderWidth: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 11,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value} women (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '50%',
            animation: {
                animateRotate: true,
                duration: 2000
            }
        }
    });
}

// Supply Chain Impact Bar Chart
function createSupplyChainChart() {
    const ctx = document.getElementById('supplyChainChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Fishing', 'Processing', 'Storage', 'Transportation', 'Retail'],
            datasets: [
                {
                    label: 'Direct Impact',
                    data: [320, 180, 150, 95, 105],
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: '#667eea',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                },
                {
                    label: 'Indirect Impact',
                    data: [480, 270, 225, 140, 160],
                    backgroundColor: 'rgba(118, 75, 162, 0.8)',
                    borderColor: '#764ba2',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} women`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to metric cards
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animations to location cards
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Update current progress counter with animation
    animateCounter();
});

// Animate counter function
function animateCounter() {
    const counter = document.getElementById('currentProgress');
    const target = parseInt(counter.textContent);
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current).toLocaleString();
    }, 20);
}