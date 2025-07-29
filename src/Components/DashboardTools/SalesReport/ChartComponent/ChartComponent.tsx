'use client';
import { LineChart } from '@mui/x-charts/LineChart';
import { TAllOrdData, TChartComponentProps } from '@/types';
import React, { useState } from 'react';
import { format, getYear, toDate } from 'date-fns-jalali';
import { ClassNames } from '@/@emotion/react/dist/emotion-react.cjs.mjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@/@mui/material/esm';

const darkTheame = createTheme({
	palette: {
		mode: 'dark',
	},
});

function ChartComponent({ data }: TChartComponentProps) {
	console.log(data);

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
	const yearOfAll = getJalaliYearRange(Number(yearRange));
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
				.filter(
					order => Number(order.date.pertionDate.year) === Number(year)
				)
				.reduce((total, item) => total + (item.finalPrice || 0), 0);
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
		<ThemeProvider theme={darkTheame}>
			<CssBaseline />
			<div className="  border-2 border-textMain rounded-md shadow-md shadow-textMainMuted w-11/12 px-2 py-4 my-4 mx-auto">
				<div id="btn-raports" className="flex gap-4 py-4">
					<button
						className={`border-2 border-green-600 px-2 py-2 rounded-md ${
							chartActiave === 'day'
								? 'shadow-md shadow-green-400 text-green-700'
								: ''
						}`}
						onClick={() => setChartActiave('day')}
					>
						گزارش روزانه
					</button>
					<button
						className={` px-2 py-2 rounded-md border-2 border-orange-600 ${
							chartActiave === 'month'
								? 'shadow-md shadow-orange-400 text-orange-700'
								: ''
						}`}
						onClick={() => setChartActiave('month')}
					>
						گزارش ماهانه
					</button>
					<button
						className={` px-2 py-2 rounded-md border border-blue-600 ${
							chartActiave === 'year'
								? 'shadow-md shadow-blue-400 text-blue-700'
								: ''
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
						<div className="">
							<div className="flex gap-2 mt-3 mb-5 justify-start items-center text-lg">
								<div className=" grid-cols-4 ">
									<label className="col-span-1">سال: </label>
									<input
										className="col-span-3 border-b-2 border-dashed border-textMainMuted px-2 pt-2 bg-bg"
										type="number"
										value={yearSel}
										onChange={e => {
											setYearSel(e.target.value);
										}}
									/>
								</div>
								<div
									// className="col-span-3 grid-cols-3 ">
									className=" grid-cols-3 "
								>
									<label className="col-span-1">ماه: </label>
									<input
										className="col-span-2 border-b-2 border-dashed border-textMain pt-2 px-2 bg-bg"
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
									className="text-green-700"
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
											color: '#0A6E01', 
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
							<div className="text-lg flex gap-2 items-center">
								<label>سال: </label>
								<input
									className="border-b-2 pb-0 pt-3 px-2 border-dashed bg-bg border-primary"
									type="number"
									value={yearSel}
									onChange={e => {
										setYearSel(e.target.value);
									}}
								/>
							</div>
							<LineChart
								className="text-primary"
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
										color: '#873D00', // رنگ بنفش
									},
								]}
								height={400}
								margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
							/>
						</div>
					)}

					{chartActiave === 'year' && (
						<div className="">
							<div className="flex text-lg">
								<div className="flex ">
									<label className="pt-2 pb-0">از سال </label>
									<input
										className="w-16 px-1 pt-2 pb-0 text-center border-b-2 border-dashed border-accent bg-bg  "
										type="number"
										value={yearEnd}
										onChange={e => {
											setYearEnd(e.target.value);
										}}
									/>
								</div>
								<div className="flex">
									<label className="pt-2 pb-0 ">تا</label>
									<input
										className="w-14 bg-bg text-center border-b-2 border-dashed border-accent pb-0 pt-2"
										type="number"
										value={yearRange}
										onChange={e => {
											setYearRange(e.target.value);
										}}
									/>
									<span className="pt-2 pb-0">سال قبل</span>
								</div>
							</div>
							<LineChart
								className="text-primary"
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
										color: '#4135B0', // رنگ بنفش
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
		</ThemeProvider>
	);
}

export default ChartComponent;
