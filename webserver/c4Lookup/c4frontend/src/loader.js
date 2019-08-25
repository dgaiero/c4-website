export default class Loader {
   static loadingItems = {};
   static loadingStatus = false;

   static addLoadItem(key, value) {
      var pair = {[key]: value}
      this.loadingItems = {...this.loadingItems, ...pair}
      this.loadingStatus = this.calculateLoadingState();
   }

   static getLoadingItems() {
      return Object.values(this.loadingItems)
   }

   static loadingState() {
      return this.loadingStatus;
   }

   static calculateLoadingState() {
      let openStatus = []
      let loadValues = Object.values(this.loadingItems)
      loadValues.map(loadInfo => openStatus.push(loadInfo.condition, loadInfo.error !== null))
      openStatus = openStatus.every(x => x === false);
      return openStatus
   }
}
