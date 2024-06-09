import { COLORFILTER } from "@/styles/color";

export function ChangeColorIndicatorToFilter(val: any) {
    if(val == "orangeColorIndicator") {
        return COLORFILTER.orangeColorIndicator;
    };
    if(val == "primaryBlueColor") {
        return COLORFILTER.primaryBlueColor;
    };
};
