'use client';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { TAllOrdData, TAllProductData, TEditProductComponent } from '@/types';
import { LineChart } from '@mui/x-charts';
import { format, toDate } from 'date-fns-jalali';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './../../../../config';


function ProductRaportChart({ id }: TEditProductComponent) {
	const now = new Date();
	const defMonth = format(now, 'MM');
	const defYear = format(now, 'yyyy');

	const [allOrds, setAllOrds] = useState<TAllOrdData[] | undefined>();
	const [productTitle, setProductTitle] = useState<string | undefined>();
	const [monthSelect, setMonthSelect] = useState<string>(defMonth);
	const [yearSelect, setYearSelect] = useState<string>(defYear);
	const [dailySales, setDailySales] = useState<number[]>([]);
	const [monthSales, setMonthSales] = useState<number[]>([]);
	const [dayActive, setDayActive] = useState<boolean>(true);


	const getOrdData = async () => {
		const response = await fetch(`${API_BASE_URL}/ords`);
		const data = (await response.json()) as TAllOrdData[];
		setAllOrds(data);
	};
	const getTitleProduct = async () => {
		const productRes = await fetch(`${API_BASE_URL}/fabrics/${id}`);
		const productData = (await productRes.json()) as TAllProductData;
		setProductTitle(productData.perTitle);
	};

	useEffect(() => {
		getOrdData();
		getTitleProduct();
	}, []);

	useEffect(() => {
		if (!allOrds) return;

		const salesPerDay = Array(31).fill(0);
		const salesPerMonth = Array(12).fill(0);

		allOrds.forEach(ordData => {
			ordData.orders.forEach(order => {
				const date = toDate(order.date);
				const month = format(date, 'MM');
				const year = format(date, 'yyyy');

				order.items
					.filter(item => item?.id === id)
					.forEach(item => {
						const qty = item.qty || 0;

						// برای نمودار روزانه
						if (
							month === monthSelect.padStart(2, '0') &&
							year === yearSelect
						) {
							const day = parseInt(format(date, 'd'), 10);
							salesPerDay[day - 1] += qty;
						}

						// برای نمودار ماهانه
						if (year === yearSelect) {
							const orderMonth = parseInt(format(date, 'MM'), 10);
							salesPerMonth[orderMonth - 1] += qty;
						}
					});
			});
		});

		setDailySales(salesPerDay);
		setMonthSales(salesPerMonth);
	}, [allOrds, monthSelect, yearSelect, id]);

	return (
		<div>
			<PagesTitle title={`گزارش فروش ${productTitle}`} />

			<div className="flex gap-5 mb-4">
				<button
					onClick={() => setDayActive(true)}
					className={`px-4 py-2 rounded ${
						dayActive
							? 'bg-green-700 text-white'
							: 'border border-green-600'
					}`}
				>
					گزارش روزانه
				</button>
				<button
					onClick={() => setDayActive(false)}
					className={`px-4 py-2 rounded ${
						!dayActive ? 'bg-sky-700 text-white' : 'border border-sky-500'
					}`}
				>
					گزارش ماهانه
				</button>
			</div>

			<div className="mb-6">
				<label>سال:</label>
				<input
					type="number"
					value={yearSelect}
					onChange={e => setYearSelect(e.target.value)}
					className="mx-2 border px-2 py-1 rounded w-24"
				/>
				<label>ماه:</label>
				<input
					type="number"
					value={monthSelect}
					onChange={e => setMonthSelect(e.target.value)}
					className="mx-2 border px-2 py-1 rounded w-16"
					disabled={!dayActive}
				/>
			</div>
			<div className="px-2 py-4 shadow-md border border-violet-400 shadow-violet-200 w-11/12 mx-auto rounded-md">
				<LineChart
					xAxis={[
						{
							data: dayActive
								? Array.from({ length: 31 }, (_, i) => i + 1)
								: Array.from({ length: 12 }, (_, i) => i + 1),
							label: dayActive ? 'روز ماه' : 'ماه سال',
							scaleType: 'point',
						},
					]}
					yAxis={[{ label: 'تعداد فروش' }]}
					series={[
						{
							data: dayActive ? dailySales : monthSales,
							label: dayActive ? 'فروش روزانه' : 'فروش ماهانه',
							color: '#4f46e5',
						},
					]}
					height={400}
					margin={{ left: 70, right: 20, top: 20, bottom: 50 }}
				/>
			</div>
		</div>
	);
}

export default ProductRaportChart;
