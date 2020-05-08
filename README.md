# Các chức năng:
* Về tài khoản:
- [x] Đăng kí, đăng nhập, đăng xuất
- [x] Verify tài khoản đăng kí bằng email
- [x] Một số testcase đơn giản cho việc tạo tài khoản
- [x] Sửa thông tin tài khoản

* Về trang duyệt danh sách
- [x] Trang duyệt qua các homestay theo dạng thẻ (sơ sài)
- [x] Tìm kiếm theo địa chỉ bằng cách nhập text, có gợi ý
* Về trang hiện thông tin chi tiết homestay
  * Hiện thông tin cơ bản:
    - [x] Title, description, about area
    - [x] Map
    - [x] Welcomes, homestay va local area facilities
* Về dữ liệu:
- [x] Form tải lên homestay (nhưng rất sơ sài)
- [x] Crawl dữ liệu từ https://www.homestay.com/
- [ ] Thông tin các loại phòng
- [ ] Model Contract

* Về việc đặt phòng:
- [x] Kiểm tra trùng lặp 
- [ ] Có thông tin đặt cho từng homestay
- [ ] Cung cấp form đặt trực tuyến cho renter 
- [ ] Gửi mail thông báo
- [ ] ...

# Phân tích use case

* UC Sign up:

Hiện mới yêu cầu nhập email và mật khẩu
Phải bắt nhập thêm first name và last name tiện cho việc hiển thị trên giao diện

Email nếu thỏa mãn sẽ có dáu tích bên cạnh khi click ra khỏi ô email
Sai thì không có gì, chỗ này nên báo lỗi rõ ràng hơn

Chỉ có kiểm tra email hợp lệ là có gửi ajax post với data là text người dùng nhập về hệ thống để kiểm tra.
T không biết có nên hạn chế vụ này để tránh DDOS không?

Khi gửi form đăng kí xong, mới hiện mỗi dòng "Please confirm your email address to complete the registration"
Phải thanh template trả về ở views.signup, phần gửi phản hồi cuối if true

Verify email: mới chỉ gửi email và đường link sơ sài, có thể sửa ở template user/acc_active_email.html

* UC Login:

Hiện chưa cho user chưa active email đăng nhập.

* UC Duyệt trang:

Mới chỉ hiện 10 homestay lấy từ database với objects.all().
Phải thêm hiện các homestay mới nhất, rating cao nhất hoặc sử dụng các cách sắp xếp khác.

Giao diện web chưa có phân trang 1,2,3,... chỉ hiện một mạch từ đầu đến cuối.

* UC Tìm kiếm:

Mới có tìm kiếm theo địa chỉ.
Có 1 button Search trên nav bar, nhập text địa chỉ để search, có gợi ý, sử dụng api suggest của HERE.

Cần thêm tìm kiếm theo ngày trống, theo tiện ích Homestay cung cấp

* UC Xem chi tiết

* UC upload:

Chưa có phần kiểm duyệt, up là vào databse luôn

* UC book, deposit, comfirm

Contract 7 state
        '''Python
        NEW = 1, _('Just create')
        CONFIRMED = 2, _('confirmed/deposited')
        OPERATIONAL = 3
        COMPLETED = 0
        CANCELED_BEFORE_CONFIRM = -1
        CANCELED_AFTER_CONFIRM = -2
        NOSHOW = -3
        '''
Contract đơn giản, kiểm tra overlap date là chính
 

* UC 

# Các test case:
* User:
- [x] Create User
- [x] Create Super User
- [x] Verify Email send and click

* Search:
- [x] Search Address
- [ ] Search Title
- [ ] Search facilities
- [ ] Search available date

* Book:
- [x] Check homestay date overlap
- [ ] Check user date overlap

* Upload:
- [ ] Test upload
- 

# Chú ý
* account supper user: email=admin@email.com, password=imadmin
* Cần tạo env theo file env.yml, tôi dùng anaconda 
* Để sử dụng dữ liệu có sẵn cần tải file media.zip ở đây https://drive.google.com/drive/u/1/folders/1ZdFuNpQYj7xkeqyV0xXxvvtCbg0PTBz3 giải nén ở thử mục gốc của project
# Hình ảnh
V0.1: https://drive.google.com/open?id=19fXBDp8NTsWucw31sXSMXPx0kY7_xAtJ

V0.2: https://drive.google.com/open?id=1eQuhwrv3hJZscQi_7yjLj5MEx_qQpyxf