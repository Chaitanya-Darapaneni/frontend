import React from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";
import { Dialog, DialogContent } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";
import { UploadMultipleFiles } from "egov-ui-framework/ui-molecules";
import { toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import "./index.css";
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons";
import { get } from "lodash";

const styles = theme => ({
  root: {
    marginTop: 24,
    width: "100%"
  }
});

const fieldConfig = {
  approverName: {
    label: {
      labelName: "Assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_LABEL"
    },
    placeholder: {
      labelName: "Select assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_PLACEHOLDER"
    }
  },
  comments: {
    label: {
      labelName: "Comments",
      labelKey: "WF_COMMON_COMMENTS"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "WF_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    }
  },
  assessmentFee: {
    label: {
      labelName: "Assessment Fee",
      labelKey: "WF_ASSESSMENT_FEE"
    },
    placeholder: {
      labelName: "Enter Assessment Fee",
      labelKey: "WF_ASSESSMENT_FEE_PLACEHOLDER"
    }
  }
};

let pt_payment_config = [
  {
    label: {
      labelName: "Assessment Fee",
      labelKey: "PT_ASSESSMENT_FEE"
    },
    placeholder: {
      labelName: "Enter Assessment Fee",
      labelKey: "PT_ASSESSMENT_FEE_PLACEHOLDER"
    },
    path: "assessmentAmount",
    errorMessage: "PT_ERR_ASSESSMENT_CHARGES",
    showError: false,
    required: false,
    filter: "PT.ASSESSMENT"
  },
  {
    label: {
      labelName: "Usage Exemption Amount",
      labelKey: "PT_USAGE_EXEMPTION_AMOUNT"
    },
    placeholder: {
      labelName: "Enter Usage Exemption Amount",
      labelKey: "PT_USAGE_EXEMPTION_AMOUNT_PLACEHOLDER"
    },
    path: "usageExemptionAmount",
    errorMessage: "PT_ERR_USAGE_EXEMPTION_AMOUNT",
    showError: false,
    required: false,
    filter: "PT.ASSESSMENT"
  },
  {
    label: {
      labelName: "Owner Exemption Amount",
      labelKey: "PT_OWNER_EXEMPTION_AMOUNT"
    },
    placeholder: {
      labelName: "Enter Owner Exemption Amount",
      labelKey: "PT_OWNER_EXEMPTION_AMOUNT_PLACEHOLDER"
    },
    path: "ownerExemptionAmount",
    errorMessage: "PT_ERR_OWNER_EXEMPTION_AMOUNT",
    showError: false,
    required: false,
    filter: "PT.ASSESSMENT"
  },
  {
    label: {
      labelName: "Fire Cess Amount",
      labelKey: "PT_FIRE_CESS_AMOUNT"
    },
    placeholder: {
      labelName: "Enter Fire Cess Amount",
      labelKey: "PT_FIRE_CESS_AMOUNT_PLACEHOLDER"
    },
    path: "fireCessAmount",
    errorMessage: "PT_ERR_FIRE_CESS_AMOUNT",
    showError: false,
    required: false,
    filter: "PT.ASSESSMENT"
  },
  {
    label: {
      labelName: "Cancer Cess Amount",
      labelKey: "PT_CANCER_CESS_AMOUNT"
    },
    placeholder: {
      labelName: "Enter Cancer Cess Amount",
      labelKey: "PT_CANCER_CESS_AMOUNT_PLACEHOLDER"
    },
    path: "cancerCessAmount",
    errorMessage: "PT_ERR_CANCER_CESS_AMOUNT",
    showError: false,
    required: false,
    filter: "PT.ASSESSMENT"
  },
  {
    label: {
      labelName: "Adhoc Penalty Amount",
      labelKey: "PT_ADHOC_PENALTY_AMOUNT"
    },
    placeholder: {
      labelName: "Enter Adhoc Penalty Amount",
      labelKey: "PT_ADHOC_PENALTY_AMOUNT_PLACEHOLDER"
    },
    path: "adhocPenaltyAmount",
    errorMessage: "PT_ERR_ADHOC_PENALTY_AMOUNT",
    showError: false,
    required: false,
    filter: "PT.ASSESSMENT"
  },
  {
    label: {
      labelName: "Adhoc Rebate Amount",
      labelKey: "PT_ADHOC_REBATE_AMOUNT"
    },
    placeholder: {
      labelName: "Enter Adhoc Rebate Amount",
      labelKey: "PT_ADHOC_REBATE_AMOUNT_PLACEHOLDER"
    },
    path: "adhocRebateAmount",
    errorMessage: "PT_ERR_ADHOC_REBATE_AMOUNT",
    showError: false,
    required: false,
    filter: "PT.ASSESSMENT"
  },
  {
    label: {
      labelName: "Holding Tax",
      labelKey: "PT_HOLDING_TAX"
    },
    placeholder: {
      labelName: "Enter Holding Tax",
      labelKey: "PT_HOLDING_TAX_PLACEHOLDER"
    },
    path: "holdingTax",
    errorMessage: "PT_ERR_HOLDING_TAX",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Light Tax",
      labelKey: "PT_LIGHT_TAX"
    },
    placeholder: {
      labelName: "Enter Light Tax",
      labelKey: "PT_LIGHT_TAX_PLACEHOLDER"
    },
    path: "lightTax",
    errorMessage: "PT_ERR_LIGHT_TAX",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Water Tax",
      labelKey: "PT_WATER_TAX"
    },
    placeholder: {
      labelName: "Enter Water Tax",
      labelKey: "PT_WATER_TAX_PLACEHOLDER"
    },
    path: "waterTax",
    errorMessage: "PT_ERR_WATER_TAX",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Drainage Tax",
      labelKey: "PT_DRAINAGE_TAX"
    },
    placeholder: {
      labelName: "Enter Drainage Tax",
      labelKey: "PT_DRAINAGE_TAX_PLACEHOLDER"
    },
    path: "drainageTax",
    errorMessage: "PT_ERR_DRINAGE_TAX",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Latrine Tax",
      labelKey: "PT_LATRINE_TAX"
    },
    placeholder: {
      labelName: "Enter Latrine Tax",
      labelKey: "PT_LATRINE_TAX_PLACEHOLDER"
    },
    path: "latrineTax",
    errorMessage: "PT_ERR_LATRINE_TAX",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Parking Tax",
      labelKey: "PT_PARKING_TAX"
    },
    placeholder: {
      labelName: "Enter Parking Tax",
      labelKey: "PT_PARKING_TAX_PLACEHOLDER"
    },
    path: "parkingTax",
    errorMessage: "PT_ERR_PARKING_TAX",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Solid Waste User Charges",
      labelKey: "PT_SOLID_WASTER_USER_CHARGES"
    },
    placeholder: {
      labelName: "Enter Solid Waste User Charges",
      labelKey: "PT_SOLID_WASTER_USER_CHARGES_PLACEHOLDER"
    },
    path: "solidWasteUserCharges",
    errorMessage: "PT_ERR_SOLID_WASTER_USER_CHARGES",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Ownership Exemption",
      labelKey: "PT_OWNERSHIP_EXEMPTION"
    },
    placeholder: {
      labelName: "Enter Ownership Exemption",
      labelKey: "PT_OWNERSHIP_EXEMPTION_PLACEHOLDER"
    },
    path: "ownershipExemption",
    errorMessage: "PT_ERR_OWNERSHIP_EXEMPTION",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Usage Exemption",
      labelKey: "PT_USAGE_EXEMPTION"
    },
    placeholder: {
      labelName: "Enter Usage Exemption",
      labelKey: "PT_USAGE_EXEMPTION_PLACEHOLDER"
    },
    path: "usageExemption",
    errorMessage: "PT_ERR_USAGE_EXEMPTION",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Interest",
      labelKey: "PT_INTEREST"
    },
    placeholder: {
      labelName: "Enter Interest",
      labelKey: "PT_INTEREST_PLACEHOLDER"
    },
    path: "interest",
    errorMessage: "PT_ERR_INTEREST",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Penalty",
      labelKey: "PT_PENALTY"
    },
    placeholder: {
      labelName: "Enter Interest",
      labelKey: "PT_PENALTY_PLACEHOLDER"
    },
    path: "penalty",
    errorMessage: "PT_ERR_PENALTY",
    showError: false,
    required: false,
    filter: "PT.CREATE"
  },
  {
    label: {
      labelName: "Mutation Charge",
      labelKey: "PT_MUTATION_CHARGE"
    },
    placeholder: {
      labelName: "Enter Mutation Charge",
      labelKey: "PT_MUTATION_CHARGE_PLACEHOLDER"
    },
    path: "mutationCharge",
    errorMessage: "PT_ERR_MUTATION_CHARGE",
    showError: false,
    required: false,
    filter: "PT.MUTATION"
  }
]

