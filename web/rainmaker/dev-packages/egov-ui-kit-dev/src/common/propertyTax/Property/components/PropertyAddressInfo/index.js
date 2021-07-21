import React from "react";
import { initLocalizationLabels } from "egov-ui-kit/redux/app/utils";
import { getTranslatedLabel } from "egov-ui-kit/utils/commons";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import PropertyInfoCard from "../PropertyInfoCard";

const locale = getLocale() || "en_IN";
const localizationLabelsData = initLocalizationLabels(locale);



export const getAddressItems = (properties, OldProperty) => {
  let oldTenantInfo = [], oldStateId="", oldCityId="", oldLocality="";
  const { address = {}, tenantId = '' } = properties;
  const tenantInfo = tenantId.split('.') || [];
  const stateId = tenantInfo && tenantInfo.length === 2 && tenantInfo[0] ? tenantInfo[0].toUpperCase() : '';
  const cityId = tenantInfo && tenantInfo.length === 2 && tenantInfo[1] ? tenantInfo[1].toUpperCase() : '';
  const localityCode = address.locality && address.locality.name ? address.locality.name : '';
  if(OldProperty){
   oldTenantInfo = OldProperty.tenantId.split(".");
   oldStateId = oldTenantInfo[0].toUpperCase();
   oldCityId = oldTenantInfo[1].toUpperCase();
   oldLocality = OldProperty.address && OldProperty.address.locality && OldProperty.address.locality.name || '';
  }

  return (
    address && [
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_CITY", localizationLabelsData),
        value: address.city || "",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.city
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_HOUSE_NO", localizationLabelsData),
        value: address.doorNo || "",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.doorNo
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_COLONY_NAME", localizationLabelsData),
        value: address.buildingName || "",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.buildingName
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_STREET_NAME", localizationLabelsData),
        value: address.street || "",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.street
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_WARD_NAME", localizationLabelsData),
        value: address.ward || "",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.ward
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_MOHALLA", localizationLabelsData),
        value: localityCode ? localityCode : '',
        oldValue: oldLocality ? oldLocality :   "",
        // value: (getTranslatedLabel((`${stateId}_${cityId}_REVENUE_${localityCode}`), localizationLabelsData)) || "NA",
        // oldValue: (getTranslatedLabel((`${oldStateId}_${oldCityId}_REVENUE_${oldLocality}`), localizationLabelsData)) || "NA",
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_PINCODE", localizationLabelsData),
        value: address.pincode || "",
        oldValue: OldProperty && OldProperty.address && OldProperty.address.pincode
      },
      {
        key: getTranslatedLabel("PT_PROPERTY_ADDRESS_EXISTING_PID", localizationLabelsData),
        value: properties.oldPropertyId || "",
        oldValue: OldProperty && OldProperty.oldPropertyId
      }
    ]
  );
}

const PropertyAddressInfo = ({ properties, editIcon, OldProperty }) => {

  let addressItems = [];
  const header = 'PT_PROPERTY_ADDRESS_SUB_HEADER';
  if (properties) {
    addressItems = getAddressItems(properties, OldProperty);
  }

  return (
    <PropertyInfoCard editIcon={editIcon} items={addressItems} header={header}></PropertyInfoCard>
  );
};

export default PropertyAddressInfo;
