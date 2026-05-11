// Navigation handling
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show corresponding section
            const sectionId = this.getAttribute('data-section');
            const section = document.getElementById(sectionId);
            if (section) {
                section.classList.add('active');
                // Scroll to top of page immediately
                window.scrollTo(0, 0);
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            }
        });
    });

    // Initialize tooltips
    if (typeof initTooltips === 'function') {
        initTooltips();
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation to metric cards
function animateValue(element, start, end, duration) {
    const startTimestamp = performance.now();
    const step = (timestamp) => {
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.metric-card, .competitor-card, .complaint-item, .swot-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
});

// Print/Export functionality
function exportToPDF() {
    window.print();
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Ignore keyboard shortcuts when typing in input fields
    const activeElement = document.activeElement;
    const isTyping = activeElement && (
        activeElement.tagName === 'INPUT' ||
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'SELECT' ||
        activeElement.isContentEditable
    );

    // ESC to logout (always works)
    if (e.key === 'Escape' && sessionStorage.getItem('authenticated') === 'true') {
        if (confirm('Are you sure you want to logout?')) {
            logout();
        }
    }

    // Skip number key navigation if user is typing in an input
    if (isTyping) return;

    // Number keys to navigate sections
    const sectionKeys = {
        '1': 'overview',
        '2': 'competitors',
        '3': 'keywords',
        '4': 'reviews',
        '5': 'opportunities',
        '6': 'roadmap'
    };

    if (sectionKeys[e.key] && sessionStorage.getItem('authenticated') === 'true') {
        const link = document.querySelector(`[data-section="${sectionKeys[e.key]}"]`);
        if (link) link.click();
    }
});

console.log('Luce Divina Dashboard loaded successfully');
console.log('Keyboard shortcuts: 1-6 for sections, ESC to logout');

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const body = document.body;

    // Toggle mobile menu
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Close mobile menu
    function closeMobileMenu() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Hamburger button click
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Handle mobile nav link clicks
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all mobile links
            mobileNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Also update desktop sidebar links to stay in sync
            const sectionId = this.getAttribute('data-section');
            const desktopLinks = document.querySelectorAll('.nav-links a');
            desktopLinks.forEach(l => l.classList.remove('active'));
            const correspondingDesktopLink = document.querySelector(`.nav-links a[data-section="${sectionId}"]`);
            if (correspondingDesktopLink) {
                correspondingDesktopLink.classList.add('active');
            }

            // Switch sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Close menu after selection
            closeMobileMenu();

            // Scroll to top immediately
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Sync mobile nav active state with desktop nav on page load
    function syncMobileNavActiveState() {
        const activeDesktopLink = document.querySelector('.nav-links a.active');
        if (activeDesktopLink) {
            const activeSectionId = activeDesktopLink.getAttribute('data-section');
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === activeSectionId) {
                    link.classList.add('active');
                }
            });
        }
    }

    // Also sync when desktop links are clicked
    const desktopNavLinks = document.querySelectorAll('.nav-links a');
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(syncMobileNavActiveState, 10);
        });
    });

    syncMobileNavActiveState();
});

// Track current selections for ROI calculations
let currentWebsiteType = 'elevate';
let currentPackageDuration = 'starter'; // 'starter' = 3 month, 'growth' = 6 month

// Prices
const ELEVATE_PRICE = 4950;
const TRANSFORM_PRICE = 9950;
const MARKETING_3MO = 7500;
const MARKETING_6MO = 16050;

function formatPrice(num) {
    return '$' + num.toLocaleString();
}

