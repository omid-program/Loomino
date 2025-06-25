import Container from '@/Components/Container/Container';
import ProductRaportCahrt from '@/Components/DashboardTools/ProductRaportCahrt/ProductRaportCahrt';
import PagesTitle from '@/Components/PageTitle/PagesTitle';
import { TEditProductParams } from '@/types';

async function page({ params }: TEditProductParams) {
	const id = (await params).id;
	return (
		// <Container>
			<ProductRaportCahrt id={id} />
		// </Container>
	);
}

export default page;
