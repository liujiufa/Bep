import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageLoding from "../components/PageLoding";
import MainLayout from "../Layout/MainLayout";
import DeputyLayout from "../Layout/DeputyLayout";

const Invite = React.lazy(() => import("../view/Invite"));
const Home = React.lazy(() => import("../view/Home"));
const Account = React.lazy(() => import("../view/Account"));
const IDO = React.lazy(() => import("../view/IDO"));

export default function Router() {
  return (
    <Suspense fallback={<PageLoding></PageLoding>}>
      <Routes>
        {/* <Route path="/*" element={<MainLayout />}> */}
        <Route path="/*">
          <Route path=":address/">
            <Route index element={<Invite />}></Route>
            <Route path="IDO" element={<IDO />}></Route>
          </Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="" element={<Home />}></Route>
        </Route>
        <Route path="/DeputyLayout" element={<DeputyLayout />}></Route>
      </Routes>
    </Suspense>
  );
}