// Update ROI metrics based on both website type and package duration
function updateROIMetrics() {
    const roiAdSpend = document.getElementById('roi-ad-spend');
    const roiServiceInvestment = document.getElementById('roi-service-investment');
    const roiRoas = document.getElementById('roi-roas');
    const roiRoasLabel = document.getElementById('roi-roas-label');
    const roiRoasDesc = document.getElementById('roi-roas-desc');
    const roiMilestone = document.getElementById('roi-milestone');
    const guaranteeBox = document.querySelector('.guarantee-box');
    const guaranteeText = document.getElementById('guarantee-text');
    const infoBoxText = document.getElementById('info-box-text');

    // Guarantee for 6-month packages only (1.8x Elevate, 2.5x Transform)
    if (currentPackageDuration === 'growth') {
        const roasValue = currentWebsiteType === 'elevate' ? '1.8x' : '2.5x';
        if (guaranteeBox) guaranteeBox.style.display = 'flex';
        if (roiRoasLabel) roiRoasLabel.textContent = 'ROAS Guarantee';
        if (roiRoasDesc) roiRoasDesc.textContent = 'On ad spend or 70% refund';
        if (guaranteeText) {
            guaranteeText.innerHTML = `<strong>${roasValue} ROAS guaranteed after 6 months</strong> or receive a <strong>70% refund</strong> of your marketing strategy investment. We stand behind our results.`;
        }
        if (infoBoxText) infoBoxText.innerHTML = `All content, creative assets, ad copy, blog posts, and strategy are included at the listed rate. <strong>Months 1-3:</strong> Foundation building, brand awareness, initial sales. <strong>Months 4-6:</strong> Optimization, scaling winners, building momentum. The ${roasValue} ROAS guarantee applies to your ad spend.`;
    } else {
        // 3-month packages - no guarantee
        if (guaranteeBox) guaranteeBox.style.display = 'none';
        if (roiRoasLabel) roiRoasLabel.textContent = 'ROAS Target';
        if (roiRoasDesc) roiRoasDesc.textContent = 'Expected return on ad spend';
        if (infoBoxText) infoBoxText.innerHTML = 'All content, creative assets, ad copy, blog posts, and strategy are included at the listed rate. <strong>Months 1-3:</strong> Foundation building, brand awareness, initial sales. This phase focuses on testing audiences, creatives, and building your customer base.';
    }

    // ROI varies by website type AND package duration
    if (currentWebsiteType === 'elevate') {
        if (currentPackageDuration === 'starter') {
            // Elevate + 3 month - no guarantee
            if (roiAdSpend) roiAdSpend.textContent = '$1.5-2.5K';
            if (roiServiceInvestment) roiServiceInvestment.textContent = '$3,500';
            if (roiRoas) roiRoas.textContent = '1.5x';
            if (roiMilestone) roiMilestone.textContent = 'Month 10-14';
        } else {
            // Elevate + 6 month - 1.8x guarantee
            if (roiAdSpend) roiAdSpend.textContent = '$2-3K';
            if (roiServiceInvestment) roiServiceInvestment.textContent = '$3,500';
            if (roiRoas) roiRoas.textContent = '1.8x';
            if (roiMilestone) roiMilestone.textContent = 'Month 8-10';
        }
    } else {
        if (currentPackageDuration === 'starter') {
            // Transform + 3 month - no guarantee
            if (roiAdSpend) roiAdSpend.textContent = '$3-5K';
            if (roiServiceInvestment) roiServiceInvestment.textContent = '$4,333';
            if (roiRoas) roiRoas.textContent = '2.0x';
            if (roiMilestone) roiMilestone.textContent = 'Month 8-12';
        } else {
            // Transform + 6 month - 2.5x guarantee
            if (roiAdSpend) roiAdSpend.textContent = '$3.5-6K';
            if (roiServiceInvestment) roiServiceInvestment.textContent = '$4,333';
            if (roiRoas) roiRoas.textContent = '2.5x';
            if (roiMilestone) roiMilestone.textContent = 'Month 6-8';
        }
    }
}

