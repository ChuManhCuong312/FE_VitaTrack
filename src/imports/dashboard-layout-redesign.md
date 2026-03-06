Cải thiện thiết kế cho giao diện dashboard hiện có.

Tình trạng hiện tại:
Ứng dụng là một dashboard theo dõi sức khỏe có tên VitaTrack. Bố cục bao gồm thanh điều hướng sidebar bên trái và khu vực nội dung chính hiển thị các thẻ thông tin như: calo, số bước chân, lượng nước uống, biểu đồ và tỷ lệ macro.

Giao diện hiện tại khá đẹp, tuy nhiên đang gặp một vấn đề lớn về bố cục (layout):

Sidebar bên trái đang che hoặc làm chật khu vực nội dung chính, khiến nội dung đôi khi bị khuất hoặc hiển thị không tối ưu.

Ở một số kích thước màn hình, nội dung chính bị che bởi sidebar.

Giải pháp mong muốn:

Thiết kế lại cấu trúc layout để sidebar có thể được thu gọn (collapse) hoặc mở rộng (expand) tùy theo thao tác của người dùng, mà không bao giờ che khuất nội dung chính.

Yêu cầu chức năng:

Sidebar cần hỗ trợ chế độ bật/tắt (toggle)

Trạng thái mở rộng: hiển thị đầy đủ icon và tên menu

Trạng thái thu gọn: chỉ hiển thị icon

Thêm nút toggle (biểu tượng hamburger) ở góc trên bên trái của header để điều khiển sidebar.

Khi sidebar được thu gọn:

Chiều rộng sidebar giảm từ khoảng 240px → 72px

Nội dung chính tự động mở rộng để sử dụng toàn bộ không gian còn lại.

Khu vực nội dung chính luôn phải hiển thị đầy đủ, không bao giờ bị sidebar che.

Sử dụng layout responsive với Auto Layout hoặc Grid System để đảm bảo tất cả các trang hoạt động nhất quán.

Yêu cầu responsive:

Desktop (≥1200px)

Sidebar mở rộng mặc định

Nội dung chính căn giữa và có khoảng cách hợp lý

Tablet (768px–1199px)

Sidebar thu gọn mặc định

Có thể mở rộng khi nhấn toggle

Mobile (<768px)

Sidebar trở thành menu trượt (slide-out drawer)

Mở bằng nút hamburger

Có nền overlay khi menu mở

Quy tắc design system:

Sử dụng nguyên tắc thiết kế dashboard hiện đại

Giữ nguyên phong cách màu sắc hiện tại (tông xanh sức khỏe)

Sử dụng hệ thống khoảng cách 8px spacing system

Đảm bảo các card, biểu đồ và widget được căn chỉnh thẳng hàng

Tránh việc nội dung bị dịch chuyển gây khó chịu cho người dùng

Kết quả mong muốn:

Thiết kế lại cấu trúc layout

Tạo component sidebar với hai trạng thái: collapsed và expanded

Thiết kế responsive cho desktop, tablet và mobile

Thiết lập auto layout và constraints rõ ràng để lập trình viên có thể triển khai dễ dàng

Mục tiêu:

Tạo một dashboard sạch, chuyên nghiệp và responsive, trong đó sidebar có thể bật/tắt mượt mà và không bao giờ che khuất nội dung chính.