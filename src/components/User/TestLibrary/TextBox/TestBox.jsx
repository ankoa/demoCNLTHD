import { useState, useEffect } from "react"; // Tạo dữ liệu giả định (mock data)

const mockTests = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `Test title ${index + 1}`,
  duration: 40,
  participants: 500 + index,
  comments: 20 + index,
  sections: 4,
  questions: 40,
  tags: ["TOEIC"],
}));

const TextBox = () => {
  const [tests, setTests] = useState([]); // Dữ liệu bài test
  const [page, setPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(0); // Tổng số trang
  const limit = 20; // Số item mỗi trang

  // Giả lập việc load dữ liệu từ "API"
  useEffect(() => {
    const fetchTests = () => {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedTests = mockTests.slice(startIndex, endIndex); // Lấy 20 phần tử của trang hiện tại
      setTests(paginatedTests);
      setTotalPages(Math.ceil(mockTests.length / limit)); // Tính tổng số trang
    };

    fetchTests();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage); // Cập nhật trang hiện tại
    }
  };

  return (
    <div className="col-12 col-md-12">
      <div className="testitem-grid row align-items-center">
        {tests.map((test, index) => (
          <div className="col-6 col-md-3 my-2" key={index}>
            <div className="testitem-wrapper border rounded shadow-sm p-3">
              <a className="text-dark" href={`/tests/${test.id}`}>
                <h2 className="testitem-title">{test.title}</h2>
                <div className="testitem-info-wrapper">
                  <div>
                    <span className="testitem-info">
                      <span className="far fa-clock mr-1"></span>
                      {test.duration} phút |{" "}
                      <span className="far fa-user-edit mr-1"></span>
                      {test.participants} |{" "}
                      <span className="far fa-comments mr-1"></span>
                      {test.comments}
                    </span>
                  </div>
                  <div>
                    <span className="testitem-info">
                      {test.sections} phần thi | {test.questions} câu hỏi
                    </span>
                  </div>
                </div>
                <div className="testitem-tags mt-2">
                  {test.tags.map((tag, i) => (
                    <span key={i} className="tag badge bg-primary me-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="testitem-start-test mt-2">
                  <a
                    href={`/tests/${test.id}`}
                    className="btn btn-block btn-outline-primary"
                  >
                    Chi tiết
                  </a>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang sử dụng Bootstrap */}
      <nav aria-label="Page navigation example" className="mt-4">
        <ul className="pagination justify-content-start">
          <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page - 1);
              }}
            >
              Previous
            </a>
          </li>

          {/* Danh sách các nút trang */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${page === index + 1 ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index + 1);
                }}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
            <a
              className="page-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page + 1);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default TextBox;