class ActionDialog extends React.Component {
  state = {
    employeeList: [],
    roles: "",
    paymentErr: false
  };

  // onEmployeeClick = e => {
  //   const { handleFieldChange, toggleSnackbar } = this.props;
  //   const selectedValue = e.target.value;
  //   const currentUser = JSON.parse(getUserInfo()).uuid;
  //   if (selectedValue === currentUser) {
  //     toggleSnackbar(
  //       true,
  //       "Please mark to different Employee !",
  //       "error"
  //     );
  //   } else {
  //     handleFieldChange("Licenses[0].assignee", e.target.value);
  //   }
  // };

  getButtonLabelName = label => {
    switch (label) {
      case "FORWARD":
        return "Verify and Forward";
      case "MARK":
        return "Mark";
      case "REJECT":
        return "Reject";
      case "CANCEL":
      case "APPROVE":
        return "APPROVE";
      case "PAY":
        return "Pay";
      case "SENDBACK":
        return "Send Back";
      default:
        return label;
    }
  };

  assementForward = (buttonLabel, isDocRequired) => {
    let {dataPath, state, dialogData} = this.props;
    const {moduleName} = dialogData
    let data = get(state.screenConfiguration.preparedFinalObject, dataPath)
    pt_payment_config = pt_payment_config.map((payment) => {
      if(!data[payment.path]) {
        data[payment.path] = "0"
      }
      return {
      ...payment,
      isError: payment.filter === moduleName ? payment.required
        ? !data[payment.path]
        : !!data[payment.path]
        ? isNaN(data[payment.path])
        : false : false
      }
    });
    handleFieldChange(dataPath, data);
    const isError = pt_payment_config.some(payment => !!payment.isError)
    if(isError) {
      this.setState({
        paymentErr: true
      })
      return
    }
    this.props.onButtonClick(buttonLabel, isDocRequired)
  }

