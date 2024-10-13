import "./TestLibrary.scss";
import "./TextBox/TestBox.scss";
import TextBox from "./TextBox/TestBox";
const TestLibrary = () => {
  return (
    <>
      <div className="site-content-wrapper">
        <div className="content-header pb-0 gray-bg">
          <div className="container pb-0 px-5">
            <div className="row custom-row">
              <div className="col-12 col-md-4 order-md-2 custom-col">
                <div className="user-target-user">
                  <div>
                    <span className="account-profile-img md">
                      <img src="../../../assets/images/user_icon.png" />
                    </span>
                  </div>
                  <div className="text-center">akhoa0805</div>
                  <div className="divider sm"></div>

                  <div className="user-target-info">
                    <div className="user-target-text-sm">
                      <b>TOEIC</b>
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
                              data-href="/targetscore/update/243272/?view=clean"
                            >
                              <span className="far fa-pen"></span>
                            </a>
                          </td>
                        </tr>
                        <tr className="user-target-text-sm">
                          <td>Tới kỳ thi:</td>
                          <td>
                            <span className="user-target-text-value">
                              0 ngày
                            </span>
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
                <div className="test-books nav-horizontal nav-horizontal-twolevels">
                  <a className="test-book active" href="?term=2024">
                    <span>2024</span>
                  </a>

                  <a className="test-book " href="?term=2023">
                    <span>2023</span>
                  </a>

                  <a className="test-book " href="?term=2022">
                    <span>2022</span>
                  </a>

                  <a className="test-book " href="?term=2021">
                    <span>2021</span>
                  </a>

                  <a className="test-book " href="?term=2020">
                    <span>2020</span>
                  </a>

                  <a className="test-book " href="?term=2019">
                    <span>2019</span>
                  </a>

                  <a className="test-book " href="?term=2018">
                    <span>2018</span>
                  </a>

                  <a className="test-book " href="?term=New economy">
                    <span>New economy</span>
                  </a>

                  <a className="test-book " href="?term=ETS (old format)">
                    <span>ETS (old format)</span>
                  </a>
                </div>
                <form className="form-find-test" method="GET">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <div className="input-addon inner-addon right-addon">
                          <span className="fas fa-search"></span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..."
                            aria-label="Tìm kiếm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-start">
                    <button
                      className="btn btn-primary btn-sm mt-2"
                      type="submit"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </form>

                <br />
              </div>
            </div>
          </div>
        </div>
        <div className="content-wrapper mt-5 ">
          <div className="container">
            <div className="row mx-5">
              <TextBox></TextBox>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestLibrary;
