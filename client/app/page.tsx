"use client";

import { NextPage } from "next";
import Dashboard from "../src/views/Dashboard";
import withAuth from "../auth/withAuth";

const DashboardPage: NextPage = () => {
	return <Dashboard />;
};

export default withAuth(DashboardPage);
