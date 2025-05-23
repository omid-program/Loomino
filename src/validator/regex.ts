const testEmail = (value: string): boolean => {
   const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
   return emailPattern.test(value);
};

const testIdCode = (value: string): boolean => {
   // کد ملی ایران، 10 رقم، اعتبارسنجی ساده
   const idPattern = /^\d{10}$/;
   return idPattern.test(value);
};

const testPhoneNumber = (value: string): boolean => {
   // شماره موبایل ایران، مثل 09123456789 یا 09999999999
   const phonePattern = /^09\d{9}$/;
   return phonePattern.test(value);
};

export default {
   testEmail,
   testIdCode,
   testPhoneNumber
};
