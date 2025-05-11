import ProductRaportCahrt from '@/Components/DashboardTools/ProductRaportCahrt/ProductRaportCahrt';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { TEditProductParams } from '@/types';

async function page({ params }: TEditProductParams) {
	const id = (await params).id;
	return (
		<div>
			<PagesTitle title="Dashboard Raporter" />
			<ProductRaportCahrt id={id} />
		</div>
	);
}

export default page;
