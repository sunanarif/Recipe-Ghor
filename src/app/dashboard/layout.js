import DashboardSideBar from "@/Component/Dashboard/DashboardSideBar";

export default function RootLayout({ children }) {
    return (
        <div className="min-h-screen">
            <div className="flex flex-col lg:flex-row min-h-screen">

                <DashboardSideBar />

                <main className="flex-1 w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
                    {children}
                </main>

            </div>
        </div>
    );
}