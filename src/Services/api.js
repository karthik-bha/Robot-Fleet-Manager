export const fetchRobots = async () => {
    const response = await fetch("http://127.0.0.1:8000/robots");
    return response.json();
};
