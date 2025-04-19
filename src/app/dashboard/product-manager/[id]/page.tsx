import EditProductComponent from '@/Components/DashboardTools/EditProductComponent/EditProductComponent';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { TEditProductParams, TProductManagerEditActionsProps } from '@/types';
// import React, { useEffect, useState } from 'react'

async function EditProductPage({ params }: TEditProductParams) {
	const id = (await params).id
   console.log(id);
   
   return (
		<div>
			<PagesTitle title="ویرایش محصول" />
			<div>
				<EditProductComponent id={id}/>
			</div>
		</div>
	);
}

export default EditProductPage;
