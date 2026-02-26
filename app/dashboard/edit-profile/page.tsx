import EditProfile from "@/components/Dashboard/EditProfile";
import { checkAuthentication, getDashboardDetails } from "@/services/AuthService";
import { redirect } from "next/navigation";

async function EditProfilePage() {
    const user = await checkAuthentication("/dashboard/edit-profile");

    if (!user) {
        redirect("/login");
    }

    if (!user.emailVerified || !user.registrationComplete) {
        redirect("/dashboard");
    }

    const dashboardData = await getDashboardDetails(user.email);
    
    if (!dashboardData) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen ">
            <EditProfile 
                user={dashboardData} 
                onBack={async () => {
                    "use server";
                    redirect("/dashboard");
                }} 
            />
        </div>
    );
}

export default EditProfilePage;