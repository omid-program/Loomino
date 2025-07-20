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
	icon?: any;
};

// export type TInStoreAllProduct = {
// 	id: string | undefined;
// 	colorName: string | undefined;
// 	colorCode: string | undefined;
// 	qtys: string | undefined;
// 	colorImg: string | undefined;
// };

export type TTagData = {
	id: string;
	TagName: string;
	perTitle: string;
	engTitle: string;
};
export type TProductCatData = {
	id: string | undefined
	catName: string | undefined
	perTitle: string | undefined
	engTitle: string | undefined
} | undefined;


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
	inStore: TColorItem[];
	cat: TProductCatData;
	price: number;
	createdAt: string;
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
		items: string;
		pages: string;
	}>;
};

export type TProductPageParams = {
	params: Promise<{ id: string }>;
	searchParams: Promise<{}>;
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
	perTitle: string;
	price: number | undefined;
};

export type TItemsOfOrders = {
	id: string;
	perTitle: string;
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
		perTitle: string,
		colorId: string,
		meterCount: number,
		centiMeterCount: number,
		colorCode: string,
		price: number
	) => void;
	removeProductFromCart: (productId: string, colorId: string) => void;
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
	perTitle?: string;
	colorCode: string;
	price: number;
	colorId: string | undefined;
	colorQtys?: number;
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
	label: string | undefined;
	type: string | undefined;
	name: string | undefined;
	isLong: boolean | undefined;
	size: string | undefined;
	value: string | undefined;
	changeInputHand: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => void;
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

export type TCatItemBoxProps = {
	defImg: string;
	perTitle: string;
	perMiniDescription: string;
	id: string;
};

// export type TSplicedDataForPagination = [

// ]
export interface ValidationRule {
	value: string;
	min?: number;
	max?: number;
}

// slide types
// export type TSliderCollection = {
// 	sliders: {
// 		[sliderName: string]: TSliderConfig[];
// 	};
// };

// export type TSliderConfig = {
// 	effect?: 'slide' | 'fade' | 'cube' | 'cards';
// 	autoplay?: boolean;
// 	loop?: boolean;
// 	delay?: number;
// 	items: TSlideItem[];
// };

// type TSlideItem = {
// 	id: string;
// 	title: string;
// 	subtitle?: string;
// 	image: string;
// 	link?: string;
// };

export type THomeHeadrSliders = {
	effect?: 'fade' | 'slide' | 'cube' | 'cards';
	autoplay?: true;
	delay?: number;
	items: THomeHederSlideItem[];
};

export type THomeHederSlideItem = {
	id: string;
	title: string;
	subItem: string;
	image: string;
	link: string;
	imgNumber: string;
};

export type TSliders = {
	homeHeadrSliders: THomeHeadrSliders;
};

// Home page - bestSelles
export type TProductBoxData = {
	id?: string;
	perTitle?: string;
	engTitle?: string;
	defImg?: string;
	perMiniDescription?: string;
	engMiniDescription?: string;
	rate?: number;
	width?: string;
	price?: number;
};

///////// comments-type

export type TCommetsData = {
	id: string;
	productId: string;
	productTitle: string;
	productImg: string;
	name: string;
	phoneNumber: string;
	email: string;
	createdAt: string;
	commentText: string;
	isShow: boolean;
	onStatusChange: (id: string, newStatus: boolean) => void;
};
export type TCommetsInfo = {
	id: string;
	productId: string;
	productTitle: string;
	productImg: string;
	name: string;
	phoneNumber: string;
	email: string;
	createdAt: string;
	commentText: string;
	isShow: boolean;
};

export type TCommentUserInfo = {
	name: string;
	phoneNumber: string;
	email: string;
};
// export type TUserInfoModal = {
// 	name
// }
export type TCommentsShow = {
	id: string;
};
export type TspetialOfferList = {
	productId: string;
	perTitle: string;
	defImg: string;
	persentage: string;
};
export type TSpetialOfferData = {
	id: string;
	time: string;
	description: string;
	spetialOfferList: TspetialOfferList[] | undefined;
};
export type TOfferPackData = {
	monthExpier: string;
	dayExpier: string;
	spetialOfferText: string;
};
export type TAddSpetialOfferDataProps = {
	changeOfferPackData: (name: string, value: string) => void;
	removeProToSPeOffer: (productId: string) => void;
	offerPackData: TOfferPackData;
	spetialOfferList: TspetialOfferList[];

	sendSpetialOffer: (
		description: string,
		// time: string,
		month: string,
		day: string,
		spetialOfferList: TspetialOfferList[]
	) => void;
	clearSpetialOffer: () => void;
};

export type TProductManagerTable2Props = {
	addProToSpeOffer: (
		persentage: string,
		productId: string,
		perTitle: string,
		defImg: string
	) => void;
	removeProToSPeOffer: (productId: string) => void;
	spetialOfferList: TspetialOfferList[];
};
export type TPMTSOI = {
	productId: string;
	perTitle: string;
	defImg: string;
	addProToSpeOffer: (
		persentage: string,
		productId: string,
		perTitle: string,
		defImg: string
	) => void;

	removeProToSPeOffer: (productId: string) => void;

	spetialOfferList: TspetialOfferList[];
};
export type TSpetialOfferListModalProps = {
	spetialOfferList: TspetialOfferList[];
	removeProToSPeOffer: (productId: string) => void;
};
export type TOrdDetailModal = {
	ords?: TUserOrds[];
};
export type TModernLineCard = {
	apiLink: string;
};
