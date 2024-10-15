"use client";

import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data (in a real app, this would come from an API)
const mockData = {
  dailyVisitors: [120, 150, 180, 200, 160, 190, 210],
  salesByProduct: [
    { name: "Product A", sales: 300 },
    { name: "Product B", sales: 200 },
    { name: "Product C", sales: 150 },
    { name: "Product D", sales: 100 },
    { name: "Product E", sales: 50 },
  ],
  revenueByMonth: [5000, 6000, 4500, 7000, 6500, 8000],
};

const colors = [
  "#3498db",
  "#2ecc71",
  "#e74c3c",
  "#f39c12",
  "#9b59b6",
  "#1abc9c",
  "#34495e",
  "#7f8c8d",
];

function drawLineChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  labels: string[]
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const padding = 40;
  const dataMax = Math.max(...data);

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = colors[0];
  ctx.lineWidth = 2;

  // Draw axes
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Plot data points
  ctx.beginPath();
  data.forEach((value, index) => {
    const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - (value / dataMax) * (height - 2 * padding);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.stroke();

  // Add labels
  ctx.fillStyle = "#000";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  labels.forEach((label, index) => {
    const x = padding + (index * (width - 2 * padding)) / (data.length - 1);
    ctx.fillText(label, x, height - padding + 20);
  });
}

function drawPieChart(
  ctx: CanvasRenderingContext2D,
  data: { name: string; sales: number }[]
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 10;

  const total = data.reduce((sum, item) => sum + item.sales, 0);
  let startAngle = 0;

  ctx.clearRect(0, 0, width, height);

  data.forEach((item, index) => {
    const sliceAngle = (2 * Math.PI * item.sales) / total;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
    ctx.closePath();

    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();

    // Add labels
    const middleAngle = startAngle + sliceAngle / 2;
    const labelX = centerX + (radius / 2) * Math.cos(middleAngle);
    const labelY = centerY + (radius / 2) * Math.sin(middleAngle);

    ctx.fillStyle = "#fff";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(item.name, labelX, labelY);

    startAngle += sliceAngle;
  });
}

function drawBarChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  labels: string[]
) {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const padding = 40;
  const dataMax = Math.max(...data);
  const barWidth = (width - 2 * padding) / data.length - 10;

  ctx.clearRect(0, 0, width, height);

  // Draw axes
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Draw bars
  data.forEach((value, index) => {
    const x = padding + index * (barWidth + 10);
    const y = height - padding - (value / dataMax) * (height - 2 * padding);
    const barHeight = height - padding - y;

    ctx.fillStyle = colors[index % colors.length];
    ctx.fillRect(x, y, barWidth, barHeight);

    // Add labels
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    ctx.fillText(labels[index], x + barWidth / 2, height - padding + 20);
    ctx.fillText(value.toString(), x + barWidth / 2, y - 10);
  });
}

export default function AnalyticsDashboard() {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const [timeRange, setTimeRange] = useState("7d");

  useEffect(() => {
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.getContext("2d");
      if (ctx) {
        drawLineChart(ctx, mockData.dailyVisitors, [
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
          "Sun",
        ]);
      }
    }

    if (pieChartRef.current) {
      const ctx = pieChartRef.current.getContext("2d");
      if (ctx) {
        drawPieChart(ctx, mockData.salesByProduct);
      }
    }

    if (barChartRef.current) {
      const ctx = barChartRef.current.getContext("2d");
      if (ctx) {
        drawBarChart(ctx, mockData.revenueByMonth, [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
        ]);
      }
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
      <div className="mb-4">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Visitors</CardTitle>
            <CardDescription>Number of visitors per day</CardDescription>
          </CardHeader>
          <CardContent>
            <canvas ref={lineChartRef} width={400} height={200}></canvas>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sales by Product</CardTitle>
            <CardDescription>
              Distribution of sales across products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <canvas ref={pieChartRef} width={300} height={300}></canvas>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>
              Revenue trends over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <canvas ref={barChartRef} width={800} height={300}></canvas>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
