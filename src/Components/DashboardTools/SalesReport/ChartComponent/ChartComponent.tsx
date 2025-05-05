'use client';
import { LineChart } from '@mui/x-charts/LineChart';
import { TAllOrdData, TChartComponentProps } from '@/types';
import React, { useState } from 'react';
import { format, getYear, toDate } from 'date-fns-jalali';

function ChartComponent({ data }: TChartComponentProps) {
	const now = new Date();
	const isoDate = now.toISOString();
	const defDate = toDate(isoDate);
	const defMonth = format(defDate, 'MM');
	const defYear = format(defDate, 'yyyy');

	// satte of day chart
	const [monthSel, setMonthSel] = useState(defMonth);
	const [yearSel, setYearSel] = useState(defYear);
	// state of yearChart
	const [yearEnd, setYearEnd] = useState(defYear);
	const [yearRange, setYearRange] = useState('7');

	const [chartActiave, setChartActiave] = useState<string>('day');

	// 1. ایجاد آرایه روزهای ماه (1 تا 31)
	const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
	const monthOfyear = Array.from({ length: 12 }, (_, i) => i + 1);
	// console.log(daysOfMonth);

	const getJalaliYearRange = (count: number, finalYear?: number) => {
		const end = finalYear || getYear(new Date());
		const start = end - count + 1;
		return Array.from({ length: count }, (_, i) => (start + i).toString());
	};
	const yearOfAll = getJalaliYearRange(7);
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
	const calculateMonthSales = () => {
		return monthOfyear.map(month => {
			return data
				.filter(
					order =>
						Number(order.date.pertionDate.month) === Number(month) &&
						Number(order.date.pertionDate.year) === Number(yearSel)
				)
				.reduce((total, order) => total + (order.finalPrice || 0), 0);
		});
	};

	const calculateYearSales = () => {
		return yearOfAll.map(year => {
			return data
			.filter(order=>
				Number(order.date.pertionDate.year) === Number(year)
			).reduce((total , item)=>total + (item.finalPrice || 0),0)
		});
	};

	const dailySales = calculateDailySales();
	const monthSales = calculateMonthSales();
	const yearSales = calculateYearSales();
	console.log(dailySales);

	// 3. آماده سازی داده‌ها برای نمودار
	const chartData = {
		days: daysOfMonth,
		sales: dailySales,
	};
	const chartMonth = {
		months: monthOfyear,
		sales: monthSales,
	};
	const chartYear = {
		years: yearOfAll,
		sales: yearSales,
	};

	return (
		<div>
			<div>
				<button
					className={`border border-orange-600 ${
						chartActiave === 'month'
							? 'bg-green-800 text-white'
							: 'bg-green-300 text-black'
					}`}
					onClick={() => setChartActiave('day')}
				>
					گزارش روزانه
				</button>
				<button
					className={`border border-orange-600 ${
						chartActiave === 'month'
							? 'bg-orange-800 text-white'
							: 'bg-orange-300 text-black'
					}`}
					onClick={() => setChartActiave('month')}
				>
					گزارش ماهانه
				</button>
				<button
					className={`border border-blue-600 ${
						chartActiave === 'year'
							? 'bg-blue-800 text-white'
							: 'bg-blue-300 text-black'
					}`}
					onClick={() => setChartActiave('year')}
				>
					گزارش سالانه
				</button>
			</div>
			{/* __CHARTS__ */}
			{/* 	Day Charts */}
			<div>
				{chartActiave === 'day' && (
					<div>
						<div>
							<label>سال: </label>
							<input
								type="number"
								value={yearSel}
								onChange={e => {
									setYearSel(e.target.value);
								}}
							/>
							<label>ماه: </label>
							<input
								type="number"
								value={monthSel}
								onChange={e => {
									setMonthSel(e.target.value);
								}}
							/>
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
					</div>
				)}

				{chartActiave === 'month' && (
					<div>
						<div>
							<label>سال: </label>
							<input
								type="number"
								value={yearSel}
								onChange={e => {
									setYearSel(e.target.value);
								}}
							/>
						</div>
						<LineChart
							xAxis={[
								{
									data: chartMonth.months,
									label: 'ماه سال',
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
									data: chartMonth.sales,
									label: 'فروش ماهانه',
									color: '#4f46e5', // رنگ بنفش
								},
							]}
							height={400}
							margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
						/>
					</div>
				)}

				{chartActiave === 'year' && (
					<div>
						<div>
							<label>از سال .... </label>
							<input
								type="number"
								value={yearEnd}
								onChange={e => {
									setYearEnd(e.target.value);
								}}
							/>
						</div>
						<div>
							<label>چند سال متوال؟ </label>
							<input
								type="number"
								value={yearRange}
								onChange={e => {
									setYearRange(e.target.value);
								}}
							/>
						</div>
						<LineChart
							xAxis={[
								{
									data: chartYear.years,
									label: ' سال',
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
									data: chartYear.sales,
									label: 'فروش ماهانه',
									color: '#4f46e5', // رنگ بنفش
								},
							]}
							height={400}
							margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
						/>
					</div>
				)}
			</div>
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
