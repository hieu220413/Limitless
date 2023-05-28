package fpt.edu.limitlessapi.controller;

import fpt.edu.limitlessapi.entity.Subscription;
import fpt.edu.limitlessapi.entity.Users;
import fpt.edu.limitlessapi.exception.UserNotFoundException;
import fpt.edu.limitlessapi.model.SubscriptionResponseBody;
import fpt.edu.limitlessapi.repository.SubscriptionRepository;
import fpt.edu.limitlessapi.repository.UserRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SubscriptionRepository subscriptionRepository;

    @RequestMapping(value = "/transaction/{userId}/result", method = RequestMethod.GET)
    public RedirectView transactionResult(@RequestParam Map<String,String> allRequestParams, @PathVariable String userId) {
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
                Optional<Users> userEntity =  userRepository.findById(UUID.fromString(userId));

                if(!userEntity.isPresent()){
                    throw new UserNotFoundException("NOT_FOUND");
                }
//                LocalDateTime startDate = LocalDateTime.now().withNano(0);
//                LocalDateTime endDate = startDate.plusMonths(subscriptionRequestBody.getDuration());
                String price  = allRequestParams.get("vnp_Amount");
                String transactionDateTime = allRequestParams.get("vnp_PayDate");
                String year = transactionDateTime.substring(0,4);
                String month = transactionDateTime.substring(4,6);
                String date = transactionDateTime.substring(6,8);
                String hour = transactionDateTime.substring(8,10);
                String minute = transactionDateTime.substring(10,12);
                String second = transactionDateTime.substring(12,14);
                LocalDateTime transactionLocalDateTime = LocalDateTime.parse(""+ year + "-" + month + "-" + date + "T" + hour + ":" + minute + ":" + second );
                Subscription subscription = Subscription.builder()
                        .price(Integer.parseInt(price.substring(0, price.length()-1-1)))
                        .startDate(transactionLocalDateTime)
                        .endDate(transactionLocalDateTime.plusMonths(1))
                        .user(userEntity.get())
                        .build();
                Subscription subscriptionSaved = subscriptionRepository.save(subscription);
                if(subscriptionSaved != null){
                    return  new RedirectView("http://success.sdk.merchantbackapp/");
                }
            }
            log.error("GD Khong thanh cong");
            return  new RedirectView("http://fail.sdk.merchantbackapp/");

        } else {
            log.error("Chu ky khong hop le");
            return  new RedirectView("http://fail.sdk.merchantbackapp/");
        }
    }

    @RequestMapping(value = "/transaction/getImportantFields", method = RequestMethod.GET)
    public HashMap getImportantFields(@RequestParam String orderInfo, @RequestParam int amount, @RequestParam String userId){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("YYYYMMddHHmmss");
        LocalDateTime today = LocalDateTime.now();
        String vpn_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TmnCode = "MNWQOE3L";
        String vnp_CurrCode = "VND";
        String vnp_IpAddr = "127.0.0.1";
        String vnp_Locale = "vn";
        String vnp_ReturnUrl = "http://10.0.2.2:8080/api/vnpay/transaction/" + userId + "/result"; //http://success.sdk.merchantbackapp/
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
