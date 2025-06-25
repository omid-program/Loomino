import { TCommentsShow, TCommetsData } from '@/types';
import React from 'react';

async function CommentsShow(props: TCommentsShow) {
	const { id } = props;
	const res = await fetch(`http://localhost:8000/comments?productId=${id}`);
	const pComments = (await res.json()) as TCommetsData[];
	return (
		<div className="">
			{pComments &&
				pComments.map(c => (
					<div className="w-1/2 min-h-60 mx-auto my-8 rounded-md border border-dashed border-violet-600 p-5">
						<span className="block p-2 border border-b-2 border-dashed">
							{c.name}
						</span>
						<div className="bg-violet-100 my-4 p-1.5 w-full h-full min-h-40 ">
							<p className="p-1 min-h-full ">{c.commentText}</p>
						</div>
					</div>
				))}
		</div>
	);
}

export default CommentsShow;
