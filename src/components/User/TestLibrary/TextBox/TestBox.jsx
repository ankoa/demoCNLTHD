import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const TextBox = ({ tests }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Số bài kiểm tra hiển thị trên mỗi trang
  const navigate = useNavigate();

  // Tính toán chỉ số của bài kiểm tra để hiển thị
  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;
  const currentTests = tests
    ? tests.slice(indexOfFirstTest, indexOfLastTest)
    : [];

  // Tính toán tổng số trang
  const totalPages = tests ? Math.ceil(tests.length / itemsPerPage) : 1;

  // Hàm thay đổi trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm xử lý khi nhấn nút "Chi tiết"
  const handleDetailClick = (testId) => {
    navigate(`/test/${testId}`);
  };

  return (
    <div className="col-12 col-md-12">
      {!tests || tests.length === 0 ? (
        <p>Không có bài kiểm tra nào để hiển thị.</p>
      ) : (
        <>
          <div className="testitem-grid row align-items-center">
            {currentTests.map((test) => (
              <div className="col-6 col-md-3 my-2" key={test.Id}>
                <div className="testitem-wrapper border rounded shadow-sm p-3">
                  <h2 className="testitem-title">{test.Name}</h2>
                  <p className="testitem-description">{test.Description}</p>
                  <div className="testitem-info-wrapper">
                    <div>
                      <span className="testitem-info">
                        <span className="far fa-clock mr-1"></span>
                        {test.Duration} phút |{" "}
                        <span className="fa-regular fa-star mr-1"></span>
                        {test.Difficulty}
                      </span>
                    </div>
                    <div>
                      <span className="testitem-info">
                        Cập nhật lần cuối:{" "}
                        {new Date(test.UpdatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="testitem-info">
                        <span className="far fa-calendar-alt mr-1"></span>
                        Ngày tạo:{" "}
                        {new Date(test.CreatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="testitem-start-test mt-2 d-flex justify-content-center">
                    <button
                      className="btn btn-block btn-outline-primary"
                      onClick={() => handleDetailClick(test.Id)}
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="pagination mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Định nghĩa kiểu dữ liệu cho props
TextBox.propTypes = {
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      Id: PropTypes.number.isRequired,
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Difficulty: PropTypes.string.isRequired,
      Duration: PropTypes.number.isRequired,
      CreatedAt: PropTypes.string.isRequired,
      UpdatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TextBox;
