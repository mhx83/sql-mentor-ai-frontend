import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import * as analyticsClient from "./client"
import {useSelector} from "react-redux";

export default function Activity() {
  const dateRanges = ["Weekly", "Monthly"]
  const countTypes = ["Total Attempts", "Completed Quizzes"]

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [dateRange, setDateRange] = useState("Weekly");
  const [countType, setCountType] = useState("Total Attempts");
  const [activityData, setActivityData] = useState<{ name: string; count: number }[]>([]);

  const fetchActivityData = async () => {
    const activityData = await analyticsClient.fetchActivityData(String(currentUser._id), String(currentUser.role), dateRange, countType.replace(/\s+/g, ""))
    setActivityData(activityData)
  };

  useEffect(() => {
    fetchActivityData()
  }, [dateRange, countType]);

  return (
    <div>
      <div className="d-flex align-items-center gap-3">
        <label htmlFor="wd-course" className="mb-0 col-form-label"><strong>Select Query Date Range</strong></label>
        <div className="col-sm-10">
          <select className="form-select w-auto"
                  value={dateRange}
                  onChange={(e) => setDateRange(dateRanges.find(d => d === e.target.value) as string)}>
            {dateRanges.map((dateRange) => (
              <option key={dateRange} value={dateRange}>
                {dateRange}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br/>

      <div className="d-flex align-items-center gap-3">
        <label htmlFor="wd-course" className="mb-0 col-form-label"><strong>Select Count Type</strong></label>
        <div className="col-sm-10">
          <select className="form-select w-auto"
                  value={countType}
                  onChange={(e) => setCountType(countTypes.find(c => c === e.target.value) as string)}>
            {countTypes.map((countType) => (
              <option key={countType} value={countType}>
                {countType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br/>

      <div style={{textAlign: "center"}}>
        <h3 className="me-5">{dateRange} {countType} Counts</h3>
        <ResponsiveContainer width="90%" height={450} className="mt-2">
          <BarChart data={activityData} margin={{top: 0, bottom: 40, left: 10, right: 0}}>/
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis
              dataKey="name"
              label={{
                value: currentUser.role === "STUDENT" ? "Courses" : "Student Name",
                position: "insideBottom", offset: -20,
                style: {fill: "black", fontSize: 18, fontWeight: "bold"}
              }}
            />
            <YAxis
              dataKey="count"
              label={{
                value: "Counts", angle: -90, position: "insideLeft",
                style: {fill: "black", fontSize: 18, fontWeight: "bold"}
              }}
            />
            <Tooltip cursor={{fill: "#f5f5f5"}}/>
            <Bar dataKey="count" fill="#007bff" barSize={40}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
