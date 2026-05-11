// Chart.js Configuration
Chart.defaults.color = '#888';
Chart.defaults.borderColor = '#2a2a40';

// Key Findings data for each competitor
const keyFindings = {
    yours: {
        highlight: "Your brand is starting from zero organic traffic",
        insight: "This is actually an advantage - you can build SEO the right way from day one without legacy issues."
    },
    diptyque: {
        highlight: "Diptyque leads with 374K organic traffic and +8.2% growth",
        insight: "Their content strategy and brand authority make them the benchmark to study and learn from."
    },
    jomalone: {
        highlight: "Jo Malone is declining at -6.4% traffic",
        insight: "This represents a significant market share opportunity for Luce Divina to capture with the right SEO and content strategy."
    },
    byredo: {
        highlight: "Byredo maintains 192K traffic with +3.1% growth",
        insight: "Their minimalist brand positioning resonates well in the luxury segment."
    },
    lelabo: {
        highlight: "Le Labo has exceptional brand loyalty and cult following",
        insight: "From $60M acquisition to projected $600M revenue - proof that premium positioning works."
    },
    baobab: {
        highlight: "Baobab targets the ultra-luxury segment with $300+ candles",
        insight: "Their success proves there's demand for statement luxury home fragrance."
    },
    bigass: {
        highlight: "Big Ass Luxuries has 7.3K organic traffic with niche positioning",
        insight: "Their quirky branding creates memorable differentiation in a crowded market."
    },
    forvr: {
        highlight: "FORVR Mood leverages celebrity founder (Jackie Aina)",
        insight: "Influencer-founded brands can accelerate growth through built-in audiences."
    },
    williec: {
        highlight: "Willie C is a micro-brand with 200 monthly visitors",
        insight: "Even small brands can succeed with focused positioning and quality products."
    },
    taja: {
        highlight: "Taja Collection is growing at +15.2% with luxury positioning",
        insight: "Emerging brands with strong visual identity can capture market share quickly."
    }
};

// Make tooltips 200% larger
Chart.defaults.plugins.tooltip.titleFont = { size: 24, weight: 'bold' };
Chart.defaults.plugins.tooltip.bodyFont = { size: 20 };
Chart.defaults.plugins.tooltip.padding = 16;
Chart.defaults.plugins.tooltip.boxPadding = 8;
Chart.defaults.plugins.tooltip.cornerRadius = 8;

