import random
import uuid
from fastapi import FastAPI
from datetime import datetime

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from all origins. Replace with specific domain in production.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

# random data for bots
robots = []

def generate_mock_data():
    for _ in range(10):
        robots.append({
            "robot_id": str(uuid.uuid4()),
            "status": random.choice([True, False]),
            "battery": random.randint(10, 100),
            "cpu_usage": random.randint(0, 100),
            "ram_consumption": random.randint(0, 100),
            "location": (round(random.uniform(-90, 90), 6), round(random.uniform(-180, 180), 6)),
            "last_updated": datetime.utcnow().isoformat()
        })


generate_mock_data()

#API end points below

from fastapi.responses import JSONResponse

@app.get("/robots")
def get_robots():
    return JSONResponse(content=robots)

@app.get("/robots/{robot_id}")
def get_robot(robot_id: str):
    robot = next((r for r in robots if r["robot_id"] == robot_id), None)
    if robot:
        return JSONResponse(content=robot)
    return JSONResponse(content={"error": "Robot not found"}, status_code=404)

# api mgt
from fastapi.websockets import WebSocket
import asyncio

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate telemetry updates
            for robot in robots:
                robot["battery"] = max(0, robot["battery"] - random.randint(0, 5))
                robot["cpu_usage"] = random.randint(0, 100)
                robot["ram_consumption"] = random.randint(0, 100)
                robot["status"] = random.choice([True, False])
    
                robot["last_updated"] = datetime.utcnow().isoformat()
            await websocket.send_json(robots)
            await asyncio.sleep(5)  # Update every 5 seconds
    except Exception as e:
        print(f"Connection closed: {e}")
