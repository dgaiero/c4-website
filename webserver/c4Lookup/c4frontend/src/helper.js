export function toTitleCase(str) {
   return str.replace(
      /\w\S*/g,
      function (txt) {
         return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
   );
}

export const isEmptyUniv = (queryData) => {
   let empty = true;
   if (queryData.activityKeywords.length !== 0) {
      empty = false;
   }
   if (queryData.topicalKeywords.length !== 0) {
      empty = false;
   }
   if (queryData.collaborations.length !== 0) {
      empty = false;
   }
   if (queryData.selectedUniversities.length !== 0) {
      empty = false;
   }
   return empty;
}


export const isEmptyOrg = (queryData) => {
   let empty = true;
   if (queryData.activityKeywords.length !== 0) {
      empty = false;
   }
   if (queryData.topicalKeywords.length !== 0) {
      empty = false;
   }
   if (queryData.collaborations.length !== 0) {
      empty = false;
   }
   if (queryData.selectedOrganization.length !== 0) {
      empty = false;
   }
   return empty;
}

export const NBSP = '\u00A0'