function initializeCharts() {
    // Traffic Comparison Chart
    const trafficCtx = document.getElementById('trafficChart');
    if (trafficCtx) {
        new Chart(trafficCtx, {
            type: 'bar',
            data: {
                labels: ['Diptyque', 'Jo Malone', 'Byredo', 'Big Ass Luxuries', 'Willie C', 'Taja Collection', 'Luce Divina'],
                datasets: [{
                    label: 'Organic Traffic (K)',
                    data: [374, 466, 192, 7.3, 0.2, 1, 0],
                    backgroundColor: ['#c9a962', '#4caf50', '#2196f3', '#ff6b6b', '#9c27b0', '#e6b980', '#d4af37'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#2a2a40' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Traffic Value Chart - US Luxury Candle Market Share
    const valueCtx = document.getElementById('valueChart');
    if (valueCtx) {
        new Chart(valueCtx, {
            type: 'doughnut',
            data: {
                labels: [
                    'Diptyque (~15%)',
                    'Jo Malone (~12%)',
                    'Byredo (~8%)',
                    'Taja Collection (~0.5%)',
                    'Luce Divina (New)',
                    'Other Luxury Brands (~64%)'
                ],
                datasets: [{
                    data: [15, 12, 8, 0.5, 0.5, 64],
                    backgroundColor: ['#c9a962', '#4caf50', '#2196f3', '#e6b980', '#d4af37', '#555555'],
                    borderWidth: 2,
                    borderColor: '#1a1a2e'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 15,
                            font: { size: 13 },
                            color: '#888'
                        }
                    },
                    title: {
                        display: true,
                        text: 'US Luxury Candle Market Share (~$166M)',
                        font: { size: 16, weight: 'bold' },
                        color: '#fff',
                        padding: { bottom: 20 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const revenue = (166 * value / 100).toFixed(1);
                                return `${context.label}: $${revenue}M estimated revenue`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Complaints Chart
    const complaintsCtx = document.getElementById('complaintsChart');
    if (complaintsCtx) {
        new Chart(complaintsCtx, {
            type: 'bar',
            data: {
                labels: [
                    'Product Quality',
                    'Store Experience',
                    'Scent Issues',
                    'Price/Value',
                    'Customer Service',
                    'Return/Refund',
                    'Burn Quality',
                    'Shipping',
                    'Longevity',
                    'Authenticity'
                ],
                datasets: [{
                    label: '% of Complaints',
                    data: [40.5, 35.1, 35.1, 29.7, 27.0, 24.3, 21.6, 10.8, 8.1, 5.4],
                    backgroundColor: '#c9a962',
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 50,
                        grid: { color: '#2a2a40' }
                    },
                    y: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Brand-specific charts
    const diptyqueCtx = document.getElementById('diptyqueChart');
    if (diptyqueCtx) {
        new Chart(diptyqueCtx, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Scent', 'Service', 'Returns', 'Burn'],
                datasets: [{
                    label: 'Complaints',
                    data: [6, 6, 4, 4, 3],
                    backgroundColor: 'rgba(201, 169, 98, 0.3)',
                    borderColor: '#c9a962',
                    pointBackgroundColor: '#c9a962'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        beginAtZero: true,
                        grid: { color: '#2a2a40' },
                        pointLabels: { color: '#888' }
                    }
                }
            }
        });
    }

    const jomaloneCtx = document.getElementById('jomaloneChart');
    if (jomaloneCtx) {
        new Chart(jomaloneCtx, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Scent', 'Store', 'Price', 'Duration'],
                datasets: [{
                    label: 'Complaints',
                    data: [7, 6, 6, 5, 2],
                    backgroundColor: 'rgba(76, 175, 80, 0.3)',
                    borderColor: '#4caf50',
                    pointBackgroundColor: '#4caf50'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        beginAtZero: true,
                        grid: { color: '#2a2a40' },
                        pointLabels: { color: '#888' }
                    }
                }
            }
        });
    }

    const byredoCtx = document.getElementById('byredoChart');
    if (byredoCtx) {
        new Chart(byredoCtx, {
            type: 'radar',
            data: {
                labels: ['Service', 'Returns', 'Price', 'Store', 'Burn'],
                datasets: [{
                    label: 'Complaints',
                    data: [5, 5, 4, 4, 3],
                    backgroundColor: 'rgba(33, 150, 243, 0.3)',
                    borderColor: '#2196f3',
                    pointBackgroundColor: '#2196f3'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        beginAtZero: true,
                        grid: { color: '#2a2a40' },
                        pointLabels: { color: '#888' }
                    }
                }
            }
        });
    }

    // Projection Chart with Time Period Toggle
    const projectionCtx = document.getElementById('projectionChart');
    if (projectionCtx) {
        window.projectionChart = new Chart(projectionCtx, {
            type: 'line',
            data: getProjectionData('3mo'),
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20 }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#2a2a40' },
                        title: {
                            display: true,
                            text: 'Website Visits',
                            color: '#888',
                            font: { size: 12 }
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });

        // Time period toggle
        initTimePeriodToggle();
    }

    // Conversion Chart
    const conversionCtx = document.getElementById('conversionChart');
    if (conversionCtx) {
        window.conversionChart = new Chart(conversionCtx, {
            type: 'line',
            data: {
                labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10', 'Month 11', 'Month 12'],
                datasets: [
                    {
                        label: 'Monthly Traffic',
                        data: [500, 800, 3500, 5500, 9000, 14000, 18000, 22000, 27000, 32000, 38000, 45000],
                        borderColor: '#c9a962',
                        backgroundColor: 'rgba(201, 169, 98, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Conversion Rate %',
                        data: [0.8, 1.0, 1.5, 2.0, 2.3, 2.6, 2.8, 3.0, 3.2, 3.4, 3.5, 3.6],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y1',
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 20 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.dataset.yAxisID === 'y1') {
                                    return `Conversion Rate: ${context.raw}%`;
                                }
                                return `Traffic: ${context.raw.toLocaleString()} visits`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        grid: { color: '#2a2a40' },
                        title: {
                            display: true,
                            text: 'Monthly Traffic',
                            color: '#888'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        max: 5,
                        grid: { drawOnChartArea: false },
                        title: {
                            display: true,
                            text: 'Conversion Rate %',
                            color: '#888'
                        }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }

    // Plotly Funnel Charts
    initPlotlyFunnels();

    // KPI Toggle functionality
    initKpiToggle();
}

// Initialize Plotly Funnel Charts
function initPlotlyFunnels() {
    const isMobile = window.innerWidth <= 600;

    // Responsive margins based on screen size
    const leftMargin = isMobile ? 100 : 120;
    const rightMargin = isMobile ? 20 : 40;

    const plotlyLayout = {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { color: '#aaa', family: 'system-ui, -apple-system, sans-serif', size: isMobile ? 10 : 11 },
        margin: { t: 50, b: 30, l: leftMargin, r: rightMargin },
        showlegend: false,
        autosize: true,
        hoverlabel: {
            bgcolor: '#ffffff',
            bordercolor: '#cccccc',
            font: { color: '#1a1a1a', size: 14, family: 'system-ui, -apple-system, sans-serif' }
        },
        hovermode: 'closest'
    };

    const plotlyConfig = {
        responsive: true,
        displayModeBar: false
    };

    // Industry Average Funnel
    if (document.getElementById('industryFunnelPlotly')) {
        const industryData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 40, 20, 10],
            text: ['100%', '2% CTR', '8% ATC', '2.5% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#555555', '#666666', '#777777', '#888888']
            },
            connector: {
                line: { color: '#333', width: 2 },
                fillcolor: 'rgba(50,50,50,0.3)'
            }
        }];

        Plotly.newPlot('industryFunnelPlotly', industryData, {
            ...plotlyLayout,
            title: { text: 'Industry Average', font: { size: 14, color: '#888' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Diptyque Funnel (Leader)
    if (document.getElementById('diptyqueFunnelPlotly')) {
        const diptyqueData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 50, 30, 18],
            text: ['100%', '3.5% CTR', '12% ATC', '4.2% Conv'],
            textposition: 'inside',
            textfont: { color: '#1a1a1a', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#c9a962', '#d4b56e', '#b8963d', '#a78530']
            },
            connector: {
                line: { color: '#c9a962', width: 2 },
                fillcolor: 'rgba(201,169,98,0.2)'
            }
        }];

        Plotly.newPlot('diptyqueFunnelPlotly', diptyqueData, {
            ...plotlyLayout,
            title: { text: 'Diptyque (Leader)', font: { size: 14, color: '#c9a962' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Jo Malone Funnel
    if (document.getElementById('jomaloneFunnelPlotly')) {
        const jomaloneData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 45, 25, 14],
            text: ['100%', '2.8% CTR', '10% ATC', '3.5% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#4caf50', '#43a047', '#388e3c', '#2e7d32']
            },
            connector: {
                line: { color: '#4caf50', width: 2 },
                fillcolor: 'rgba(76,175,80,0.2)'
            }
        }];

        Plotly.newPlot('jomaloneFunnelPlotly', jomaloneData, {
            ...plotlyLayout,
            title: { text: 'Jo Malone', font: { size: 14, color: '#4caf50' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Byredo Funnel
    if (document.getElementById('byredoFunnelPlotly')) {
        const byredoData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 42, 24, 12],
            text: ['100%', '2.6% CTR', '9.5% ATC', '3.2% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#2196f3', '#1e88e5', '#1976d2', '#1565c0']
            },
            connector: {
                line: { color: '#2196f3', width: 2 },
                fillcolor: 'rgba(33,150,243,0.2)'
            }
        }];

        Plotly.newPlot('byredoFunnelPlotly', byredoData, {
            ...plotlyLayout,
            title: { text: 'Byredo', font: { size: 14, color: '#2196f3' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Le Labo Funnel
    if (document.getElementById('lelaboFunnelPlotly')) {
        const lelaboData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 48, 28, 16],
            text: ['100%', '3.2% CTR', '11% ATC', '3.8% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a']
            },
            connector: {
                line: { color: '#9c27b0', width: 2 },
                fillcolor: 'rgba(156,39,176,0.2)'
            }
        }];

        Plotly.newPlot('lelaboFunnelPlotly', lelaboData, {
            ...plotlyLayout,
            title: { text: 'Le Labo', font: { size: 14, color: '#9c27b0' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Baobab Collection Funnel
    if (document.getElementById('baobabFunnelPlotly')) {
        const baobabData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 38, 22, 11],
            text: ['100%', '2.4% CTR', '8.5% ATC', '2.8% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#ff9800', '#fb8c00', '#f57c00', '#ef6c00']
            },
            connector: {
                line: { color: '#ff9800', width: 2 },
                fillcolor: 'rgba(255,152,0,0.2)'
            }
        }];

        Plotly.newPlot('baobabFunnelPlotly', baobabData, {
            ...plotlyLayout,
            title: { text: 'Baobab', font: { size: 14, color: '#ff9800' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Big Ass Luxuries Funnel
    if (document.getElementById('bigassFunnelPlotly')) {
        const bigassData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 52, 32, 18],
            text: ['100%', '3.8% CTR', '12.5% ATC', '4.5% Conv'],
            textposition: 'inside',
            textfont: { color: '#1a1a1a', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#cddc39', '#c0ca33', '#afb42b', '#9e9d24']
            },
            connector: {
                line: { color: '#cddc39', width: 2 },
                fillcolor: 'rgba(205,220,57,0.2)'
            }
        }];

        Plotly.newPlot('bigassFunnelPlotly', bigassData, {
            ...plotlyLayout,
            title: { text: 'Big Ass Luxuries', font: { size: 14, color: '#cddc39' }, y: 0.98 }
        }, plotlyConfig);
    }

    // FORVR Mood Funnel
    if (document.getElementById('forvrFunnelPlotly')) {
        const forvrData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 55, 35, 20],
            text: ['100%', '4.2% CTR', '14% ATC', '5.2% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#ff69b4', '#ff5ba7', '#ff4d9a', '#ff3f8d']
            },
            connector: {
                line: { color: '#ff69b4', width: 2 },
                fillcolor: 'rgba(255,105,180,0.2)'
            }
        }];

        Plotly.newPlot('forvrFunnelPlotly', forvrData, {
            ...plotlyLayout,
            title: { text: 'FORVR Mood', font: { size: 14, color: '#ff69b4' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Willie C Candles Funnel
    if (document.getElementById('williecFunnelPlotly')) {
        const williecData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 20, 10, 4],
            text: ['100%', '1.2% CTR', '5% ATC', '1.5% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#f44336', '#e53935', '#d32f2f', '#c62828']
            },
            connector: {
                line: { color: '#f44336', width: 2 },
                fillcolor: 'rgba(244,67,54,0.2)'
            }
        }];

        Plotly.newPlot('williecFunnelPlotly', williecData, {
            ...plotlyLayout,
            title: { text: 'Willie C', font: { size: 14, color: '#f44336' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Taja Collection Funnel
    if (document.getElementById('tajaFunnelPlotly')) {
        const tajaData = [{
            type: 'funnel',
            y: ['Impressions', 'Clicks', 'Add to Cart', 'Purchases'],
            x: [100, 30, 18, 8],
            text: ['100%', '1.9% CTR', '8% ATC', '2.5% Conv'],
            textposition: 'inside',
            textfont: { color: '#fff', size: isMobile ? 10 : 11 },
            hovertemplate: '<b>%{y}</b><br>%{text}<extra></extra>',
            marker: {
                color: ['#00bcd4', '#00acc1', '#0097a7', '#00838f']
            },
            connector: {
                line: { color: '#00bcd4', width: 2 },
                fillcolor: 'rgba(0,188,212,0.2)'
            }
        }];

        Plotly.newPlot('tajaFunnelPlotly', tajaData, {
            ...plotlyLayout,
            title: { text: 'Taja Collection', font: { size: 14, color: '#00bcd4' }, y: 0.98 }
        }, plotlyConfig);
    }

    // Resize and reinitialize Plotly charts on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            const funnelIds = ['industryFunnelPlotly', 'diptyqueFunnelPlotly', 'jomaloneFunnelPlotly', 'byredoFunnelPlotly', 'lelaboFunnelPlotly', 'baobabFunnelPlotly', 'bigassFunnelPlotly', 'forvrFunnelPlotly', 'williecFunnelPlotly', 'tajaFunnelPlotly'];
            funnelIds.forEach(id => {
                const el = document.getElementById(id);
                if (el && el.data) {
                    // Update margins based on new screen size
                    const newIsMobile = window.innerWidth <= 600;
                    const newLeftMargin = newIsMobile ? 100 : 120;
                    const newRightMargin = newIsMobile ? 20 : 40;

                    Plotly.relayout(el, {
                        'margin.l': newLeftMargin,
                        'margin.r': newRightMargin
                    });
                    Plotly.Plots.resize(el);
                }
            });
        }, 150);
    });
}

function initKpiToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const kpiViews = document.querySelectorAll('.kpi-view');
    const deepDivePanels = document.querySelectorAll('.deep-dive-panel');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewId = btn.dataset.view;

            // Update button states
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update view visibility - hide all KPI views and deep dives
            kpiViews.forEach(view => {
                view.classList.remove('active');
            });
            deepDivePanels.forEach(panel => {
                panel.classList.remove('active');
            });

            // Show the selected KPI view
            const selectedKpi = document.getElementById(`kpi-${viewId}`);
            if (selectedKpi) {
                selectedKpi.classList.add('active');
            }

            // Show the corresponding deep dive panel (if it exists)
            const selectedDive = document.getElementById(`dive-${viewId}`);
            if (selectedDive) {
                selectedDive.classList.add('active');
            }

            // Update Key Finding based on selected competitor
            const keyFindingText = document.getElementById('key-finding-text');
            if (keyFindingText && keyFindings[viewId]) {
                const finding = keyFindings[viewId];
                keyFindingText.innerHTML = `<strong>${finding.highlight}</strong> - ${finding.insight}`;
            }
        });
    });

    // Initialize lightbox
    initLightbox();
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    // Open lightbox on image click
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            lightboxImg.src = trigger.src;
            lightboxCaption.textContent = trigger.dataset.caption || '';
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Initialize package toggle
    initPackageToggle();
}

function initPackageToggle() {
    const pkgBtns = document.querySelectorAll('.pkg-btn');
    const pkgViews = document.querySelectorAll('.package-view');

    pkgBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const packageId = btn.dataset.package;

            // Update button states
            pkgBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update view visibility
            pkgViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === `pkg-${packageId}`) {
                    view.classList.add('active');
                }
            });
        });
    });

    // Initialize calculator
    initCalculator();
}

// Projection data for different time periods (conservative estimates based on industry data)
// Luxury candle market: New brand typically sees 1-2% monthly organic growth in year 1
// Paid traffic depends on budget; assuming $2.5K-5K monthly ad spend
// Benchmark: Taja Collection ~1K organic, Byredo grew from ~50K to 192K over 3 years
function getProjectionData(period) {
    const data = {
        '3mo': {
            labels: ['Month 1', 'Month 2', 'Month 3'],
            organic: [50, 120, 280],
            paid: [800, 1200, 1800],
            total: [850, 1320, 2080]
        },
        '6mo': {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            organic: [50, 120, 280, 500, 850, 1200],
            paid: [800, 1200, 1800, 2400, 3200, 4000],
            total: [850, 1320, 2080, 2900, 4050, 5200]
        },
        '1yr': {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            organic: [50, 120, 280, 500, 850, 1200, 1600, 2100, 2700, 3400, 4200, 5000],
            paid: [800, 1200, 1800, 2400, 3200, 4000, 4500, 5000, 5500, 6000, 6500, 7000],
            total: [850, 1320, 2080, 2900, 4050, 5200, 6100, 7100, 8200, 9400, 10700, 12000]
        },
        '2yr': {
            labels: ['Q1 Y1', 'Q2 Y1', 'Q3 Y1', 'Q4 Y1', 'Q1 Y2', 'Q2 Y2', 'Q3 Y2', 'Q4 Y2'],
            organic: [450, 1550, 4400, 11000, 18000, 26000, 36000, 48000],
            paid: [3800, 7200, 13500, 19500, 22000, 24000, 26000, 28000],
            total: [4250, 8750, 17900, 30500, 40000, 50000, 62000, 76000]
        },
        '3yr': {
            labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y2 Q1', 'Y2 Q2', 'Y2 Q3', 'Y2 Q4', 'Y3 Q1', 'Y3 Q2', 'Y3 Q3', 'Y3 Q4'],
            organic: [450, 1550, 4400, 11000, 18000, 26000, 36000, 48000, 62000, 78000, 96000, 118000],
            paid: [3800, 7200, 13500, 19500, 22000, 24000, 26000, 28000, 30000, 32000, 34000, 36000],
            total: [4250, 8750, 17900, 30500, 40000, 50000, 62000, 76000, 92000, 110000, 130000, 154000]
        }
    };

    const d = data[period];
    return {
        labels: d.labels,
        datasets: [
            {
                label: 'Organic Traffic',
                data: d.organic,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Paid Traffic',
                data: d.paid,
                borderColor: '#2196f3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                fill: true,
                tension: 0.4
            },
            {
                label: 'Total Visits',
                data: d.total,
                borderColor: '#c9a962',
                backgroundColor: 'rgba(201, 169, 98, 0.1)',
                fill: true,
                tension: 0.4
            }
        ]
    };
}

// Conversion data for different time periods
function getConversionData(period) {
    const data = {
        '3mo': {
            labels: ['Month 1', 'Month 2', 'Month 3'],
            traffic: [500, 800, 3500],
            conversion: [0.8, 1.0, 1.5]
        },
        '6mo': {
            labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
            traffic: [500, 800, 3500, 5500, 9000, 14000],
            conversion: [0.8, 1.0, 1.5, 2.0, 2.3, 2.6]
        },
        '1yr': {
            labels: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'],
            traffic: [500, 800, 3500, 5500, 9000, 14000, 18000, 22000, 27000, 32000, 38000, 45000],
            conversion: [0.8, 1.0, 1.5, 2.0, 2.3, 2.6, 2.8, 3.0, 3.2, 3.4, 3.5, 3.6]
        },
        '2yr': {
            labels: ['Q1 Y1', 'Q2 Y1', 'Q3 Y1', 'Q4 Y1', 'Q1 Y2', 'Q2 Y2', 'Q3 Y2', 'Q4 Y2'],
            traffic: [4800, 28000, 59000, 105000, 155000, 210000, 275000, 350000],
            conversion: [1.1, 2.1, 2.9, 3.5, 3.8, 4.0, 4.2, 4.4]
        },
        '3yr': {
            labels: ['Y1 Q1', 'Y1 Q2', 'Y1 Q3', 'Y1 Q4', 'Y2 Q1', 'Y2 Q2', 'Y2 Q3', 'Y2 Q4', 'Y3 Q1', 'Y3 Q2', 'Y3 Q3', 'Y3 Q4'],
            traffic: [4800, 28000, 59000, 105000, 155000, 210000, 275000, 350000, 430000, 520000, 620000, 730000],
            conversion: [1.1, 2.1, 2.9, 3.5, 3.8, 4.0, 4.2, 4.4, 4.5, 4.6, 4.7, 4.8]
        }
    };

    const d = data[period];
    return {
        labels: d.labels,
        datasets: [
            {
                label: 'Monthly Traffic',
                data: d.traffic,
                borderColor: '#c9a962',
                backgroundColor: 'rgba(201, 169, 98, 0.1)',
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            },
            {
                label: 'Conversion Rate %',
                data: d.conversion,
                borderColor: '#4caf50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                fill: false,
                tension: 0.4,
                yAxisID: 'y1',
                borderDash: [5, 5]
            }
        ]
    };
}

function initTimePeriodToggle() {
    const timeBtns = document.querySelectorAll('.time-btn');

    timeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTimePeriod(btn.dataset.period, btn);
        });
    });
}

// Global function for onclick handlers
function switchTimePeriod(period, btn) {
    const timeBtns = document.querySelectorAll('.time-btn');

    // Update button states
    timeBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Update chart
    if (window.projectionChart) {
        window.projectionChart.data = getProjectionData(period);
        window.projectionChart.update('active');
    }
}

// Keyword filter state
let keywordFilters = {
    type: 'all',
    intent: 'all'
};

// Global function for keyword filtering
function filterKeywords(filterType, value, btn) {
    // Update filter state
    keywordFilters[filterType] = value;

    // Update button states within the same toggle group
    const toggleGroup = btn.parentElement;
    toggleGroup.querySelectorAll('.kw-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Apply filters to table rows
    const table = document.getElementById('keywordsTable');
    if (!table) return;

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const rowType = row.dataset.type;
        const rowIntent = row.dataset.intent;

        const typeMatch = keywordFilters.type === 'all' || rowType === keywordFilters.type;
        const intentMatch = keywordFilters.intent === 'all' || rowIntent === keywordFilters.intent;

        if (typeMatch && intentMatch) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });
}

// Initialize tooltips with fixed positioning
function initTooltips() {
    const tooltipElements = document.querySelectorAll('.has-tooltip');

    // Create a single tooltip element
    let tooltipEl = document.getElementById('global-tooltip');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.id = 'global-tooltip';
        tooltipEl.style.cssText = `
            position: fixed;
            background: #1a1a2e;
            color: #f5f5f7;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            line-height: 1.5;
            max-width: 280px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.8);
            border: 1px solid #3a3a50;
            z-index: 2147483647;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
            text-transform: none;
            font-weight: 400;
        `;
        document.body.appendChild(tooltipEl);
    }

    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = el.getAttribute('data-tooltip');
            if (!tooltip) return;

            tooltipEl.textContent = tooltip;
            tooltipEl.style.opacity = '1';

            const rect = el.getBoundingClientRect();
            const tooltipRect = tooltipEl.getBoundingClientRect();

            let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            let top = rect.top - tooltipRect.height - 10;

            // Keep tooltip on screen
            if (left < 10) left = 10;
            if (left + tooltipRect.width > window.innerWidth - 10) {
                left = window.innerWidth - tooltipRect.width - 10;
            }
            if (top < 10) {
                top = rect.bottom + 10; // Show below if not enough room above
            }

            tooltipEl.style.left = left + 'px';
            tooltipEl.style.top = top + 'px';
        });

        el.addEventListener('mouseleave', () => {
            tooltipEl.style.opacity = '0';
        });
    });
}

