import React from "react";
import PropTypes from "prop-types";
import loadable from "@loadable/component";
import { Switch, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Result } from 'antd';
import "./styles.scss";
import PrivateRoute from "./privateRoute";

const Home = loadable(() => import('../modules/home/components'));
// const PostProjectAdd = loadable(() => import('../modules/post/components/project/add'));
const PostSaleAdd = loadable(() => import('../modules/post/components/sale/add'));
const DetailPost = loadable(() => import('../modules/post/components/detail'));
const Profile = loadable(() => import('../modules/user/components/profile'));
const Password = loadable(() => import('../modules/user/components/password'));
const PostOfUser = loadable(() => import('../modules/user/components/postOfUser'));
const EditPost = loadable(() => import('../modules/post/components/edit'));
const Category = loadable(() => import('../modules/category/components'));
const ListPostByCategory = loadable(() => import('../modules/post/components/list'));
const ListPostSearch = loadable(() => import('../modules/post/components/search'));

const UserListManage = loadable(() => import('../modules/user/components/list-manage'));
const PostListManage = loadable(() => import('../modules/post/components/list-manage'));
const PostFollowed = loadable(() => import('../modules/user/components/postFollowed'));
const Recharge = loadable(() => import('../modules/payment/components/recharge'));
const Payment = loadable(() => import('../modules/payment/components/payment'));
const Fee = loadable(() => import('../modules/fee/components'));
const Dashboard = loadable(() => import('../modules/dashboard/components'));

// //Roles in routes
// // 1. guest, 2. user, 3. admin

export const routes = [
  {
    path: "/",
    exact: true,
    element: <Home />
  },
  // {
  //   path: "/post-project-add",
  //   exact: true,
  //   roles: [2, 3],
  //   element: ({ match }) => <PostProjectAdd match={match} />
  // },
  {
    path: "/post-sale-add",
    exact: true,
    roles: [2, 3],
    element: <PostSaleAdd />
  },
  {
    path: "/detail/:slug.:id.html",
    exact: true,
    element: <DetailPost />
  },
  {
    path: "/profile",
    exact: true,
    roles: [2, 3],
    element: <Profile />
  },
  {
    path: "/password",
    exact: true,
    roles: [2, 3],
    element: <Password />
  },
  {
    path: "/user-post",
    exact: true,
    roles: [2, 3],
    element: <PostOfUser />
  },
  {
    path: "/post-edit/:id",
    exact: true,
    roles: [2, 3],
    element: <EditPost />
  },
  {
    path: "/manage-category",
    exact: true,
    roles: [3],
    element: <Category />
  },
  {
    path: "/post-cat/:catId",
    exact: true,
    element: <ListPostByCategory />
  },
  {
    path: '/:slug/:slug',
    exact: true,
    element: <ListPostSearch />
  },
  {
    path: "/manage-user",
    exact: true,
    roles: [3],
    element: <UserListManage />
  },
  {
    path: "/manage-post",
    exact: true,
    roles: [3],
    element: <PostListManage />
  },
  {
    path: "/post-followed",
    exact: true,
    roles: [2, 3],
    element: <PostFollowed />
  },
  {
    path: "/recharge",
    exact: true,
    roles: [2, 3],
    element: <Recharge />
  },
  {
    path: "/payment",
    exact: true,
    roles: [2, 3],
    element: <Payment />
  },
  {
    path: "/manage-fee",
    exact: true,
    roles: [3],
    element: <Fee />
  },
  {
    path: "/dashboard",
    exact: true,
    element: <Dashboard />
  },
  {
    path: "*",
    component: class NotFound extends React.PureComponent {
      static propTypes = {
        staticContext: PropTypes.object
      };

      constructor(props, context) {
        super(props, context);

        if (this.props.staticContext) {
          this.props.staticContext.code = 404;
        }
      }

      render() {
        return (
          <Result
            status="404"
            title="Lỗi 404 | Trang không tồn tại!"
          />
        );
      }
    }
  }
];


export default () => (

  <Routes>

    {routes.map(
      ({ path, exact = false, roles = false, element }, index) => {
        if (roles) {
          return (
            <Route
              key={index}
              exact={exact}
              path={path}
              element={<PrivateRoute element={element} roles={roles} />}
            />
          );
        } else {

          return (
            <Route key={index} exact={exact} path={path} element={element} />
          );
        }
      }
    )}
  </Routes>
);
