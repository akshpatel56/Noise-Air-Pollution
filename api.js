// Simple client-side API wrapper — no dependencies
window.API = {
  getAQI: function() {
    return fetch('/api/aqi.json').then(res => {
      if (!res.ok) throw new Error('No AQI API');
      return res.json();
    });
  },
  getCitiesList: function() {
    return fetch('/api/cities.json').then(res => res.ok ? res.json() : Promise.reject('no'));
  },
  getPage: function(page) {
    return fetch(`/api/${page}.json`).then(res => res.ok ? res.json() : Promise.reject('no'));
  }
};
