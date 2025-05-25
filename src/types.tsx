export type TSubItemNav = [
	{
		id: string;
		subNavLink: string;
		subNavTitle: string;
	}
];

export type TSubItems = {
	id: number;
	catName: string;
	perSubNavTitle: string;
	engSubNavTitle: string;
	href: string;
};

export type TPropsNavItem = {
	children: React.ReactNode;
	navLinksItem: TLinksData;
};
export type TLinksData = {
	id: number;
	perTitle: string;
	engTitle: string;
	subItems?: TCatDatas[];
	link: string;
};

export type TInStoreAllProduct = {
	id: string | undefined;
	colorName: string | undefined;
	colorCode: string | undefined;
	qtys: string | undefined;
	colorImg: string | undefined;
};
export type TTagData = {
	id: string;
	TagName: string;
	perTitle: string;
	engTitle: string;
};
export type TProductCatData =
	| {
			id: string | undefined;
			catName: string | undefined;
			perTitle: string | undefined;
			engTitle: string | undefined;
	  }
	| undefined;

export type TAllProductData = {
	id: string;
	perTitle: string;
	engTitle: string;
	defImg: string;
	perMiniDescription: string;
	engMiniDescription: string;
	perDescription: string;
	engDescription: string;
	rate: number;
	width: string;
	tags: TTagData[];
	inStore: TInStoreAllProduct[];
	cat: TProductCatData;
	price: number;
};
export interface IPaginateShop {
	first: number | null;
	items: number | null;
	last: number | null;
	next: number | null;
	pages: number;
	prev: number | null;
	data: TAllOrdData[];
}

export type TAddres = {
	country: string;
	city: string;
	details: string;
};
// readyfor change
export type TAllOrdData = {
	id: string;
	// status: "paid" | "comfirm" | "preparation" | "send" | "finish"   ,
	statusCode: number;
	name: string;
	country: string;
	state: string;
	city: string;
	address: string;
	phoneNumber: string;
	emailAddres: string;
	orders: TUserOrds[];
	finalPrice: number;
	userOffCode: number;
	date: TOrdDateState;
	isoDate: string;
};
export type TOrdDateState = {
	pertionDate: TPertionDate;
	isoDate: string;
};
export type TPertionDate = {
	year: string;
	month: string;
	day: string;
	time: string;
};
export type TShopParams = {
	params: Promise<{}>;
	searchParams: Promise<{
		page: string;
		per_page: string;
		title: string;
	}>;
};

export type TProductPageParams = {
	params: Promise<{ id: string }>;
	seachPrams: Promise<{}>;
};
export type TCatItemParams = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{}>;
};

export type TColorItem = {
	id: string;
	colorName: string;
	colorCode: string;
	qtys: string;
	colorImg: string;
};

export type TSmartImgProps = {
	colorList: TColorItem[];
	id: string;
	price: number | undefined;
};

export type TItemsOfOrders = {
	id: string;
	colorId: string;
	qty: number;
	colorCode: string;
	price: number;
};

export type TUserOrds = {
	orderId: string;
	date: string;
	items: TItemsOfOrders[];
};

export type TShappingCartContext = {
	userOrd: TItemsOfOrders[];
	addOrdToCart: (
		id: string,
		colorId: string,
		meterCount: number,
		centiMeterCount: number,
		colorCode: string,
		price: number
	) => void;
	removeProductFromCart: (id: string, colorCode: string) => void;
	addOffcode: (persentageOffCode: number) => void;
	userOffCode: number;
};
export type TCartItemProps = {
	id: string;
	colorId: string;
	qty: number;
	colorCode: string;
	price: number;
};
export type TQtyManagerProps = {
	id: string;
	colorCode: string;
	price: number;
	colorId: string | undefined;
};

export type TOffCodes = {
	id: string;
	offCode: string;
	persentage: number;
};

// export type TOrderShappingInfo = {
// 	id: string
// 	status: "paid" | "comfirm" | "preparation" | "send" | "finish"   ,
// 	name: string
// 	country: string;
// 	state: string;
// 	city: string;
// 	address: string;
// 	phoneNumber: string;
// 	emailAddres: string;
// 	userOrd: TUserOrds[]
// 	userOffCode: number
// 	date: TOrdDateState
// 	isoDate: string
// };
export type TSendNewOrdInfo = (name: string, value: string) => void;

export type TOrderShappingInfoInputProps = {
	name: string;
	label: string;
	typeInput: string;
	isLong: boolean;
	size: 'sm' | 'md' | 'lg';
	sendNewOrdInfo: TSendNewOrdInfo;
};
export type TInputItem = {
	id: string;
	name: string;
	label: string;
	type: string;
	isLong: boolean;
	size: 'sm' | 'md' | 'lg'; // همان تایپ یکسان
};
export type TPaginationProps = {
	pageNumber: number;
	itemPageCount: number;
	activeBtn: number;
	paginatedHand: (startIndex: number, endIndex: number, i: number) => void;
};
export type TProductManagerEditActionsProps = {
	id: string | undefined;
};

export type TEditProductParams = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{}>;
};

export type TEditProductComponent = {
	id: string;
};

export type TProductManagerEditInputProps = {
	// id: number,
	label: string;
	type: string;
	name: string;
	isLong: boolean;
	size: string;
	value: string;
	changeInputHand: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type TEditeBoxInStoreProps = {
	id: string | undefined;
	colorCode: string | undefined;
	colorName: string | undefined;
	colorImg: string | undefined;
	qtys: string | undefined;
	changeInStoreItemHand: (name: string, id: string, value: any) => void;
	removeInStoreItemHand: (id: string) => void;
};
export type TOrdStatusProps = {
	status: string;
};
export type TStatusRulles = {
	id: string;
	name: string;
	label: string;
	statusCode: number;
	style: string;
};
export type TChartComponentProps = {
	data: TAllOrdData[];
};

export type TCatParams = {
	params: Promise<{ cat: string }>;
	searchParams: Promise<{}>;
};
export type TTagParams = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{}>;
};
export type TCatDatas = {
	id: string;
	nameTag: string;
	defImg: string;
	perMiniDescription: string;
	engMiniDescription: string;
	perTitle: string;
	engTitle: string;
	engDesc: string;
	perDesc: string;
};
export type TRemoveCatModalProps = {
	openHandelModal: () => void;
};
export type TBoxItemPaginated = TAllProductData[];

// export type TSplicedDataForPagination = [

// ]
export interface ValidationRule {
	value: string;
	min?: number;
	max?: number;
}