// Website Toggle (Elevate/Transform) for Roadmap Section
document.addEventListener('DOMContentLoaded', function() {
    const webBtns = document.querySelectorAll('.web-btn');
    const webViews = document.querySelectorAll('.website-view');
    const websiteLabels = document.querySelectorAll('.website-choice-label');
    const total3mo = document.getElementById('total-3mo');
    const total6mo = document.getElementById('total-6mo');

    function updateTotals(websiteType) {
        currentWebsiteType = websiteType;
        const websitePrice = websiteType === 'elevate' ? ELEVATE_PRICE : TRANSFORM_PRICE;
        const label = websiteType === 'elevate' ? 'Elevate' : 'Transform';

        // Update labels
        websiteLabels.forEach(lbl => lbl.textContent = label);

        // Update totals
        if (total3mo) total3mo.textContent = formatPrice(websitePrice + MARKETING_3MO);
        if (total6mo) total6mo.textContent = formatPrice(websitePrice + MARKETING_6MO);

        // Update ROI metrics
        updateROIMetrics();
    }

    webBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const web = this.getAttribute('data-website');

            // Toggle active button
            webBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Toggle website views
            webViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === 'web-' + web) {
                    view.classList.add('active');
                }
            });

            // Update totals
            updateTotals(web);
        });
    });

    // Initialize with default (Elevate since it's active by default)
    updateTotals('elevate');
});

// Package Toggle & Timeline Toggle for Roadmap Section
document.addEventListener('DOMContentLoaded', function() {
    const pkgBtns = document.querySelectorAll('.pkg-btn');
    const pkgViews = document.querySelectorAll('.package-view');
    const extendedTimelineItems = document.querySelectorAll('.phase-extended');

    pkgBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pkg = this.getAttribute('data-package');
            currentPackageDuration = pkg;

            // Toggle active button
            pkgBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Toggle package views
            pkgViews.forEach(view => {
                view.classList.remove('active');
                if (view.id === 'pkg-' + pkg) {
                    view.classList.add('active');
                }
            });

            // Toggle extended timeline items for 6-month view
            extendedTimelineItems.forEach(item => {
                if (pkg === 'growth') {
                    item.style.display = 'flex';
                    setTimeout(() => item.classList.add('show'), 10);
                } else {
                    item.classList.remove('show');
                    setTimeout(() => item.style.display = 'none', 400);
                }
            });

            // Update ROI metrics based on new package selection
            updateROIMetrics();
        });
    });
});

