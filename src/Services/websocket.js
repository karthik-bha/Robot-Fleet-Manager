let socket;

export const connectWebSocket = (url, onMessage) => {
    socket = new WebSocket(url);

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
    };

    socket.onclose = () => console.log("WebSocket closed");
};

export const closeWebSocket = () => {
    if (socket) {
        socket.close();
    }
};
