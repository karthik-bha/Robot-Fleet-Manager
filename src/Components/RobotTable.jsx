const RobotTable = ({ robots }) => {
    return (
        <table className="border border-black">
            <thead>
                <tr>
                    <th>Robot ID</th>
                    <th>Status</th>
                    <th>Battery</th>
                    <th>CPU Usage</th>
                    <th>RAM</th>
                    <th>Location</th>
                    <th>Last Updated</th>
                </tr>
            </thead>
            <tbody>
                {robots.map((robot) => (
                    <tr
                        key={robot.robot_id}
                        style={{
                            backgroundColor:
                                robot.battery < 20 ? "rgba(255, 0, 0, 0.1)" : "",
                        }}
                    >
                        <td>{robot.robot_id}</td>
                        <td
                            style={{
                                color: robot.status ? "green" : "red",
                            }}
                        >
                            {robot.status ? "Online" : "Offline"}
                        </td>
                        <td
                            style={{
                                color: robot.battery < 20 ? "red" : "black",
                            }}
                        >
                            {robot.battery}%
                        </td>
                        <td>{robot.cpu_usage}%</td>
                        <td>{robot.ram_consumption}%</td>
                        <td>
                            {robot.location[0]}, {robot.location[1]}
                        </td>
                        <td>{new Date(robot.last_updated).toLocaleString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default RobotTable;
