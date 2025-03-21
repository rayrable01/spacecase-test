import { useSelector } from "react-redux";
import { AuthorizationPage } from "../Pages/AuthorizationPage/AuthorizationPage";
import { MainPage } from "../Pages/MainPage/MainPage";

export const Account = () => {
    const tokenKey = useSelector(state => state.token);

    console.log(`Token: ${(tokenKey) ? tokenKey : `Отсутствует`}`) 
    

    if (!tokenKey) {
        return (
            <AuthorizationPage />
        )
    }

    return (
        <MainPage />
    )
}