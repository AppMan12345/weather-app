<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#a0c4e8">
    <meta name="description" content="A beautiful glassmorphic weather forecast app">

```
<!-- PWA / iOS -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Weather">
<link rel="apple-touch-icon" href="icon-192.png">

<!-- PWA manifest -->
<link rel="manifest" href="manifest.json">

<title>Weather Forecast</title>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300&display=swap" rel="stylesheet">
<style>
    *, *::before, *::after { box-sizing: border-box; }
    ul, ol, li, footer, header, nav, section, article, aside, main {
        list-style: none; margin: 0; padding: 0;
    }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(160deg, #b8d8f0 0%, #a0c4e8 25%, #8fb8e0 50%, #a8cce0 75%, #c0d8e8 100%);
        color: #f0f8ff;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }
    .app-wrap {
        width: 100%;
        max-width: 420px;
        padding: calc(1.2rem + env(safe-area-inset-top)) 1rem env(safe-area-inset-bottom);
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        margin: 0 auto;
    }
    h1 {
        font-family: 'Raleway', -apple-system, sans-serif;
        font-size: 1.4rem;
        font-weight: 300;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        white-space: nowrap;
        margin: 0;
        color: transparent;
        background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.45) 40%, rgba(200,240,255,0.65) 70%, rgba(255,255,255,0.85) 100%);
        -webkit-background-clip: text;
        background-clip: text;
        filter: drop-shadow(0 1px 8px rgba(180,230,255,0.25)) drop-shadow(0 0px 1px rgba(0,0,0,0.5));
    }
    .h1-wrap { display: flex; justify-content: center; margin-bottom: 1.8rem; }
    .h1-wrap-inner { display: flex; justify-content: center; width: 100%; }
    #controls { display: flex; margin-bottom: 1.8rem; width: 100%; }
    .input-row { display: flex; gap: 0.5rem; width: 100%; align-items: stretch; }
    #city-input {
        flex: 1; padding: 0.75rem 1.25rem;
        border: 1px solid rgba(255,255,255,0.18); border-radius: 16px;
        background: rgba(255,255,255,0.09); color: #f0f8ff;
        font-size: 0.93rem; font-family: inherit;
        box-shadow: 0 2px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.07);
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        outline: none; transition: border-color 0.22s, background 0.22s, box-shadow 0.22s;
    }
    #city-input:focus {
        border-color: rgba(0,255,200,0.5); background: rgba(255,255,255,0.13);
        box-shadow: 0 2px 22px rgba(0,0,0,0.26), 0 0 0 3px rgba(0,255,180,0.12);
    }
    #city-input::placeholder { color: rgba(180,255,220,0.48); }
    .btn-row { display: flex; gap: 0.55rem; width: 100%; max-width: 460px; }
    button {
        padding: 0.72rem 0; border-radius: 16px;
        font-family: inherit; font-size: 0.88rem; font-weight: 600;
        letter-spacing: 0.025em; cursor: pointer; color: #f0f8ff;
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        box-shadow: 0 2px 18px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.1);
        transition: background 0.2s, border-color 0.2s, transform 0.15s, box-shadow 0.2s;
        flex-shrink: 0; width: 48px;
    }
    button:hover { transform: translateY(-1px); box-shadow: 0 6px 26px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12); }
    button:active { transform: scale(0.97); }

    #unit-toggle {
        border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.09);
        font-size: 0.82rem; font-weight: 600; letter-spacing: 0.03em;
        color: rgba(255,255,255,0.8);
    }
    #unit-toggle:hover { background: rgba(255,255,255,0.15); color: #f0f8ff; }
    #refresh-btn {
        border: 1px solid rgba(255,255,255,0.18); background: rgba(255,255,255,0.09);
        font-size: 1.15rem; color: rgba(255,255,255,0.8); line-height: 1;
    }
    #refresh-btn:hover { background: rgba(255,255,255,0.15); color: #f0f8ff; }
    .city-details {
        background: rgba(255,255,255,0.08); border-radius: 20px; margin-bottom: 0.6rem;
        box-shadow: 0 6px 25px rgba(0,0,0,0.35); backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.12);
    }
    .city-details.entering { animation: slideIn 0.3s ease forwards; }
    .city-details.removing { animation: slideOut 0.25s ease forwards; }
    @keyframes slideIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
    @keyframes slideOut { from { opacity:1; transform:translateY(0); } to { opacity:0; transform:translateY(-8px); } }
    .city-summary {
        padding: 0.85rem 1.4rem; display: flex; justify-content: space-between;
        align-items: center; font-size: 0.9rem; font-weight: 600;
        color: rgba(255,255,255,0.9); cursor: pointer; letter-spacing: 0.04em;
        text-transform: uppercase; border-bottom: 1px solid rgba(255,255,255,0.07);
        gap: 0.75rem;
    }
    .city-name-text {
        flex: 1; white-space: normal; word-break: break-word; line-height: 1.3;
        padding-right: 0.25rem; font-size: 0.82rem;
    }
    .city-loading { padding: 0.9rem 1.4rem; font-size: 0.85rem; color: rgba(255,255,255,0.4); letter-spacing: 0.05em; }
    .remove-btn {
        background: rgba(255,51,102,0.15); color: white; border: none;
        border-radius: 50%; width: 28px; height: 28px; font-size: 1.15rem;
        cursor: pointer; box-shadow: 0 0 12px rgba(255,51,102,0.3);
        display: flex; align-items: center; justify-content: center; padding: 0;
    }
    .city-content { padding: 0 1.4rem 1rem; }
    .day {
        background: rgba(255,255,255,0.1); border-radius: 16px;
        margin-bottom: 0.6rem; border: 1px solid rgba(255,255,255,0.15);
        overflow: hidden;
    }
    .day-header {
        padding: 0.9rem 1.3rem; display: flex; justify-content: space-between;
        cursor: pointer; font-weight: 700; color: #ffffcc; background: rgba(0,255,204,0.05);
        user-select: none;
    }
    .day-basic { display: flex; justify-content: space-between; width: 100%; font-size: 1.05rem; }
    .expanded {
        max-height: 0; overflow: hidden;
        transition: max-height 0.28s ease, padding 0.28s ease;
        padding: 0 1.3rem; display: flex; flex-direction: column; gap: 0.2rem;
    }
    .day.open .expanded { max-height: 260px; padding: 0.5rem 1.3rem 0.8rem; }
    .wx-desc { font-size: 0.82rem; font-weight: 600; color: rgba(240,248,255,0.85); letter-spacing: 0.02em; }
    .wx-meta { font-size: 0.78rem; color: rgba(240,248,255,0.55); line-height: 1.5; }
    .hourly-strip {
        display: flex; gap: 0.3rem; overflow-x: auto; padding: 0.5rem 0 0.25rem;
        scrollbar-width: none;
    }
    .hourly-strip::-webkit-scrollbar { display: none; }
    .hourly-item {
        display: flex; flex-direction: column; align-items: center; gap: 0.15rem;
        background: rgba(255,255,255,0.1); border-radius: 10px;
        padding: 0.4rem 0.5rem; flex-shrink: 0; min-width: 44px;
    }
    .hourly-time { font-size: 0.65rem; color: rgba(240,248,255,0.5); }
    .hourly-emoji { font-size: 1rem; line-height: 1; }
    .hourly-temp { font-size: 0.72rem; font-weight: 600; color: rgba(240,248,255,0.85); }
    .alert-banner {
        margin: 0.5rem 1.4rem 0;
        padding: 0.5rem 0.9rem;
        border-radius: 10px;
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.02em;
        cursor: pointer;
        line-height: 1.4;
    }
    .alert-warning  { background: rgba(220,40,40,0.25);  border: 1px solid rgba(255,80,80,0.4);  color: rgba(255,200,200,0.95); }
    .alert-watch    { background: rgba(220,120,20,0.25); border: 1px solid rgba(255,160,60,0.4); color: rgba(255,220,160,0.95); }
    .alert-advisory { background: rgba(200,180,20,0.2);  border: 1px solid rgba(240,220,60,0.4); color: rgba(255,245,180,0.95); }
    details, details > summary { list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
    details > summary::marker { content: ''; display: none; font-size: 0; }
    details > summary { display: flex; }
    p.error { color: #ffff66; font-weight: bold; text-align: center; padding: 1.2rem; }
    .input-wrap { position: relative; width: 100%; max-width: 460px; }
    #suggestions {
        position: absolute; top: calc(100% + 4px); left: 0; right: 0;
        background: rgba(180,210,235,0.92); backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255,255,255,0.3); border-radius: 14px;
        overflow: hidden; z-index: 100;
        box-shadow: 0 8px 28px rgba(0,0,0,0.18);
        display: none;
    }
    .suggestion-item {
        padding: 0.7rem 1.1rem; cursor: pointer;
        font-size: 0.85rem; color: rgba(20,40,70,0.9);
        border-bottom: 1px solid rgba(255,255,255,0.25);
        transition: background 0.15s;
    }
    .suggestion-item:last-child { border-bottom: none; }
    .suggestion-item:hover { background: rgba(255,255,255,0.35); }
    .suggestion-name { font-weight: 600; }
    .suggestion-detail { font-size: 0.76rem; color: rgba(20,40,70,0.55); margin-top: 1px; }
    footer, footer::before, footer::after,
    footer *, footer *::before, footer *::after { 
        list-style: none; 
    }
    footer { display: block; }
    #footer {
        margin-top: auto;
        padding: 1.8rem 0 1.4rem;
        text-align: center; font-size: 0.72rem; letter-spacing: 0.18em;
        text-transform: lowercase; color: rgba(255,255,255,0.5);
    }
</style>
```

