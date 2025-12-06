import { useCallback } from "react";
import emailjs from "emailjs-com";

export default function useSendOrderMail() {

  const sendOrderMail = useCallback((params) => {
    if (!params) return;

    const {
      cartItems, totalAmount, percentage,
      discountAmount, priceAfterDiscount,
      GST, gstAmount,
      couponDiscount, couponAmount,
      netAmountToPay, customerEmail
    } = params;

    const templateParams = {
      orders: cartItems.map(i => ({
        name: i.name,
        units: i.quantity,
        price: i.price,
        image: i.image,
      })),
      email: customerEmail,
      order_id: Date.now(),
      totalAmount: totalAmount.toFixed(2),
      percentage: percentage.toFixed(2),
      discount: discountAmount.toFixed(2),
      afterDiscount: priceAfterDiscount.toFixed(2),
      gst: GST.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      couponDiscount: couponDiscount.toFixed(2),
      couponAmount: couponAmount.toFixed(2),
      amountToPay: netAmountToPay.toFixed(2),
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
