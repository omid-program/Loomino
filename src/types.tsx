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
   id: string;
   colorName: string;
   colorCode: string;
   qtys: number;
   colorImg: string;
};

export type TAllProductData = {
   id: string;
   perTitle?: string;
   engTitle?: string;
   perMiniDescription?: string;
   engMiniDescription?: string;
   perDescription?: string;
   engDescription?: string;
   rate?: number;
   width?: string;
   tags?: string[];
   inStore?: TInStoreAllProduct[];
   cat?: string[];
   price?: number;
};

export type TShopParams = {
   params:Promise<{}>
   searchParams:Promise<{
      page:string
      per_page:string
      title:string
   }>
}

export type TProductPageParams = {
   params:Promise<{id:string}>
   seachPrams:Promise<{}>
}

export type TColorItem = {
   id: string;
   colorName: string;
   colorCode: string;
   qtys: number;
   colorImg: string;
}

export type TSmartImgProps = {
   colorList:TColorItem[]
}