</head>
<body>
<div class="app-wrap">
    <div class="h1-wrap"><div class="h1-wrap-inner"><h1>Weather Forecast</h1></div></div>
    <div id="controls">
        <div class="input-row">
            <div class="input-wrap">
                <input id="city-input" type="text" placeholder="Search city..." autocomplete="off">
                <div id="suggestions"></div>
            </div>
            <button id="unit-toggle" onclick="toggleUnit()">°F</button>
            <button id="refresh-btn" onclick="refreshAll()">↻</button>
        </div>
    </div>
    <div id="forecasts" style="width:100%;"></div>
    <footer id="footer">drink more water</footer>

```
<script>
    let trackedCities = JSON.parse(localStorage.getItem('trackedCities') || '[{"name":"Seattle","lat":47.6062,"lon":-122.3321}]');
    let useC = JSON.parse(localStorage.getItem('useC') || 'false');

    const cache = {};
    const CACHE_TTL = 10 * 60 * 1000;

    // WMO codes: https://open-meteo.com/en/docs
    const emojis = {
        0: '☀️',   1: '🌤️',  2: '⛅',   3: '☁️',
        45: '🌫️',  48: '🌫️',
        51: '🌦️',  53: '🌦️', 55: '🌧️',
        56: '🌨️',  57: '🌨️',
        61: '🌧️',  63: '🌧️', 65: '🌧️',
        66: '🌨️',  67: '🌨️',
        71: '🌨️',  73: '❄️',  75: '❄️',  77: '🌨️',
        80: '🌦️',  81: '🌧️', 82: '⛈️',
        85: '🌨️',  86: '❄️',
        95: '⛈️',  96: '⛈️', 99: '⛈️'
    };

    const descriptions = {
        0:  'Clear skies',
        1:  'Mostly clear',
        2:  'Partly cloudy',
        3:  'Overcast',
        45: 'Foggy',
        48: 'Freezing fog',
        51: 'Light drizzle',
        53: 'Drizzle',
        55: 'Heavy drizzle',
        56: 'Light freezing drizzle',
        57: 'Freezing drizzle',
        61: 'Light rain',
        63: 'Rain',
        65: 'Heavy rain',
        66: 'Light freezing rain',
        67: 'Freezing rain',
        71: 'Light snow',
        73: 'Snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Light showers',
        81: 'Showers',
        82: 'Heavy showers',
        85: 'Light snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Heavy thunderstorm with hail'
    };

    function getEmoji(code) {
        if (emojis[code] !== undefined) return emojis[code];
        if (code <= 3)  return '⛅';
        if (code <= 49) return '🌫️';
        if (code <= 59) return '🌦️';
        if (code <= 69) return '🌧️';
        if (code <= 79) return '❄️';
        if (code <= 84) return '🌧️';
        if (code <= 94) return '🌨️';
        return '⛈️';
    }

    function getDescription(code) {
        if (descriptions[code]) return descriptions[code];
        if (code <= 3)  return 'Cloudy';
        if (code <= 49) return 'Foggy';
        if (code <= 59) return 'Drizzle';
        if (code <= 69) return 'Rain';
        if (code <= 79) return 'Snow';
        if (code <= 84) return 'Showers';
        if (code <= 94) return 'Snow showers';
        return 'Thunderstorm';
    }

            function toF(c) { return Math.round(c * 9/5 + 32); }
    function mmToIn(mm) { return (mm / 25.4).toFixed(2); }
    function kmhToMph(kmh) { return Math.round(kmh * 0.621371); }
    function formatTime(iso) {
        if (!iso) return 'N/A';
        return new Date(iso).toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit', hour12:true});
    }

    async function fetchForecast(lat, lon, forceRefresh) {
        const key = lat + ',' + lon;
        const now = Date.now();
        if (!forceRefresh && cache[key] && (now - cache[key].ts < CACHE_TTL)) {
            return cache[key].data;
        }
        try {
            const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon +
                '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset' +
                '&hourly=temperature_2m,weather_code&timezone=auto&forecast_days=7';
            const res = await fetch(url);
            if (!res.ok) throw new Error('API error');
            const data = await res.json();
            cache[key] = {data, ts: now};
            return data;
        } catch(e) { return null; }
    }

    async function fetchAlerts(lat, lon) {
        const key = 'alerts:' + lat + ',' + lon;
        const now = Date.now();
        if (cache[key] && (now - cache[key].ts < CACHE_TTL)) return cache[key].data;
        try {
            // NWS: get grid point first
            const ptRes = await fetch('https://api.weather.gov/points/' + lat.toFixed(4) + ',' + lon.toFixed(4));
            if (!ptRes.ok) { cache[key] = {data: [], ts: now}; return []; }
            const pt = await ptRes.json();
            const zone = pt.properties && pt.properties.forecastZone;
            if (!zone) { cache[key] = {data: [], ts: now}; return []; }
            const zoneId = zone.split('/').pop();
            const alertRes = await fetch('https://api.weather.gov/alerts/active?zone=' + zoneId);
            if (!alertRes.ok) { cache[key] = {data: [], ts: now}; return []; }
            const alertData = await alertRes.json();
            const alerts = (alertData.features || []).map(function(f) {
                return {
                    headline: f.properties.headline || f.properties.event,
                    severity: f.properties.severity,
                    event: f.properties.event
                };
            });
            cache[key] = {data: alerts, ts: now};
            return alerts;
        } catch(e) { return []; }
    }

    function alertClass(severity) {
        if (!severity) return 'alert-advisory';
        const s = severity.toLowerCase();
        if (s === 'extreme' || s === 'severe') return 'alert-warning';
        if (s === 'moderate') return 'alert-watch';
        return 'alert-advisory';
    }

    function buildCityCard(city, forecast, alerts) {
        const el = document.createElement('details');
        el.className = 'city-details';
        el.dataset.city = city.name;

        const summary = document.createElement('summary');
        summary.className = 'city-summary';
        const nameSpan = document.createElement('span');
        nameSpan.className = 'city-name-text';
        nameSpan.textContent = city.name;
        summary.appendChild(nameSpan);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            removeCity(city.name);
        });
        summary.appendChild(removeBtn);
        el.appendChild(summary);

        el.addEventListener('toggle', function() {
            if (!el.open) {
                el.querySelectorAll('.day').forEach(function(d) { d.classList.remove('open'); });
            }
        });

        // Alert banners
        if (alerts && alerts.length > 0) {
            alerts.slice(0, 2).forEach(function(alert) {
                const banner = document.createElement('div');
                banner.className = 'alert-banner ' + alertClass(alert.severity);
                banner.textContent = '⚠ ' + alert.headline;
                el.appendChild(banner);
            });
        }

        const content = document.createElement('div');
        content.className = 'city-content';

        if (!forecast || !forecast.daily) {
            content.innerHTML = '<p class="error">Failed to load - try refresh.</p>';
        } else {
            const d = forecast.daily;
            d.time.forEach(function(time, i) {
                const weekday = new Date(time).toLocaleString('en-US', {weekday: 'short'});
                const max = d.temperature_2m_max[i];
                const min = d.temperature_2m_min[i];
                const unit = useC ? 'C' : 'F';
                const dMax = useC ? Math.round(max) : toF(max);
                const dMin = useC ? Math.round(min) : toF(min);
                const precip = mmToIn(d.precipitation_sum[i]);
                const wind = kmhToMph(d.wind_speed_10m_max[i]);
                const emoji = getEmoji(d.weather_code[i]);
                const sunrise = formatTime(d.sunrise[i]);
                const sunset = formatTime(d.sunset[i]);

                // Derive day emoji and hourly data from hourly codes (more accurate)
                let dayEmoji = emoji; // fallback
                let hourlyHTML = '<div class="hourly-strip">';
                if (forecast.hourly) {
                    const h = forecast.hourly;
                    const dayStr = time;
                    // Start from current hour for today, 7am for future days
                    const nowHour = new Date();
                    const todayStr = nowHour.getFullYear() + '-' +
                        String(nowHour.getMonth()+1).padStart(2,'0') + '-' +
                        String(nowHour.getDate()).padStart(2,'0');
                    let startIdx;
                    if (dayStr === todayStr) {
                        const curHourStr = dayStr + 'T' + String(nowHour.getHours()).padStart(2,'0') + ':00';
                        startIdx = h.time.findIndex(function(t) { return t === curHourStr; });
                        if (startIdx === -1) startIdx = h.time.findIndex(function(t) { return t.startsWith(dayStr); });
                    } else {
                        startIdx = h.time.findIndex(function(t) { return t === dayStr + 'T07:00'; });
                        if (startIdx === -1) startIdx = h.time.findIndex(function(t) { return t.startsWith(dayStr); });
                    }

                    // For today: use current hour's code. For future days: most severe 8am-6pm.
                    if (dayStr === todayStr && startIdx !== -1) {
                        dayEmoji = getEmoji(h.weather_code[startIdx]);
                    } else {
                        let noonIdx = h.time.findIndex(function(t) { return t === dayStr + 'T08:00'; });
                        if (noonIdx === -1) noonIdx = startIdx;
                        if (noonIdx !== -1) {
                            const severity = function(c) {
                                if (c >= 95) return 9; if (c >= 80) return 8; if (c >= 71) return 7;
                                if (c >= 61) return 6; if (c >= 51) return 5; if (c >= 45) return 4;
                                if (c === 3) return 3; if (c === 2) return 2; if (c === 1) return 1;
                                return 0;
                            };
                            let bestCode = d.weather_code[i];
                            let bestSev = severity(bestCode);
                            for (var si = 0; si < 10; si++) {
                                const sidx = noonIdx + si;
                                if (sidx >= h.time.length || !h.time[sidx].startsWith(dayStr)) break;
                                const sv = severity(h.weather_code[sidx]);
                                if (sv > bestSev) { bestSev = sv; bestCode = h.weather_code[sidx]; }
                            }
                            dayEmoji = getEmoji(bestCode);
                        }
                    }

                    if (startIdx !== -1) {
                        for (var hi = 0; hi < 7; hi++) {
                            const idx = startIdx + hi;
                            if (idx >= h.time.length || !h.time[idx].startsWith(dayStr)) break;
                            const hTime = new Date(h.time[idx]);
                            const hLabel = hTime.toLocaleTimeString('en-US', {hour: 'numeric', hour12: true});
                            const hTemp = useC ? Math.round(h.temperature_2m[idx]) : toF(h.temperature_2m[idx]);
                            const hEmoji = getEmoji(h.weather_code[idx]);
                            hourlyHTML += '<div class="hourly-item">' +
                                '<span class="hourly-time">' + hLabel + '</span>' +
                                '<span class="hourly-emoji">' + hEmoji + '</span>' +
                                '<span class="hourly-temp">' + hTemp + '°</span>' +
                                '</div>';
                        }
                    }
                }
                hourlyHTML += '</div>';

                const day = document.createElement('div');
                day.className = 'day';
                day.innerHTML = '<div class="day-header"><div class="day-basic">' +
                    '<span>' + weekday + '</span>' +
                    '<span>' + dMax + '° / ' + dMin + '°' + unit + '</span>' +
                    '<span>' + dayEmoji + '</span>' +
                    '</div></div>' +
                    '<div class="expanded">' +
                    hourlyHTML +
                    '<span class="wx-meta">Precip: ' + precip + ' in &bull; Wind: ' + wind + ' mph</span>' +
                    '<span class="wx-meta">Sunrise: ' + sunrise + ' &nbsp;|&nbsp; Sunset: ' + sunset + '</span>' +
                    '</div>';
                day.querySelector('.day-header').addEventListener('click', function() {
                    day.classList.toggle('open');
                });
                content.appendChild(day);
            });
        }
        el.appendChild(content);
        return el;
    }

    async function renderCity(city, forceRefresh) {
        const container = document.getElementById('forecasts');

        const placeholder = document.createElement('details');
        placeholder.className = 'city-details entering';
        placeholder.dataset.city = city.name;
        placeholder.innerHTML = '<summary class="city-summary"><span class="city-name-text">' + city.name + '</span></summary>' +
            '<div class="city-loading">Loading...</div>';
        container.appendChild(placeholder);

        const [forecast, alerts] = await Promise.all([
            fetchForecast(city.lat, city.lon, forceRefresh),
            fetchAlerts(city.lat, city.lon)
        ]);
        const card = buildCityCard(city, forecast, alerts);
        card.classList.add('entering');
        placeholder.replaceWith(card);
    }

    async function initialLoad() {
        document.getElementById('forecasts').innerHTML = '';
        await Promise.all(trackedCities.map(function(city) { return renderCity(city, false); }));
    }

    async function refreshAll() {
        const container = document.getElementById('forecasts');
        await Promise.all(trackedCities.map(async function(city) {
            const [forecast, alerts] = await Promise.all([
                fetchForecast(city.lat, city.lon, true),
                fetchAlerts(city.lat, city.lon)
            ]);
            const existing = container.querySelector('[data-city="' + city.name + '"]');
            const card = buildCityCard(city, forecast, alerts);
            if (existing) existing.replaceWith(card);
            else container.appendChild(card);
        }));
    }

    function toggleUnit() {
        useC = !useC;
        localStorage.setItem('useC', JSON.stringify(useC));
        document.getElementById('unit-toggle').textContent = useC ? '°F' : '°C';
        const container = document.getElementById('forecasts');
        trackedCities.forEach(function(city) {
            const key = city.lat + ',' + city.lon;
            const alertKey = 'alerts:' + key;
            const forecast = cache[key] ? cache[key].data : null;
            const alerts = cache[alertKey] ? cache[alertKey].data : [];
            const existing = container.querySelector('[data-city="' + city.name + '"]');
            if (existing && forecast) existing.replaceWith(buildCityCard(city, forecast, alerts));
        });
    }

    let searchTimer = null;

    async function searchCities(query) {
        if (!query || query.length < 2) { hideSuggestions(); return; }
        try {
            const res = await fetch(
                'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(query) +
                '&format=json&limit=5&featuretype=city&addressdetails=1',
                { headers: {'User-Agent': 'WeatherForecastApp/1.0'} }
            );
            const data = await res.json();
            showSuggestions(data);
        } catch(e) { hideSuggestions(); }
    }

    function showSuggestions(results) {
        const box = document.getElementById('suggestions');
        box.innerHTML = '';
        if (!results || results.length === 0) { hideSuggestions(); return; }
        results.forEach(function(r) {
            const addr = r.address || {};
            const name = addr.city || addr.town || addr.village || addr.county || r.display_name.split(',')[0];
            const state = addr.state || addr.region || '';
            const country = addr.country || '';
            const detail = [state, country].filter(Boolean).join(', ');

            const item = document.createElement('div');
            item.className = 'suggestion-item';
            item.innerHTML = '<div class="suggestion-name">' + name + '</div>' +
                (detail ? '<div class="suggestion-detail">' + detail + '</div>' : '');
            item.addEventListener('click', function() {
                selectCity(name + (detail ? ', ' + detail : ''), parseFloat(r.lat), parseFloat(r.lon));
            });
            box.appendChild(item);
        });
        box.style.display = 'block';
    }

    function hideSuggestions() {
        document.getElementById('suggestions').style.display = 'none';
    }

    async function selectCity(displayName, lat, lon) {
        if (trackedCities.some(function(c) { return c.name === displayName; })) {
            hideSuggestions();
            document.getElementById('city-input').value = '';
            return;
        }
        const city = { name: displayName, lat: lat, lon: lon };
        trackedCities.push(city);
        localStorage.setItem('trackedCities', JSON.stringify(trackedCities));
        document.getElementById('city-input').value = '';
        hideSuggestions();
        await renderCity(city, false);
    }



    function removeCity(name) {
        if (!confirm('Remove ' + name + '?')) return;
        trackedCities = trackedCities.filter(function(c) { return c.name !== name; });
        localStorage.setItem('trackedCities', JSON.stringify(trackedCities));
        const card = document.querySelector('[data-city="' + name + '"]');
        if (card) {
            card.classList.add('removing');
            card.addEventListener('animationend', function() { card.remove(); });
        }
    }

    document.getElementById('city-input').addEventListener('input', function() {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function() { searchCities(document.getElementById('city-input').value.trim()); }, 350);
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.input-wrap')) hideSuggestions();
    });
    document.getElementById('unit-toggle').textContent = useC ? '°F' : '°C';
    initialLoad();
</script>

</div>
<script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js').catch(function(err) {
                console.log('SW registration failed:', err);
            });
        });
    }
</script>
</body>
</html>