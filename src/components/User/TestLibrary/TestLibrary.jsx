import { useEffect, useState } from "react";
import { getAllTests } from "../../../services/testsService"; // Adjust the path as needed
import "./TestLibrary.scss";
import "./TextBox/TestBox.scss";
import TextBox from "./TextBox/TestBox";

const TestLibrary = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getAllTests();
        if (data.EC === 0) {
          // Lọc các phần tử có Id khác -1
          const filteredTests = data.DT.filter((test) => test.Id !== -1);
          setTests(filteredTests);
          console.log("Get all tests success:", filteredTests);
        } else {
          console.error("Error:", data.EM);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await getAllTests();
      const filteredTests = data.DT.filter((test) =>
        test.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTests(filteredTests);
    } catch (error) {
      console.error("Error searching tests:", error);
    }
  };

  return (
    <div className="site-content-wrapper">
      <header className="content-header pb-0 gray-bg">
        <div className="container pb-0 px-5">
          <div className="row custom-row">
            <div className="col-12 col-md-4 order-md-2 custom-col">
              <div className="user-target-user">
                <div className="text-center">
                  <span className="account-profile-img md">
                    <img
                      src="../../../assets/images/user_icon.png"
                      alt="User"
                    />
                  </span>
                  <div>akhoa0805</div>
                </div>
                <div className="divider sm"></div>
                <div className="user-target-info">
                  <div className="user-target-text-sm">
                    <strong>TOEIC</strong>
                  </div>
                  <table className="user-target-info-table table table-borderless table-sm mb-0">
                    <tbody>
                      <tr className="user-target-text-sm">
                        <td style={{ width: "110px" }}>Ngày dự thi:</td>
                        <td style={{ width: "100px" }}>
                          <span className="user-target-text-value">-</span>
                          <a
                            data-toggle="modal"
                            data-target="#site-modal-md"
                            href="#"
                          >
                            <span className="far fa-pen"></span>
                          </a>
                        </td>
                      </tr>
                      <tr className="user-target-text-sm">
                        <td>Tới kỳ thi:</td>
                        <td>
                          <span className="user-target-text-value">0 ngày</span>
                        </td>
                      </tr>
                      <tr className="user-target-text-sm">
                        <td>Điểm mục tiêu:</td>
                        <td>
                          <span className="user-target-text-value">-</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="mt-3">
                    <a
                      className="btn btn-sm btn-block btn-round btn-sky"
                      href="/tests/analytics/"
                    >
                      <span className="far fa-analytics mr-1"></span>
                      Thống kê kết quả
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-8 order-md-1 custom-col">
              <h1 className="text-right">Thư viện đề thi</h1>
              <form
                className="form-find-test"
                method="GET"
                onSubmit={handleSearch}
              >
                <div className="form-group">
                  <div className="input-addon inner-addon right-addon">
                    <span className="fas fa-search"></span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..."
                      aria-label="Tìm kiếm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-start">
                  <button className="btn btn-primary btn-sm mt-2" type="submit">
                    Tìm kiếm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="content-wrapper mt-5">
        <div className="container">
          <div className="row mx-5">
            {loading ? (
              <p>Loading tests...</p>
            ) : tests.length > 0 ? (
              <TextBox tests={tests} />
            ) : (
              <p>No tests available.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestLibrary;
