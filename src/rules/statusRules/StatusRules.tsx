export const statusRules = [
   {
      id:'0',
      name:'returned',
      label: 'برکشت خورده',
      statusCode: -1,
      style: ' bg-red-800 text-accent font-bold text- '
   },
   {
      id:'1',
      name:'paid',
      label: "پرداخت شده",
      statusCode: 0,
      style: 'bg-orange-800 text-accent font-bold text-'
   },
   {
      id:'2',
      name:'comfirm',
      label: "تایید شده",
      statusCode: 1,
      style: 'bg-pink-800 text-accent font-bold text-'
   },
   {
      id:'3',
      name:'preparation',
      label: "آماده سازی",
      statusCode: 2,
      style: 'bg-yellow-800 text-accent font-bold text-'
   },
   {
      id:'4',
      name:'send',
      label: "ارسال",
      statusCode: 3,
      style: 'bg-sky-800 text-accent font-bold text-'
   },
   {
      id:'5',
      name:'finish',
      label: "اتمام",
      statusCode: 4,
      style: 'bg-green-800 text-accent font-bold text-lg'
   },
]