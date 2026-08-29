import ManageUserTable from "@/Component/UI/ManageUserTable";
import { userInfo } from "@/lib/api/userInfo";


const MangageUserPage = async() => {
    const usersData = await userInfo()
    // console.log(userData);
    return (
        <div>
            <ManageUserTable usersData={usersData}></ManageUserTable>
        </div>
    );
};

export default MangageUserPage;