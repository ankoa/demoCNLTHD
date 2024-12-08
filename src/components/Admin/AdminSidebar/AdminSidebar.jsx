import React from "react";
import { FiActivity, FiGlobe, FiLayout, FiPackage } from "react-icons/fi";
import { AiOutlineAppstore } from "react-icons/ai";
import { IoRepeat } from "react-icons/io5";
import { LuBarChart, LuWrench } from "react-icons/lu";
import { CiFilter } from "react-icons/ci";

import {
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  ProSidebar,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import "./AdminSidebar.scss";
import { Link, Navigate, useNavigate } from "react-router-dom";

const AdminSidebar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
      width="15rem"
      collapsedWidth={"0px"}
    >
      {/* <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer'
                    }}

                    onClick={() => navigate("/")}
                >
                    sidebarTitle
                </div>
            </SidebarHeader> */}

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem>ACCOUNT</MenuItem>
          <SubMenu
            title="Users"
            icon={<FiActivity />}
            onClick={() => navigate("/admin/user")}
          >
          </SubMenu>
        </Menu>
        <Menu iconShape="circle">
          <MenuItem>EXAM</MenuItem>
          <SubMenu
            title="Tests"
            icon={<AiOutlineAppstore />}
            onClick={() => navigate("/admin/test")}
          ></SubMenu>
          <SubMenu title="Parts" icon={<FiGlobe />} onClick={() => navigate("/admin/part")}>
          </SubMenu>
          <SubMenu title="QAs" icon={<IoRepeat />} onClick={() => navigate("/admin/question")}>
          </SubMenu>
        </Menu>
        <Menu iconShape="course">
          <MenuItem suffix={<span className="badge red">New</span>}>
            COURSE
          </MenuItem>
          <SubMenu
            title="Courses"
            icon={<FiActivity />}
            onClick={() => navigate("/admin/manage-course")}
          />
            {/* <SubMenu
              title="Courses Details"
              icon={<FiActivity />}
              onClick={() => navigate("/admin/manage-courseDetails")}
            /> */}
          <SubMenu
            title="Courses Existing"
            icon={<FiActivity />}
            onClick={() => navigate("/admin/manage-courseExisting")}
          />
        </Menu>
        <Menu iconShape="course">
          <MenuItem suffix={<span className="badge red">New</span>}>
            LESSON
          </MenuItem>
          <SubMenu
            title="Lesson"
            icon={<FiActivity />}
            onClick={() => navigate("/admin/manage-lesson")}
          />
          {/* <SubMenu
            title="Lesson Details"
            icon={<FiActivity />}
            onClick={() => navigate("/admin/manage-lessonDetail")}
          /> */}
        </Menu>
        <Menu iconShape="circle">
          <MenuItem>UI TOOLKIT</MenuItem>
          <SubMenu title="Layout" icon={<FiLayout />}>
            <SubMenu title="Navigation">
              <MenuItem>
                Static Sidenav <Link to="/admin/manage-user" />
              </MenuItem>
              <MenuItem>
                Dark Sidenav <Link to="/admin/manage-quiz" />
              </MenuItem>
              <MenuItem>
                RTL Layout <Link to="/admin/manage-question" />
              </MenuItem>
            </SubMenu>
            <SubMenu title="Container Options">
              <MenuItem>
                Boxed Layout <Link to="/admin/manage-user" />
              </MenuItem>
              <MenuItem>
                Fluid Layout <Link to="/admin/manage-quiz" />
              </MenuItem>
            </SubMenu>
            <SubMenu title="Page Headers">
              <MenuItem>
                Simplified <Link to="/admin/manage-user" />
              </MenuItem>
              <MenuItem>
                Compact <Link to="/admin/manage-quiz" />
              </MenuItem>
              <MenuItem>
                Content Overlap <Link to="/admin/manage-question" />
              </MenuItem>
              <MenuItem>
                Breadcrumbs <Link to="/admin/manage-question" />
              </MenuItem>
              <MenuItem>
                light <Link to="/admin/manage-question" />
              </MenuItem>
            </SubMenu>
            <SubMenu title="Starter Layouts">
              <MenuItem>
                Default <Link to="/admin/manage-user" />
              </MenuItem>
              <MenuItem>
                Minimal <Link to="/admin/manage-quiz" />
              </MenuItem>
            </SubMenu>
          </SubMenu>
          <SubMenu title="Components" icon={<FiPackage />}>
            <MenuItem>
              Alerts <Link to="/admin/manage-user" />
            </MenuItem>
            <MenuItem>
              Avatars <Link to="/admin/manage-quiz" />
            </MenuItem>
            <MenuItem>
              Badges <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Buttons <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Cards <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Dropdowns <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Forms <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Modals <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Navigation <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Progress <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Timeline <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Toasts <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Tooltips <Link to="/admin/manage-question" />
            </MenuItem>
          </SubMenu>
          <SubMenu title="Utilities" icon={<LuWrench />}>
            <MenuItem>
              Animations <Link to="/admin/manage-user" />
            </MenuItem>
            <MenuItem>
              Background <Link to="/admin/manage-quiz" />
            </MenuItem>
            <MenuItem>
              Borders <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Lift <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Shadows <Link to="/admin/manage-question" />
            </MenuItem>
            <MenuItem>
              Typography <Link to="/admin/manage-question" />
            </MenuItem>
          </SubMenu>
        </Menu>

        <Menu iconShape="circle">
          <MenuItem suffix={<span className="badge red">New</span>}>
            PLUGINS
          </MenuItem>
          <SubMenu title="Charts" icon={<LuBarChart />}>
            <MenuItem>
              Score Chart <Link to="/admin/scorechart" />
            </MenuItem>
            <MenuItem>
              Revenue Chart <Link to="/admin/revenuechart" />
            </MenuItem>
          </SubMenu>
          <SubMenu title="Tables" icon={<CiFilter />}></SubMenu>
        </Menu>
        {/* <Menu iconShape="circle">
                    <SubMenu
                        suffix={<span className="badge yellow">3</span>}
                        icon={<FaRegLaughWink />}
                    >
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                    </SubMenu>
                    <SubMenu
                        prefix={<span className="badge gray">3</span>}
                        icon={<FaHeart />}
                    >
                        <MenuItem>1</MenuItem>
                        <MenuItem>2</MenuItem>
                        <MenuItem>3</MenuItem>
                    </SubMenu>
                </Menu> */}
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}>
        <div
          className="sidebar-footer-container d-flex"
          style={{
            backgroundColor: "rgba(33, 40, 50, 0.05)",
          }}
        >
          <div className="sidebar-footer-content">
            <div className="sidebar-footer-subtitle">Logged in as:</div>
            <div className="sidebar-login-name">Valerie Luna</div>
          </div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default AdminSidebar;