// Calculator Functions
function initCalculator() {
    const adBudget = document.getElementById('adBudget');
    const adBudgetSlider = document.getElementById('adBudgetSlider');
    const duration = document.getElementById('duration');
    const aov = document.getElementById('aov');
    const targetRoas = document.getElementById('targetRoas');
    const channels = {
        google: document.getElementById('chGoogle'),
        meta: document.getElementById('chMeta'),
        tiktok: document.getElementById('chTikTok'),
        pinterest: document.getElementById('chPinterest')
    };

    if (!adBudget) return;

    // Sync slider with input
    adBudget.addEventListener('input', () => {
        adBudgetSlider.value = adBudget.value;
        updateCalculator();
    });

    adBudgetSlider.addEventListener('input', () => {
        adBudget.value = adBudgetSlider.value;
        updateCalculator();
    });

    // Add listeners to all inputs
    [duration, aov, targetRoas].forEach(el => {
        if (el) el.addEventListener('change', updateCalculator);
    });

    Object.values(channels).forEach(ch => {
        if (ch) ch.addEventListener('change', updateCalculator);
    });

    // Initial calculation
    updateCalculator();
}

function updateCalculator() {
    const budget = parseFloat(document.getElementById('adBudget')?.value) || 3000;
    const months = parseInt(document.getElementById('duration')?.value) || 6;
    const aov = parseFloat(document.getElementById('aov')?.value) || 85;
    const roas = parseFloat(document.getElementById('targetRoas')?.value) || 2.5;

    // Channel data based on CANDLE INDUSTRY benchmarks (Varos, April 2025)
    // Facebook: CPC $1.23, ROAS 1.47x (median), Lookalike 3.75x
    // Google: CPP $29.48, PMax CPP $13.35 (best), CTR 3.91%
    const channels = {
        google: { enabled: document.getElementById('chGoogle')?.checked, cpc: 1.50, convRate: 0.035, avgRoas: 2.50 },
        meta: { enabled: document.getElementById('chMeta')?.checked, cpc: 1.23, convRate: 0.028, avgRoas: 1.47 },
        tiktok: { enabled: document.getElementById('chTikTok')?.checked, cpc: 0.65, convRate: 0.025, avgRoas: 2.00 },
        pinterest: { enabled: document.getElementById('chPinterest')?.checked, cpc: 0.75, convRate: 0.030, avgRoas: 2.00 }
    };

    // Count enabled channels
    const enabledChannels = Object.values(channels).filter(c => c.enabled);
    const channelCount = enabledChannels.length || 1;

    // Total investment
    const totalInvestment = budget * months;

    // Projected revenue based on ROAS
    const projectedRevenue = totalInvestment * roas;

    // Calculate per channel
    const budgetPerChannel = totalInvestment / channelCount;
    let totalClicks = 0;
    let totalConversions = 0;

    const channelResults = {};
    for (const [name, data] of Object.entries(channels)) {
        if (data.enabled) {
            const clicks = Math.round(budgetPerChannel / data.cpc);
            const conversions = Math.round(clicks * data.convRate);
            const revenue = Math.round(budgetPerChannel * roas);

            channelResults[name] = { budget: budgetPerChannel, clicks, conversions, revenue };
            totalClicks += clicks;
            totalConversions += conversions;
        }
    }

    // Update display
    document.getElementById('totalInvestment').textContent = `$${totalInvestment.toLocaleString()}`;
    document.getElementById('projectedRevenue').textContent = `$${projectedRevenue.toLocaleString()}`;
    document.getElementById('estVisits').textContent = totalClicks.toLocaleString();
    document.getElementById('estConversions').textContent = totalConversions.toLocaleString();

    // Update breakdown table
    updateChannelRow('googleRow', channelResults.google, channels.google.enabled);
    updateChannelRow('metaRow', channelResults.meta, channels.meta.enabled);
    updateChannelRow('tiktokRow', channelResults.tiktok, channels.tiktok.enabled);
    updateChannelRow('pinterestRow', channelResults.pinterest, channels.pinterest.enabled);

    // Update ROAS gauge
    const gaugePercent = Math.min((roas / 4) * 100, 100);
    const gaugeMarker = document.querySelector('.gauge-marker');
    if (gaugeMarker) {
        gaugeMarker.style.left = `${gaugePercent}%`;
        gaugeMarker.querySelector('span').textContent = `${roas}x`;
    }
}

