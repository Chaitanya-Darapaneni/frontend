import {
    getCommonGrayCard,
    getCommonSubHeader,
    getCommonContainer,
    getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { serviceConst } from "../../../../../ui-utils/commons";

const service = getQueryArg(window.location.href, "service")

const getHeader = label => {
    return {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-wns",
        componentPath: "DividerWithLabel",
        props: {
            className: "hr-generic-divider-label",
            labelProps: {},
            dividerProps: {},
            label
        },
        type: "array"
    };
};

export const connectionDetailsHeader = getHeader({
    labelKey: "WS_COMMON_CONNECTION_DETAILS"
});

// export const taskApplicationType = getLabelWithValue(
//     {
//         labelKey: "WS_APPLY_FOR"
//     },
//     {
//         jsonPath: "WaterConnection[0].service",
//     })

// export const taskNumberOfTapsPropsed = getLabelWithValue(
//     {
//         labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_TAPS_PROPOSED"
//     },
//     {
//         jsonPath: "WaterConnection[0].proposedTaps",
//     })
// export const taskPipeSizeProposed = getLabelWithValue(
//     {
//         labelKey: "WS_TASK_DETAILS_CONN_DETAIL_PIPE_SIZE_PROPOSED"
//     },
//     { jsonPath: "WaterConnection[0].proposedPipeSize" })

// export const taskNoOfClosets = getLabelWithValue(
//     {
//         labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_CLOSETS_PROPOSED"
//     },
//     { jsonPath: "WaterConnection[0].proposedWaterClosets" }
// );

// export const taskNoOfToilets = getLabelWithValue(
//     {
//         labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_TOILETS_PROPOSED"
//     },
//     { jsonPath: "WaterConnection[0].proposedToilets" }
// );


export const getConnectionDetails = () => {
    return ({
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
            className: "common-div-css search-preview",
            scheama: getCommonGrayCard({
                div4: connectionDetailsHeader,
                serviceCardContainer: renderService()
            }),
            items: [],
            hasAddItem: false,
            isReviewPage: true,
            sourceJsonPath: "WaterConnection[0]",
            prefixSourceJsonPath:
                "children.cardContent.children.getConnectionContainer.children",
            afterPrefixJsonPath: "children.value.children.key"
        },
        type: "array"
    });
}

 export const connectionDetailsWater={
    taskApplicationType : getLabelWithValue(
        {
            labelName:"Apply For",
            labelKey: "WS_APPLY_FOR"
        },
        {
            jsonPath: "WaterConnection[0].service",
        }),
    
     taskNumberOfTapsPropsed : getLabelWithValue(
        {
            labelName:"No of Taps Proposed",
            labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_TAPS_PROPOSED"
        },
        {
            jsonPath: "WaterConnection[0].proposedTaps",
        }),
     taskPipeSizeProposed : getLabelWithValue(
        {
            labelName:"No of pipe size proposed",
            labelKey: "WS_TASK_DETAILS_CONN_DETAIL_PIPE_SIZE_PROPOSED"
        },
        { jsonPath: "WaterConnection[0].proposedPipeSize" })

}
 export const connectionDetailsSewerage={
    taskApplicationType : getLabelWithValue(
        {
            labelName:"Apply For",
            labelKey: "WS_APPLY_FOR"
        },
        {
            jsonPath: "WaterConnection[0].service",
        }),
    taskNoOfClosets : getLabelWithValue(
        {
            labelName:"No of closets proposed",
            labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_CLOSETS_PROPOSED"
        },
        { jsonPath: "WaterConnection[0].proposedWaterClosets" }
    ),
     taskNoOfToilets : getLabelWithValue(
        {
            labelName:"No of toilets proposed",
            labelKey: "WS_TASK_DETAILS_CONN_DETAIL_NO_OF_TOILETS_PROPOSED"
        },
        { jsonPath: "WaterConnection[0].proposedToilets" }
    )

}

export const connectionDetails=(service === serviceConst.WATER)?connectionDetailsWater:connectionDetailsSewerage;

export const renderService = () => {
    return getCommonContainer(connectionDetails)
}