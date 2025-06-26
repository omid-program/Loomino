import { TAllOrdData } from "@/types";

export function getTopSellingProductsAdvanced(orders: TAllOrdData[], options: {
   limit?: number;
   sortBy?: 'quantity' | 'revenue';
   minDate?: Date;
   maxDate?: Date;
} = {}) {
   const {
      limit = 5,
      sortBy = 'quantity',
      minDate,
      maxDate
   } = options;

   const productSales: Record<string, {
      id: string;
      title: string;
      totalQty: number;
      totalRevenue: number;
      ordersCount: number;
   }> = {};

   orders.forEach(order => {
      order.orders.forEach(subOrder => {
         // فیلتر بر اساس تاریخ اگر مشخص شده باشد
         const orderDate = new Date(subOrder.date);
         if (minDate && orderDate < minDate) return;
         if (maxDate && orderDate > maxDate) return;

         subOrder.items.forEach(item => {
            if (!productSales[item.id]) {
               productSales[item.id] = {
                  id: item.id,
                  title: item.perTitle,
                  totalQty: 0,
                  totalRevenue: 0,
                  ordersCount: 0
               };
            }

            productSales[item.id].totalQty += item.qty;
            productSales[item.id].totalRevenue += (item.price * item.qty);
            productSales[item.id].ordersCount += 1;
         });
      });
   });

   const sortedProducts = Object.values(productSales).sort((a, b) =>
      sortBy === 'quantity'
         ? b.totalQty - a.totalQty
         : b.totalRevenue - a.totalRevenue
   );

   return sortedProducts.slice(0, limit);
}

// مثال استفاده:
// const topProductsByRevenue = getTopSellingProductsAdvanced(ords, {
//    limit: 10,
//    sortBy: 'revenue',
//    minDate: new Date('2025-01-01')
// });