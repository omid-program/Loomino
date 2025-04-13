// export type TNavbarPromps = {
//    params:string
// }

export type TSubItemNav = [
   {
      id: string;
      subNavLink: string;
      subNavTitle: string;
   }
];

export type TSubItems = {
   id: number;
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
   subItems?: TSubItems[];
   link: string;
};

export type TInStoreAllProduct = {
   id: string | undefined;
   colorName: string | undefined;
   colorCode: string | undefined;
   qtys: number | undefined;
   colorImg: string | undefined;
} | null;

export type TAllProductData = {
   id: string;
   perTitle?: string;
   engTitle?: string;
   defImg?: string;
   perMiniDescription?: string;
   engMiniDescription?: string;
   perDescription?: string;
   engDescription?: string;
   rate?: number;
   width?: string;
   tags?: string[];
   inStore?: TInStoreAllProduct[];
   cat?: string[];
   price: number;
} | null;

export type TAddres = {
   country: string;
   city: string;
   details: string;
};

export type TAllOrdData = {
   id: string;
   fullName: string;
   addres: TAddres[];
   phoneNumber: string;
   emailAddres: string;
   ords: TUserOrds[];
   offCode: number;
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

export type TColorItem = {
   id: string;
   colorName: string;
   colorCode: string;
   qtys: number;
   colorImg: string;
};

export type TSmartImgProps = {
   colorList: TColorItem[];
   id: string;
   price: number | undefined;
};

export type TUserOrds = {
   id: string;
   qty: number;
   colorCode: string;
   price: number;
};

export type TShappingCartContext = {
   userOrd: TUserOrds[];
   addOrdToCart: (
      id: string,
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
   qty: number;
   colorCode: string;
   price: number;
};
export type TQtyManagerProps = {
   id: string;
   colorCode: string;
   price: number;
};

export type TOffCodes = {
   id: string;
   offCode: string;
   persentage: number;
};

export type TOrderShappingInfo = {
   country: string;
   state: string;
   city: string;
   address: string;
   phoneNumber: string;
   emailAddres: string;
};
export type TSendNewOrdInfo = (name: string, value: string) => void;

export type TOrderShappingInfoInputProps = {
   name: string;
   label: string;
   typeInput: string;
   sendNewOrdInfo: TSendNewOrdInfo;
};
export type TPaginationProps = {
   pageNumber: number;
   itemPageCount: number;
   paginatedHand: (startIndex: number , endIndex:number) => void;
};
