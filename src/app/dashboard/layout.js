import DashboardSideBar from "@/Component/Dashboard/DashboardSideBar";


export default function RootLayout({ children }) {
    return (
        <div>
           

            <div className="flex">

            <div className="">
                <DashboardSideBar></DashboardSideBar>
            </div>
            <main className="h-screen">
                children
                {children}
            </main> 
            </div>

        </div>
    );
}
