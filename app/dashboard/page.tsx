import CompleteRegistration from "@/components/Dashboard/CompleteRegistration";
import Dashboard from "@/components/Dashboard/Dashboard";
import VerifyEmail from "@/components/Dashboard/VerifyEmail";
import { checkAuthentication, getDashboardDetails, getUserByEmail } from "@/services/AuthService";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";

async function Page() {
    const user = await checkAuthentication("/dashboard");

    if (!user) {
        redirect("/login");
    }

    if (!user.emailVerified)
        return (
            <SessionProvider>
                <VerifyEmail user={user} />
            </SessionProvider>
        );
    if (!user.registrationComplete)
        return <CompleteRegistration id={user.id} />;

    const basicUser = await getUserByEmail(user.email);
    if(!basicUser) redirect("/login");

    const dashboardData = await getDashboardDetails(user.email);
    // console.log("Dashboard data is:", dashboardData);
    if (!dashboardData) redirect("/login");

    return <Dashboard user={dashboardData} />;
}

export default Page;
