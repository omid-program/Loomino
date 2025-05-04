'use client';
import { LineChart } from '@mui/x-charts/LineChart';
import { TAllOrdData, TChartComponentProps } from '@/types';
import React, { useState } from 'react';
import { format, toDate } from 'date-fns-jalali';

function ChartComponent({ data }: TChartComponentProps) {
	const now = new Date();
	const isoDate = now.toISOString();
	const defDate = toDate(isoDate);
	const defMonth = format(defDate, 'MM');
	const defYear = format(defDate, 'yyyy');

	const [monthSel, setMonthSel] = useState(defMonth);
	const [yearSel, setYearSel] = useState(defYear);

	const [chartActiave , setChartActiave]= useState<string>('day')
	// 1. ایجاد آرایه روزهای ماه (1 تا 31)
	const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
	const monthOfyear = Array.from({ length: 12 }, (_, i) => i + 1);

	// 2. محاسبه مجموع فروش هر روز
	const calculateDailySales = () => {
		return daysOfMonth.map(day => {
			return data
				.filter(
					order =>
						Number(order.date.pertionDate.day) === day &&
						Number(order.date.pertionDate.month) === Number(monthSel) &&
						Number(order.date.pertionDate.year) === Number(yearSel) 
				)
				.reduce((total, order) => total + (order.finalPrice || 0), 0);
		});
	};
	const calculateMonthSales = ()=>{
		monthOfyear.map(month=>{
			return data
			.filter(
				order=>
					Number(order.date.pertionDate.month) === Number(month) &&
					Number(order.date.pertionDate.year) === Number(yearSel) 
			).reduce((total , order)=> total + (order.finalPrice || 0), 0)
		})
	}

	const dailySales = calculateDailySales();
	const monthSales = calculateMonthSales();
	console.log(dailySales);
	

	// 3. آماده سازی داده‌ها برای نمودار
	const chartData = {
		days: daysOfMonth,
		sales: dailySales,
	};
	const chartMonth = {
		months: monthOfyear,
		sales: monthSales
	}

	return (
		<div>
			<div>
				<div>
					<input
						type="number"
						value={yearSel}
						onChange={e => {
							setYearSel(e.target.value);
						}}
					/>
				</div>
				<div>
					<input
						type="number"
						value={monthSel}
						onChange={e => {
							setMonthSel(e.target.value);
						}}
					/>
				</div>
			</div>
			<div>
				<LineChart
					xAxis={[
						{
							data: chartData.days,
							label: 'روز ماه',
							scaleType: 'point',
						},
					]}
					yAxis={[
						{
							label: 'مبلغ فروش (تومان)',
						},
					]}
					series={[
						{
							data: chartData.sales,
							label: 'فروش روزانه',
							color: '#4f46e5', // رنگ بنفش
						},
					]}
					height={400}
					margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
				/>
			</div>
			{/* <div>
				<LineChart
					xAxis={[
						{
							data: chartData.days,
							label: 'روز ماه',
							scaleType: 'point',
						},
					]}
					yAxis={[
						{
							label: 'مبلغ فروش (تومان)',
						},
					]}
					series={[
						{
							data: chartData.sales,
							label: 'فروش روزانه',
							color: '#4f46e5', // رنگ بنفش
						},
					]}
					height={400}
					margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
				/>
			</div> */}

			{/* نمایش جدولی داده‌ها (اختیاری) */}
			
			{/* <div className="mt-8">
				<h3 className="text-lg font-bold mb-4">خلاصه فروش روزانه</h3>
				<div className="grid grid-cols-4 gap-4">
					{chartData.days.map((day, index) => (
						<div key={day} className="border p-2 rounded">
							<p>روز {day}</p>
							<p>
								{chartData.sales[index].toLocaleString('fa-IR')} تومان
							</p>
						</div>
					))}
				</div>
			</div> */}
		</div>
	);
}

export default ChartComponent;
