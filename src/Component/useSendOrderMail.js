import { useCallback } from "react";
import emailjs from "emailjs-com";

export default function useSendOrderMail() {
  const sendOrderMail = useCallback((params = {}) => {
    const {
      cartItems = [],
      totalAmount = 0,
      percentage = 0,
      discountAmount = 0,
      priceAfterDiscount = 0,
      GST = 0,
      gstAmount = 0,
      couponDiscount = 0,
      couponAmount = 0,
      netAmountToPay = 0,
      customerEmail = "",
    } = params;

    // Ensure all numbers are valid before calling .toFixed()
    const safeNumber = (value) => Number(value || 0).toFixed(2);

    const templateParams = {
      orders: cartItems.map((i) => ({
        name: i.name,
        units: i.quantity,
        price: i.price,
        image: i.image,
      })),
      email: customerEmail,
      order_id: Date.now(),
      totalAmount: safeNumber(totalAmount),
      percentage: safeNumber(percentage),
      discount: safeNumber(discountAmount),
      afterDiscount: safeNumber(priceAfterDiscount),
      gst: safeNumber(GST),
      gstAmount: safeNumber(gstAmount),
      couponDiscount: safeNumber(couponDiscount),
      couponAmount: safeNumber(couponAmount),
      amountToPay: safeNumber(netAmountToPay),
    };

    return emailjs.send(
      "service_pgiwkle",
      "template_4dg2igo",
      templateParams,
      "t2fc20NJ-8qOHqaWr"
    );
  }, []);

  return { sendOrderMail };
}
