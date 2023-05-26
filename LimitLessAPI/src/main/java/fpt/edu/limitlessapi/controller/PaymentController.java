package fpt.edu.limitlessapi.controller;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/vnpay")
@Log4j2
public class PaymentController {

    @RequestMapping(value = "/transaction/result", method = RequestMethod.GET)
    public RedirectView transactionResult(@RequestParam Map<String,String> allRequestParams) {

        String vnp_SecureHash = "";
        String vnp_HashSecret = "CZQRWKJUMKNIUPGECAIOTTBLXOJAIMFM";
        if (allRequestParams.containsKey("vnp_SecureHashType")) {
            allRequestParams.remove("vnp_SecureHashType");
        }
        if (allRequestParams.containsKey("vnp_SecureHash")) {
            vnp_SecureHash = allRequestParams.get("vnp_SecureHash");
            allRequestParams.remove("vnp_SecureHash");
        }

        String signValue = hashAllFields(allRequestParams, vnp_HashSecret);

        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(allRequestParams.get("vnp_ResponseCode"))) {
                log.info("success");
                return  new RedirectView("http://success.sdk.merchantbackapp/");
            } else {
                log.error("GD Khong thanh cong");
                return  new RedirectView("http://fail.sdk.merchantbackapp/");
            }

        } else {
            log.error("Chu ky khong hop le");
            return  new RedirectView("http://fail.sdk.merchantbackapp/");
        }
    }

    @RequestMapping(value = "/transaction/getImportantFields", method = RequestMethod.GET)
    public HashMap getImportantFields(@RequestParam String orderInfo, @RequestParam int amount){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YYYYMMddHHmmss");
        LocalDateTime today = LocalDateTime.now();
        String vpn_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TmnCode = "MNWQOE3L";
        String vnp_CurrCode = "VND";
        String vnp_IpAddr = "127.0.0.1";
        String vnp_Locale = "vn";
        String vnp_ReturnUrl = "http://10.0.2.2:8080/api/vnpay/transaction/result"; //http://success.sdk.merchantbackapp/
        String vnp_OrderInfo = orderInfo;
        int vnp_Amount = amount*100;
        int vnp_TxnRef = new Random().nextInt(9999999);
        String vnp_CreateDate = dateTimeFormatter.format(today);
        String vnp_HashSecret = "CZQRWKJUMKNIUPGECAIOTTBLXOJAIMFM";

        String queryParamsFirstHalf = "vnp_Amount=" + vnp_Amount + "&vnp_Command=" + vnp_Command + "&vnp_CreateDate=" + vnp_CreateDate + "&vnp_CurrCode=" + vnp_CurrCode + "&vnp_IpAddr=" + vnp_IpAddr + "&";
        String queryParamsSecondHalf = null; // vnp_ReturnUrl=${encodeURIComponent(vnp_ReturnUrl)}&

        try {
            queryParamsSecondHalf = "vnp_Locale=" + vnp_Locale + "&vnp_OrderInfo=" + URLEncoder.encode(vnp_OrderInfo, StandardCharsets.US_ASCII.toString()) + "&vnp_ReturnUrl=" + URLEncoder.encode(vnp_ReturnUrl, StandardCharsets.US_ASCII.toString()) + "&";
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }

        String queryParamsThirdHalf = "vnp_TmnCode=" + vnp_TmnCode + "&vnp_TxnRef=" + vnp_TxnRef + "&vnp_Version=" + vpn_Version;

        HashMap<String, String> fields = new HashMap<>();
        fields.put("vnp_CreateDate", vnp_CreateDate);
        fields.put("vnp_TxnRef", String.valueOf(vnp_TxnRef));
        fields.put("vnp_SecureHash", hmacSHA512(vnp_HashSecret, queryParamsFirstHalf + queryParamsSecondHalf + queryParamsThirdHalf));
//        fields.put("rawHash", queryParamsFirstHalf + queryParamsSecondHalf + queryParamsThirdHalf);
        return fields;
    };

    public static String hmacSHA512(final String key, final String data) {
        try {

            if (key == null || data == null) {
                throw new NullPointerException();
            }
            final Mac hmac512 = Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes();
            final SecretKeySpec secretKey = new SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] dataBytes = data.getBytes(StandardCharsets.UTF_8);
            byte[] result = hmac512.doFinal(dataBytes);
            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();

        } catch (Exception ex) {
            return "";
        }
    }

    public static String hashAllFields(Map fields, String secretKey) {
        List fieldNames = new ArrayList<>(fields.keySet());
        Collections.sort(fieldNames);
        StringBuilder sb = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) fields.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                sb.append(fieldName);
                sb.append("=");
                sb.append(fieldValue);
            }
            if (itr.hasNext()) {
                sb.append("&");
            }
        }
        return hmacSHA512(secretKey,sb.toString());
    }
}
