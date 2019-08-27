export default class Loader {
   static loadingItems = {};
   static loadingStatus = false;

   static addLoadItem(key, value) {
      var pair = {[key]: value}
      this.loadingItems = {...this.loadingItems, ...pair}
      // this.loadingStatus = this.calculateLoadingState();
   }

   static getLoadingItems() {
      return Object.values(this.loadingItems)
   }

   static loadingState() {
      return this.loadingStatus;
   }

   static calculateLoadingState(loader) {
      let openStatus = [];
      let loadValues = loader;
      loadValues.map(loadInfo => openStatus.push(loadInfo.condition, loadInfo.error !== null))
      openStatus = openStatus.every(x => x === false);
      return openStatus
   }
}