function updateChannelRow(rowId, data, enabled) {
    const row = document.getElementById(rowId);
    if (!row) return;

    if (enabled && data) {
        row.style.display = 'grid';
        const spans = row.querySelectorAll('span');
        if (spans.length >= 4) {
            spans[1].textContent = `$${data.budget.toLocaleString()}`;
            spans[2].textContent = data.clicks.toLocaleString();
            spans[3].textContent = `$${data.revenue.toLocaleString()}`;
        }
    } else {
        row.style.display = 'none';
    }
}

// ===== FULLSCREEN CHART MODAL =====
let modalChart = null;
let currentChartType = null;
let originalChartData = null; // Store original data for time period filtering

function openChartModal(chartType, title) {
    // Only open on mobile
    if (window.innerWidth > 900) return;

    const modal = document.getElementById('chart-modal');
    const modalTitle = document.getElementById('chart-modal-title');
    const modalCanvas = document.getElementById('modal-chart-canvas');

    if (!modal || !modalCanvas) return;

    currentChartType = chartType;
    modalTitle.textContent = title;

    // Destroy existing modal chart if any
    if (modalChart) {
        modalChart.destroy();
        modalChart = null;
    }

    // Get the source chart data
    let sourceChart = null;
    let chartConfig = null;

    if (chartType === 'projection') {
        // Use getProjectionData directly with default 6mo period
        chartConfig = {
            type: 'line',
            data: getProjectionData('3mo'),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, font: { size: 14 } }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#2a2a40' },
                        ticks: { font: { size: 12 } },
                        title: {
                            display: true,
                            text: 'Website Visits',
                            color: '#888',
                            font: { size: 12 }
                        }
                    },
                    x: {
                        grid: { color: '#2a2a40' },
                        ticks: { font: { size: 11 } }
                    }
                }
            }
        };
    } else if (chartType === 'conversion') {
        // Use getConversionData directly with default 6mo period
        chartConfig = {
            type: 'line',
            data: getConversionData('3mo'),
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 15, font: { size: 14 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.dataset.yAxisID === 'y1') {
                                    return `Conversion Rate: ${context.raw}%`;
                                }
                                return `Traffic: ${context.raw.toLocaleString()} visits`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        grid: { color: '#2a2a40' },
                        ticks: { font: { size: 12 } },
                        title: {
                            display: true,
                            text: 'Monthly Traffic',
                            color: '#888',
                            font: { size: 12 }
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        max: 5,
                        grid: { drawOnChartArea: false },
                        ticks: {
                            font: { size: 12 },
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Conversion Rate %',
                            color: '#888',
                            font: { size: 12 }
                        }
                    },
                    x: {
                        grid: { color: '#2a2a40' },
                        ticks: { font: { size: 11 } }
                    }
                }
            }
        };
    }

    if (!chartConfig) return;

    // Reset time period buttons to default (6mo)
    const buttons = document.querySelectorAll('.time-period-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-period') === '6mo') {
            btn.classList.add('active');
        }
    });

    // Show time period buttons for both projection and conversion charts
    const timePeriodContainer = document.getElementById('chart-time-periods');
    if (timePeriodContainer) {
        timePeriodContainer.style.display = (chartType === 'projection' || chartType === 'conversion') ? 'flex' : 'none';
    }

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Create new chart in modal after a brief delay for DOM to update
    setTimeout(() => {
        const ctx = modalCanvas.getContext('2d');
        modalChart = new Chart(ctx, chartConfig);
    }, 50);
}

