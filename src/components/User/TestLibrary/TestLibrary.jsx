import { useEffect, useState } from "react";
import { getAllTests } from "../../../services/testsService"; // Adjust the path as needed
import "./TestLibrary.scss";
import "./TextBox/TestBox.scss";
import TextBox from "./TextBox/TestBox";

const TestLibrary = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getAllTests();
        if (data.EC === 0) {
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

      let filteredTests = data.DT;

      // Lọc theo tên gần giống
      if (searchTerm) {
        filteredTests = filteredTests.filter((test) =>
          test.Name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Lọc theo độ khó nếu được chọn
      if (difficulty) {
        filteredTests = filteredTests.filter(
          (test) => test.Difficulty === difficulty
        );
      }

      setTests(filteredTests);
    } catch (error) {
      console.error("Error searching tests:", error);
    }
  };

  return (
    <div className="site-content-wrapper">
      <header className="content-header pb-0">
        <div className="container pb-0 px-5">
          <div className="row custom-row">
            <div className="col-12 col-md-12 order-md-1 custom-col">
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
                <div className="form-group cbb-difficulty">
                  <select
                    className="form-control mt-2"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="">Chọn độ khó</option>
                    <option value="Easy">Dễ</option>
                    <option value="Medium">Trung bình</option>
                    <option value="Hard">Khó</option>
                  </select>
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