// Timeline Marker Glow Effect - Activates when marker reaches viewport center
document.addEventListener('DOMContentLoaded', function() {
    const timelineMarkers = document.querySelectorAll('.timeline-marker');

    function checkMarkersInViewportCenter() {
        const viewportCenter = window.innerHeight / 2;
        const tolerance = 100; // Pixels from center to trigger effect

        timelineMarkers.forEach(marker => {
            const rect = marker.getBoundingClientRect();
            const markerCenter = rect.top + (rect.height / 2);

            // Check if marker center is within tolerance of viewport center
            if (Math.abs(markerCenter - viewportCenter) < tolerance) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    }

    // Check on scroll with throttling for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkMarkersInViewportCenter();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Also check on initial load and resize
    checkMarkersInViewportCenter();
    window.addEventListener('resize', checkMarkersInViewportCenter);
});

// Onboarding Framework - Month Navigator
let currentMonth = 1;
let maxMonths = 3; // Default to 3-month package

const monthSubtitles = {
    1: 'Foundation & Launch',
    2: 'Optimization & Testing',
    3: 'Scale & Review',
    4: 'Advanced Optimization',
    5: 'Efficiency & Scale',
    6: 'Performance & Handoff'
};

function navigateMonth(direction) {
    const newMonth = currentMonth + direction;
    if (newMonth >= 1 && newMonth <= maxMonths) {
        showMonth(newMonth);
    }
}

function showMonth(month) {
    currentMonth = month;

    // Update month content
    document.querySelectorAll('.month-content').forEach(content => {
        content.classList.remove('active');
    });
    const activeContent = document.querySelector(`.month-content[data-month="${month}"]`);
    if (activeContent) {
        activeContent.classList.add('active');
    }

    // Update month indicator
    const monthIndicator = document.querySelector('.current-month');
    const monthSubtitle = document.querySelector('.month-subtitle');
    if (monthIndicator) monthIndicator.textContent = `Month ${month}`;
    if (monthSubtitle) monthSubtitle.textContent = monthSubtitles[month] || '';

    // Update dots
    document.querySelectorAll('.month-dot').forEach(dot => {
        dot.classList.remove('active');
        if (parseInt(dot.dataset.month) === month) {
            dot.classList.add('active');
        }
    });

    // Update navigation buttons
    const prevBtn = document.querySelector('.month-nav-btn.prev');
    const nextBtn = document.querySelector('.month-nav-btn.next');
    if (prevBtn) prevBtn.disabled = month === 1;
    if (nextBtn) nextBtn.disabled = month === maxMonths;
}

// Package duration toggle
document.addEventListener('DOMContentLoaded', function() {
    const pkgBtns = document.querySelectorAll('.onboarding-pkg-btn');
    const monthDots = document.querySelectorAll('.month-dot');

    pkgBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const duration = parseInt(this.dataset.duration);
            maxMonths = duration;

            // Update active button
            pkgBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Show/hide month dots
            monthDots.forEach(dot => {
                const dotMonth = parseInt(dot.dataset.month);
                if (dotMonth <= duration) {
                    dot.style.display = '';
                } else {
                    dot.style.display = 'none';
                }
            });

            // Reset to month 1 if current month exceeds max
            if (currentMonth > maxMonths) {
                showMonth(1);
            } else {
                // Just update nav button states
                const nextBtn = document.querySelector('.month-nav-btn.next');
                if (nextBtn) nextBtn.disabled = currentMonth === maxMonths;
            }
        });
    });

    // Month dot click handlers
    monthDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const month = parseInt(this.dataset.month);
            if (month <= maxMonths) {
                showMonth(month);
            }
        });
    });

    // Initialize
    showMonth(1);
});

