import { io } from 'socket.io-client';

// Configuration
const SERVER_URL = 'localhost:3000/io'; // Replace with your Socket.IO server URL
const TOTAL_CONNECTIONS = 1000; // Number of clients to simulate
const CONNECTION_INTERVAL_MS = 10; // Delay between starting new connections
const MESSAGE = { event: 'greet', data: 'Hello, server!' }; // Message to send after connecting
const STATS_INTERVAL_MS = 1000; // Interval to log stats

// Statistics
let connectedClients = 0;
let totalMessagesReceived = 0;
let errors = 0;

// Create Socket.IO connections
const clients = [];
console.log(`Starting performance test with ${TOTAL_CONNECTIONS} connections...`);

for (let i = 0; i < TOTAL_CONNECTIONS; i++) {
	setTimeout(() => {
		const socket = io(SERVER_URL, { transports: ['websocket', 'polling'] });

		socket.on('connect', () => {
			connectedClients++;
			socket.emit(MESSAGE.event, MESSAGE.data); // Send initial message after connecting
		});

		socket.on('response', (data) => {
			totalMessagesReceived++;
		});

		socket.on('connect_error', (err) => {
			console.error(`Client ${i} encountered a connection error:`, err.message);
			errors++;
		});

		socket.on('disconnect', () => {
			connectedClients--;
		});

		clients.push(socket);
	}, i * CONNECTION_INTERVAL_MS);
}

// Periodically log stats
const statsInterval = setInterval(() => {
	console.log(`Connected clients: ${connectedClients}`);
	console.log(`Total messages received: ${totalMessagesReceived}`);
	console.log(`Total errors: ${errors}`);
}, STATS_INTERVAL_MS);

// Cleanup after test duration
const TEST_DURATION_MS = 30000; // Duration of the test in milliseconds
setTimeout(() => {
	console.log('Test completed. Closing connections...');
	clearInterval(statsInterval);
	clients.forEach((client) => client.disconnect());
	process.exit(0);
}, TEST_DURATION_MS);
