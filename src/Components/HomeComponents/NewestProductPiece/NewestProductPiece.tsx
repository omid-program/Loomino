import React from 'react';
import TitleSectionHome from '../TitleSectionHome/TitleSectionHome';
import { TAllProductData } from '@/types';
import ProductBox from '@/Components/ProductBox/ProductBox';

async function NewestProductPiece() {
	const res = await fetch(`http://localhost:8000/fabrics`);
	const datas = (await res.json()) as TAllProductData[];
   const newestProducts = datas.sort((a , b)=>{
      const astok = Number(a.createdAt.slice(0,10).replace(/-/g , ''))
      const bstok = Number(b.createdAt.slice(0,10).replace(/-/g , ''))
		return bstok - astok
   }).slice(0,4)
	// console.log("newestProducts=> " , newestProducts);
	
	
	
	return (
		<div>
			<TitleSectionHome title="جدیدترین پارچه ها" />
			<div className='grid grid-cols-4'>
				{
					newestProducts.map(prod=>(
						<ProductBox key={prod.id} {...prod}/>
					))
				}
         </div>
		</div>
	);
}

export default NewestProductPiece;
