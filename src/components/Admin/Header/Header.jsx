import { FaBars, FaSearch, FaBell, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import { FiBell, FiMail, FiActivity } from 'react-icons/fi';
import { IoIosSearch } from "react-icons/io";

const Header = ({ setCollapsed, collapsed }) => {
    return (
        <nav className="navbar top-nav shadow navbar-expand justify-content-between justify-content-sm-start navbar-light bg-white"
            style={{ flexWrap: 'nowrap', zIndex: "1039", height: '3.625rem', boxShadow: 'inset -4px 0px 6px -1px rgba(0, 0, 0, 0.1), 0 0.15rem 1.75rem 0 rgba(33, 40, 50, 0.15)' }}
        >
            <button onClick={() => { setCollapsed(!collapsed); }}
                className="btn btn-icon btn-transparent-dark order-1 order-lg-0 me-2 ms-lg-2 me-lg-0">
                <FaBars style={{ fontSize: '12px' }} />
            </button>
            <a className="navbar-brand pe-3 ps-4 ps-lg-2"
                style={{ width: '11rem', color: '#363d47', fontSize: '1rem', fontWeight: 'bold' }}
                href="index.html">
                SB Admin Pro
            </a>

            <form className="form-inline me-auto d-none d-lg-block me-3">
                <div className="input-group input-group-joined input-group-solid"
                    style={{
                        maxWidth: '400px',
                        width: '100%',
                        height: '2.75rem',
                        borderRadius: '0.4375rem',
                        backgroundColor: '#eef2f8',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out' // Đổi thành chuỗi cho thuộc tính transition
                    }}

                >
                    <input
                        className="form-control pe-0"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        style={{
                            borderRadius: '10px 0 0 10px',
                            backgroundColor: 'inherit',
                            border: '0px',
                            height: '100%',
                            flex: 1
                        }}
                    />
                    <div className="input-group-text"
                        style={{
                            backgroundColor: 'inherit',
                            border: 'none',
                            padding: '0 10px',
                            display: 'flex',
                            alignItems: 'center',
                            color: '#69707a'
                        }}
                    >
                        <IoIosSearch style={{ fontSize: '20px' }}></IoIosSearch>
                    </div>
                </div>
            </form>

            <ul className="navbar-nav align-items-center ms-auto me-4 d-flex gap-3">
                <li className="nav-item d-none d-md-block">
                    <a className="me-3 text-decoration-none text-muted" href="#">
                        Documentation <FaChevronRight style={{ fontSize: '10px' }} />
                    </a>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-icon btn-transparent-dark">
                        <FiBell style={{ fontSize: '14px' }} />
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-icon btn-transparent-dark">
                        <FiMail style={{ fontSize: '14px' }} />
                    </button>
                </li>
                <li className="nav-item">
                    <button className="custom-avatar-btn">
                        <img
                            src="https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png"
                            alt="User avatar"
                        />
                    </button>
                </li>
            </ul>

        </nav>
    );
}

export default Header;
