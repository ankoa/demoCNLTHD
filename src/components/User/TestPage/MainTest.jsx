import "./MainTest.scss"; // Bạn có thể tùy chỉnh CSS theo yêu cầu của bạn

const MainTest = () => {
  return (
    <div className="toeic-test-container container">
      {/* Header */}
      <div>
        <div className="test-header">
          <span className="badge bg-light text-secondary">#TOEIC</span>
          <h2>New Economy TOEIC Test 2</h2>
          <div className="test-info">
            <p>
              <strong>Thời gian làm bài:</strong> 120 phút |{" "}
              <strong>7 phần thi</strong> | 200 câu hỏi | 198 bình luận
            </p>
            <p>
              <i className="bi bi-person-fill"></i> 321081 người đã luyện tập đề
              thi này
            </p>
            <p className="text-danger">
              Chú ý: để được quy đổi sang scaled score, vui lòng chọn chế độ làm
              FULL TEST.
            </p>
          </div>
        </div>

        {/* Tab chọn */}
        <ul className="nav nav-tabs mt-3">
          <li className="nav-item">
            <a className="nav-link active" href="#">
              Luyện tập
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Làm full test
            </a>
          </li>
        </ul>

        {/* Pro tip */}
        <div className="alert alert-success mt-3">
          <i className="bi bi-lightbulb-fill"></i> Pro tips: Hình thức luyện tập
          từng phần và chọn mức thời gian phù hợp sẽ giúp bạn tập trung vào giải
          đúng các câu hỏi thay vì phải chịu áp lực hoàn thành bài thi.
        </div>

        {/* Phần chọn phần thi */}
        <div className="test-sections">
          <h5>Chọn phần thi bạn muốn làm</h5>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="part1"
            />
            <label className="form-check-label" htmlFor="part1">
              Part 1 (6 câu hỏi)
            </label>
            <div className="tag-list">
              <span className="badge bg-secondary">#Part 1 Tranh tả người</span>
              <span className="badge bg-secondary">
                #Part 1 Tranh tả người và vật
              </span>
            </div>
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="part2"
            />
            <label className="form-check-label" htmlFor="part2">
              Part 2 (25 câu hỏi)
            </label>
            <div className="tag-list">
              <span className="badge bg-secondary">#Part 2 Câu hỏi WHO</span>
              <span className="badge bg-secondary">#Part 2 Câu hỏi WHERE</span>
              <span className="badge bg-secondary">#Part 2 Câu hỏi WHAT</span>
            </div>
          </div>

          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="part3"
            />
            <label className="form-check-label" htmlFor="part3">
              Part 3 (39 câu hỏi)
            </label>
            <div className="tag-list">
              <span className="badge bg-secondary">
                #Part 3 Câu hỏi về chủ đề, mục đích
              </span>
              <span className="badge bg-secondary">
                #Part 3 Câu hỏi về danh tính người nói
              </span>
              {/* ... Thêm các thẻ khác tương tự */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTest;