function closeChartModal() {
    const modal = document.getElementById('chart-modal');

    // Exit fullscreen if active
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalChart) {
        modalChart.destroy();
        modalChart = null;
    }
    currentChartType = null;
    originalChartData = null;
}

// Toggle native fullscreen mode
function toggleChartFullscreen() {
    const modal = document.getElementById('chart-modal');
    if (!modal) return;

    if (document.fullscreenElement || document.webkitFullscreenElement) {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    } else {
        // Enter fullscreen
        if (modal.requestFullscreen) {
            modal.requestFullscreen();
        } else if (modal.webkitRequestFullscreen) {
            modal.webkitRequestFullscreen();
        }
    }

    // Resize chart after fullscreen change
    setTimeout(() => {
        if (modalChart) {
            modalChart.resize();
        }
    }, 100);
}

// Listen for fullscreen changes to resize chart
document.addEventListener('fullscreenchange', function() {
    if (modalChart) {
        setTimeout(() => modalChart.resize(), 100);
    }
});
document.addEventListener('webkitfullscreenchange', function() {
    if (modalChart) {
        setTimeout(() => modalChart.resize(), 100);
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeChartModal();
    }
});

// Handle orientation change - resize chart
window.addEventListener('orientationchange', function() {
    if (modalChart) {
        setTimeout(() => {
            modalChart.resize();
        }, 100);
    }
});

