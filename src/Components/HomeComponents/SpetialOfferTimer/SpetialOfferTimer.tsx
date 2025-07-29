// 💀 state Hand 💀
import React from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

type TSpetialOfferTimer = {
	expierTime: string;
};

function SpetialOfferTimer(props: TSpetialOfferTimer) {
	const { expierTime } = props;
	dayjs.extend(duration);

	// فرض کن تاریخ پایان فروش ویژه به صورت string مثل زیر باشه:
	const expireTime = expierTime;
	const end = dayjs(expireTime);

	let now = dayjs();
   let dayLeft = 0
   let hoursLef = 0
   let minutesLeft = 0
   let secendsLeft = 0

	const timerFunction = () => {
		now = dayjs();
		const diff = end.diff(now) / 1000; // اختلاف به ثانیه


		if (diff > 0) {
			const timeLeft = dayjs.duration(diff);

         dayLeft = timeLeft.days()
         hoursLef = timeLeft.hours()
         minutesLeft = timeLeft.minutes()
         secendsLeft = timeLeft.seconds()


		} else {
			console.log('زمان فروش ویژه تموم شده 😞');
		}
	};
	setInterval(timerFunction , 300000)

	return <div>
      <div>{dayLeft}</div>
      <div>{hoursLef}</div>
      <div>{minutesLeft}</div>
      <div>{secendsLeft}</div>
   </div>;
}

export default SpetialOfferTimer;