  render() {
        
    let {
      open,
      onClose,
      dropDownData,
      handleFieldChange,
      onButtonClick,
      dialogData,
      dataPath
    } = this.props;
    const {
      buttonLabel,
      showEmployeeList,
      dialogHeader,
      moduleName,
      isDocRequired
    } = dialogData;
    const { getButtonLabelName } = this;
    let fullscreen = false;
    const showAssignee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
    if (window.innerWidth <= 768) {
      fullscreen = true;
    }
    if (dataPath === "FireNOCs") {
      dataPath = `${dataPath}[0].fireNOCDetails.additionalDetail`
    } else if(dataPath === "Assessment") {
      dataPath = dataPath
    }
     else if (dataPath === "Property" || dataPath === "BPA" || dataPath === "Noc") {
      dataPath = `${dataPath}.workflow`;
    } else {
      dataPath = `${dataPath}[0]`;
    }
    let assigneePath= '';
    /* The path for Assignee in Property and Assessment has latest workflow contract and it is Array of user object  */
    if (dataPath.includes("Property")){
      assigneePath=`${dataPath}.assignes[0].uuid`;
    }else{
      assigneePath=`${dataPath}.assignee[0]`;
    }

    let wfDocumentsPath;
    if(dataPath === "BPA.workflow") {
      wfDocumentsPath = `${dataPath}.varificationDocuments`
    } else if (dataPath === "Noc.workflow") {
      wfDocumentsPath = `${dataPath}.documents`
    } else {
      wfDocumentsPath = `${dataPath}.wfDocuments`
    }

    const rolearray =
        getUserInfo() &&
        JSON.parse(getUserInfo()).roles.filter(item => {
          if (item.code == "PT_FIELD_INSPECTOR")
            return true;
        });
    
    const rolecheck = rolearray.length > 0 ? true : false;
    const showPaymentCheck = (this.props.dataPath === "Assessment" || this.props.dataPath === "Property") && !!rolecheck && buttonLabel === "FORWARD"
    // const paymentFields = pt_payment_config.filter(item => item.filter === moduleName)
    return (
      <Dialog
        fullScreen={fullscreen}
        open={open}
        onClose={onClose}
        maxWidth={false}
        style={{zIndex:2000}}
      >
        <DialogContent
          children={
            <Container
              children={
                <Grid
                  container="true"
                  spacing={12}
                  marginTop={16}
                  className="action-container"
                >
                  <Grid
                    style={{
                      alignItems: "center",
                      display: "flex"
                    }}
                    item
                    sm={10}
                  >
                    <Typography component="h2" variant="subheading">
                      <LabelContainer {...dialogHeader} />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sm={2}
                    style={{
                      textAlign: "right",
                      cursor: "pointer",
                      position: "absolute",
                      right: "16px",
                      top: "16px"
                    }}
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </Grid>
                  {showEmployeeList && showAssignee &&  (
                    <Grid
                      item
                      sm="12"
                      style={{
                        marginTop: 16
                      }}
                    >
                      <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px" }}
                        label={fieldConfig.approverName.label}
                        placeholder={fieldConfig.approverName.placeholder}
                        data={dropDownData}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>
                          handleFieldChange(
                            assigneePath,
                            e.target.value
                          )
                        }
                        jsonPath={assigneePath}
                      />
                    </Grid>
                  )}
                  {!!showPaymentCheck && pt_payment_config.map((payment, ind) => {
                    return payment.filter === moduleName ? (
                    <Grid payment sm="12">
                    <TextFieldContainer
                    InputLabelProps={{ shrink: true }}
                    label= {payment.label}
                    onChange={e =>{
                      handleFieldChange(`${this.props.dataPath}.additionalDetails.${payment.path}`, e.target.value)
                      pt_payment_config[ind].isError = false
                    }}
                    required = {true}
                    jsonPath={`${this.props.dataPath}.additionalDetails.${payment.path}`}
                    placeholder={payment.placeholder}
                    inputProps={{ maxLength: 120 }}
                    /> 
                    {!!payment.isError && (<span style={{color: "red"}}>{getLocaleLabels(payment.errorMessage, payment.errorMessage)}</span>)}
                    </Grid>
                  ) : null})}
                  <Grid item sm="12">
                    <TextFieldContainer
                      InputLabelProps={{ shrink: true }}
                      label={fieldConfig.comments.label}
                      onChange={e =>
                        handleFieldChange(`${dataPath}.comment`, e.target.value)
                      }
                      jsonPath={`${dataPath}.comment`}
                      placeholder={fieldConfig.comments.placeholder}
                    />
                  </Grid>
                  <Grid item sm="12">
                    <Typography
                      component="h3"
                      variant="subheading"
                      style={{
                        color: "rgba(0, 0, 0, 0.8700000047683716)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px",
                        marginBottom: "8px"
                      }}
                    >
                      <div className="rainmaker-displayInline">
                        <LabelContainer
                          labelName="Supporting Documents"
                          labelKey="WF_APPROVAL_UPLOAD_HEAD"
                        />
                        {isDocRequired && (
                          <span style={{ marginLeft: 5, color: "red" }}>*</span>
                        )}
                      </div>
                    </Typography>
                    <div
                      style={{
                        color: "rgba(0, 0, 0, 0.60)",
                        fontFamily: "Roboto",
                        fontSize: "14px",
                        fontWeight: 400,
                        lineHeight: "20px"
                      }}
                    >
                      <LabelContainer
                        labelName="Only .jpg and .pdf files. 5MB max file size."
                        labelKey="WF_APPROVAL_UPLOAD_SUBHEAD"
                      />
                    </div>
                    <UploadMultipleFiles
                      maxFiles={4}
                      inputProps={{
                        accept: "image/*, .pdf, .png, .jpeg"
                      }}
                      buttonLabel={{ labelName: "UPLOAD FILES",labelKey : "TL_UPLOAD_FILES_BUTTON" }}
                      jsonPath={wfDocumentsPath}
                      maxFileSize={5000}
                    />
                    <Grid sm={12} style={{ textAlign: "right" }} className="bottom-button-container">
                      <Button
                        variant={"contained"}
                        color={"primary"}
                        style={{
                          minWidth: "200px",
                          height: "48px"
                        }}
                        className="bottom-button"
                        onClick={!!showPaymentCheck ? () => this.assementForward(buttonLabel, isDocRequired) : () =>
                          onButtonClick(buttonLabel, isDocRequired)
                        }
                      >
                        <LabelContainer
                          labelName={getButtonLabelName(buttonLabel)}
                          labelKey={
                            moduleName
                              ? `WF_${moduleName.toUpperCase()}_${buttonLabel}`
                              : ""
                          }
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              }
            />
          }
        />
      </Dialog>
    );
  }
}
export default withStyles(styles)(ActionDialog);
