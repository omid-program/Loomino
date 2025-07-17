import Container from '@/Components/Container/Container';
import GitHubBtn from '@/Components/SosialsBtn/GitHubBtn/GitHubBtn';
import InstagramBtn from '@/Components/SosialsBtn/InstagramBtn/InstagramBtn';
import LinkedinBtn from '@/Components/SosialsBtn/LinkedinBtn/LinkedinBtn';
import TelegramBtn from '@/Components/SosialsBtn/TelegramBtn/TelegramBtn';
import React from 'react';
import { ImHtmlFive2 } from 'react-icons/im';
import { RiTailwindCssFill } from 'react-icons/ri';
import { SiJavascript } from 'react-icons/si';
import { SiTypescript } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { RiNextjsFill } from 'react-icons/ri';
import { SiMui } from 'react-icons/si';
import { SiCss3 } from 'react-icons/si';

function AboutUs() {
	const prujectTec = [
		{
			id: '01',
			rIcon: <SiCss3 className="text-sky-500 size-6 " />,
			lIcons: <ImHtmlFive2 className="text-red-600" />,
			value: 'Html / Css',
		},
		{
			id: '02',
			rIcon: <RiTailwindCssFill className="text-sky-500" />,
			lIcons: <RiTailwindCssFill className="text-sky-500" />,
			value: 'tailwind',
		},
		{
			id: '03',
			rIcon: <SiJavascript className="text-yellow-400" />,
			lIcons: <SiJavascript className="text-yellow-400" />,
			value: 'javaScript (JS)',
		},
		{
			id: '04',
			rIcon: <SiTypescript className="text-blue-600" />,
			lIcons: <SiTypescript className="text-blue-600" />,
			value: 'typeScript (TS)',
		},
		{
			id: '05',
			rIcon: <FaReact className="text-blue-800" />,
			lIcons: <FaReact className="text-blue-800" />,
			value: 'React',
		},
		{
			id: '06',
			rIcon: <RiNextjsFill />,
			lIcons: <RiNextjsFill />,
			value: 'Next',
		},
		{
			id: '07',
			rIcon: <SiMui className="text-sky-600" />,
			lIcons: <SiMui className="text-sky-600" />,
			value: 'MUI',
		},
	];
	return (
		<Container>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-16 my-24 ">
				<div className="flex flex-col items-center shadow-md shadow-violet-400 px-2 py-6">
					<div className="mb-5">
						<img src="logo/omid-program-logo-L-07.png" alt="" />
					</div>
					<div>
						<h3 className="text-3xl font-bold">omid-program</h3>
					</div>
					<div className="my-12 flex gap-6">
						<InstagramBtn />
						<LinkedinBtn />
						<GitHubBtn />
						<TelegramBtn />
					</div>
				</div>
				<div className="text-center border-2 border-violet-500 shadow-sm shadow-violet-300 bg-violet-50 px-2 py-4 rounded-md">
					<h3 className="text-2xl font-bold my-3">Loomino</h3>
					<div className="mt-3 mb-5">
						<p>
							پروژه‌ی کاملا هوشمند و کاربردی در راستای نمایش سطح
							توانایی‌های برنامه‌نویس؛ نوشته شده است
						</p>
						<p>
							در این برنامه سعی شده تمامی نیاز های یک فروشگاه اینترنتی در
							Frontend برطرف گردد
						</p>
					</div>
					{/* info-table */}
					<div>
						<h3 className="text-xl font-bold mb-3">
							تکنولوژی‌های استفاده شده
						</h3>
						<ul className="flex flex-col justify-center items-center">
							{prujectTec.map(item => (
								<li
									key={item.id}
									className="flex gap-2 items-center my-2 text-lg"
								>
									{' '}
									<span className="text-2xl">{item.rIcon}</span>{' '}
									{item.value}{' '}
									<span className="text-2xl">{item.lIcons}</span>{' '}
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			<div></div>
		</Container>
	);
}

export default AboutUs;
