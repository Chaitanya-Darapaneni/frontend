import { Dialog, DialogContent } from "@material-ui/core";
import Label from "egov-ui-kit/utils/translationNode";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import store from "ui-redux/store";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";
import CloseIcon from "@material-ui/icons/Close";

import "./index.css";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
import { fetchProperties } from "egov-ui-kit/redux/properties/actions";
import MenuItem from '@material-ui/core/MenuItem';
import SelectField from "material-ui/SelectField";
import formHoc from "egov-ui-kit/hocs/form";
import InputLabel from '@material-ui/core/InputLabel';

const fieldConfig = {
  comments: {
      label: {
        labelName: "Approval/Rejection Note",
        labelKey: "BPA_APPROVAL_REJECTION_NOTE_LABEL"
      },
      placeholder: {
        labelName: "Approval/Rejection Note Placeholder",
        labelKey: "BPA_APPROVAL_REJECTION_NOTE_PLACEHOLDER"
      }
    }
  };
  
class TextAreaDialog extends Component {
  state = {
    comments : ''
  }

  saveDetails = async() => {
    dispatch(prepareFinalObject("BPA.errorMEssageComment", this.state.comments));
    dispatch(
      handleField("search-preview", "components.commentsPopup", "props.open", false)
   );
  }

  componentDidMount = () => {
  };

  closeDialog = () => {
    dispatch(
      handleField("search-preview", "components.commentsPopup", "props.open", false)
   );
  }

  setComments = (e) => {
    debugger
    this.setState({
      comments:e.target.value
    })
  }

  render() {
    let { open, closeDialogue, owners, history, payload } = this.props;
   
    return (
      <Dialog
      fullScreen={false}
      open={open}
      onClose={closeDialogue}
      maxWidth={false}
    >
      <DialogContent
        children={
          <Container
            children={
              <Grid
                container="true"
                spacing={12}
                marginTop={16}
                className="action-container">
                <Grid
                  style={{
                    alignItems: "center",
                    display: "flex"
                  }}
                  item
                  sm={10}>
                  <Typography component="h2" variant="subheading">
                    <LabelContainer labelName="Approval/Rejection Note"
                    labelKey="BPA_APPROVAL_REJECTION_NOTE" />
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
                  onClick={closeDialogue}
                >
                  <CloseIcon />
                </Grid>
                  <Grid
                    item
                    sm="12"
                    style={{
                      marginTop: 12
                    }}>
                      <textarea refs="comments" className="form-control comments" rows="5" 
                      placeholder={fieldConfig.comments.placeholder.labelKey}
                      value= {this.state.comments}
                      onChange = {this.setComments}
                      label={fieldConfig.comments.label.labelKey}
                      />
                    {/* <TextFieldContainer
                        InputLabelProps={{ shrink: true }}
                        label={fieldConfig.comments.label}
                        required

                        // error={error}
                        // helperText={errorMessage}
                        // onChange={e =>
                        //     handleFieldChange(`BPA.errorMEssageComment`, e.target.value)
                        // }
                        jsonPath={'BPA.errorMEssageComment'}
                        placeholder={fieldConfig.comments.placeholder}
                   /> */}
                  </Grid>
                <Grid item sm="12"
                 style={{
                  marginTop: 0
                }}>
                  <Grid sm={12} style={{ textAlign: "right" }} className="bottom-button-container">
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      style={{
                        minWidth: "200px",
                        height: "48px"
                      }}
                      className="bottom-button"
                      onClick={this.saveDetails}
                    >
                      <LabelContainer
                        labelName={"BPA_SAVE"}
                        labelKey=
                          {"BPA_SAVE"}     
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
    ) 
  }
}

const mapStateToProps = (state) => {
  const { form } = state;
  return { form };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProperties: (queryObjectProperty) => dispatch(fetchProperties(queryObjectProperty)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TextAreaDialog);