// ============================================
// Ad Spend Calculator
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const adBudgetInput = document.getElementById('adBudget');
    const adBudgetSlider = document.getElementById('adBudgetSlider');
    const durationSelect = document.getElementById('duration');
    const targetRoasSelect = document.getElementById('targetRoas');
    const aovInput = document.getElementById('aov');
    const roasHint = document.getElementById('roasHint');
    const calcToggleBtns = document.querySelectorAll('.calc-toggle-btn');

    // Channel checkboxes
    const chGoogle = document.getElementById('chGoogle');
    const chMeta = document.getElementById('chMeta');
    const chTikTok = document.getElementById('chTikTok');
    const chPinterest = document.getElementById('chPinterest');
    const chReddit = document.getElementById('chReddit');

    // Result elements
    const totalInvestment = document.getElementById('totalInvestment');
    const projectedRevenue = document.getElementById('projectedRevenue');
    const estVisits = document.getElementById('estVisits');
    const estConversions = document.getElementById('estConversions');
    const roasGauge = document.getElementById('roasGauge');

    // Labels
    const investmentLabel = document.getElementById('investmentLabel');
    const revenueLabel = document.getElementById('revenueLabel');
    const visitsLabel = document.getElementById('visitsLabel');
    const conversionsLabel = document.getElementById('conversionsLabel');
    const breakdownTitle = document.querySelector('.result-breakdown h4');

    // Toggle buttons
    const resultsToggleBtns = document.querySelectorAll('.results-toggle-btn');

    // Breakdown rows
    const googleRow = document.getElementById('googleRow');
    const metaRow = document.getElementById('metaRow');
    const tiktokRow = document.getElementById('tiktokRow');
    const pinterestRow = document.getElementById('pinterestRow');
    const redditRow = document.getElementById('redditRow');

    // Current calculator state
    let calcPackage = 'transform';
    let resultsView = 'monthly'; // 'total' or 'monthly' - default to monthly

    // Store calculated values for toggle
    let calcValues = {
        totalBudget: 0,
        monthlyBudget: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        totalClicks: 0,
        monthlyClicks: 0,
        totalConversions: 0,
        monthlyConversions: 0,
        months: 3
    };

    // Channel data (CPC and ROAS from industry benchmarks)
    const channels = {
        google: { cpc: 1.50, roas: 2.5 },
        meta: { cpc: 1.23, roas: 1.47 },
        tiktok: { cpc: 0.65, roas: 2.0 },
        pinterest: { cpc: 0.75, roas: 2.0 },
        reddit: { cpc: 0.50, roas: 2.5 }
    };

    // ROAS guarantees by package and duration
    function getGuaranteedRoas(pkg, months) {
        if (months >= 6) {
            return pkg === 'transform' ? 2.5 : 1.8;
        }
        // 3-month: no guarantee, show targets
        return pkg === 'transform' ? 2.0 : 1.5;
    }

    function updateRoasHint() {
        if (!durationSelect || !targetRoasSelect || !roasHint) return;

        const months = parseInt(durationSelect.value);
        const isGuaranteed = months >= 6;
        const guaranteed = getGuaranteedRoas(calcPackage, months);

        // Update hint text
        if (isGuaranteed) {
            roasHint.innerHTML = `6-month: <strong>${guaranteed}x ROAS guaranteed</strong>`;
            roasHint.classList.add('guarantee-active');
        } else {
            roasHint.innerHTML = `3-month: <strong>${guaranteed}x ROAS target</strong> (no guarantee)`;
            roasHint.classList.remove('guarantee-active');
        }

        // Update dropdown option labels based on duration
        const roasElevateOpt = document.getElementById('roasElevate');
        const roasTransformOpt = document.getElementById('roasTransform');

        if (roasElevateOpt) {
            roasElevateOpt.text = isGuaranteed ? '1.8x (Elevate Guarantee*)' : '1.8x (Elevate Target)';
        }
        if (roasTransformOpt) {
            roasTransformOpt.text = isGuaranteed ? '2.5x (Transform Guarantee*)' : '2.5x (Transform Target)';
        }

        // Update explain text
        const roasExplain = document.getElementById('roasExplain');
        if (roasExplain) {
            roasExplain.textContent = isGuaranteed
                ? '*Guarantee: 70% refund if not achieved after 6 months'
                : '*No ROAS guarantee for 3-month packages';
        }
        // Note: Removed auto-selection of ROAS to let users choose freely
    }

    function calculateResults() {
        const budget = parseFloat(adBudgetInput.value) || 3000;
        const months = parseInt(durationSelect.value);
        const targetRoas = parseFloat(targetRoasSelect.value);
        const aov = parseFloat(aovInput.value) || 500;

        // Count active channels
        const activeChannels = [];
        if (chGoogle && chGoogle.checked) activeChannels.push('google');
        if (chMeta && chMeta.checked) activeChannels.push('meta');
        if (chTikTok && chTikTok.checked) activeChannels.push('tiktok');
        if (chPinterest && chPinterest.checked) activeChannels.push('pinterest');
        if (chReddit && chReddit.checked) activeChannels.push('reddit');

        if (activeChannels.length === 0) {
            // At least one channel must be selected
            if (chGoogle) chGoogle.checked = true;
            activeChannels.push('google');
        }

        const totalBudget = budget * months;
        const monthlyBudget = budget;
        const monthlyBudgetPerChannel = monthlyBudget / activeChannels.length;

        let totalClicks = 0;
        let totalRevenue = 0;

        // Calculate totals (for entire duration)
        activeChannels.forEach(channel => {
            const data = channels[channel];
            const channelTotalBudget = monthlyBudgetPerChannel * months;
            const clicks = Math.floor(channelTotalBudget / data.cpc);
            const revenue = channelTotalBudget * targetRoas;
            totalClicks += clicks;
            totalRevenue += revenue;
        });

        // Conversions derived from revenue and AOV (higher ROAS = more conversions)
        const conversions = Math.floor(totalRevenue / aov);

        // Store values for toggle
        calcValues.totalBudget = totalBudget;
        calcValues.monthlyBudget = monthlyBudget;
        calcValues.totalRevenue = totalRevenue;
        calcValues.monthlyRevenue = totalRevenue / months;
        calcValues.totalClicks = totalClicks;
        calcValues.monthlyClicks = Math.floor(totalClicks / months);
        calcValues.totalConversions = conversions;
        calcValues.monthlyConversions = Math.floor(conversions / months);
        calcValues.months = months;

        // Update display based on current view
        updateResultsDisplay();

        // Update ROAS gauge (scale: 1x = 0%, 4x = 100%)
        const gaugePercent = Math.min(((targetRoas - 1) / 3) * 100, 100);
        if (roasGauge) {
            roasGauge.style.width = gaugePercent + '%';
            const marker = roasGauge.parentElement.querySelector('.gauge-marker');
            if (marker) {
                marker.style.left = gaugePercent + '%';
                marker.querySelector('span').textContent = targetRoas + 'x';
            }
        }

        // Update breakdown rows (monthly averages)
        updateBreakdownRow('google', googleRow, monthlyBudgetPerChannel, activeChannels);
        updateBreakdownRow('meta', metaRow, monthlyBudgetPerChannel, activeChannels);
        updateBreakdownRow('tiktok', tiktokRow, monthlyBudgetPerChannel, activeChannels);
        updateBreakdownRow('pinterest', pinterestRow, monthlyBudgetPerChannel, activeChannels);
        updateBreakdownRow('reddit', redditRow, monthlyBudgetPerChannel, activeChannels);
    }

    function updateBreakdownRow(channel, row, budgetPerChannel, activeChannels) {
        if (!row) return;

        if (activeChannels.includes(channel)) {
            row.style.display = '';
            const data = channels[channel];
            const clicks = Math.floor(budgetPerChannel / data.cpc);
            const revenue = budgetPerChannel * parseFloat(targetRoasSelect.value);

            const spans = row.querySelectorAll('span');
            if (spans.length >= 4) {
                spans[1].textContent = '$' + Math.round(budgetPerChannel).toLocaleString();
                spans[2].textContent = clicks.toLocaleString();
                spans[3].textContent = '$' + Math.round(revenue).toLocaleString();
            }
        } else {
            row.style.display = 'none';
        }
    }

    function updateResultsDisplay() {
        const isMonthly = resultsView === 'monthly';
        const months = calcValues.months;
        const periodLabel = months === 3 ? '3-Month' : months === 6 ? '6-Month' : months + '-Month';

        if (isMonthly) {
            // Show monthly averages
            if (totalInvestment) totalInvestment.textContent = '$' + Math.round(calcValues.monthlyBudget).toLocaleString();
            if (projectedRevenue) projectedRevenue.textContent = '$' + Math.round(calcValues.monthlyRevenue).toLocaleString();
            if (estVisits) estVisits.textContent = calcValues.monthlyClicks.toLocaleString();
            if (estConversions) estConversions.textContent = calcValues.monthlyConversions.toLocaleString();

            // Update labels
            if (investmentLabel) investmentLabel.textContent = 'Monthly Ad Spend';
            if (revenueLabel) revenueLabel.textContent = 'Monthly Revenue';
            if (visitsLabel) visitsLabel.textContent = 'Monthly Visits';
            if (conversionsLabel) conversionsLabel.textContent = 'Monthly Conversions';
            if (breakdownTitle) breakdownTitle.textContent = 'Monthly Channel Breakdown';
        } else {
            // Show totals for selected period
            if (totalInvestment) totalInvestment.textContent = '$' + Math.round(calcValues.totalBudget).toLocaleString();
            if (projectedRevenue) projectedRevenue.textContent = '$' + Math.round(calcValues.totalRevenue).toLocaleString();
            if (estVisits) estVisits.textContent = calcValues.totalClicks.toLocaleString();
            if (estConversions) estConversions.textContent = calcValues.totalConversions.toLocaleString();

            // Update labels
            if (investmentLabel) investmentLabel.textContent = periodLabel + ' Ad Investment';
            if (revenueLabel) revenueLabel.textContent = periodLabel + ' Revenue';
            if (visitsLabel) visitsLabel.textContent = periodLabel + ' Visits';
            if (conversionsLabel) conversionsLabel.textContent = periodLabel + ' Conversions';
            if (breakdownTitle) breakdownTitle.textContent = periodLabel + ' Channel Breakdown';
        }

        // Update breakdown rows based on view
        updateAllBreakdownRows();
    }

    function updateAllBreakdownRows() {
        const isMonthly = resultsView === 'monthly';
        const budget = parseFloat(adBudgetInput.value) || 3000;
        const months = parseInt(durationSelect.value);

        // Count active channels
        const activeChannels = [];
        if (chGoogle && chGoogle.checked) activeChannels.push('google');
        if (chMeta && chMeta.checked) activeChannels.push('meta');
        if (chTikTok && chTikTok.checked) activeChannels.push('tiktok');
        if (chPinterest && chPinterest.checked) activeChannels.push('pinterest');
        if (chReddit && chReddit.checked) activeChannels.push('reddit');

        if (activeChannels.length === 0) activeChannels.push('google');

        const budgetPerChannel = isMonthly
            ? budget / activeChannels.length
            : (budget * months) / activeChannels.length;

        updateBreakdownRow('google', googleRow, budgetPerChannel, activeChannels);
        updateBreakdownRow('meta', metaRow, budgetPerChannel, activeChannels);
        updateBreakdownRow('tiktok', tiktokRow, budgetPerChannel, activeChannels);
        updateBreakdownRow('pinterest', pinterestRow, budgetPerChannel, activeChannels);
        updateBreakdownRow('reddit', redditRow, budgetPerChannel, activeChannels);
    }

    // Event listeners
    if (adBudgetInput && adBudgetSlider) {
        adBudgetInput.addEventListener('input', function() {
            adBudgetSlider.value = this.value;
            calculateResults();
        });

        adBudgetSlider.addEventListener('input', function() {
            adBudgetInput.value = this.value;
            calculateResults();
        });
    }

    if (durationSelect) {
        durationSelect.addEventListener('change', function() {
            updateRoasHint();
            calculateResults();
        });
        durationSelect.addEventListener('input', function() {
            updateRoasHint();
            calculateResults();
        });
    }

    if (targetRoasSelect) {
        targetRoasSelect.addEventListener('change', calculateResults);
        targetRoasSelect.addEventListener('input', calculateResults);
    }

    if (aovInput) {
        aovInput.addEventListener('input', calculateResults);
    }

    // Channel checkboxes
    [chGoogle, chMeta, chTikTok, chPinterest, chReddit].forEach(ch => {
        if (ch) ch.addEventListener('change', calculateResults);
    });

    // Package toggle buttons
    calcToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            calcToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            calcPackage = this.dataset.package;
            updateRoasHint();
            calculateResults();
        });
    });

    // Results view toggle (Total vs Monthly)
    resultsToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            resultsToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            resultsView = this.dataset.view;
            updateResultsDisplay();
        });
    });

    // Expose globally for inline handlers (mobile reliability)
    window.calcAdResults = calculateResults;

    // Initialize calculator
    if (adBudgetInput) {
        updateRoasHint();
        // Set monthly view as default active button
        resultsToggleBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === 'monthly') {
                btn.classList.add('active');
            }
        });
        calculateResults();
    }
});