// Also handle resize
window.addEventListener('resize', function() {
    if (modalChart) {
        modalChart.resize();
    }
});

// Time period selection for chart modal
function setChartTimePeriod(period) {
    // Update active button
    const buttons = document.querySelectorAll('.time-period-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-period') === period) {
            btn.classList.add('active');
        }
    });

    // Update modal chart with data for selected period
    if (modalChart) {
        if (currentChartType === 'projection') {
            modalChart.data = getProjectionData(period);
            modalChart.update('active');
        } else if (currentChartType === 'conversion') {
            modalChart.data = getConversionData(period);
            modalChart.update('active');
        }
    }
}

// Add touch event support for clickable charts on mobile
document.addEventListener('DOMContentLoaded', function() {
    const clickableCharts = document.querySelectorAll('.chart-clickable');

    clickableCharts.forEach(chart => {
        // Add touch support
        chart.addEventListener('touchend', function(e) {
            // Only on mobile
            if (window.innerWidth > 900) return;

            // Prevent if touch moved (scrolling)
            if (e.cancelable) {
                e.preventDefault();
            }

            const chartType = this.getAttribute('data-chart');
            const title = this.getAttribute('data-title');

            if (chartType && title) {
                openChartModal(chartType, title);
            }
        }, { passive: false });
    });
});
