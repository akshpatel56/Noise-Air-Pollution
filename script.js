// Main Pollution Monitoring Script
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Mock Pollution Data (fallback)
    let pollutionData = {
        cities: {
            'Delhi': {
                aqi: 458,
                status: 'Hazardous',
                pm25: 420,
                pm10: 580,
                no2: 85,
                o3: 45,
                noise: 78,
                color: '#8e44ad',
                mainPollutant: 'PM2.5',
                lat: 28.6139,
                lon: 77.2090
            },
            'Mumbai': {
                aqi: 112,
                status: 'Moderate',
                pm25: 98,
                pm10: 145,
                no2: 42,
                o3: 38,
                noise: 72,
                color: '#f1c40f',
                mainPollutant: 'PM10',
                lat: 19.0760,
                lon: 72.8777
            },
            'Kolkata': {
                aqi: 185,
                status: 'Unhealthy',
                pm25: 165,
                pm10: 220,
                no2: 68,
                o3: 42,
                noise: 75,
                color: '#e67e22',
                mainPollutant: 'PM2.5',
                lat: 22.5726,
                lon: 88.3639
            },
            'Chennai': {
                aqi: 95,
                status: 'Moderate',
                pm25: 82,
                pm10: 125,
                no2: 35,
                o3: 40,
                noise: 68,
                color: '#f1c40f',
                mainPollutant: 'PM10',
                lat: 13.0827,
                lon: 80.2707
            },
            'Bangalore': {
                aqi: 65,
                status: 'Moderate',
                pm25: 55,
                pm10: 95,
                no2: 28,
                o3: 35,
                noise: 65,
                color: '#2ecc71',
                mainPollutant: 'PM2.5',
                lat: 12.9716,
                lon: 77.5946
            },
            'Hyderabad': {
                aqi: 88,
                status: 'Moderate',
                pm25: 75,
                pm10: 115,
                no2: 32,
                o3: 38,
                noise: 70,
                color: '#f1c40f',
                mainPollutant: 'PM10',
                lat: 17.3850,
                lon: 78.4867
            },
            'Pune': {
                aqi: 78,
                status: 'Moderate',
                pm25: 65,
                pm10: 105,
                no2: 30,
                o3: 36,
                noise: 62,
                color: '#2ecc71',
                mainPollutant: 'PM2.5',
                lat: 18.5204,
                lon: 73.8567
            },
            'Jaipur': {
                aqi: 145,
                status: 'Unhealthy',
                pm25: 125,
                pm10: 185,
                no2: 45,
                o3: 40,
                noise: 68,
                color: '#e67e22',
                mainPollutant: 'PM10',
                lat: 26.9124,
                lon: 75.7873
            },
            'Lucknow': {
                aqi: 245,
                status: 'Very Unhealthy',
                pm25: 215,
                pm10: 285,
                no2: 65,
                o3: 48,
                noise: 72,
                color: '#c0392b',
                mainPollutant: 'PM2.5',
                lat: 26.8467,
                lon: 80.9462
            },
            'Ahmedabad': {
                aqi: 165,
                status: 'Unhealthy',
                pm25: 145,
                pm10: 195,
                no2: 52,
                o3: 42,
                noise: 70,
                color: '#e67e22',
                mainPollutant: 'PM10',
                lat: 23.0225,
                lon: 72.5714
            }
        },
        noiseData: [
            { city: 'Delhi', location: 'Connaught Place', day: 78, night: 65, status: 'Dangerous' },
            { city: 'Mumbai', location: 'Bandra', day: 72, night: 68, status: 'Moderate' },
            { city: 'Kolkata', location: 'Park Street', day: 75, night: 70, status: 'Dangerous' },
            { city: 'Chennai', location: 'T Nagar', day: 68, night: 62, status: 'Moderate' },
            { city: 'Bangalore', location: 'MG Road', day: 65, night: 58, status: 'Safe' },
            { city: 'Hyderabad', location: 'Banjara Hills', day: 70, night: 65, status: 'Moderate' },
            { city: 'Pune', location: 'FC Road', day: 62, night: 55, status: 'Safe' },
            { city: 'Jaipur', location: 'MI Road', day: 68, night: 60, status: 'Moderate' }
        ]
    };

    // Initialize AQI Grid
    function initAQIGrid() {
        const aqiGrid = document.getElementById('aqiGrid');
        aqiGrid.innerHTML = '';
        
        for (const city in pollutionData.cities) {
            const data = pollutionData.cities[city];
            const card = document.createElement('div');
            card.className = `aqi-card ${data.status.toLowerCase().replace(' ', '-')}`;
            card.dataset.city = city;
            
            card.innerHTML = `
                <div class="city-header">
                    <div class="city-name">${city}</div>
                    <div class="time">${getCurrentTime()}</div>
                </div>
                <div class="aqi-display" style="color: ${data.color}">${data.aqi}</div>
                <div class="aqi-status" style="background: ${data.color}">${data.status}</div>
                <div class="pollutants">
                    <div class="pollutant">
                        <span>PM2.5:</span>
                        <span>${data.pm25} µg/m³</span>
                    </div>
                    <div class="pollutant">
                        <span>PM10:</span>
                        <span>${data.pm10} µg/m³</span>
                    </div>
                    <div class="pollutant">
                        <span>Noise:</span>
                        <span>${data.noise} dB</span>
                    </div>
                </div>
                <div class="main-pollutant">
                    Main Pollutant: <strong>${data.mainPollutant}</strong>
                </div>
            `;
            
            // Add click event to card
            card.addEventListener('click', () => {
                showCityDetails(city, data);
            });
            
            aqiGrid.appendChild(card);
        }
    }

    // Show City Details Modal
    function showCityDetails(city, data) {
        // Remove existing modal if any
        const existingModal = document.querySelector('.city-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.className = 'city-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${city} - Pollution Details</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-stats">
                        <div class="modal-stat">
                            <h3>AQI</h3>
                            <div class="modal-value" style="color: ${data.color}">${data.aqi}</div>
                            <div class="modal-status">${data.status}</div>
                        </div>
                        <div class="modal-stat">
                            <h3>PM2.5</h3>
                            <div class="modal-value">${data.pm25} µg/m³</div>
                            <div class="modal-status">${getPM25Status(data.pm25)}</div>
                        </div>
                        <div class="modal-stat">
                            <h3>PM10</h3>
                            <div class="modal-value">${data.pm10} µg/m³</div>
                            <div class="modal-status">${getPM10Status(data.pm10)}</div>
                        </div>
                        <div class="modal-stat">
                            <h3>Noise</h3>
                            <div class="modal-value">${data.noise} dB</div>
                            <div class="modal-status">${getNoiseStatus(data.noise)}</div>
                        </div>
                    </div>
                    
                    <div class="health-recommendations">
                        <h3><i class="fas fa-heartbeat"></i> Health Recommendations</h3>
                        <p>${getHealthRecommendations(data.aqi)}</p>
                    </div>
                    
                    <div class="pollutant-breakdown">
                        <h3><i class="fas fa-chart-pie"></i> Pollutant Breakdown</h3>
                        <div class="breakdown-grid">
                            <div class="breakdown-item">
                                <span>PM2.5</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${(data.pm25/500)*100}%; background: ${data.color}"></div>
                                </div>
                                <span>${data.pm25} µg/m³</span>
                            </div>
                            <div class="breakdown-item">
                                <span>PM10</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${(data.pm10/600)*100}%; background: ${data.color}"></div>
                                </div>
                                <span>${data.pm10} µg/m³</span>
                            </div>
                            <div class="breakdown-item">
                                <span>NO₂</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${(data.no2/100)*100}%; background: #3498db"></div>
                                </div>
                                <span>${data.no2} ppb</span>
                            </div>
                            <div class="breakdown-item">
                                <span>O₃</span>
                                <div class="breakdown-bar">
                                    <div class="breakdown-fill" style="width: ${(data.o3/100)*100}%; background: #9b59b6"></div>
                                </div>
                                <span>${data.o3} ppb</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-close">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .city-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                animation: fadeIn 0.3s ease;
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .modal-content {
                background: white;
                border-radius: 20px;
                width: 90%;
                max-width: 800px;
                max-height: 90vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
            }
            .modal-header h2 {
                color: var(--primary);
                margin: 0;
            }
            .close-modal {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: #666;
                line-height: 1;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .modal-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            .modal-stat {
                text-align: center;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 10px;
            }
            .modal-stat h3 {
                margin: 0 0 0.5rem 0;
                color: #666;
                font-size: 0.9rem;
            }
            .modal-value {
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
            }
            .modal-status {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 500;
                display: inline-block;
                background: #eee;
            }
            .health-recommendations {
                background: #e8f4fc;
                padding: 1.5rem;
                border-radius: 10px;
                margin-bottom: 2rem;
            }
            .health-recommendations h3 {
                margin: 0 0 1rem 0;
                color: var(--primary);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .pollutant-breakdown {
                margin-bottom: 2rem;
            }
            .pollutant-breakdown h3 {
                margin: 0 0 1rem 0;
                color: var(--primary);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .breakdown-grid {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .breakdown-item {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            .breakdown-bar {
                flex: 1;
                height: 10px;
                background: #eee;
                border-radius: 5px;
                overflow: hidden;
            }
            .breakdown-fill {
                height: 100%;
            }
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #eee;
                text-align: right;
            }
            .btn-close {
                background: var(--primary);
                color: white;
                border: none;
                padding: 10px 30px;
                border-radius: 8px;
                cursor: pointer;
                font-family: 'Poppins', sans-serif;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
        
        // Close modal events
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.btn-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Helper functions for modal
    function getPM25Status(pm25) {
        if (pm25 <= 30) return 'Good';
        if (pm25 <= 60) return 'Moderate';
        if (pm25 <= 90) return 'Unhealthy';
        if (pm25 <= 120) return 'Very Unhealthy';
        return 'Hazardous';
    }
    
    function getPM10Status(pm10) {
        if (pm10 <= 50) return 'Good';
        if (pm10 <= 100) return 'Moderate';
        if (pm10 <= 250) return 'Unhealthy';
        if (pm10 <= 350) return 'Very Unhealthy';
        return 'Hazardous';
    }
    
    function getNoiseStatus(noise) {
        if (noise <= 65) return 'Safe';
        if (noise <= 75) return 'Moderate';
        return 'Dangerous';
    }
    
    function getHealthRecommendations(aqi) {
        if (aqi <= 50) return 'Air quality is satisfactory. Enjoy your normal outdoor activities.';
        if (aqi <= 100) return 'Air quality is acceptable. Sensitive individuals should consider limiting prolonged outdoor exertion.';
        if (aqi <= 150) return 'Members of sensitive groups may experience health effects. General public is less likely to be affected.';
        if (aqi <= 200) return 'Everyone may begin to experience health effects. Sensitive groups should avoid outdoor activity.';
        if (aqi <= 300) return 'Health alert: everyone may experience more serious health effects. Avoid outdoor activities.';
        return 'Health warning of emergency conditions: everyone is more likely to be affected. Stay indoors.';
    }

    // Initialize Noise Table
    function initNoiseTable() {
        const noiseTable = document.getElementById('noiseTable');
        noiseTable.innerHTML = '';
        
        pollutionData.noiseData.forEach(item => {
            const row = document.createElement('tr');
            let statusClass = '';
            if (item.status === 'Dangerous') statusClass = 'danger';
            else if (item.status === 'Moderate') statusClass = 'warning';
            else statusClass = 'success';
            
            row.innerHTML = `
                <td>${item.city}</td>
                <td>${item.location}</td>
                <td>${item.day} dB</td>
                <td>${item.night} dB</td>
                <td><span class="status-badge ${statusClass}">${item.status}</span></td>
            `;
            noiseTable.appendChild(row);
        });
    }

    // Update Noise Meter
    function updateNoiseMeter() {
        const needle = document.getElementById('noiseNeedle');
        const currentNoise = document.getElementById('currentNoise');
        const noiseLocation = document.getElementById('noiseLocation');
        
        // Simulate changing noise levels
        const cities = pollutionData.noiseData;
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        const noiseLevel = randomCity.day;
        
        // Calculate needle position (0° = 30dB, 180° = 110dB)
        const angle = ((noiseLevel - 30) / 80) * 180;
        needle.style.transform = `translateX(-50%) rotate(${angle}deg)`;
        
        currentNoise.textContent = `${noiseLevel} dB`;
        noiseLocation.textContent = `${randomCity.city} - ${randomCity.location}`;
        
        // Change color based on level
        if (noiseLevel > 75) {
            currentNoise.style.color = '#e74c3c';
        } else if (noiseLevel > 65) {
            currentNoise.style.color = '#f39c12';
        } else {
            currentNoise.style.color = '#2ecc71';
        }
    }

    // Initialize Pollution Map
    function initPollutionMap() {
        const map = L.map('pollutionMap').setView([20.5937, 78.9629], 5);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
        
        // Add city markers
        for (const city in pollutionData.cities) {
            const data = pollutionData.cities[city];
            const coords = [data.lat, data.lon];
            
            if (coords) {
                const marker = L.circleMarker(coords, {
                    radius: Math.max(15, Math.min(40, data.aqi / 10)),
                    color: data.color,
                    fillColor: data.color,
                    fillOpacity: 0.7,
                    weight: 2
                }).addTo(map);
                
                marker.bindPopup(`
                    <div class="map-popup">
                        <h3>${city}</h3>
                        <p><strong>AQI:</strong> ${data.aqi} (${data.status})</p>
                        <p><strong>PM2.5:</strong> ${data.pm25} µg/m³</p>
                        <p><strong>PM10:</strong> ${data.pm10} µg/m³</p>
                        <p><strong>Noise:</strong> ${data.noise} dB</p>
                        <p><strong>Main Pollutant:</strong> ${data.mainPollutant}</p>
                        <button onclick="showCityModal('${city}')" style="margin-top:10px;padding:5px 10px;background:#1a5276;color:white;border:none;border-radius:4px;cursor:pointer">
                            View Details
                        </button>
                    </div>
                `);
            }
        }
        
        // Add map click handler
        map.on('click', function(e) {
            L.popup()
                .setLatLng(e.latlng)
                .setContent('Coordinates: ' + e.latlng.toString())
                .openOn(map);
        });
        
        return map;
    }

    // Global function for map popup button
    window.showCityModal = function(city) {
        const data = pollutionData.cities[city];
        if (data) {
            showCityDetails(city, data);
        }
    };

    // Search Functionality
    document.getElementById('searchBtn').addEventListener('click', searchCity);
    
    document.querySelectorAll('.city-tag').forEach(button => {
        button.addEventListener('click', function() {
            const city = this.getAttribute('data-city');
            searchCity(city);
        });
    });
    
    function searchCity(city = null) {
        const searchInput = document.getElementById('citySearch');
        const cityName = city || searchInput.value.trim();
        
        if (!cityName) return;
        
        const cityData = pollutionData.cities[cityName];
        
        if (cityData) {
            // Scroll to results
            document.querySelector('.aqi-section').scrollIntoView({ behavior: 'smooth' });
            
            // Highlight the city card
            highlightCityCard(cityName);
            
            // Show city details
            showCityDetails(cityName, cityData);
            
            // Update search input
            searchInput.value = cityName;
        } else {
            alert(`No data available for "${cityName}". Try: Delhi, Mumbai, Kolkata, Chennai, Bangalore, Hyderabad, Pune, Jaipur, Lucknow, Ahmedabad`);
        }
    }
    
    function highlightCityCard(cityName) {
        // Remove previous highlights
        document.querySelectorAll('.aqi-card').forEach(card => {
            card.style.boxShadow = '';
            card.style.transform = '';
        });
        
        // Find and highlight the city card
        const cards = document.querySelectorAll('.aqi-card');
        cards.forEach(card => {
            if (card.dataset.city === cityName) {
                card.style.boxShadow = '0 0 0 3px #3498db, 0 10px 30px rgba(0,0,0,0.2)';
                card.style.transform = 'scale(1.05)';
                
                // Scroll to the card
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    }

    // Get current time in IST
    function getCurrentTime() {
        const now = new Date();
        const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' };
        return now.toLocaleTimeString('en-IN', options);
    }

    // Simulate real-time updates
    function simulateRealTimeUpdates() {
        // Update noise meter every 5 seconds
        setInterval(updateNoiseMeter, 5000);
        
        // Update AQI values every 30 seconds (simulated)
        setInterval(() => {
            // Randomly adjust AQI values
            for (const city in pollutionData.cities) {
                const change = Math.floor(Math.random() * 20) - 10; // -10 to +10
                pollutionData.cities[city].aqi = Math.max(20, Math.min(500, pollutionData.cities[city].aqi + change));
                
                // Update related values
                pollutionData.cities[city].pm25 = Math.max(10, Math.min(500, pollutionData.cities[city].pm25 + change * 0.9));
                pollutionData.cities[city].pm10 = Math.max(20, Math.min(600, pollutionData.cities[city].pm10 + change * 1.2));
                pollutionData.cities[city].noise = Math.max(40, Math.min(100, pollutionData.cities[city].noise + (Math.random() * 4 - 2)));
                
                // Update status based on new AQI
                const aqi = pollutionData.cities[city].aqi;
                if (aqi <= 50) {
                    pollutionData.cities[city].status = 'Good';
                    pollutionData.cities[city].color = '#2ecc71';
                } else if (aqi <= 100) {
                    pollutionData.cities[city].status = 'Moderate';
                    pollutionData.cities[city].color = '#f1c40f';
                } else if (aqi <= 150) {
                    pollutionData.cities[city].status = 'Unhealthy';
                    pollutionData.cities[city].color = '#e67e22';
                } else if (aqi <= 200) {
                    pollutionData.cities[city].status = 'Very Unhealthy';
                    pollutionData.cities[city].color = '#c0392b';
                } else {
                    pollutionData.cities[city].status = 'Hazardous';
                    pollutionData.cities[city].color = '#8e44ad';
                }
            }
            
            // Update the grid
            initAQIGrid();
        }, 30000);
    }

    function startApp() {
        initAQIGrid();
        initNoiseTable();
        updateNoiseMeter();
        initPollutionMap();
        simulateRealTimeUpdates();
    }

    // Try loading static API data (no server required). If unavailable, use fallback.
    if (window.API && typeof API.getAQI === 'function') {
        API.getAQI().then(data => {
            if (data && (data.cities || data.noiseData)) {
                pollutionData = data;
            }
            startApp();
        }).catch(() => startApp());
    } else {
        startApp();
    }
});