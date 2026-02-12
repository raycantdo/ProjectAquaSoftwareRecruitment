const apiUrl = "http://localhost:3000/api/telemetry/latest";


const depthEl = document.getElementById('depth');
const pressureEl = document.getElementById('pressure');
const tempEl = document.getElementById('temperature');
const dirEl = document.getElementById('direction');
const tsEl = document.getElementById('timestamp');
const statusEl = document.getElementById('pressureStatus');


const ctx = document.getElementById('depthChart').getContext('2d');
const chartData = {
    labels: [], // timestamps
    datasets: [{
        label: 'Depth (m)',
        data: [],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        tension: 0.3,
    }]
};
const depthChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Depth (m)' }, beginAtZero: true }
        }
    }
});


async function fetchTelemetry() {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("No telemetry data");
        const data = await res.json();

       
        depthEl.textContent = data.depth.toFixed(2);
        pressureEl.textContent = data.pressure.toFixed(2);
        tempEl.textContent = data.temperature.toFixed(1);
        dirEl.textContent = data.direction.toFixed(1);
        tsEl.textContent = new Date(data.timestamp).toLocaleTimeString();

       
        let status = 'NORMAL';
        let color = 'green';
        if (data.pressure >= 1.8 && data.pressure <= 2.0) { status = 'WARNING'; color = 'orange'; }
        else if (data.pressure > 2.0) { status = 'CRITICAL'; color = 'red'; }
        statusEl.textContent = status;
        statusEl.style.backgroundColor = color;
        statusEl.style.color = 'white';

      
        chartData.labels.push(new Date(data.timestamp).toLocaleTimeString());
        chartData.datasets[0].data.push(data.depth);
        if (chartData.labels.length > 20) { // show last 20 points
            chartData.labels.shift();
            chartData.datasets[0].data.shift();
        }
        depthChart.update();

    } catch (err) {
        console.error("Error fetching telemetry:", err);
    }
}

// Poll every 5 seconds
fetchTelemetry(); // initial fetch
setInterval(fetchTelemetry, 5000);
