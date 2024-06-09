import { COLOR } from "@/styles/color";
import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
    token: {
        fontFamily: "Lato",
        colorPrimary: COLOR.primaryBlueColor,
        colorPrimaryHover: COLOR.primaryBlueColor,
    },
    components: {
        Input: {
            colorBorder: COLOR.primaryGreyColor2
            
        }
    }
}