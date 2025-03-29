import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { useEffect, useState } from "react";
import * as analyticsClient from "./client"
import { useSelector } from "react-redux";

export default function Communication() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [communicationData, setCommunicationData] = useState<{ name: string; count: number; role: string }[]>([]);

    const fetchActivityData = async () => {
        const communicationData = await analyticsClient.fetchCommunicationData(String(currentUser._id))
        setCommunicationData(communicationData)
    };

    useEffect(() => {
        fetchActivityData()
    }, []);


    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }} className="ms-5">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "15px", height: "15px", backgroundColor: "#007bff" }}></div>
                    <span style={{ fontSize: "16px", color: "#333" }}>Student</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "15px", height: "15px", backgroundColor: "#9C27B0" }}></div>
                    <span style={{ fontSize: "16px", color: "#333" }}>Instructor</span>
                </div>
            </div>

            <div style={{ textAlign: "center" }} className="mt-4">
                <ResponsiveContainer width="90%" height={450} className="mt-2">
                    <BarChart data={communicationData} margin={{ top: 0, bottom: 40, left: 10, right: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            label={{
                                value: "Name",
                                position: "insideBottom",
                                offset: -20,
                                style: { fill: "black", fontSize: 18, fontWeight: "bold" }
                            }}
                        />
                        <YAxis
                            label={{
                                value: "Message Counts",
                                angle: -90,
                                position: "insideLeft",
                                style: { fill: "black", fontSize: 18, fontWeight: "bold" }
                            }}
                        />
                        <Tooltip cursor={{ fill: "#f5f5f5" }} />
                        <Bar dataKey="count" barSize={40}>
                            {communicationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.role === "STUDENT" ? "#9C27B0" : "#007bff"} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
