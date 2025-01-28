// الحصول على النموذج وزر التقديم
const form = document.getElementById('orderForm');
const submitButton = form.querySelector('button');

// التعامل مع إرسال النموذج
form.addEventListener('submit', function(event) {
    event.preventDefault();  // منع إرسال النموذج بطريقة تقليدية
    
    // جمع البيانات المدخلة
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const quantity = document.getElementById('quantity').value;

    // التحقق من صحة البيانات
    let errors = [];

    // التحقق من أن جميع الحقول غير فارغة
    if (!name || !phone || !address || !quantity) {
        errors.push("يرجى تعبئة جميع الحقول.");
    }

    // التحقق من أن الرقم يحتوي على 11 رقمًا
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById('phoneError').textContent = "الرقم يجب أن يحتوي على 11 رقمًا.";
        errors.push("الرقم يجب أن يحتوي على 11 رقمًا.");
    } else {
        document.getElementById('phoneError').textContent = "";
    }

    // إذا كانت هناك أخطاء، عرضها للمستخدم
    if (errors.length > 0) {
        alert(errors.join("\n"));
    } else {
        // إرسال البيانات إلى الخادم باستخدام AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'process-order.php', true); // يجب تعديل 'process-order.php' إلى عنوان معالج البيانات في الخادم الخاص بك
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // التعامل مع الاستجابة من الخادم
        xhr.onload = function() {
            if (xhr.status === 200) {
                alert('تم تأكيد الطلب بنجاح!');
                form.reset(); // مسح البيانات المدخلة بعد إرسالها
            } else {
                alert('حدث خطأ أثناء معالجة الطلب. يرجى المحاولة لاحقًا.');
            }
        };

        // إرسال البيانات إلى الخادم
        const data = `name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&address=${encodeURIComponent(address)}&quantity=${encodeURIComponent(quantity)}`;
        xhr.send(data);
    }
});
