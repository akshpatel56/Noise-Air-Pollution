// Dashboard Charts
document.addEventListener('DOMContentLoaded', function() {
    // AQI Trends Chart
    const aqiCtx = document.getElementById('aqiTrendChart').getContext('2d');
    const hours = ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
    const aqiData = [380, 410, 450, 480, 460, 440, 420, 400];
    
    const aqiChart = new Chart(aqiCtx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: 'AQI Delhi',
                data: aqiData,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'AQI Value'
                    }
                }
            }
        }
    });

    // City Comparison Chart
    const cityCtx = document.getElementById('cityComparisonChart').getContext('2d');
    new Chart(cityCtx, {
        type: 'bar',
        data: {
            labels: ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore'],
            datasets: [{
                label: 'Current AQI',
                data: [458, 112, 185, 95, 65],
                backgroundColor: [
                    '#8e44ad',
                    '#f1c40f',
                    '#e67e22',
                    '#f1c40f',
                    '#2ecc71'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'AQI Value'
                    }
                }
            }
        }
    });

    // Noise Timeline Chart
    const noiseCtx = document.getElementById('noiseTimelineChart').getContext('2d');
    const noiseHours = ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'];
    const noiseLevels = [65, 72, 78, 75, 70, 68, 62];
    
    new Chart(noiseCtx, {
        type: 'line',
        data: {
            labels: noiseHours,
            datasets: [{
                label: 'Noise Level (dB)',
                data: noiseLevels,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    title: {
                        display: true,
                        text: 'Decibels (dB)'
                    }
                }
            }
        }
    });

    // Pollution Sources Pie Chart
    const sourceCtx = document.getElementById('sourcePieChart').getContext('2d');
    new Chart(sourceCtx, {
        type: 'doughnut',
        data: {
            labels: ['Vehicles', 'Industry', 'Construction', 'Dust', 'Others'],
            datasets: [{
                data: [45, 25, 18, 8, 4],
                backgroundColor: [
                    '#e74c3c',
                    '#f39c12',
                    '#3498db',
                    '#2ecc71',
                    '#9b59b6'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Update data every 10 seconds
    setInterval(() => {
        // Simulate data changes
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour <= 18) {
            // Daytime - increase AQI slightly
            aqiData[Math.floor(currentHour/3)] += Math.random() * 20 - 10;
        } else {
            // Nighttime - decrease AQI slightly
            aqiData[Math.floor(currentHour/3)] += Math.random() * 10 - 5;
        }
        
        // Update charts
        aqiChart.update();
    }, 10000);
});