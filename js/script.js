function submitQuiz() {
    let correctCount = 0; // Đếm số câu đúng
    let unansweredCount = 0; // Đếm số câu chưa trả lời
    let userAnswers = {}; // Lưu đáp án người dùng nhập
    const answers = {
        q1: { correct: "q1-option4", type: "radio", explanation: "Vì NumPy được viết bằng C, làm cho nó nhanh hơn trong xử lý dữ liệu số học" },
        q2: { correct: "q2-option4", type: "radio", explanation: "So sánh tỷ lệ phần trăm của các phần tử dữ liệu so với tổng thể" },
        q3: { correct: "q3-option1", type: "radio", explanation: "Tần suất xuất hiện của các cường độ ánh sáng trong ảnh xám" },
        mean: { correct: "giá trị trung bình của mảng", type: "input", explanation: "giá trị trung bình của mảng" },
        min: { correct: "giá trị nhỏ nhất trong mảng", type: "input", explanation: "giá trị nhỏ nhất trong mảng" },
        max: { correct: "giá trị lớn nhất trong mảng", type: "input", explanation: "giá trị lớn nhất trong mảng" },
        std: { correct: "độ lệch chuẩn của mảng", type: "input", explanation: "độ lệch chuẩn của mảng" },
        var: { correct: "phương sai của mảng", type: "input", explanation: "phương sai của mảng" },
        dot: { correct: "tổng tích chập", type: "input", explanation: "tổng tích chập" },
        sum: { correct: "tổng của mảng", type: "input", explanation: "tổng của mảng" },
        q5: { correct: "q5-option2", type: "radio", explanation: "[0. 3. 6. 9. 12. 15.]" },
        q6: { correct: "q6-option1", type: "radio", explanation: "Xử lý hình ảnh" },
        q7: { correct: "q7-option1", type: "radio", explanation: "Tăng độ tương phản và làm cho ảnh trở nên rõ ràng hơn" },
        q8: { correct: "concatenate", type: "input", explanation: "concatenate" },
        q9: { correct: ["q9-option2", "q9-option3", "q9-option4"], type: "checkbox", explanation: "Giảm nhiễu, Tiết kiệm dung lượng lưu trữ, Giảm chi phí tỉnh toàn" },
        q10: { correct: "q10-option2", type: "radio", explanation: "Tạo một danh sách các tệp hình ảnh có trong folder_path" },
        ndim: { correct: "hiển thị số chiều", type: "input", explanation: "hiển thị số chiều" },
        size: { correct: "hiển thị kích thước", type: "input", explanation: "hiển thị kích thước" },
        shape: { correct: "hiển thị số hàng và cột", type: "input", explanation: "hiển thị số hàng và cột" },
        q12: { correct: "q12-option2", type: "radio", explanation: "Ngôn ngữ lập trình thông dịch" },
        q13: { correct: "q13-option2", type: "radio", explanation: "Hàm resize thay đổi tỷ lệ kích thước của hình ảnh, trong khi hàm thumbnail duy trì tỷ lệ kích thước ban đầu" },
        q14: { correct: "q14-option3", type: "radio", explanation: "Phát hiện biên ảnh" },
        q15: { correct: "q15-option3", type: "radio", explanation: "cv2.VideoCapture()" },
        q16: { correct: "q16-option2", type: "radio", explanation: "cv2.destroyAllWindows()" },
        q17: { correct: "q17-option4", type: "radio", explanation: "Crop = image[48:69, 1:80]" },
        q18: { correct: "q18-option1", type: "radio", explanation: 'FPS là việt tất của "Frames Per Second" và đo lường tốc độ mà hình ảnh thay đổi trong một trò chơi hoặc ứng dụng đa phương tiện' },
        q19: { correct: { horizontal: "ngang", vertical: "dọc" }, type: "input-pair", explanation: "ngang, dọc" },
        q20: { correct: "q20-option1", type: "radio", explanation: "NumPy" },
        q21: { correct: "q21-option3", type: "radio", explanation: "Video là một chuỗi các hình ảnh tĩnh được thể hiện theo một tốc độ cố định để tạo ra một dãy hình ảnh động" },
        q22: { correct: "q22-option4", type: "radio", explanation: "Tạo một cửa sổ mới để hiển thị hình ảnh" },
        q23: { correct: "q23-option3", type: "radio", explanation: "Chia một hình ảnh thành nhiều hình ảnh con tương ứng với từng kênh màu (Red, Green, Blue)" },
        q24: { correct: "q24-option4", type: "radio", explanation: "camera.release()" },
        datdd: { correct: "img = cv2.imread('path')", type: "input", explanation: "img = cv2.imread('path')" },
        ittva: { correct: "print(img)", type: "input", explanation: "print(img)" },
        lktcha: { correct: "img.shape", type: "input", explanation: "img.shape" },
        hthatmcs: { correct: "cv2.imshow('title', img)", type: "input", explanation: "cv2.imshow('title', img)" },
        tdvcmktg: { correct: "cv2.waitkey(time - milliseconds)", type: "input", explanation: "cv2.waitkey(time - milliseconds)" },
        dcshtha: { correct: "cv2.destroyWindows()", type: "input", explanation: "cv2.destroyWindows()" },
        lhaamtm: { correct: "cv2.imwrite('path', img)", type: "input", explanation: "cv2.imwrite('path', img)" },
        line: { correct: "vẽ đường thẳng trong hình ảnh", type: "input", explanation: "vẽ đường thẳng trong hình ảnh" },
        rectangle: { correct: "vẽ hình chữ nhật trong hình ảnh", type: "input", explanation: "vẽ hình chữ nhật trong hình ảnh" },
        circle: { correct: "vẽ hình tròn trong hình ảnh", type: "input", explanation: "vẽ hình tròn trong hình ảnh" },
        putText: { correct: "chèn văn bản vào hình ảnh", type: "input", explanation: "chèn văn bản vào hình ảnh" },
        ellipse: { correct: "vẽ hình elip trong hình ảnh", type: "input", explanation: "vẽ hình elip trong hình ảnh" },
        polylines: { correct: "vẽ đa giác (polyline) trong hình ảnh", type: "input", explanation: "vẽ đa giác (polyline) trong hình ảnh" },
        q27: { correct: "q27-option2", type: "radio", explanation: "Tính toán đặc trưng của khuôn mặt" },
        q28: { correct: "q28-option2", type: "radio", explanation: "Định dạng độ chính xác của việc nhận dạng" },
        q29: { correct: "q29-option4", type: "radio", explanation: "Hiển thị hình chữ nhật xung quanh khuôn mặt được nhận dạng" },
        q30: { correct: { horizontal: "left", vertical: "top" }, type: "input-pair", explanation: "left, top" },
        q31: { correct: "q31-option2", type: "radio", explanation: "Xác định vị trí và ranh giới của các đối tương trong hình ảnh" },
        q32: { correct: "q32-option4", type: "radio", explanation: "128 giá trị số thực" },
        q33: { correct: "q33-option4", type: "radio", explanation: "Môt framework mã nguồn mở mạnh mẽ được phát triển để hỗ trợ xây dựng và huấn luyên mô hình học máy cho việc thị giác máy tính và xử lý hình ảnh" },
        q35: { correct: "q35-option1", type: "radio", explanation: "Một phần của Open Source Computer Vision Library (OpenCV) cho phép tích hợp và sử dụng mạng nơ-ron nọc sâu (Deep Learning) trong các ứng dụng thị giác máy tính" },
        q36: { correct: "q36-option4", type: "radio", explanation: "Một lĩnh vực tập trung vào việc sử dụng mạng nơ-ron sâu để học và áp dụng kiến thức từ dữ liệu" },
        q37: { correct: "q37-option2", type: "radio", explanation: "Đọc một hình ảnh từ file" },
        q38: { correct: "q38-option4", type: "radio", explanation: "Python và R" },
        q39: { correct: "q39-option4", type: "radio", explanation: "Ensemble Leaming Algonthm" },
        q40: { correct: "q40-option1", type: "radio", explanation: "Support Vector Machines (SVM)" },
        q41: { correct: "q41-option2", type: "radio", explanation: "In ra các thông số như độ chính xác và F1 Score của mô hình trên tập huấn luyên và tập kiểm thử" },
        q42: { correct: "q42-option1", type: "radio", explanation: "Soft voting" },
        q43: { correct: "q43-option1", type: "radio", explanation: "Phân loại" },
        buoc1: { correct: "chia sẻ dữ liệu", type: "input", explanation: "chia sẻ dữ liệu" },
        buoc2: { correct: "chọn mô hình", type: "input", explanation: "chọn mô hình" },
        buoc3: { correct: "xây dựng mô hình", type: "input", explanation: "xây dựng mô hình" },
        buoc4: { correct: "tối ưu hóa mô hình", type: "input", explanation: "tối ưu hóa mô hình" },
        buoc5: { correct: "đào tạo mô hình", type: "input", explanation: "đào tạo mô hình" },
        buoc6: { correct: "đánh giá và điều chỉnh", type: "input", explanation: "đánh giá và điều chỉnh" },
        buoc7: { correct: "kiểm thử mô hình", type: "input", explanation: "kiểm thử mô hình" },
        buoc8: { correct: "tinh chỉnh cuối cùng", type: "input", explanation: "tinh chỉnh cuối cùng" },
        q45: { correct: "fit", type: "input", explanation: "fit" },
        qt1: { correct: "qt1-option3", type: "radio", explanation: "2001" },
        qt2: { correct: "qt2-option3", type: "radio", explanation: "Để tăng độ chính xác của việc nhận dạng" },
        qt3: { correct: "qt3-option3", type: "radio", explanation: "Facebook (Meta Al)" },
        HaarCascades: { correct: "Sử dụng phân lớp AdaBoo", type: "input", explanation: "Sử dụng phân lớp AdaBoo" },
        CNN: { correct: "Sử dụng mạng nơ-ron tích chập", type: "input", explanation: "Sử dụng mạng nơ-ron tích chập" },
        DeepLearning: { correct: "Sử dụng mạng học sâu để tăng", type: "input", explanation: "Sử dụng mạng học sâu để tăng" },
        qt5: { correct: "qt5-option1", type: "radio", explanation: "Độ tin cậy của khuôn mặt được phát hiện" },
        qt6: { correct: "qt6-option2", type: "radio", explanation: "Một trong 7 giá trị (phần cuối)" },
        qt7: { correct: "qt7-option3", type: "radio", explanation: "Xác định và mô tả các đặc điểm quan trọng của đối tượng trong hình ảnh" },
        qt8: { correct: "qt8-option3", type: "radio", explanation: "from google.colab import drive" },
        tbuoc1: { correct: "shape_predictor = dlib.shape_", type: "input", explanation: "shape_predictor = dlib.shape_" },
        tbuoc2: { correct: "face_shape = shape_predictor", type: "input", explanation: "face_shape = shape_predictor" },
        tbuoc3: { correct: "face_shape_array = face_utils", type: "input", explanation: "face_shape_array = face_utils" },
        t10buoc1: { correct: "Thu thập ảnh", type: "input", explanation: "Thu thập ảnh" },
        t10buoc2: { correct: "Chuẩn bị dữ liệu", type: "input", explanation: "Chuẩn bị dữ liệu" },
        t10buoc3: { correct: "Huấn luyện", type: "input", explanation: "Huấn luyện" },
        t10buoc4: { correct: "Tôi ưu hóa mô hình", type: "input", explanation: "Tôi ưu hóa mô hình" },
        t10buoc5: { correct: "Kiểm thử và đánh giá mô hình", type: "input", explanation: "Kiểm thử và đánh giá mô hình" },
        t10buoc6: { correct: "Triển khai mô hình", type: "input", explanation: "Triển khai mô hình" },
        t10buoc7: { correct: "Xây dựng giao diện người dùng", type: "input", explanation: "Xây dựng giao diện người dùng" },
        t10buoc8: { correct: "Bảo mật và quản lý dữ liệu", type: "input", explanation: "Bảo mật và quản lý dữ liệu" },
        t10buoc9: { correct: "Duy trì và cập nhật", type: "input", explanation: "Duy trì và cập nhật" },
    };
    let totalQuestions = Object.keys(answers).length; // Tổng số câu hỏi

    // Reset previous results
    Object.keys(answers).forEach((key) => {
        let resultDiv = document.getElementById(`result-${key}`);
        if (resultDiv) resultDiv.innerHTML = "";
    });

    // Xử lý từng câu hỏi
    Object.keys(answers).forEach((key) => {
        let answer = answers[key];
        let userInput, isCorrect;
        let resultDiv = document.getElementById(`result-${key}`);
        // let isCorrectt = false;

        if (answer.type === "radio") {
            let selectedOption = document.querySelector(`input[name="${key}"]:checked`);
            if (!selectedOption) {
                resultDiv.innerHTML = '<p class="incorrect">Chưa chọn đáp án kìa cu.</p>';
                unansweredCount++;
                return;
            }
            isCorrect = selectedOption.id === answer.correct;
        }
        else if (answer.type === "checkbox") {
            // Lấy các giá trị từ checkbox
            let selectedOptions = document.querySelectorAll(`input[name="${key}"]:checked`);
            let selectedIds = Array.from(selectedOptions).map(option => option.id);

            // Kiểm tra đáp án đúng với những gì người dùng chọn
            isCorrect = selectedIds.length === answer.correct.length &&
                selectedIds.every(id => answer.correct.includes(id)) &&
                answer.correct.every(id => selectedIds.includes(id));

            if (selectedIds.length === 0) {
                resultDiv.innerHTML = '<p class="incorrect">Chưa chọn đáp án kìa cu.</p>';
                unansweredCount++;
                return;
            }
        } else if (answer.type === "input") {
            // Lấy giá trị từ input
            let inputField = document.getElementById(key);
            if (inputField) {
                userInput = inputField.value.trim(); // Lấy giá trị và loại bỏ khoảng trắng
            }
            if (!userInput) {
                resultDiv.innerHTML = '<p class="incorrect">Chưa nhập đáp án.</p>';
                unansweredCount++;
                return;
            }
            isCorrect = userInput.toLowerCase() === answer.correct.toLowerCase();
        } else if (answer.type === "input-pair") {
            // Lấy giá trị từ hai ô nhập liệu
            let horizontalInput = document.getElementById(`${key}-horizontal`);
            let verticalInput = document.getElementById(`${key}-vertical`);

            let horizontalAnswer = horizontalInput ? horizontalInput.value.trim().toLowerCase() : "";
            let verticalAnswer = verticalInput ? verticalInput.value.trim().toLowerCase() : "";

            if (!horizontalAnswer || !verticalAnswer) {
                resultDiv.innerHTML = '<p class="incorrect">Chưa nhập đầy đủ đáp án.</p>';
                unansweredCount++;
                return;
            }

            isCorrect = horizontalAnswer === answer.correct.horizontal &&
                verticalAnswer === answer.correct.vertical;
        }

        // Ghi nhận kết quả
        if (isCorrect) {
            correctCount++;
            resultDiv.innerHTML = '<p class="correct">Khá lắm nhóc</p>';
        } else {
            resultDiv.innerHTML = `<p class="incorrect">Ngu vãi lòng đáp án đúng là "${answer.explanation}"</p>`;
        }
    });

    // Hiển thị tổng số câu đúng / tổng số câu hỏi
    let totalCorrect = document.getElementById("total-correct");
    totalCorrect.innerHTML = `Bạn đã trả lời đúng ${correctCount} / ${totalQuestions} câu.`;
}
